/**
 * Akor sayfalarının dile göre URL yapısı.
 *
 * EN: /chords/guitar/a-minor
 * TR: /tr/akorlar/gitar/a-minor
 *
 * Router, prerender script'i ve sitemap üretimi aynı fonksiyonları
 * kullanır — böylece canonical/hreflang adresleri her zaman tutarlı olur.
 */

import { INSTRUMENTS } from "../data/chords/catalog";
import type { ChordEntry, InstrumentMeta, Locale } from "../data/chords/catalog";

export const SITE_URL = "https://minory.studio";

export const LOCALES: Locale[] = ["en", "tr"];

/** hreflang değerleri */
export const HREFLANG: Record<Locale, string> = {
  en: "en",
  tr: "tr",
};

/** Akor bölümünün dile göre kök segmenti */
export const CHORDS_ROOT: Record<Locale, string> = {
  en: "/chords",
  tr: "/tr/akorlar",
};

export function chordsHubPath(locale: Locale): string {
  return CHORDS_ROOT[locale];
}

export function instrumentPath(
  instrument: InstrumentMeta,
  locale: Locale,
): string {
  return `${CHORDS_ROOT[locale]}/${instrument.slug[locale]}`;
}

export function chordPath(
  entry: ChordEntry,
  instrument: InstrumentMeta,
  locale: Locale,
): string {
  return `${instrumentPath(instrument, locale)}/${entry.slug}`;
}

/**
 * Akor bölümüne giriş adresi.
 *
 * Kullanıcıya önce "hangi enstrüman?" diye sormamak için gezinme
 * bağlantıları doğrudan explorer'ın içine, en çok aranan akora düşer.
 */
export const ENTRY_INSTRUMENT = "guitar";
export const ENTRY_CHORD_SLUG = "c-major";

export function explorerEntryPath(locale: Locale): string {
  const instrument = INSTRUMENTS.find((i) => i.id === ENTRY_INSTRUMENT);
  if (!instrument) return CHORDS_ROOT[locale];
  return `${instrumentPath(instrument, locale)}/${ENTRY_CHORD_SLUG}`;
}

/** Verilen adres akor bölümünün içinde mi (gezinmede aktif işareti için) */
export function isChordsPath(pathname: string): boolean {
  return LOCALES.some(
    (l) =>
      pathname === CHORDS_ROOT[l] || pathname.startsWith(`${CHORDS_ROOT[l]}/`),
  );
}

/** Göreli path → mutlak URL */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

/**
 * Bir akor sayfasının diğer dildeki karşılığını döndürür.
 * Akor sayfası değilse null döner — dil düğmesi o zaman sadece
 * i18next dilini değiştirir, adres aynı kalır.
 *
 * /chords/guitar/a-minor → /tr/akorlar/gitar/a-minor
 */
export function alternateChordPath(
  pathname: string,
  target: Locale,
): string | null {
  const source = LOCALES.find(
    (l) =>
      pathname === CHORDS_ROOT[l] || pathname.startsWith(`${CHORDS_ROOT[l]}/`),
  );
  if (source === undefined) return null;
  if (source === target) return pathname;

  const rest = pathname.slice(CHORDS_ROOT[source].length);
  const segments = rest.split("/").filter(Boolean);

  if (segments.length === 0) return CHORDS_ROOT[target];

  const [instrumentSlug, ...tail] = segments;
  const instrument = INSTRUMENTS.find(
    (i) => i.slug[source] === instrumentSlug,
  );
  // Tanınmayan enstrüman: hedef dilin akor ana sayfasına düş
  if (!instrument) return CHORDS_ROOT[target];

  return [instrumentPath(instrument, target), ...tail].join("/");
}
