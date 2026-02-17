import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TextType from "./TextType";

const LANG_KEY = "minory-lang";

export function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const toggleLanguage = () => {
    const next = i18n.language === "en" ? "tr" : "en";
    i18n.changeLanguage(next);
    localStorage.setItem(LANG_KEY, next);
  };

  return (
    <nav className="fixed w-full z-50 top-0 left-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-20 flex items-center justify-between relative">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/image.png"
            alt="Minory"
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
        <div className="hidden sm:flex items-center justify-center gap-1 sm:gap-3 absolute left-1/2 -translate-x-1/2">
          <Link
            to="/"
            className={`inline-flex text-sm font-medium transition-colors py-2 px-2 ${
              location.pathname === "/"
                ? "text-primary font-semibold"
                : "text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary"
            }`}
          >
            {t("nav.home")}
          </Link>
          <Link
            to="/metronome"
            className={`inline-flex text-sm font-medium transition-colors py-2 px-2 ${
              location.pathname === "/metronome"
                ? "text-primary font-semibold"
                : "text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary"
            }`}
          >
            {t("nav.metronome")}
          </Link>
          <Link
            to="/tuner"
            className={`inline-flex text-sm font-medium transition-colors py-2 px-2 ${
              location.pathname === "/tuner"
                ? "text-primary font-semibold"
                : "text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary"
            }`}
          >
            {t("nav.tuner")}
          </Link>
          <Link
            to="/repertoire"
            className={`inline-flex text-sm font-medium transition-colors py-2 px-2 ${
              location.pathname === "/repertoire"
                ? "text-primary font-semibold"
                : "text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary"
            }`}
          >
            {t("nav.repertoire")}
          </Link>
          <Link
            to="/chords"
            className={`inline-flex text-sm font-medium transition-colors py-2 px-2 ${
              location.pathname === "/chords"
                ? "text-primary font-semibold"
                : "text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary"
            }`}
          >
            {t("nav.chordsLibrary")}
          </Link>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tabular-nums">
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
      </div>
    </nav>
  );
}
