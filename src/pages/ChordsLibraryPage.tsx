import { useTranslation } from "react-i18next";
import { PageLayout } from "../components/layout/PageLayout";
import { Container } from "../components/ui/Container";
import { PhoneHero } from "../components/PhoneHero";

export function ChordsLibraryPage() {
  const { t } = useTranslation();
  return (
    <PageLayout>
      <main id="main-content" className="relative flex-grow flex items-center py-24 overflow-hidden pt-28 sm:pt-32">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10 dark:bg-primary/10" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl -z-10 dark:bg-indigo-500/10" />

        <Container fullWidth>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: iPhone mockup - Chord Library app */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-2xl scale-90 translate-y-8 -z-10 opacity-60" />
              <PhoneHero src="/chords-dark.PNG" alt="Minory Chord Library" />
            </div>

            {/* Right: Text content */}
            <div className="order-1 lg:order-2 flex flex-col justify-center space-y-8">
              <div>
                <div className="inline-flex items-center space-x-2 bg-primary/5 dark:bg-primary/20 px-3 py-1 rounded-full mb-6">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-bold text-primary tracking-widest uppercase">{t("pages.chords.studioTools")}</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 dark:text-white leading-[1.1] mb-6">
                  {t("pages.chords.title1")}
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">{t("pages.chords.title2")}</span>
                </h1>
                <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-lg">
                  {t("pages.chords.desc")}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-surface-light dark:bg-white/5 flex items-center justify-center border border-neutral-200 dark:border-white/10">
                    <span className="material-icons-round text-primary text-2xl">library_music</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">{t("pages.chords.voicings")}</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      {t("pages.chords.voicingsDesc")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-surface-light dark:bg-white/5 flex items-center justify-center border border-neutral-200 dark:border-white/10">
                    <span className="material-icons-round text-primary text-2xl">offline_bolt</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">{t("pages.chords.offline")}</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      {t("pages.chords.offlineDesc")}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </Container>
      </main>
    </PageLayout>
  );
}
