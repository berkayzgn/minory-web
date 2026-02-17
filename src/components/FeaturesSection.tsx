import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FEATURES, featureImages } from "../constants/features";
import ScrollReveal from "./ScrollReveal";
import { PhoneHero } from "./PhoneHero";

export function FeaturesSection() {
  const { t } = useTranslation();

  return (
    <section
      id="features"
      className="flex-grow pt-14 pb-24 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark overflow-hidden"
      aria-labelledby="features-heading"
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
              as="h2"
              id="features-heading"
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
            {FEATURES.map(({ key, path, icon }) => (
              <Link
                key={key}
                id={`feature-${key}`}
                to={path}
                className="feature-card group/card relative bg-surface-light dark:bg-surface-dark rounded-2xl overflow-hidden shadow-soft border border-neutral-200 dark:border-neutral-800 flex flex-col h-[500px] cursor-pointer"
                aria-label={`${t(`featuresSection.${key}.title`)} — ${t(`featuresSection.${key}.learnMore`)}`}
              >
                <div className="p-8 lg:p-10 flex flex-col h-full relative z-20 max-w-[50%] min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                    <span className="material-icons-round text-2xl">{icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">
                    {t(`featuresSection.${key}.title`)}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6 whitespace-pre-line max-w-[260px]">
                    {t(`featuresSection.${key}.desc`)}
                  </p>
                  <span className="inline-flex items-center text-primary font-semibold group-hover/card:text-primary-900 dark:group-hover/card:text-primary-100 transition-colors mt-auto mb-8 w-fit">
                    {t(`featuresSection.${key}.learnMore`)}{" "}
                    <span className="material-icons-round text-sm ml-1">arrow_forward</span>
                  </span>
                </div>
                {/* Phone mockup - aynı model, sadece iç görsel kart özelliğine göre */}
                <div className="absolute bottom-0 right-0 w-3/4 md:w-2/3 h-2/3 flex items-end justify-end pr-2 pb-2 md:pr-4 md:pb-4 z-0 origin-bottom-right transition-transform duration-300 ease-out group-hover/card:scale-105">
                  <PhoneHero variant="card" src={featureImages[key]} alt="" imagePosition={key === "metronome" ? "50% -18%" : undefined} />
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 flex justify-center">
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl py-5 px-6 md:py-6 md:px-8 shadow-sm border border-neutral-200 dark:border-neutral-800 text-center w-full max-w-4xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
              <div className="relative z-10 flex flex-col items-center gap-3 md:gap-4">
                <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white">
                  {t("featuresSection.ctaTitle")}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base max-w-xl mx-auto leading-snug">
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
                      className="h-28 sm:h-32 md:h-36 w-auto"
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
  );
}
