/**
 * Akor sayfalarının <head> verisini üretir.
 *
 * Router ve prerender script'i aynı fonksiyonları çağırır; canonical ve
 * hreflang adresleri `constants/chordRoutes.ts` üzerinden hesaplandığı için
 * URL yapısı değişirse tüm SEO çıktısı otomatik olarak takip eder.
 */

import {
  absoluteUrl,
  chordPath,
  chordsHubPath,
  HREFLANG,
  instrumentPath,
  LOCALES,
} from "../constants/chordRoutes";
import {
  chordsForInstrument,
  INSTRUMENTS,
  instrumentById,
  instrumentName,
  type ChordEntry,
  type InstrumentMeta,
  type Locale,
} from "../data/chords/catalog";
import { SOLFEGE } from "../data/chords/theory";
import type { Voicing } from "../data/chords/voicings";
import {
  chordPageCopy,
  instrumentLabel,
  typeLabel,
  type ChordPageCopy,
} from "./chordCopy";
import { clamp, type AlternateLink, type SeoMeta } from "./types";

const SITE_NAME = "Minory";
const OG_IMAGE = "https://minory.studio/image.png";

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Aynı sayfanın tüm dillerdeki adresleri + x-default */
function alternatesFor(pathFor: (locale: Locale) => string): AlternateLink[] {
  const links: AlternateLink[] = LOCALES.map((l) => ({
    hreflang: HREFLANG[l],
    href: absoluteUrl(pathFor(l)),
  }));
  links.push({ hreflang: "x-default", href: absoluteUrl(pathFor("en")) });
  return links;
}

