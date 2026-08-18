/**
 * Akor diyagramı renkleri.
 *
 * Değerler Minory uygulamasındaki `shared/theme/appTheme.ts` ile aynı;
 * tek fark vurgu (accent) rengi: web'de diyagramlar beyaz kart üzerinde
 * durduğu için parmak dairelerinde beyaz rakamın okunabilir kaldığı
 * daha koyu bir teal kullanılıyor (WCAG AA).
 */
export const DIAGRAM_COLORS = {
  fretboard: "#5a5a5a",
  nut: "#111111",
  fretWire: "#808080",
  string: "#e0e0e0",
  fretLabel: "#27272a",
  muted: "#BF1A1A",
  accent: "#07766D",
  onAccent: "#FFFFFF",
  whiteKey: "#FFFFFF",
  blackKey: "#1A1B1E",
  keyStroke: "#27272a",
} as const;

export interface Barre {
  fret: number;
  finger: number;
  minString: number;
  maxString: number;
}

/**
 * Aynı perdede aynı parmağın birden fazla tele bastığı yerleri bulur.
 * Uygulamadaki `findBarres` ile aynı mantık.
 */
export function findBarres(
  fingers: { string: number; fret: number; type: string; finger?: number }[],
): Barre[] {
  const fretFingerMap: Record<string, number[]> = {};

  fingers.forEach((finger) => {
    if (finger.type === "played" && finger.finger) {
      const key = `${finger.fret}-${finger.finger}`;
      (fretFingerMap[key] ??= []).push(finger.string);
    }
  });

  return Object.entries(fretFingerMap)
    .filter(([, strings]) => strings.length > 1)
    .map(([key, strings]) => {
      const [fret, finger] = key.split("-").map(Number);
      return {
        fret,
        finger,
        minString: Math.min(...strings),
        maxString: Math.max(...strings),
      };
    });
}
