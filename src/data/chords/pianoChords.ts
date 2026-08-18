import { PianoKeyPress } from "./types";

/**
 * === PIANO CHORD ENGINE - INDEX BASED ===
 *
 * Klavye: C0 → B1 (2 oktav)
 * Index aralığı: 0 → 23 (14 white key)
 *
 * Örnek:
 * C0 = index 0
 * C#0 = 0 + 1 semitone (siyah tuş)
 * D0 = index 2
 * ...
 * B1 = index 23 (max)
 */

/* === NOTE TO INDEX MAPPING === */
const NOTE_TO_SEMITONE: Record<string, number> = {
  C: 0,
  "C#": 1,
  Db: 1, // Bemol desteği
  D: 2,
  "D#": 3,
  Eb: 3, // Bemol desteği
  E: 4,
  F: 5,
  "F#": 6,
  Gb: 6, // Bemol desteği
  G: 7,
  "G#": 8,
  Ab: 8, // Bemol desteği
  A: 9,
  "A#": 10,
  Bb: 10, // Bemol desteği
  B: 11,
};

const SEMITONE_TO_NOTE: Record<number, string> = {
  0: "C",
  1: "C#",
  2: "D",
  3: "D#",
  4: "E",
  5: "F",
  6: "F#",
  7: "G",
  8: "G#",
  9: "A",
  10: "A#",
  11: "B",
};

/**
 * Index'ten nota adı + oktav'a çevir
 * 0 = C0, 2 = D0, ..., 16 = E1
 */
const indexToNote = (index: number): string => {
  const octave = Math.floor(index / 12);
  const semitone = index % 12;
  const note = SEMITONE_TO_NOTE[semitone];
  return note ? `${note}${octave}` : "";
};

/**
 * Parse user-friendly note input where octave is optional.
 * - "D"  -> first octave (D0)
 * - "D1" -> second octave (D1)
 */
const userNoteToIndex = (noteInput: string): number => {
  const match = noteInput.match(/^([A-G]#?)(\d?)$/i);
  if (!match) return -1;

  const note = match[1].toUpperCase();
  const octaveStr = match[2];

  // If no octave provided, treat as first octave (octave 0)
  const octave = octaveStr ? parseInt(octaveStr, 10) : 0;

  const semitone = NOTE_TO_SEMITONE[note];
  if (semitone === undefined) return -1;

  return octave * 12 + semitone;
};

/* === CHORD INTERVALS (semitone cinsinden) === */
const CHORD_INTERVALS: Record<string, number[]> = {
  major: [0, 4, 7], // root, M3, P5
  minor: [0, 3, 7], // root, m3, P5
  "5": [0, 7], // root, P5
  "7": [0, 4, 7, 10], // root, M3, P5, m7
  maj7: [0, 4, 7, 11], // root, M3, P5, M7
  m7: [0, 3, 7, 10], // root, m3, P5, m7
  sus2: [0, 2, 7], // root, M2, P5
  sus4: [0, 5, 7], // root, P4, P5
  add9: [0, 4, 7, 14], // root, M3, P5, M9
  madd9: [0, 3, 7, 14], // root, m3, P5, M9 — m(add9)
  dim: [0, 3, 6], // diminished triad
  dim7: [0, 3, 6, 9], // fully diminished 7th
  "7b5": [0, 4, 6, 10], // dominant 7, diminished 5 (same as 7♭5)
  "7sus4": [0, 5, 7, 10], // root, P4, P5, m7
  "7#9": [0, 4, 7, 10, 15], // root, M3, P5, m7, #9
  "9": [0, 4, 7, 10, 14], // root, M3, P5, m7, M9
};

/* === PIANO KEYBOARD CONSTRAINTS === */
const MIN_KEY_INDEX = 0; // C0
const MAX_KEY_INDEX = 35; // B2 (3 octaves)

/**
 * Root notasından akorun tüm index'lerini oluştur
 *
 * @param rootIndex - Root notasının index'i (0-11 arası)
 * @param intervals - Akor tipine göre interval'ler (semitone)
 * @param maxIndex - Klavyede max index (default 16)
 * @returns Sınırlar içinde kalan index'ler (sıralı, root ilk)
 *
 * Örnek: C major = [0, 4, 7] → [0, 4, 7]
 *        B major = [11, 15, 18] → [15, 18] (11 taştı, kaldırıldı)
 */
const buildPianoChordIndexes = (
  rootIndex: number,
  intervals: number[],
  maxIndex: number = MAX_KEY_INDEX,
): number[] => {
  const indexes: number[] = [];

  for (const interval of intervals) {
    const calculatedIndex = rootIndex + interval;

    // Sınırlar içinde mi?
    if (calculatedIndex >= MIN_KEY_INDEX && calculatedIndex <= maxIndex) {
      indexes.push(calculatedIndex);
    }
  }

  // Index'leri sırala (ascending)
  return indexes.sort((a, b) => a - b);
};

/**
 * Index array'ini PianoKeyPress array'ine çevir
 *
 * @param indexes - Basılacak tuş index'leri
 * @returns PianoKeyPress array'i
 */
const indexesToPianoKeys = (indexes: number[]): PianoKeyPress[] => {
  return indexes.map((index, position) => {
    const note = indexToNote(index);
    const match = note.match(/^([A-G]#?)(\d)$/);

    if (!match) {
      return { note: "", octave: 0, finger: position + 1 };
    }

    return {
      note: match[1],
      octave: parseInt(match[2]),
      finger: position + 1,
    };
  });
};

/**
 * Nota ismi + akor tipi → PianoKeyPress[]
 *
 * @param noteName - "C", "C#", "D", ... "B"
 * @param chordType - "major", "minor", "7", "maj7", ...
 * @returns Basılacak tuşlar (PianoKeyPress[])
 *
 * Örnek:
 * generatePianoChord("C", "major") → [C0, E0, G0]
 * generatePianoChord("B", "major") → [D#1, F#1] (B2 taşar, kaldırıldı)
 */
export const generatePianoChord = (
  noteName: string,
  chordType: string,
): PianoKeyPress[] => {
  // Akor tipini normalize et
  const normalizedChordType = chordType
    .toLowerCase()
    .replace("major", "major")
    .replace("minor", "minor")
    .trim();

  // Interval'leri al
  const intervals = CHORD_INTERVALS[normalizedChordType];
  if (!intervals) {
    console.warn(`Unknown chord type: ${chordType}`);
    return [];
  }

  // Root notasını bul - userNoteToIndex ile ("D" -> D0, "D1" -> D1)
  const rootIndex = userNoteToIndex(noteName);
  if (rootIndex === -1) {
    console.warn(`Unknown note: ${noteName}`);
    return [];
  }

  // Index'leri oluştur
  const indexes = buildPianoChordIndexes(rootIndex, intervals);

  // PianoKeyPress'e çevir
  return indexesToPianoKeys(indexes);
};
