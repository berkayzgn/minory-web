import { useEffect } from "react";

type SEOHeadProps = {
  title: string;
  description: string;
  url: string;
  image?: string;
};

const DEFAULT_IMAGE = "https://minory.studio/image.png";

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    const nameOrProperty = Object.keys(attributes).find((k) => k === "name" || k === "property");
    if (nameOrProperty) {
      el.setAttribute(nameOrProperty, attributes[nameOrProperty]);
    }
    document.head.appendChild(el);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    el!.setAttribute(key, value);
  });
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

function upsertJsonLd(id: string, data: unknown) {
  let el = document.querySelector<HTMLScriptElement>(`script[data-seo-id="${id}"]`);
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-seo-id", id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function SEOHead({ title, description, url, image = DEFAULT_IMAGE }: SEOHeadProps) {
  useEffect(() => {
    document.title = title;

    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertLink("canonical", url);

    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: image });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: url });

    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: image });

    upsertJsonLd("software-app", {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Minory",
      applicationCategory: "MusicApplication",
      operatingSystem: "iOS",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    });
  }, [title, description, url, image]);

  return null;
}

