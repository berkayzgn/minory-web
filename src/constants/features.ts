/**
 * Özellik sayfaları için ortak config.
 * FeaturesSection ve Navbar bu listeyi kullanır.
 */
import { ROUTES } from "./routes";

export const FEATURE_KEYS = ["tuner", "metronome", "chords", "repertoire", "recorder"] as const;
export type FeatureKey = (typeof FEATURE_KEYS)[number];

export const FEATURES: ReadonlyArray<{
  key: FeatureKey;
  path: string;
  icon: string;
  image: string;
}> = [
  { key: "tuner", path: ROUTES.tuner, icon: "speed", image: "/tuner.png" },
  { key: "metronome", path: ROUTES.metronome, icon: "timer", image: "/metronome.png" },
  { key: "chords", path: ROUTES.chords, icon: "library_music", image: "/chords.png" },
  { key: "repertoire", path: ROUTES.repertoire, icon: "folder_special", image: "/repertoire.png" },
  { key: "recorder", path: ROUTES.recorder, icon: "mic", image: "/recorder.png" },
];

export const featureImages: Record<FeatureKey, string> = FEATURES.reduce(
  (acc, f) => {
    acc[f.key] = f.image;
    return acc;
  },
  {} as Record<FeatureKey, string>
);
