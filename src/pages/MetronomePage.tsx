import { useTranslation } from "react-i18next";
import { PageLayout } from "../components/layout/PageLayout";
import { Container } from "../components/ui/Container";
import { PhoneHero } from "../components/PhoneHero";
import { SEOHead } from "../components/SEOHead";
import { useSetPageAccent } from "../hooks/useSetPageAccent";

export function MetronomePage() {
  const { t } = useTranslation();
  useSetPageAccent("#FEC802");

  return (
    <PageLayout>
      <main id="main-content" className="relative flex-grow flex items-center justify-center py-32 overflow-hidden pt-28 sm:pt-32">
        <SEOHead
          title="Smart Metronome for Musicians | Minory"
          description="Practice with Minory's smart metronome featuring tactile BPM control, visual glow mode and precise timing for serious musicians."
          url="https://minory.studio/metronome"
        />
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -z-10 translate-x-[-50%]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-black/10 rounded-full blur-3xl -z-10 translate-x-[20%] translate-y-[20%]" />

        <Container fullWidth>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Content */}
            <div className="space-y-12 order-2 lg:order-1">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-xs font-bold tracking-widest text-white uppercase">{t("pages.metronome.badge")}</span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold leading-[1.1] text-white tracking-tight">
                  {t("pages.metronome.title1")}
                  <br />
                  <span className="text-black/75">{t("pages.metronome.title2")}</span>
                </h1>
                <p className="text-xl text-black/75 leading-relaxed max-w-lg font-light">
                  {t("pages.metronome.desc")}
                </p>
              </div>

              <div className="grid gap-10">
                <div className="flex gap-5 items-start">
                  <div className="w-12 h-12 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
                    <span className="material-icons-round text-white text-2xl">touch_app</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{t("pages.metronome.tactileBpm")}</h3>
                    <p className="text-black/75 leading-relaxed">
                      {t("pages.metronome.tactileBpmDesc")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-5 items-start">
                  <div className="w-12 h-12 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
                    <span className="material-icons-round text-white text-2xl">visibility</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                      {t("pages.metronome.glowMode")}
                      <span className="px-2 py-0.5 rounded text-[10px] bg-black/15 text-white font-bold uppercase tracking-wider">{t("pages.metronome.glowModeNew")}</span>
                    </h3>
                    <p className="text-black/75 leading-relaxed">
                      {t("pages.metronome.glowModeDesc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Phone mockup */}
            <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="absolute inset-0 bg-white/10 blur-[100px] rounded-full scale-75 lg:translate-x-12 -z-10" />
              <PhoneHero src="/metronome.png" alt="Minory Metronome" className="z-10" imagePosition="50% 40%" />
            </div>
          </div>
        </Container>
      </main>
    </PageLayout>
  );
}
