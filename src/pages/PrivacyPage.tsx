import { useTranslation } from "react-i18next";
import { PageLayout } from "../components/layout/PageLayout";
import { Container } from "../components/ui/Container";

export function PrivacyPage() {
  const { t } = useTranslation();
  return (
    <PageLayout>
      <main id="main-content" className="flex-grow relative">
        <header className="pt-28 sm:pt-32 pb-12 sm:pb-16 bg-surface-light dark:bg-surface-dark border-b border-neutral-200 dark:border-neutral-800">
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4 tracking-tight">
                {t("pages.privacy.title")}
              </h1>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
                {t("pages.privacy.lastUpdated")}
              </p>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 font-light mb-4">
                {t("pages.privacy.intro")}
              </p>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 font-light">
                {t("pages.privacy.intro2")}
              </p>
            </div>
          </Container>
        </header>

        <Container className="py-12 sm:py-16">
          <div className="max-w-3xl mx-auto space-y-14">
            {/* 1. Information Stored on Your Device */}
            <section className="scroll-mt-32" id="storage">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                {t("pages.privacy.s1Title")}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                {t("pages.privacy.s1Body")}
              </p>
              <p className="text-neutral-700 dark:text-neutral-200 font-medium mb-2">
                {t("pages.privacy.s1ListTitle")}
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-neutral-600 dark:text-neutral-300">
                <li>{t("pages.privacy.s1Item1")}</li>
                <li>{t("pages.privacy.s1Item2")}</li>
                <li>{t("pages.privacy.s1Item3")}</li>
              </ul>
            </section>

            {/* 2. Analytics */}
            <section className="scroll-mt-32" id="analytics">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                {t("pages.privacy.s2Title")}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                {t("pages.privacy.s2Body")}
              </p>
              <ul className="list-disc list-inside space-y-1 text-neutral-600 dark:text-neutral-300 mb-4">
                <li>{t("pages.privacy.s2Bullet1")}</li>
                <li>{t("pages.privacy.s2Bullet2")}</li>
                <li>{t("pages.privacy.s2Bullet3")}</li>
              </ul>
              <p className="text-neutral-700 dark:text-neutral-200 font-medium mb-2">
                {t("pages.privacy.s2ListTitle")}
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-neutral-600 dark:text-neutral-300 mb-4">
                <li>{t("pages.privacy.s2Item1")}</li>
                <li>{t("pages.privacy.s2Item2")}</li>
                <li>{t("pages.privacy.s2Item3")}</li>
              </ul>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-sm">
                {t("pages.privacy.s2Note")}
              </p>
            </section>

            {/* 3. Advertising */}
            <section className="scroll-mt-32" id="advertising">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                {t("pages.privacy.s3Title")}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                {t("pages.privacy.s3Body")}
              </p>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-2">
                {t("pages.privacy.s3LinkText")}
              </p>
              <a
                href={t("pages.privacy.s3Url")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:underline block mb-4 break-all"
              >
                {t("pages.privacy.s3Url")}
              </a>
              <p className="text-neutral-700 dark:text-neutral-200 font-medium mb-2">
                {t("pages.privacy.s3ListTitle")}
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-neutral-600 dark:text-neutral-300">
                <li>{t("pages.privacy.s3Item1")}</li>
                <li>{t("pages.privacy.s3Item2")}</li>
                <li>{t("pages.privacy.s3Item3")}</li>
                <li>{t("pages.privacy.s3Item4")}</li>
              </ul>
            </section>

            {/* 4. Accounts */}
            <section className="scroll-mt-32" id="accounts">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                {t("pages.privacy.s4Title")}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {t("pages.privacy.s4Body")}
              </p>
            </section>

            {/* 5. Data Deletion */}
            <section className="scroll-mt-32" id="deletion">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                {t("pages.privacy.s5Title")}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                {t("pages.privacy.s5Body1")}
              </p>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {t("pages.privacy.s5Body2")}
              </p>
            </section>

            {/* 6. Contact */}
            <section className="scroll-mt-32 pt-8 border-t border-neutral-200 dark:border-neutral-800" id="contact">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                {t("pages.privacy.s6Title")}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                {t("pages.privacy.s6Body")}
              </p>
              <a
                className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/90 transition-colors"
                href={`mailto:${t("pages.privacy.contactEmail")}`}
              >
                <span className="material-icons-round text-xl">mail</span>
                {t("pages.privacy.contactEmail")}
              </a>
            </section>
          </div>
        </Container>
      </main>
    </PageLayout>
  );
}
