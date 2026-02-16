import { useState } from "react";
import { useTranslation } from "react-i18next";

const LANG_KEY = "minory-lang";

const navLinks = [
  { href: "#features", key: "nav.features" },
  { href: "#studio", key: "nav.studio" },
  { href: "#pricing", key: "nav.pricing" },
  { href: "#support", key: "nav.support" },
] as const;

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const next = i18n.language === "en" ? "tr" : "en";
    i18n.changeLanguage(next);
    localStorage.setItem(LANG_KEY, next);
  };

  return (
    <nav className="fixed w-full z-50 top-0 left-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-20 flex items-center justify-between">
        <a className="flex items-center gap-2 group shrink-0" href="#">
          <img
            src="/image.png"
            alt="Minory"
            className="w-9 h-9 sm:w-10 sm:h-10 object-contain group-hover:scale-105 transition-transform duration-300"
          />
          <span className="font-bold text-lg sm:text-xl tracking-tight text-neutral-900 dark:text-white">{t("nav.brand")}</span>
        </a>
        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(({ href, key }) => (
            <a
              key={key}
              className="text-base lg:text-lg font-medium text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary transition-colors"
              href={href}
            >
              {t(key)}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLanguage}
            className="p-2 rounded-full text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-primary transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center md:min-w-0 md:min-h-0"
            aria-label={i18n.language === "en" ? "Türkçe'ye geç" : "Switch to English"}
            title={i18n.language === "en" ? "Türkçe" : "English"}
          >
            <span className="material-icons-round text-xl sm:text-2xl">language</span>
            <span className="sr-only">{i18n.language === "en" ? "TR" : "EN"}</span>
          </button>
          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="md:hidden p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
          >
            <span className="material-icons-round text-2xl">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-background-light dark:bg-background-dark">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map(({ href, key }) => (
              <a
                key={key}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-neutral-600 dark:text-neutral-400 hover:text-primary hover:bg-neutral-100 dark:hover:bg-neutral-800 py-3 px-4 rounded-lg transition-colors"
              >
                {t(key)}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
