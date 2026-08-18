import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { CHORDS_ROOT } from "./constants/chordRoutes";
import { ROUTES } from "./constants/routes";
import {
  PageAccentProvider,
  usePageAccentContext,
} from "./contexts/PageAccentContext";
import { ChordDetailPage } from "./pages/ChordDetailPage";
import { ChordInstrumentPage } from "./pages/ChordInstrumentPage";
import { ChordsLibraryPage } from "./pages/ChordsLibraryPage";
import { HomePage } from "./pages/HomePage";
import { MetronomePage } from "./pages/MetronomePage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { RecorderPage } from "./pages/RecorderPage";
import { RepertoirePage } from "./pages/RepertoirePage";
import { TunerPage } from "./pages/TunerPage";

const ROUTE_LIST = [
  { path: ROUTES.home, element: <HomePage /> },
  { path: ROUTES.privacy, element: <PrivacyPage /> },
  { path: ROUTES.tuner, element: <TunerPage /> },
  { path: ROUTES.metronome, element: <MetronomePage /> },
  { path: ROUTES.repertoire, element: <RepertoirePage /> },
  { path: ROUTES.recorder, element: <RecorderPage /> },
] as const;

/**
 * Akor bölümü iki dilde ayrı adres ağacına sahip:
 *   EN  /chords/guitar/a-minor
 *   TR  /tr/akorlar/gitar/a-minor
 * Adresler hreflang ile eşleştiği için dil, i18next yerine rotadan gelir.
 */
const CHORD_ROUTES = (["en", "tr"] as const).flatMap((locale) => {
  const root = CHORDS_ROOT[locale];
  return [
    { path: root, element: <ChordsLibraryPage locale={locale} /> },
    {
      path: `${root}/:instrument`,
      element: <ChordInstrumentPage locale={locale} />,
    },
    {
      path: `${root}/:instrument/:chord`,
      element: <ChordDetailPage locale={locale} />,
    },
  ];
});

/** Router'ın içinde kalan ağaç — SSR ve tarayıcı aynı ağacı kullanır */
function AppContent() {
  const { color, isColored } = usePageAccentContext();

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: isColored ? color : undefined,
        transition: "background-color 600ms ease",
      }}
    >
      <ScrollToTop />
      <Routes>
        {[...ROUTE_LIST, ...CHORD_ROUTES].map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </div>
  );
}

/**
 * Router'sız uygulama ağacı.
 * Tarayıcıda `BrowserRouter`, build sırasındaki prerender'da
 * `StaticRouter` ile sarmalanır.
 */
export function AppTree() {
  return (
    <PageAccentProvider>
      <AppContent />
    </PageAccentProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppTree />
    </BrowserRouter>
  );
}
