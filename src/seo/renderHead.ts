import type { SeoMeta } from "./types";

const escapeAttr = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** </script> kaçışı — JSON-LD içinde script kapanışı HTML'i bozmasın */
const escapeJsonLd = (data: unknown) =>
  JSON.stringify(data).replace(/</g, "\\u003c");

/**
 * `SeoMeta` nesnesini <head> içine yazılacak HTML'e çevirir.
 * Prerender script'i bunu index.html'deki seo işaretleri arasına koyar;
 * tarayıcıda aynı veriyi `SEOHead` bileşeni uygular.
 */
export function renderHeadTags(meta: SeoMeta): string {
  const image = meta.image ?? "https://minory.studio/image.png";
  const ogLocale = meta.locale === "tr" ? "tr_TR" : "en_US";

  const tags = [
    `<title>${escapeAttr(meta.title)}</title>`,
    `<meta name="description" content="${escapeAttr(meta.description)}" />`,
    `<link rel="canonical" href="${escapeAttr(meta.canonical)}" />`,
    ...meta.alternates.map(
      (alt) =>
        `<link rel="alternate" hreflang="${escapeAttr(alt.hreflang)}" href="${escapeAttr(alt.href)}" />`,
    ),
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Minory" />`,
    `<meta property="og:title" content="${escapeAttr(meta.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(meta.description)}" />`,
    `<meta property="og:image" content="${escapeAttr(image)}" />`,
    `<meta property="og:url" content="${escapeAttr(meta.canonical)}" />`,
    `<meta property="og:locale" content="${ogLocale}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(meta.description)}" />`,
    `<meta name="twitter:image" content="${escapeAttr(image)}" />`,
    ...meta.jsonLd.map(
      (data) =>
        `<script type="application/ld+json">${escapeJsonLd(data)}</script>`,
    ),
  ];

  return tags.map((tag) => `  ${tag}`).join("\n");
}
