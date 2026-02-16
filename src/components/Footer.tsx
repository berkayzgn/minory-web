import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const INSTAGRAM_URL = "https://www.instagram.com/minorystudio";
const CONTACT_EMAIL = "mailto:zgn.studio@outlook.com";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-neutral-100 dark:bg-neutral-900/50 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 mb-4">
          {t("footer.copyright")}
        </p>
        <nav className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm">
          <Link
            to="/privacy"
            className="text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary transition-colors"
          >
            {t("footer.privacy")}
          </Link>
          <span className="text-neutral-400 dark:text-neutral-500" aria-hidden="true">·</span>
          <a
            href="#terms"
            className="text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary transition-colors"
          >
            {t("footer.terms")}
          </a>
          <span className="text-neutral-400 dark:text-neutral-500" aria-hidden="true">·</span>
          <a
            href={CONTACT_EMAIL}
            className="text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary transition-colors"
          >
            {t("footer.contact")}
          </a>
          <span className="text-neutral-400 dark:text-neutral-500" aria-hidden="true">·</span>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary transition-colors"
          >
            {t("footer.instagram")}
          </a>
        </nav>
      </div>
    </footer>
  );
}
