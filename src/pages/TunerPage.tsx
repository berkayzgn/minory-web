import { useTranslation } from "react-i18next";
import { PageLayout } from "../components/layout/PageLayout";
import { Container } from "../components/ui/Container";
import { PhoneHero } from "../components/PhoneHero";
import { SEOHead } from "../components/SEOHead";
import { useSetPageAccent } from "../hooks/useSetPageAccent";

export function TunerPage() {
  const { t } = useTranslation();
  useSetPageAccent("#6C1FDE");

  return (
    <PageLayout>
      <main id="main-content" className="relative flex-grow flex items-center py-24 overflow-hidden pt-28 sm:pt-32">
        <SEOHead
          title="Online Guitar Tuner – Tune Your Guitar Instantly | Minory"
          description="Use Minory's precision online guitar tuner for fast, accurate tuning with real-time pitch detection and cent-accurate feedback."
          url="https://minory.studio/tuner"
        />
        {/* Subtle white glows */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl -z-10" />

        <Container fullWidth>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Phone mockup */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl scale-90 translate-y-8 -z-10 opacity-60" />
              <PhoneHero src="/tuner.png" alt="Minory Tuner" imagePosition="50% 40%" />
            </div>

            {/* Right: Text content */}
            <div className="order-1 lg:order-2 flex flex-col justify-center space-y-8">
              <div>
                <div className="inline-flex items-center space-x-2 bg-white/15 px-3 py-1 rounded-full mb-6 border border-white/20">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-xs font-bold text-white tracking-widest uppercase">{t("pages.tuner.studioTools")}</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
                  {t("pages.tuner.title1")} <br />
                  <span className="text-white/80">{t("pages.tuner.title2")}</span>
                </h1>
                <p className="text-lg text-white/95 leading-relaxed max-w-lg">
                  {t("pages.tuner.desc")}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center border border-white/20">
                    <span className="material-icons-round text-white text-2xl">speed</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{t("pages.tuner.instantResponse")}</h3>
                    <p className="text-sm text-white/85">
                      {t("pages.tuner.instantResponseDesc")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center border border-white/20">
                    <span className="material-icons-round text-white text-2xl">dark_mode</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{t("pages.tuner.darkMode")}</h3>
                    <p className="text-sm text-white/85">
                      {t("pages.tuner.darkModeDesc")}
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
