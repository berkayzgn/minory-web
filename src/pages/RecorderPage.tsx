import { useTranslation } from "react-i18next";
import { PageLayout } from "../components/layout/PageLayout";
import { Container } from "../components/ui/Container";
import { PhoneHero } from "../components/PhoneHero";
import { SEOHead } from "../components/SEOHead";
import { useSetPageAccent } from "../hooks/useSetPageAccent";

export function RecorderPage() {
  const { t } = useTranslation();
  useSetPageAccent("#6C1FDE");

  return (
    <PageLayout>
      <main id="main-content" className="relative flex-grow flex items-center py-32 overflow-hidden pt-28 sm:pt-32">
        <SEOHead
          title="Practice Recorder for Musicians | Minory"
          description="Record your practice sessions with Minory's built-in recorder. Capture your playing, review your progress and share recordings instantly."
          url="https://minory.studio/recorder"
        />
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl -z-10" />

        <Container fullWidth>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Content */}
            <div className="space-y-12 order-2 lg:order-1">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20">
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                  <span className="text-xs font-bold tracking-widest text-white uppercase">{t("pages.recorder.badge")}</span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold leading-[1.1] text-white tracking-tight">
                  {t("pages.recorder.title1")}
                  <br />
                  <span className="text-white/95">{t("pages.recorder.title2")}</span>
                </h1>
                <p className="text-xl text-white/95 leading-relaxed max-w-lg font-light">
                  {t("pages.recorder.desc")}
                </p>
              </div>

              <div className="grid gap-10">
                <div className="flex gap-5 items-start">
                  <div className="w-12 h-12 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
                    <span className="material-icons-round text-red-400 text-2xl">mic</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{t("pages.recorder.highQuality")}</h3>
                    <p className="text-white/85 leading-relaxed">
                      {t("pages.recorder.highQualityDesc")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-5 items-start">
                  <div className="w-12 h-12 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
                    <span className="material-icons-round text-white text-2xl">queue_music</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{t("pages.recorder.practiceSync")}</h3>
                    <p className="text-white/85 leading-relaxed">
                      {t("pages.recorder.practiceSyncDesc")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-5 items-start">
                  <div className="w-12 h-12 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
                    <span className="material-icons-round text-white text-2xl">share</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{t("pages.recorder.saveShare")}</h3>
                    <p className="text-white/85 leading-relaxed">
                      {t("pages.recorder.saveShareDesc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Phone mockup */}
            <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="absolute inset-0 bg-white/10 blur-[100px] rounded-full scale-75 lg:translate-x-12 -z-10" />
              <PhoneHero src="/recorder.png" alt="Minory Recorder" className="z-10" />
            </div>
          </div>
        </Container>
      </main>
    </PageLayout>
  );
}
