import { useTranslation } from "react-i18next";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { PhoneHero } from "../components/PhoneHero";

export function MetronomePage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-neutral-800 dark:text-neutral-200 antialiased flex flex-col selection:bg-primary/30">
      <Navbar />
      <section className="relative flex-grow flex items-center justify-center py-32 overflow-hidden pt-28 sm:pt-32">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 translate-x-[-50%]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -z-10 translate-x-[20%] translate-y-[20%]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Content */}
            <div className="space-y-12 order-2 lg:order-1">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-bold tracking-widest text-primary uppercase">{t("pages.metronome.badge")}</span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold leading-[1.1] text-neutral-900 dark:text-white tracking-tight">
                  {t("pages.metronome.title1")}
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">{t("pages.metronome.title2")}</span>
                </h1>
                <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-lg font-light">
                  {t("pages.metronome.desc")}
                </p>
              </div>

              <div className="grid gap-10">
                <div className="flex gap-5 items-start">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-neutral-800 shadow-sm border border-neutral-100 dark:border-neutral-700 flex items-center justify-center shrink-0">
                    <span className="material-icons-round text-primary text-2xl">touch_app</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">{t("pages.metronome.tactileBpm")}</h3>
                    <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">
                      {t("pages.metronome.tactileBpmDesc")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-5 items-start">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-neutral-800 shadow-sm border border-neutral-100 dark:border-neutral-700 flex items-center justify-center shrink-0">
                    <span className="material-icons-round text-primary text-2xl">visibility</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2 flex items-center gap-2">
                      {t("pages.metronome.glowMode")}
                      <span className="px-2 py-0.5 rounded text-[10px] bg-primary/10 text-primary font-bold uppercase tracking-wider">{t("pages.metronome.glowModeNew")}</span>
                    </h3>
                    <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">
                      {t("pages.metronome.glowModeDesc")}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right: Phone mockup */}
            <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-300/20 blur-[100px] rounded-full scale-75 lg:translate-x-12 -z-10" />
              <PhoneHero src="/metronome-light.PNG" alt="Minory Metronome" className="z-10" />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