function breadcrumb(
  items: { name: string; path: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function faqJsonLd(faq: { q: string; a: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

const HUB_LABEL: Record<Locale, string> = { en: "Chords", tr: "Akorlar" };

/* ------------------------------------------------------------------ */
/* /chords — hub                                                       */
/* ------------------------------------------------------------------ */

export function chordsHubSeo(locale: Locale): SeoMeta {
  const total = INSTRUMENTS.reduce(
    (sum, i) => sum + chordsForInstrument(i.id).length,
    0,
  );

  const title =
    locale === "tr"
      ? `Akor Kütüphanesi — Gitar, Piyano ve Ukulele Akorları | ${SITE_NAME}`
      : `Chord Library — Guitar, Piano & Ukulele Chords | ${SITE_NAME}`;

  const description =
    locale === "tr"
      ? `${total} akorun diyagramı tek yerde: gitar, piyano ve ukulele için basış şekilleri, notalar ve alternatif pozisyonlar. Ücretsiz ve reklamsız tarayın.`
      : `Diagrams for ${total} chords in one place: fingerings, notes and alternate positions for guitar, piano and ukulele. Browse free, no sign-up needed.`;

  return {
    title,
    description: clamp(description),
    canonical: absoluteUrl(chordsHubPath(locale)),
    locale,
    alternates: alternatesFor(chordsHubPath),
    image: OG_IMAGE,
    jsonLd: [
      breadcrumb([{ name: HUB_LABEL[locale], path: chordsHubPath(locale) }]),
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: title,
        description,
        url: absoluteUrl(chordsHubPath(locale)),
        inLanguage: locale,
        isPartOf: {
          "@type": "WebSite",
          name: SITE_NAME,
          url: absoluteUrl("/"),
        },
      },
    ],
  };
}

/* ------------------------------------------------------------------ */
/* /chords/:instrument                                                 */
/* ------------------------------------------------------------------ */

export function instrumentSeo(
  instrument: InstrumentMeta,
  locale: Locale,
): SeoMeta {
  const entries = chordsForInstrument(instrument.id);
  const name = instrumentName(instrument, locale);
  const inst = instrumentLabel(instrument.id, locale);

  const title =
    locale === "tr"
      ? `${name} Akorları — ${entries.length} Akor, Diyagramlı | ${SITE_NAME}`
      : `${name} Chords — ${entries.length} Chords with Diagrams | ${SITE_NAME}`;

  const description =
    locale === "tr"
      ? `Tüm ${inst} akorları tek listede: ${entries.length} akorun basış diyagramı, notaları ve alternatif pozisyonları. Majör, minör, 7'li, sus ve daha fazlası.`
      : `Every ${inst} chord in one list: ${entries.length} chords with fingering diagrams, notes and alternate positions. Major, minor, 7th, sus and more.`;

  const pathFor = (l: Locale) => instrumentPath(instrument, l);

  return {
    title,
    description: clamp(description),
    canonical: absoluteUrl(pathFor(locale)),
    locale,
    alternates: alternatesFor(pathFor),
    image: OG_IMAGE,
    jsonLd: [
      breadcrumb([
        { name: HUB_LABEL[locale], path: chordsHubPath(locale) },
        { name, path: pathFor(locale) },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: title,
        description,
        url: absoluteUrl(pathFor(locale)),
        inLanguage: locale,
        // İlk 50 akoru listele — tam liste sayfanın kendisinde
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: entries.length,
          itemListElement: entries.slice(0, 50).map((entry, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: entry.name,
            url: absoluteUrl(chordPath(entry, instrument, locale)),
          })),
        },
      },
    ],
  };
}

/* ------------------------------------------------------------------ */
/* /chords/:instrument/:chord                                          */
/* ------------------------------------------------------------------ */

export function chordDetailSeo(
  entry: ChordEntry,
  locale: Locale,
  voicings: Voicing[],
  copy: ChordPageCopy,
): SeoMeta {
  const instrument = instrumentById(entry.instrument)!;
  const instName = instrumentName(instrument, locale);
  const inst = instrumentLabel(entry.instrument, locale);
  const notes = entry.notes.join(", ");
  const count = voicings.length;

  const title =
    locale === "tr"
      ? `${entry.name} Akoru (${instName}) — Diyagram ve Basışlar | ${SITE_NAME}`
      : `${entry.name} ${instName} Chord — Diagrams & Fingerings | ${SITE_NAME}`;

  const solfege = SOLFEGE[entry.root] ?? entry.root;
  const tLabel = typeLabel(entry.type, locale);

  const description =
    locale === "tr"
      ? entry.instrument === "piano"
        ? `${entry.name} akoru (${solfege} ${tLabel}) piyanoda nasıl çalınır: klavye diyagramı, ${notes} notaları ve akorun teorisi.`
        : `${entry.name} akoru (${solfege} ${tLabel}) ${inst} için ${count} farklı basış diyagramı, ${notes} notaları ve nasıl çalınacağı.`
      : entry.instrument === "piano"
        ? `How to play the ${entry.name} chord on piano: keyboard diagram, the notes ${notes}, and the theory behind the chord.`
        : `${count} ${inst} fingering diagram${count === 1 ? "" : "s"} for the ${entry.name} chord, the notes ${notes}, and how to play it step by step.`;

  const pathFor = (l: Locale) => chordPath(entry, instrument, l);

  return {
    title,
    description: clamp(description),
    canonical: absoluteUrl(pathFor(locale)),
    locale,
    alternates: alternatesFor(pathFor),
    image: OG_IMAGE,
    jsonLd: [
      breadcrumb([
        { name: HUB_LABEL[locale], path: chordsHubPath(locale) },
        { name: instName, path: instrumentPath(instrument, locale) },
        { name: entry.name, path: pathFor(locale) },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        description,
        url: absoluteUrl(pathFor(locale)),
        inLanguage: locale,
        about: {
          "@type": "Thing",
          name:
            locale === "tr"
              ? `${entry.name} akoru`
              : `${entry.name} chord (${capitalize(inst)})`,
          alternateName: entry.altName ?? undefined,
        },
        isPartOf: {
          "@type": "CollectionPage",
          name: instName,
          url: absoluteUrl(instrumentPath(instrument, locale)),
        },
      },
      faqJsonLd(copy.faq),
    ],
  };
}

/** Sayfa bileşenlerinin tek çağrıda hem metni hem meta'yı alması için */
export function chordDetailBundle(
  entry: ChordEntry,
  locale: Locale,
  voicings: Voicing[],
) {
  const copy = chordPageCopy(entry, voicings, locale);
  return { copy, meta: chordDetailSeo(entry, locale, voicings, copy) };
}
