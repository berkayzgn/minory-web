import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "../constants/routes";
import { FEATURES } from "../constants/features";
import TextType from "./TextType";

const LANG_KEY = "minory-lang";

const navLinkClass = (active: boolean) =>
  `block w-full text-left text-sm font-medium transition-colors py-3 px-4 rounded-lg min-h-[44px] flex items-center ${
    active
      ? "text-primary font-semibold bg-primary/10"
      : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-primary"
  }`;

export function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const next = i18n.language === "en" ? "tr" : "en";
    i18n.changeLanguage(next);
    localStorage.setItem(LANG_KEY, next);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="fixed w-full z-50 top-0 left-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-20 flex items-center justify-between relative" aria-label="Ana menü">
        <Link to="/" className="flex items-center gap-2 shrink-0" onClick={closeMobileMenu}>
          <img
            src="/image.png"
            alt="Minory Studio"
            width={40}
            height={40}
            className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
          />
          <span className="font-bold text-lg sm:text-xl tracking-tight text-neutral-900 dark:text-white flex items-center gap-1">
            {t("nav.brand")}{" "}
            <TextType
              as="span"
              text={[t("hero.titleStudio")]}
              typingSpeed={75}
              pauseDuration={1500}
              deletingSpeed={50}
              showCursor
              cursorCharacter="_"
              cursorBlinkDuration={0.5}
              loop
              className="text-primary font-bold text-lg sm:text-xl tracking-tight"
            />
          </span>
        </Link>

        {/* Desktop nav (lg and up) */}
        <div className="hidden lg:flex items-center justify-center gap-1 sm:gap-3 absolute left-1/2 -translate-x-1/2">
          <Link
            to={ROUTES.home}
            className={`inline-flex text-sm font-medium transition-colors py-2 px-2 ${
              location.pathname === ROUTES.home
                ? "text-primary font-semibold"
                : "text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary"
            }`}
          >
            {t("nav.home")}
          </Link>
          {FEATURES.map(({ key, path }) => (
            <Link
              key={key}
              to={path}
              className={`inline-flex text-sm font-medium transition-colors py-2 px-2 ${
                location.pathname === path
                  ? "text-primary font-semibold"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary"
              }`}
            >
              {t(`nav.${key === "chords" ? "chordsLibrary" : key}`)}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 relative z-10">
          {/* Hamburger: visible below lg (1024px) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="lg:hidden p-2 rounded-full text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={mobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          <span className="hidden lg:inline text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tabular-nums">
            {i18n.language === "en" ? "EN" : "TR"}
          </span>
          <button
            type="button"
            onClick={toggleLanguage}
            className="p-2 rounded-full text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-primary transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center md:min-w-0 md:min-h-0"
            aria-label={i18n.language === "en" ? "Türkçe'ye geç" : "Switch to English"}
            title={i18n.language === "en" ? "Türkçe" : "English"}
          >
            <span className="material-icons-round text-xl sm:text-2xl">language</span>
          </button>
        </div>
      </nav>

      {/* Mobile/tablet menu (below lg) */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 z-50 bg-background-light dark:bg-background-dark border-b border-neutral-200 dark:border-neutral-800 shadow-lg overflow-hidden transition-[max-height,opacity] duration-200 ease-out ${
          mobileMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="px-4 py-3 pb-4 flex flex-col gap-1">
          <Link
            to={ROUTES.home}
            className={navLinkClass(location.pathname === ROUTES.home)}
            onClick={closeMobileMenu}
          >
            {t("nav.home")}
          </Link>
          {FEATURES.map(({ key, path }) => (
            <Link
              key={key}
              to={path}
              className={navLinkClass(location.pathname === path)}
              onClick={closeMobileMenu}
            >
              {t(`nav.${key === "chords" ? "chordsLibrary" : key}`)}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
