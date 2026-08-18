/**
 * Build sonrası akor sayfalarını statik HTML'e çevirir ve sitemap üretir.
 *
 * Çalışma sırası (package.json → "build"):
 *   1. vite build            → dist/            (istemci paketi + index.html)
 *   2. vite build --ssr      → dist-ssr/        (entry-server.js)
 *   3. node scripts/prerender.mjs
 *
 * Vercel statik dosyaları rewrite kuralından önce sunduğu için
 * dist/chords/guitar/a-minor/index.html doğrudan servis edilir;
 * SPA yine hidrate olur, sayfalar arası gezinme hızlı kalır.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const distDir = join(root, "dist");
const serverEntry = join(root, "dist-ssr", "entry-server.js");

const SITE_URL = "https://minory.studio";

/** Prerender edilmeyen ama sitemap'te yer alması gereken sayfalar */
const STATIC_PAGES = [
  { path: "/", priority: 1.0 },
  { path: "/tuner", priority: 0.8 },
  { path: "/metronome", priority: 0.8 },
  { path: "/repertoire", priority: 0.8 },
  { path: "/recorder", priority: 0.8 },
  { path: "/privacy", priority: 0.3 },
];

const escapeXml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function buildSitemap(pages) {
  const entries = [];

  for (const page of STATIC_PAGES) {
    entries.push(
      `  <url>\n    <loc>${SITE_URL}${page.path}</loc>\n    <priority>${page.priority}</priority>\n  </url>`,
    );
  }

  for (const page of pages) {
    // hreflang eşlemesini sitemap'e de koy — Google'ın önerdiği yol
    const alternates = page.meta.alternates
      .map(
        (alt) =>
          `    <xhtml:link rel="alternate" hreflang="${escapeXml(alt.hreflang)}" href="${escapeXml(alt.href)}" />`,
      )
      .join("\n");

    entries.push(
      `  <url>\n    <loc>${escapeXml(page.meta.canonical)}</loc>\n${alternates}\n    <priority>${page.priority}</priority>\n  </url>`,
    );
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>
`;
}

async function main() {
  const template = await readFile(join(distDir, "index.html"), "utf8");

  for (const marker of ["<!--seo-start-->", "<!--seo-end-->", "<!--app-html-->"]) {
    if (!template.includes(marker)) {
      throw new Error(
        `index.html içinde ${marker} işareti bulunamadı — prerender enjeksiyonu yapılamaz.`,
      );
    }
  }

  const seoStart = template.indexOf("<!--seo-start-->");
  const seoEnd = template.indexOf("<!--seo-end-->") + "<!--seo-end-->".length;
  const beforeSeo = template.slice(0, seoStart);
  const afterSeo = template.slice(seoEnd);

  const { collectPages, headFor, render } = await import(
    pathToFileURL(serverEntry).href
  );

  const pages = collectPages();
  console.log(`Prerender: ${pages.length} sayfa üretiliyor…`);

  let written = 0;
  for (const page of pages) {
    const appHtml = await render(page.url, page.locale);

    const html = `${beforeSeo}${headFor(page.meta)}\n${afterSeo}`
      .replace('<html lang="en">', `<html lang="${page.locale}">`)
      .replace("<!--app-html-->", appHtml);

    const outFile = join(distDir, page.url.replace(/^\//, ""), "index.html");
    await mkdir(dirname(outFile), { recursive: true });
    await writeFile(outFile, html, "utf8");
    written++;

    if (written % 100 === 0) console.log(`  … ${written}/${pages.length}`);
  }

  await writeFile(join(distDir, "sitemap.xml"), buildSitemap(pages), "utf8");

  console.log(
    `Prerender tamam: ${written} HTML sayfası + sitemap.xml (${STATIC_PAGES.length + pages.length} URL).`,
  );
}

main().catch((error) => {
  console.error("Prerender başarısız:", error);
  process.exit(1);
});
