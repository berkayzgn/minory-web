import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { HomePage } from "./pages/HomePage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { TunerPage } from "./pages/TunerPage";
import { MetronomePage } from "./pages/MetronomePage";
import { RepertoirePage } from "./pages/RepertoirePage";
import { ChordsLibraryPage } from "./pages/ChordsLibraryPage";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/tuner" element={<TunerPage />} />
        <Route path="/metronome" element={<MetronomePage />} />
        <Route path="/repertoire" element={<RepertoirePage />} />
        <Route path="/chords" element={<ChordsLibraryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
