import type { Locale } from "../data/chords/catalog";

export interface AlternateLink {
  hreflang: string;
  href: string;
}

/**
 * Bir sayfanın tüm <head> bilgisi.
 *
 * Aynı nesne iki yerde kullanılır:
 *  - tarayıcıda `SEOHead` bileşeni tarafından uygulanır,
 *  - build sırasında prerender script'i tarafından HTML'e yazılır.
 * Böylece istemci ve sunucu çıktısı asla ayrışmaz.
 */
export interface SeoMeta {
  title: string;
  description: string;
  canonical: string;
  locale: Locale;
  alternates: AlternateLink[];
  image?: string;
  /** Sayfaya gömülecek schema.org nesneleri */
  jsonLd: Record<string, unknown>[];
}

/** Açıklama meta'sını kelime sınırında kırpar */
export function clamp(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : cut.length)}…`;
}
