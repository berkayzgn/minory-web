import { createContext, useCallback, useContext, useState } from "react";

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

export function PageAccentProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PageAccentState>({ color: "", isColored: false });

  const setPageAccent = useCallback((color: string, isColored = true) => {
    setState({ color, isColored });
  }, []);

  return (
    <PageAccentContext.Provider value={{ ...state, setPageAccent }}>
      {children}
    </PageAccentContext.Provider>
  );
}

export function usePageAccentContext() {
  return useContext(PageAccentContext);
}
