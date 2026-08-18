import { useEffect } from "react";
import type { Locale } from "../data/chords/catalog";
import type { SeoMeta } from "../seo/types";

const DEFAULT_IMAGE = "https://minory.studio/image.png";

/** Eski çağrı biçimi — mevcut tanıtım sayfaları bunu kullanıyor */
type LegacyProps = {
  title: string;
  description: string;
  url: string;
  image?: string;
  locale?: Locale;
};

type MetaProps = { meta: SeoMeta };

type SEOHeadProps = LegacyProps | MetaProps;

function upsertMeta(
  key: "name" | "property",
  value: string,
  content: string,
) {
  const selector = `meta[${key}="${value}"]`;
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(key, value);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
}

/** Önceki rotadan kalan hreflang ve JSON-LD etiketlerini temizler */
function clearManaged() {
  document
    .querySelectorAll("[data-seo-managed]")
    .forEach((el) => el.remove());
}

function normalize(props: SEOHeadProps): SeoMeta {
  if ("meta" in props) return props.meta;
  return {
    title: props.title,
    description: props.description,
    canonical: props.url,
    locale: props.locale ?? "en",
    alternates: [],
    image: props.image ?? DEFAULT_IMAGE,
    jsonLd: [],
  };
}

/**
 * Sayfa <head> bilgisini istemci tarafında uygular.
 *
 * Prerender edilmiş sayfalarda aynı etiketler zaten HTML içinde gelir;
 * bu bileşen SPA içinde rota değiştikçe onları günceller.
 */
export function SEOHead(props: SEOHeadProps) {
  const meta = normalize(props);
  const { title, description, canonical, locale, image } = meta;
  // Nesne kimliği her render'da değiştiği için efekt bağımlılığına
  // serileştirilmiş hallerini veriyoruz
  const alternatesKey = JSON.stringify(meta.alternates);
  const jsonLdKey = JSON.stringify(meta.jsonLd);

  useEffect(() => {
    const alternates = JSON.parse(alternatesKey) as SeoMeta["alternates"];
    const jsonLd = JSON.parse(jsonLdKey) as SeoMeta["jsonLd"];

    document.title = title;
    document.documentElement.lang = locale;

    upsertMeta("name", "description", description);
    upsertCanonical(canonical);

    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:image", image ?? DEFAULT_IMAGE);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:locale", locale === "tr" ? "tr_TR" : "en_US");
    upsertMeta("property", "og:site_name", "Minory");

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image ?? DEFAULT_IMAGE);

    clearManaged();

    alternates.forEach((alt) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = alt.hreflang;
      link.href = alt.href;
      link.setAttribute("data-seo-managed", "");
      document.head.appendChild(link);
    });

    jsonLd.forEach((data) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-managed", "");
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    });
  }, [title, description, canonical, locale, image, alternatesKey, jsonLdKey]);

  return null;
}
