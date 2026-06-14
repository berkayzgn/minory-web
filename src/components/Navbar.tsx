import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "../constants/routes";
import { FEATURES } from "../constants/features";
import TextType from "./TextType";
import { usePageAccentContext } from "../contexts/PageAccentContext";

const LANG_KEY = "minory-lang";

export function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isColored } = usePageAccentContext();

  const toggleLanguage = () => {
    const next = i18n.language === "en" ? "tr" : "en";
    i18n.changeLanguage(next);
    localStorage.setItem(LANG_KEY, next);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const headerBg = isColored
    ? "bg-black/10 backdrop-blur-md border-b border-white/10"
    : "bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800";

  const logoText = isColored ? "text-white font-extrabold" : "text-neutral-900 dark:text-white";
  const accentText = isColored ? "text-white" : "text-primary";
  const linkBase = isColored
    ? "text-white font-semibold hover:text-white/80"
    : "text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary";
  const linkActive = isColored
    ? "text-white font-bold underline underline-offset-4 decoration-white/50"
    : "text-primary font-semibold";
  const mobileMenuBg = isColored
    ? "bg-black/25 border-b border-white/10"
    : "bg-background-light dark:bg-background-dark border-b border-neutral-200 dark:border-neutral-800";
  const mobileLinkActive = isColored
    ? "text-white font-bold bg-white/15"
    : "text-primary font-semibold bg-primary/10";
  const mobileLinkBase = isColored
    ? "text-white font-semibold hover:bg-white/10 hover:text-white"
    : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-primary";
  const langBtnClass = isColored
    ? "text-white font-semibold hover:text-white hover:bg-white/15"
    : "text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-primary";
  const hamburgerClass = isColored
    ? "text-white hover:text-white/80"
    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white";

  const navLinkClass = (active: boolean) =>
    `block w-full text-left text-sm font-medium transition-colors py-3 px-4 rounded-lg min-h-[44px] flex items-center ${
      active ? mobileLinkActive : mobileLinkBase
    }`;

  return (
    <header className={`fixed w-full z-50 top-0 left-0 ${headerBg}`} style={{ transition: "background-color 600ms ease, border-color 600ms ease" }}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-20 flex items-center gap-4" aria-label="Ana menü">

        {/* Logo — shrink-0, tek satır */}
        <Link to="/" className="inline-flex items-center gap-2 shrink-0" onClick={closeMobileMenu}>
          <img
            src="/image.png"
            alt="Minory Studio"
            width={40}
            height={40}
            className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
          />
          <span className={`font-bold text-lg sm:text-xl tracking-tight flex items-center gap-1 whitespace-nowrap ${logoText}`}>
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
              className={`font-bold text-lg sm:text-xl tracking-tight ${accentText}`}
            />
          </span>
        </Link>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Desktop nav — sağda */}
        <div className="hidden lg:flex items-center gap-1 sm:gap-2">
          <Link
            to={ROUTES.home}
            className={`inline-flex text-sm font-medium transition-colors py-2 px-3 ${
              location.pathname === ROUTES.home ? linkActive : linkBase
            }`}
          >
            {t("nav.home")}
          </Link>
          {FEATURES.map(({ key, path }) => (
            <Link
              key={key}
              to={path}
              className={`inline-flex text-sm font-medium transition-colors py-2 px-3 ${
                location.pathname === path ? linkActive : linkBase
              }`}
            >
              {t(`nav.${key === "chords" ? "chordsLibrary" : key}`)}
            </Link>
          ))}
        </div>

        {/* Dil butonu + hamburger */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((o) => !o)}
            className={`lg:hidden p-2 rounded-full min-w-[44px] min-h-[44px] flex items-center justify-center ${hamburgerClass}`}
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

          <button
            type="button"
            onClick={toggleLanguage}
            className={`flex items-center gap-1.5 px-2 py-2 rounded-full transition-colors ${langBtnClass}`}
            aria-label={i18n.language === "en" ? "Türkçe'ye geç" : "Switch to English"}
          >
            <span className="material-icons-round text-xl sm:text-2xl">language</span>
            <span className="hidden lg:inline text-xs font-semibold uppercase tabular-nums">
              {i18n.language === "en" ? "EN" : "TR"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 z-50 shadow-lg overflow-hidden transition-[max-height,opacity] duration-200 ease-out ${mobileMenuBg} ${
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
