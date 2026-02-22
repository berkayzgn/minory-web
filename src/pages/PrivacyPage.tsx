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
            {/* Studio Tools in One Place */}
            <section className="scroll-mt-32" id="studio-tools">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                {t("pages.privacy.studioToolsTitle")}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                {t("pages.privacy.studioToolsIntro")}
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-neutral-600 dark:text-neutral-300 mb-4">
                <li>{t("pages.privacy.studioToolsTuner")}</li>
                <li>{t("pages.privacy.studioToolsMetronome")}</li>
                <li>{t("pages.privacy.studioToolsChords")}</li>
                <li>{t("pages.privacy.studioToolsRepertoire")}</li>
              </ul>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {t("pages.privacy.studioToolsOutro")}
              </p>
            </section>

            {/* Precision Tuner */}
            <section className="scroll-mt-32" id="tuner">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                {t("pages.privacy.tunerTitle")}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                {t("pages.privacy.tunerIntro")}
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-neutral-600 dark:text-neutral-300 mb-4">
                <li>{t("pages.privacy.tunerBullet1")}</li>
                <li>{t("pages.privacy.tunerBullet2")}</li>
                <li>{t("pages.privacy.tunerBullet3")}</li>
              </ul>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {t("pages.privacy.tunerOutro")}
              </p>
            </section>

            {/* Professional Metronome */}
            <section className="scroll-mt-32" id="metronome">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                {t("pages.privacy.metronomeTitle")}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                {t("pages.privacy.metronomeIntro")}
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-neutral-600 dark:text-neutral-300 mb-4">
                <li>{t("pages.privacy.metronomeBullet1")}</li>
                <li>{t("pages.privacy.metronomeBullet2")}</li>
                <li>{t("pages.privacy.metronomeBullet3")}</li>
                <li>{t("pages.privacy.metronomeBullet4")}</li>
                <li>{t("pages.privacy.metronomeBullet5")}</li>
              </ul>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {t("pages.privacy.metronomeOutro")}
              </p>
            </section>

            {/* Advanced Chord Library */}
            <section className="scroll-mt-32" id="chord-library">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                {t("pages.privacy.chordLibraryTitle")}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                {t("pages.privacy.chordLibraryIntro")}
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-neutral-600 dark:text-neutral-300 mb-4">
                <li>{t("pages.privacy.chordLibraryBullet1")}</li>
                <li>{t("pages.privacy.chordLibraryBullet2")}</li>
                <li>{t("pages.privacy.chordLibraryBullet3")}</li>
                <li>{t("pages.privacy.chordLibraryBullet4")}</li>
              </ul>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {t("pages.privacy.chordLibraryOutro")}
              </p>
            </section>

            {/* Repertoire Management */}
            <section className="scroll-mt-32" id="repertoire">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                {t("pages.privacy.repertoireTitle")}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                {t("pages.privacy.repertoireIntro")}
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-neutral-600 dark:text-neutral-300 mb-4">
                <li>{t("pages.privacy.repertoireBullet1")}</li>
                <li>{t("pages.privacy.repertoireBullet2")}</li>
                <li>{t("pages.privacy.repertoireBullet3")}</li>
                <li>{t("pages.privacy.repertoireBullet4")}</li>
              </ul>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {t("pages.privacy.repertoireOutro")}
              </p>
            </section>

            {/* Personalized Experience */}
            <section className="scroll-mt-32" id="personalized">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                {t("pages.privacy.personalizedTitle")}
              </h2>
              <ul className="list-disc list-inside space-y-1.5 text-neutral-600 dark:text-neutral-300">
                <li>{t("pages.privacy.personalizedBullet1")}</li>
                <li>{t("pages.privacy.personalizedBullet2")}</li>
                <li>{t("pages.privacy.personalizedBullet3")}</li>
              </ul>
            </section>

            {/* Privacy & Advertising */}
            <section className="scroll-mt-32" id="privacy-advertising">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                {t("pages.privacy.privacySectionTitle")}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                {t("pages.privacy.privacyP1")}
              </p>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                {t("pages.privacy.privacyP2")}
              </p>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {t("pages.privacy.privacyP3")}
              </p>
            </section>

            {/* Closing */}
            <section className="scroll-mt-32 pt-8 border-t border-neutral-200 dark:border-neutral-800" id="contact">
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
                {t("pages.privacy.closing")}
              </p>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                {t("pages.privacy.contactTitle")}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                {t("pages.privacy.contactBody")}
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
