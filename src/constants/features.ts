/**
 * Özellik sayfaları (Tuner, Metronom, Akor Kütüphanesi, Repertuar) için
 * ortak config. FeaturesSection ve Navbar bu listeyi kullanır.
 */
import { ROUTES } from "./routes";

export const FEATURE_KEYS = ["tuner", "metronome", "chords", "repertoire"] as const;
export type FeatureKey = (typeof FEATURE_KEYS)[number];

export const FEATURES: ReadonlyArray<{
  key: FeatureKey;
  path: string;
  icon: string;
  image: string;
}> = [
  { key: "tuner", path: ROUTES.tuner, icon: "speed", image: "/tuner-dark.PNG" },
  { key: "metronome", path: ROUTES.metronome, icon: "timer", image: "/metronome-light.PNG" },
  { key: "chords", path: ROUTES.chords, icon: "library_music", image: "/chords-dark.PNG" },
  { key: "repertoire", path: ROUTES.repertoire, icon: "folder_special", image: "/repertoire-light.png" },
];

export const featureImages: Record<FeatureKey, string> = FEATURES.reduce(
  (acc, f) => {
    acc[f.key] = f.image;
    return acc;
  },
  {} as Record<FeatureKey, string>
);
