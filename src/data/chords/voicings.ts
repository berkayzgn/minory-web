/**
 * Enstrümandan bağımsız basış (voicing) erişimi.
 * Diyagram bileşenleri ve SEO metni bu tek arayüzü kullanır.
 */

import type { ChordEntry, InstrumentId } from "./catalog";
import { generateGuitarChord } from "./guitarChords";
import { generatePianoChord } from "./pianoChords";
import type { ChordFinger, PianoKeyPress } from "./types";
import { generateUkuleleChord } from "./ukuleleChords";

export interface FretVoicing {
  kind: "fret";
  id: string;
  baseFret: number;
  chordFret?: number;
  fingering: ChordFinger[];
  /** Aynı perdede aynı parmakla birden fazla tele basılıyor mu */
  isBarre: boolean;
  /** Hiç boş tel yoksa ve barre yoksa "kapalı" pozisyon sayılır */
  hasOpenStrings: boolean;
  /**
   * Diyagramdaki göreli perdeyi gerçek perde numarasına çeviren fark.
   *
   * Diyagram taşınabilir bir şekil çizer (1–5 arası göreli perdeler);
   * `chordFret` ise en küçük numaralı parmağın gerçekte hangi perdede
   * olduğunu söyler. Metinde gerçek perdeyi yazabilmek için ikisi
   * arasındaki fark gerekiyor.
   */
  fretOffset: number;
}

export interface PianoVoicing {
  kind: "piano";
  id: string;
  keys: PianoKeyPress[];
}

export type Voicing = FretVoicing | PianoVoicing;

function isBarrePosition(fingering: ChordFinger[]): boolean {
  const counts: Record<string, number> = {};
  for (const f of fingering) {
    if (f.type === "played" && f.finger) {
      const key = `${f.fret}-${f.finger}`;
      counts[key] = (counts[key] ?? 0) + 1;
      if (counts[key] > 1) return true;
    }
  }
  return false;
}

/**
 * `chordFret`, GuitarNeck/UkuleleNeck bileşenlerinde en küçük numaralı
 * parmağın hizasına yazılır — yani o parmağın gerçek perdesidir.
 * Göreli perdeleri gerçek perdeye çevirmek için aradaki farkı döndürür.
 */
function fretOffsetFor(
  fingering: ChordFinger[],
  chordFret: number | undefined,
): number {
  if (chordFret === undefined) return 0;

  const played = fingering.filter((f) => f.type === "played" && f.finger);
  if (played.length === 0) return 0;

  const lowestFinger = Math.min(...played.map((f) => f.finger!));
  const anchor = played.find((f) => f.finger === lowestFinger);
  if (!anchor) return 0;

  return chordFret - anchor.fret;
}

export function voicingsFor(entry: ChordEntry): Voicing[] {
  const { instrument, root, type } = entry;

  if (instrument === "piano") {
    const keys = generatePianoChord(root, type.id);
    return keys.length > 0
      ? [{ kind: "piano", id: `${entry.slug}-piano`, keys }]
      : [];
  }

  const generated =
    instrument === "guitar"
      ? generateGuitarChord(root, type.id)
      : generateUkuleleChord(root, type.id);

  return generated.positions.map((p) => ({
    kind: "fret" as const,
    id: p.id,
    baseFret: p.baseFret,
    chordFret: p.chordFret,
    fingering: p.fingering,
    isBarre: isBarrePosition(p.fingering),
    hasOpenStrings: p.fingering.some((f) => f.type === "open"),
    fretOffset: fretOffsetFor(p.fingering, p.chordFret),
  }));
}

/** Telli enstrümanlarda tel sayısı — SEO metninde kullanılır */
export const STRING_COUNT: Record<InstrumentId, number> = {
  guitar: 6,
  ukulele: 4,
  piano: 0,
};
