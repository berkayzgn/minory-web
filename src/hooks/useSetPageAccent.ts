import { useEffect } from "react";
import { usePageAccentContext } from "../contexts/PageAccentContext";

export function useSetPageAccent(color: string) {
  const { setPageAccent } = usePageAccentContext();
  useEffect(() => {
    setPageAccent(color, true);
    return () => setPageAccent("", false);
  }, [color, setPageAccent]);
}
