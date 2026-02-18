import { useTranslation } from "react-i18next";

export function HomeIntro() {
  const { t } = useTranslation();
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 lg:py-16 bg-background-light dark:bg-background-dark" aria-label="Introduction">
      <div className="max-w-3xl mx-auto space-y-6">
        <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
          {t("homeIntro.paragraph1")}
        </p>
        <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
          {t("homeIntro.paragraph2")}
        </p>
      </div>
    </section>
  );
}
