/**
 * Akor teorisi yardımcıları.
 *
 * Kök ses / akor tipi tanımları Minory mobil uygulamasındaki
 * `app/chords/[instrument].tsx` ve `shared/utils/pianoChords.ts`
 * ile aynı listeyi kullanır; buraya ek olarak web tarafında
 * SEO metni ve URL slug'ı üretmek için gereken meta veriler var.
 */

export const NOTE_SEQUENCE = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
] as const;

export type RootNote = (typeof NOTE_SEQUENCE)[number];

/**
 * Türkçe solfej (Do–Re–Mi) karşılıkları.
 * Türkiye'de akorlar hem "Am" hem "La minör" olarak aranıyor,
 * bu yüzden TR sayfalarında iki yazım da geçiyor.
 */
export const SOLFEGE: Record<string, string> = {
  C: "Do",
  "C#": "Do diyez",
  D: "Re",
  "D#": "Re diyez",
  E: "Mi",
  F: "Fa",
  "F#": "Fa diyez",
  G: "Sol",
  "G#": "Sol diyez",
  A: "La",
  "A#": "La diyez",
  B: "Si",
};

/** Sharp → bemol karşılığı (görüntüleme ve alternatif isim için) */
export const FLAT_EQUIVALENTS: Record<string, string> = {
  "C#": "Db",
  "D#": "Eb",
  "F#": "Gb",
  "G#": "Ab",
  "A#": "Bb",
};

/** Enharmonik yazımı olan kök sesler bemol adıyla da anılır (F# = Gb) */
export function flatNameOf(root: string): string | null {
  return FLAT_EQUIVALENTS[root] ?? null;
}

/** "C#" → "c-sharp", "A" → "a" */
export function rootSlug(root: string): string {
  return root.replace("#", "-sharp").toLowerCase();
}

/** "c-sharp" → "C#" */
export function rootFromSlug(slug: string): RootNote | null {
  const normalized = slug.replace("-sharp", "#").toUpperCase();
  return (NOTE_SEQUENCE as readonly string[]).includes(normalized)
    ? (normalized as RootNote)
    : null;
}

/* ------------------------------------------------------------------ */
/* Akor tipleri                                                        */
/* ------------------------------------------------------------------ */

export interface ChordTypeMeta {
  /** Veri setlerinde kullanılan anahtar */
  id: string;
  /** URL'de kullanılan güvenli slug */
  slug: string;
  /** Kök sesin ardına yazılan sonek: "C" + "m" = "Cm" */
  suffix: string;
  /** İnsan tarafından okunan tip adı (İngilizce) */
  labelEn: string;
  /** İnsan tarafından okunan tip adı (Türkçe) */
  labelTr: string;
  /** Kök sese göre yarım ses aralıkları */
  intervals: number[];
  /** Aralıkların derece adları — SEO metninde kullanılır */
  degrees: string[];
}

