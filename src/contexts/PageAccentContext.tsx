import { createContext, useCallback, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { CHORDS_ROOT } from "../constants/chordRoutes";

interface PageAccentState {
  color: string;
  isColored: boolean;
}

interface PageAccentContextType extends PageAccentState {
  setPageAccent: (color: string, isColored?: boolean) => void;
}

export const PageAccentContext = createContext<PageAccentContextType>({
  color: "",
  isColored: false,
  setPageAccent: () => {},
});

/**
 * Rota adresinden doğrudan çıkarılabilen vurgu renkleri.
 *
 * Akor sayfaları build sırasında statik HTML'e dönüştürülüyor; efekt
 * çalışmadığı için renk render anında biliniyor olmalı, aksi halde
 * prerender çıktısında beyaz yazı açık zemine düşer.
 */
const ROUTE_ACCENTS: { prefix: string; color: string }[] = [
  { prefix: CHORDS_ROOT.tr, color: "#10CAB9" },
  { prefix: CHORDS_ROOT.en, color: "#10CAB9" },
];

function accentForPath(pathname: string): string | null {
  const match = ROUTE_ACCENTS.find(
    ({ prefix }) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
  return match?.color ?? null;
}

export function PageAccentProvider({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const [override, setOverride] = useState<PageAccentState>({
    color: "",
    isColored: false,
  });

  const setPageAccent = useCallback((color: string, isColored = true) => {
    setOverride({ color, isColored });
  }, []);

  // Rotadan gelen renk her zaman kazanır; diğer sayfalar efektle ayarlamaya
  // devam eder (useSetPageAccent).
  const routeAccent = accentForPath(pathname);
  const state: PageAccentState = routeAccent
    ? { color: routeAccent, isColored: true }
    : override;

  return (
    <PageAccentContext.Provider value={{ ...state, setPageAccent }}>
      {children}
    </PageAccentContext.Provider>
  );
}

export function usePageAccentContext() {
  return useContext(PageAccentContext);
}
