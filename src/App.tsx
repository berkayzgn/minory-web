import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { ROUTES } from "./constants/routes";
import { HomePage } from "./pages/HomePage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { TunerPage } from "./pages/TunerPage";
import { MetronomePage } from "./pages/MetronomePage";
import { RepertoirePage } from "./pages/RepertoirePage";
import { ChordsLibraryPage } from "./pages/ChordsLibraryPage";
import { RecorderPage } from "./pages/RecorderPage";
import { PageAccentProvider, usePageAccentContext } from "./contexts/PageAccentContext";

const ROUTE_LIST = [
  { path: ROUTES.home, element: <HomePage /> },
  { path: ROUTES.privacy, element: <PrivacyPage /> },
  { path: ROUTES.tuner, element: <TunerPage /> },
  { path: ROUTES.metronome, element: <MetronomePage /> },
  { path: ROUTES.repertoire, element: <RepertoirePage /> },
  { path: ROUTES.chords, element: <ChordsLibraryPage /> },
  { path: ROUTES.recorder, element: <RecorderPage /> },
] as const;

function AppRoot() {
  const { color, isColored } = usePageAccentContext();
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: isColored ? color : undefined,
        transition: "background-color 600ms ease",
      }}
    >
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {ROUTE_LIST.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function App() {
  return (
    <PageAccentProvider>
      <AppRoot />
    </PageAccentProvider>
  );
}

export default App;
