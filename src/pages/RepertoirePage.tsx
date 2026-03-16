import { useTranslation } from "react-i18next";
import { PageLayout } from "../components/layout/PageLayout";
import { Container } from "../components/ui/Container";
import { PhoneHero } from "../components/PhoneHero";
import { SEOHead } from "../components/SEOHead";

export function RepertoirePage() {
  const { t } = useTranslation();
  return (
    <PageLayout wrapperClassName="selection:bg-primary/30 selection:text-primary">
      <main id="main-content" className="relative w-full py-24 lg:py-32 overflow-hidden pt-28 sm:pt-32 flex-grow">
        <SEOHead
          title="Song Practice & Repertoire Tools for Musicians | Minory"
          description="Organize your songs, chord sheets and setlists with Minory's practice tools. Create, edit, transpose and share your repertoire from one app."
          url="https://minory.studio/repertoire"
        />
        <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/4" />

        <Container>
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            {/* Left: Content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-8 order-2 lg:order-1">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-primary/5 dark:bg-primary/20 px-3 py-1 rounded-full mb-6">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-bold text-primary tracking-widest uppercase">{t("pages.repertoire.badge")}</span>
                </div>
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-neutral-900 dark:text-white leading-[1.1]">
                  {t("pages.repertoire.title1")}
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">{t("pages.repertoire.title2")}</span>
                </h1>
                <p className="text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed max-w-xl">
                  {t("pages.repertoire.desc")}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  { titleKey: "pages.repertoire.feature1Title", descKey: "pages.repertoire.feature1Desc" },
                  { titleKey: "pages.repertoire.feature2Title", descKey: "pages.repertoire.feature2Desc" },
                  { titleKey: "pages.repertoire.feature3Title", descKey: "pages.repertoire.feature3Desc" },
                  { titleKey: "pages.repertoire.feature4Title", descKey: "pages.repertoire.feature4Desc" },
                ].map((item) => (
                  <div key={item.titleKey} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <span className="material-icons-round text-primary text-sm font-bold">check</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-900 dark:text-white">{t(item.titleKey)}</h4>
                      <p className="text-sm text-neutral-500">{t(item.descKey)}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Right: Phone mockup */}
            <div className="w-full lg:w-1/2 relative order-1 lg:order-2 flex justify-center lg:justify-end perspective-1000">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl opacity-60 scale-75 -z-10" />
              <PhoneHero src="/repertoire-light.png" alt="Minory Repertoire" className="z-10" />
            </div>
          </div>
        </Container>

        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-800 to-transparent" />
      </main>
    </PageLayout>
  );
}
