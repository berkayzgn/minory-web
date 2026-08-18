import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { Locale } from "../data/chords/catalog";

/**
 * Akor sayfalarında dilin kaynağı URL'dir (/chords vs /tr/akorlar).
 * Navbar ve Footer i18next kullandığı için rota diline göre senkronlanır.
 *
 * Kullanıcının kaydettiği tercihi (localStorage) bilinçli olarak
 * değiştirmez — onu yalnızca Navbar'daki dil düğmesi yazar.
 */
export function useRouteLocale(locale: Locale) {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language !== locale) {
      void i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);
}
