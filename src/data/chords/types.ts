/**
 * Akor diyagramı tipleri — Minory mobil uygulamasındaki
 * `shared/types/chords.ts` ile birebir aynı sözleşme.
 */

export interface ChordFinger {
  /** Gitar için 0-5 (6 tel), ukulele için 0-3 (4 tel) */
  string: number;
  /** Diyagramdaki perde: 0 = boş/açık tel */
  fret: number;
  type: "open" | "muted" | "played" | "none";
  /** 1-4: işaret, orta, yüzük, serçe */
  finger?: number;
}

export interface PianoKeyPress {
  note: string;
  octave?: number;
  finger?: number;
}
