import { useTranslation } from "react-i18next";
import ScrollReveal from "./ScrollReveal";

const features = [
  { key: "tuner", icon: "speed" },
  { key: "metronome", icon: "hourglass_empty" },
  { key: "chords", icon: "library_music" },
  { key: "repertoire", icon: "folder_special" },
] as const;

export function FeaturesSection() {
  const { t } = useTranslation();

  return (
    <main className="flex-grow">
      <section
        id="features"
        className="pt-14 pb-24 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <ScrollReveal
              as="h2"
              baseOpacity={0.1}
              enableBlur
              baseRotation={3}
              blurStrength={4}
              containerClassName="mb-3"
              textClassName="text-primary font-bold tracking-wide uppercase text-sm"
              rotationEnd="top 35%"
              wordAnimationEnd="top 35%"
            >
              {t("featuresSection.eyebrow")}
            </ScrollReveal>
            <ScrollReveal
              as="h1"
              baseOpacity={0.1}
              enableBlur
              baseRotation={3}
              blurStrength={4}
              containerClassName="mb-6"
              textClassName="text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-white leading-tight"
              rotationEnd="top 35%"
              wordAnimationEnd="top 35%"
            >
              {`${t("featuresSection.title")} ${t("featuresSection.titleBreak")}`}
            </ScrollReveal>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {features.map(({ key, icon }) => (
              <div
                key={key}
                id={`feature-${key}`}
                className="feature-card relative bg-surface-light dark:bg-surface-dark rounded-2xl overflow-hidden shadow-soft border border-neutral-200 dark:border-neutral-800 flex flex-col h-[500px]"
              >
                <div className="p-8 lg:p-10 flex flex-col h-full z-10 relative">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                    <span className="material-icons-round text-2xl">{icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">
                    {t(`featuresSection.${key}.title`)}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-sm">
                    {t(`featuresSection.${key}.desc`)}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center text-primary font-semibold hover:text-primary-900 dark:hover:text-primary-100 transition-colors mt-auto mb-8 w-fit"
                  >
                    {t(`featuresSection.${key}.learnMore`)}{" "}
                    <span className="material-icons-round text-sm ml-1">arrow_forward</span>
                  </a>
                </div>
                {/* Phone mockup */}
                <div className="absolute bottom-0 right-0 w-3/4 md:w-2/3 h-2/3 flex items-end justify-end pr-2 pb-2 md:pr-4 md:pb-4">
                  <div className="relative w-[130px] h-[260px] sm:w-[160px] sm:h-[320px] md:w-[200px] md:h-[400px] rounded-[1.5rem] sm:rounded-[2rem] bg-black border-[3px] sm:border-4 border-black shadow-2xl overflow-hidden flex-shrink-0">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 h-2.5 w-8 sm:h-3 sm:w-10 bg-black rounded-b-md z-10" />
                    <img
                      src="/IMG_1813.PNG"
                      alt=""
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 flex justify-center">
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-8 md:p-12 shadow-sm border border-neutral-200 dark:border-neutral-800 text-center w-full max-w-4xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                  {t("featuresSection.ctaTitle")}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-xl mx-auto">
                  {t("featuresSection.ctaSubtitle")}
                </p>
                <div className="flex justify-center">
                  <a
                    href="#"
                    className="inline-block hover:opacity-90 transition-opacity [&>img]:block"
                  >
                    <img
                      src="/download-on-the-app-store-apple-logo.svg"
                      alt={t("featuresSection.ctaDownload")}
                      width={540}
                      height={540}
                      className="h-24 sm:h-28 md:h-32 w-auto"
                    />
                  </a>
                </div>
              </div>
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors pointer-events-none" />
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors pointer-events-none" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
