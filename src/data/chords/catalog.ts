/**
 * Akor kataloğu — hangi enstrüman için hangi akor sayfalarının
 * üretileceğini belirleyen tek kaynak.
 *
 * Hem React router hem de build sırasında çalışan prerender/sitemap
 * script'i bu dosyayı kullanır, böylece rota listesi ile sitemap
 * asla birbirinden ayrışmaz.
 */

import { GUITAR_CHORD_MAP } from "./guitarChords";
import { UKULELE_CHORD_MAP } from "./ukuleleChords";
import {
  CHORD_TYPES,
  chordDisplayName,
  chordNotes,
  chordTypeById,
  chordTypeBySlug,
  flatNameOf,
  NOTE_SEQUENCE,
  rootFromSlug,
  rootSlug,
  type ChordTypeMeta,
} from "./theory";

export type InstrumentId = "guitar" | "ukulele" | "piano";
export type Locale = "en" | "tr";

export interface InstrumentMeta {
  id: InstrumentId;
  /** URL'de kullanılan enstrüman segmenti, dile göre */
  slug: Record<Locale, string>;
  nameEn: string;
  nameTr: string;
  /** Sayfa vurgusu — uygulamadaki akor sekmesi rengiyle aynı */
  accent: string;
}

export const INSTRUMENTS: InstrumentMeta[] = [
  {
    id: "guitar",
    slug: { en: "guitar", tr: "gitar" },
    nameEn: "Guitar",
    nameTr: "Gitar",
    accent: "#10CAB9",
  },
  {
    id: "ukulele",
    slug: { en: "ukulele", tr: "ukulele" },
    nameEn: "Ukulele",
    nameTr: "Ukulele",
    accent: "#10CAB9",
  },
  {
    id: "piano",
    slug: { en: "piano", tr: "piyano" },
    nameEn: "Piano",
    nameTr: "Piyano",
    accent: "#10CAB9",
  },
];

export function instrumentById(id: string): InstrumentMeta | undefined {
  return INSTRUMENTS.find((i) => i.id === id);
}

export function instrumentBySlug(
  slug: string,
  locale: Locale,
): InstrumentMeta | undefined {
  return INSTRUMENTS.find((i) => i.slug[locale] === slug);
}

export function instrumentName(
  instrument: InstrumentMeta,
  locale: Locale,
): string {
  return locale === "tr" ? instrument.nameTr : instrument.nameEn;
}

/* ------------------------------------------------------------------ */
/* Enstrüman başına mevcut akorlar                                     */
/* ------------------------------------------------------------------ */

/** Piyano akorları interval motoruyla üretildiği için tüm tipler mevcut */
const PIANO_CHORD_MAP: Record<string, string[]> = Object.fromEntries(
  NOTE_SEQUENCE.map((note) => [note, CHORD_TYPES.map((t) => t.id)]),
);

const CHORD_MAPS: Record<InstrumentId, Record<string, string[]>> = {
  guitar: GUITAR_CHORD_MAP,
  ukulele: UKULELE_CHORD_MAP,
  piano: PIANO_CHORD_MAP,
};

export interface ChordEntry {
  instrument: InstrumentId;
  /** "C", "C#", ... */
  root: string;
  /** "Db" gibi enharmonik karşılık, yoksa null */
  rootFlat: string | null;
  type: ChordTypeMeta;
  /** "a-minor", "c-sharp-maj7" */
  slug: string;
  /** "Am", "C#maj7" */
  name: string;
  /** Bemol yazımıyla alternatif ad: "Dbmaj7" */
  altName: string | null;
  /** Akorun notaları: ["A", "C", "E"] */
  notes: string[];
}

export function chordSlug(root: string, type: ChordTypeMeta): string {
  return `${rootSlug(root)}-${type.slug}`;
}

function makeEntry(
  instrument: InstrumentId,
  root: string,
  type: ChordTypeMeta,
): ChordEntry {
  const flat = flatNameOf(root);
  return {
    instrument,
    root,
    rootFlat: flat,
    type,
    slug: chordSlug(root, type),
    name: chordDisplayName(root, type),
    altName: flat ? chordDisplayName(flat, type) : null,
    notes: chordNotes(root, type),
  };
}

/** Bir enstrümanın tüm akorları — kök ses sırasına göre */
export function chordsForInstrument(instrument: InstrumentId): ChordEntry[] {
  const map = CHORD_MAPS[instrument];
  const entries: ChordEntry[] = [];
  for (const root of NOTE_SEQUENCE) {
    const typeIds = map[root] ?? [];
    // Katalog sırası CHORD_TYPES sırasını izler (major, minor, 5, 7, ...)
    for (const type of CHORD_TYPES) {
      if (typeIds.includes(type.id)) entries.push(makeEntry(instrument, root, type));
    }
  }
  return entries;
}

/** Tüm enstrümanların tüm akorları — prerender ve sitemap için */
export function allChordEntries(): ChordEntry[] {
  return INSTRUMENTS.flatMap((i) => chordsForInstrument(i.id));
}

/**
 * "c-sharp-7-sharp-9" gibi bir slug'ı kök ses + akor tipine ayırır.
 * Kök ses slug'ları sabit olduğu için en uzun eşleşme önce denenir.
 */
export function parseChordSlug(
  slug: string,
): { root: string; type: ChordTypeMeta } | null {
  const roots = [...NOTE_SEQUENCE]
    .map(rootSlug)
    // "c-sharp" önce denenmeli ki "c" ile yanlış eşleşmesin
    .sort((a, b) => b.length - a.length);

  for (const r of roots) {
    if (!slug.startsWith(`${r}-`)) continue;
    const type = chordTypeBySlug(slug.slice(r.length + 1));
    const root = rootFromSlug(r);
    if (type && root) return { root, type };
  }
  return null;
}

/** Slug'dan akor kaydını çözer; enstrümanda o akor yoksa null döner */
export function findChord(
  instrument: InstrumentId,
  slug: string,
): ChordEntry | null {
  const parsed = parseChordSlug(slug);
  if (!parsed) return null;
  const available = CHORD_MAPS[instrument][parsed.root] ?? [];
  if (!available.includes(parsed.type.id)) return null;
  return makeEntry(instrument, parsed.root, parsed.type);
}

/** Aynı akorun diğer enstrümanlardaki karşılıkları — iç linkleme için */
export function sameChordOnOtherInstruments(entry: ChordEntry): ChordEntry[] {
  return INSTRUMENTS.filter((i) => i.id !== entry.instrument)
    .map((i) => findChord(i.id, entry.slug))
    .filter((e): e is ChordEntry => e !== null);
}

/** Aynı kök sesin diğer tipleri — "C ailesindeki akorlar" bloğu için */
export function relatedChordsInKey(entry: ChordEntry, limit = 8): ChordEntry[] {
  const available = CHORD_MAPS[entry.instrument][entry.root] ?? [];
  return CHORD_TYPES.filter(
    (t) => t.id !== entry.type.id && available.includes(t.id),
  )
    .slice(0, limit)
    .map((t) => makeEntry(entry.instrument, entry.root, t));
}

/** Aynı tipin diğer kök sesleri — "tüm minör akorlar" bloğu için */
export function sameTypeOtherRoots(entry: ChordEntry): ChordEntry[] {
  const map = CHORD_MAPS[entry.instrument];
  return NOTE_SEQUENCE.filter(
    (root) => root !== entry.root && (map[root] ?? []).includes(entry.type.id),
  ).map((root) => makeEntry(entry.instrument, root, entry.type));
}

export { CHORD_TYPES, chordTypeById, NOTE_SEQUENCE, rootSlug };
