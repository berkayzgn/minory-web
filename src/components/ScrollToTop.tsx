import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Route değiştiğinde sayfayı en üste kaydırır */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