export const CHORD_TYPES: ChordTypeMeta[] = [
  {
    id: "major",
    slug: "major",
    suffix: "",
    labelEn: "major",
    labelTr: "majör",
    intervals: [0, 4, 7],
    degrees: ["1", "3", "5"],
  },
  {
    id: "minor",
    slug: "minor",
    suffix: "m",
    labelEn: "minor",
    labelTr: "minör",
    intervals: [0, 3, 7],
    degrees: ["1", "♭3", "5"],
  },
  {
    id: "5",
    slug: "5",
    suffix: "5",
    labelEn: "power chord",
    labelTr: "power akor",
    intervals: [0, 7],
    degrees: ["1", "5"],
  },
  {
    id: "7",
    slug: "7",
    suffix: "7",
    labelEn: "dominant 7th",
    labelTr: "dominant 7'li",
    intervals: [0, 4, 7, 10],
    degrees: ["1", "3", "5", "♭7"],
  },
  {
    id: "maj7",
    slug: "maj7",
    suffix: "maj7",
    labelEn: "major 7th",
    labelTr: "majör 7'li",
    intervals: [0, 4, 7, 11],
    degrees: ["1", "3", "5", "7"],
  },
  {
    id: "m7",
    slug: "m7",
    suffix: "m7",
    labelEn: "minor 7th",
    labelTr: "minör 7'li",
    intervals: [0, 3, 7, 10],
    degrees: ["1", "♭3", "5", "♭7"],
  },
  {
    id: "sus4",
    slug: "sus4",
    suffix: "sus4",
    labelEn: "suspended 4th",
    labelTr: "sus4 (askıda 4'lü)",
    intervals: [0, 5, 7],
    degrees: ["1", "4", "5"],
  },
  {
    id: "add9",
    slug: "add9",
    suffix: "add9",
    labelEn: "added 9th",
    labelTr: "add9 (eklenmiş 9'lu)",
    intervals: [0, 4, 7, 14],
    degrees: ["1", "3", "5", "9"],
  },
  {
    id: "sus2",
    slug: "sus2",
    suffix: "sus2",
    labelEn: "suspended 2nd",
    labelTr: "sus2 (askıda 2'li)",
    intervals: [0, 2, 7],
    degrees: ["1", "2", "5"],
  },
  {
    id: "7sus4",
    slug: "7sus4",
    suffix: "7sus4",
    labelEn: "dominant 7th suspended 4th",
    labelTr: "7sus4",
    intervals: [0, 5, 7, 10],
    degrees: ["1", "4", "5", "♭7"],
  },
  {
    id: "7#9",
    slug: "7-sharp-9",
    suffix: "7♯9",
    labelEn: "dominant 7th sharp 9",
    labelTr: "7♯9 (Hendrix akoru)",
    intervals: [0, 4, 7, 10, 15],
    degrees: ["1", "3", "5", "♭7", "♯9"],
  },
  {
    id: "9",
    slug: "9",
    suffix: "9",
    labelEn: "dominant 9th",
    labelTr: "dominant 9'lu",
    intervals: [0, 4, 7, 10, 14],
    degrees: ["1", "3", "5", "♭7", "9"],
  },
  {
    id: "dim",
    slug: "dim",
    suffix: "dim",
    labelEn: "diminished",
    labelTr: "eksilmiş (dim)",
    intervals: [0, 3, 6],
    degrees: ["1", "♭3", "♭5"],
  },
  {
    id: "dim7",
    slug: "dim7",
    suffix: "dim7",
    labelEn: "diminished 7th",
    labelTr: "eksilmiş 7'li",
    intervals: [0, 3, 6, 9],
    degrees: ["1", "♭3", "♭5", "♭♭7"],
  },
  {
    id: "7b5",
    slug: "7b5",
    suffix: "7♭5",
    labelEn: "dominant 7th flat 5",
    labelTr: "7♭5",
    intervals: [0, 4, 6, 10],
    degrees: ["1", "3", "♭5", "♭7"],
  },
  {
    id: "madd9",
    slug: "madd9",
    suffix: "m(add9)",
    labelEn: "minor added 9th",
    labelTr: "minör add9",
    intervals: [0, 3, 7, 14],
    degrees: ["1", "♭3", "5", "9"],
  },
];

const TYPE_BY_ID = new Map(CHORD_TYPES.map((t) => [t.id, t]));
const TYPE_BY_SLUG = new Map(CHORD_TYPES.map((t) => [t.slug, t]));

export function chordTypeById(id: string): ChordTypeMeta | undefined {
  return TYPE_BY_ID.get(id);
}

export function chordTypeBySlug(slug: string): ChordTypeMeta | undefined {
  return TYPE_BY_SLUG.get(slug);
}

/** "A" + minor → "Am" */
export function chordDisplayName(root: string, type: ChordTypeMeta): string {
  return `${root}${type.suffix}`;
}

/** Akorun içerdiği notalar: A minor → ["A", "C", "E"] */
export function chordNotes(root: string, type: ChordTypeMeta): string[] {
  const rootIndex = NOTE_SEQUENCE.indexOf(root as RootNote);
  if (rootIndex === -1) return [];
  const seen = new Set<string>();
  const notes: string[] = [];
  for (const interval of type.intervals) {
    const note = NOTE_SEQUENCE[(rootIndex + interval) % 12];
    if (!seen.has(note)) {
      seen.add(note);
      notes.push(note);
    }
  }
  return notes;
}
