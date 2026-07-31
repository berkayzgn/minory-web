import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  APP_STORE_URL,
  GOOGLE_PLAY_URL,
  APP_STORE_BADGE,
  GOOGLE_PLAY_BADGE,
} from "../constants/storeLinks";

/** Görsel yüklenirse ekranı kaplar, yoksa/404 ise arka plandaki mock arayüz görünür */
function PhoneScreenImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  if (!src || error) return null;
  return (
    <img
      src={src}
      alt={alt}
      className={`${className ?? ""} ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300 z-10`}
      onLoad={() => setLoaded(true)}
      onError={() => setError(true)}
    />
  );
}

/** Telefon ekranı görselleri: public altındaki dosyalar */
const HERO_PHONE_LIGHT_IMAGE = "/homepage.png";
const HERO_PHONE_DARK_IMAGE = "/homepage-dark.png";

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative isolate pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20 lg:pb-32 overflow-x-clip min-h-[100dvh] flex flex-col justify-center">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-10 left-10 sm:top-20 sm:left-20 w-48 h-48 sm:w-96 sm:h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 sm:bottom-20 sm:right-20 w-[280px] h-[280px] sm:w-[500px] sm:h-[500px] bg-primary/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-12 xl:gap-16">
        {/* Sol: metin + CTA */}
        <div className="lg:flex-1 text-left max-w-xl pt-2 sm:pt-4 lg:pt-0 min-w-0 w-full">
          <h1 className="text-[clamp(2rem,4vw+0.5rem,3.75rem)] font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.15] text-neutral-900 dark:text-white">
            {t("hero.subtitle1")}
          </h1>
          <p className="text-[clamp(1rem,1.5vw+0.5rem,1.25rem)] text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed mb-4">
            {t("featuresSection.subtitle")}
          </p>
          <p className="text-[clamp(1rem,1.5vw+0.5rem,1.25rem)] text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed mb-6">
            {t("hero.subtitle2")}
          </p>
          <div className="flex w-full lg:w-auto justify-center lg:justify-start text-black dark:text-black mt-2">
            <div className="w-[clamp(4rem,14vw,9rem)] h-[clamp(4rem,14vw,9rem)] overflow-hidden rounded-full flex-shrink-0">
              <img
                src="/image.png"
                alt="Minory Studio"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mt-5 sm:mt-6">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:opacity-90 transition-opacity"
            >
              <img
                src={APP_STORE_BADGE}
                alt={t("hero.ctaAppStore")}
                className="block h-11 sm:h-12 w-auto"
              />
            </a>
            <a
              href={GOOGLE_PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:opacity-90 transition-opacity"
            >
              <img
                src={GOOGLE_PLAY_BADGE}
                alt={t("hero.ctaGooglePlay")}
                className="block h-11 sm:h-12 w-auto"
              />
            </a>
          </div>
        </div>

        {/* Sağ: Telefon mock'ları — sabit tasarım boyutu, viewport ile orantılı ölçeklenir */}
        <div className="lg:flex-1 w-full min-w-0 flex justify-center lg:justify-end">
          <div className="hero-phones-viewport">
            <div className="hero-phones-stage">
              <div className="absolute inset-0 pointer-events-none lg:pointer-events-auto">
          {/* Back Phone (Dark Mode) — konum left/top ile: float animasyonu transform'u ezdiği için translate kullanılamaz */}
          <div className="absolute z-10 left-4 top-16 w-[220px] rounded-[2.5rem] bg-black border-[6px] border-black hero-phone-shadow animate-float-back overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-20 bg-black rounded-b-xl z-20" />
            <div className="w-full h-[500px] bg-neutral-900 relative">
              <PhoneScreenImage src={HERO_PHONE_DARK_IMAGE} alt="Minory Studio dark" className="absolute inset-0 w-full h-full object-cover object-top" />
              <div className="absolute inset-0 overflow-y-auto z-0">
                <div className="p-6 pt-12 flex justify-between items-center text-white">
                  <span className="material-icons-round text-neutral-400">menu</span>
                  <span className="font-bold text-lg">{t("hero.phoneBack.studioMix")}</span>
                  <span className="material-icons-round text-primary">equalizer</span>
                </div>
                <div className="px-6 py-4 space-y-4">
                  <div className="h-32 rounded-xl bg-gradient-to-r from-neutral-800 to-neutral-800/50 p-4 relative overflow-hidden group">
                    <div className="absolute bottom-0 left-0 right-0 h-16 flex items-end justify-between px-2 gap-1 opacity-50">
                      {[4, 8, 12, 6, 10, 14, 8, 3, 6, 12, 4].map((h, i) => (
                        <div key={i} className="w-1 bg-primary rounded-full" style={{ height: `${h * 2}px` }} />
                      ))}
                    </div>
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary/10 to-transparent opacity-20" />
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-8">
                    <div className="aspect-square rounded-2xl bg-neutral-800 flex flex-col items-center justify-center text-neutral-400 hover:bg-neutral-700 hover:text-white transition-colors">
                      <span className="material-icons-round text-3xl mb-1">tune</span>
                      <span className="text-xs font-medium">{t("hero.phoneBack.eq")}</span>
                    </div>
                    <div className="aspect-square rounded-2xl bg-primary flex flex-col items-center justify-center text-white shadow-lg shadow-primary/30">
                      <span className="material-icons-round text-3xl mb-1">mic</span>
                      <span className="text-xs font-medium">{t("hero.phoneBack.rec")}</span>
                    </div>
                    <div className="aspect-square rounded-2xl bg-neutral-800 flex flex-col items-center justify-center text-neutral-400 hover:bg-neutral-700 hover:text-white transition-colors">
                      <span className="material-icons-round text-3xl mb-1">piano</span>
                      <span className="text-xs font-medium">{t("hero.phoneBack.keys")}</span>
                    </div>
                  </div>
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center p-3 rounded-xl bg-neutral-800/50">
                      <div className="w-10 h-10 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center mr-3">
                        <span className="material-icons-round">music_note</span>
                      </div>
                      <div className="flex-1">
                        <div className="h-2 w-24 bg-neutral-700 rounded mb-1.5" />
                        <div className="h-1.5 w-16 bg-neutral-800 rounded" />
                      </div>
                    </div>
                    <div className="flex items-center p-3 rounded-xl bg-neutral-800/50">
                      <div className="w-10 h-10 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center mr-3">
                        <span className="material-icons-round">graphic_eq</span>
                      </div>
                      <div className="flex-1">
                        <div className="h-2 w-28 bg-neutral-700 rounded mb-1.5" />
                        <div className="h-1.5 w-20 bg-neutral-800 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Front Phone (Light Mode) */}
          <div className="absolute z-20 left-[156px] top-1 w-[260px] rounded-[2.5rem] bg-black border-[6px] border-black hero-phone-shadow animate-float-front overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-20 bg-black rounded-b-xl z-20" />
            <div className="w-full h-[560px] bg-background-light relative">
              <PhoneScreenImage src={HERO_PHONE_LIGHT_IMAGE} alt="Minory Studio light" className="absolute inset-0 w-full h-full object-cover object-top" />
              <div className="absolute inset-0 overflow-y-auto z-0">
              <div className="p-6 pt-12">
                <h2 className="text-2xl font-bold text-neutral-900 mb-1">{t("hero.phoneFront.myProjects")}</h2>
                <p className="text-sm text-neutral-500">{t("hero.phoneFront.activeSessions")}</p>
              </div>
              <div className="mx-6 p-5 bg-white rounded-2xl shadow-lg border border-neutral-100 mb-6 relative overflow-hidden">
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <span className="material-icons-round">play_arrow</span>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">{t("hero.phoneFront.live")}</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 relative z-10">{t("hero.phoneFront.projectName")}</h3>
                <p className="text-sm text-neutral-500 mb-4 relative z-10">{t("hero.phoneFront.projectMeta")}</p>
                <div className="h-12 flex items-end gap-1 mb-2">
                  {[40, 70, 100, 50, 30, 80, 60, 40, 90].map((pct, i) => (
                    <div key={i} className="w-1.5 bg-primary/80 rounded-sm" style={{ height: `${pct}%` }} />
                  ))}
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10 rounded-bl-full pointer-events-none bg-gradient-to-br from-primary to-pink-500" />
              </div>
              <div className="px-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-neutral-800">{t("hero.phoneFront.tools")}</h4>
                  <span className="text-xs font-semibold text-primary">{t("hero.phoneFront.seeAll")}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: "metronome", color: "text-orange-500", titleKey: "hero.phoneFront.metronome", descKey: "hero.phoneFront.metronomeDesc" },
                    { icon: "settings_input_component", color: "text-blue-500", titleKey: "hero.phoneFront.tuner", descKey: "hero.phoneFront.tunerDesc" },
                    { icon: "library_music", color: "text-purple-500", titleKey: "hero.phoneFront.chords", descKey: "hero.phoneFront.chordsDesc" },
                    { icon: "album", color: "text-teal-500", titleKey: "hero.phoneFront.drums", descKey: "hero.phoneFront.drumsDesc" },
                  ].map((tool) => (
                    <div key={tool.titleKey} className="bg-white p-4 rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
                      <span className={`material-icons-round ${tool.color} mb-2 text-2xl`}>{tool.icon}</span>
                      <div className="font-bold text-sm text-neutral-900">{t(tool.titleKey)}</div>
                      <div className="text-xs text-neutral-500">{t(tool.descKey)}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-20 bg-white border-t border-neutral-100 flex justify-around items-center px-6 pb-4">
                <div className="flex flex-col items-center text-primary">
                  <span className="material-icons-round">home</span>
                </div>
                <div className="flex flex-col items-center text-neutral-400">
                  <span className="material-icons-round">search</span>
                </div>
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center -mt-6 shadow-lg shadow-primary/40">
                  <span className="material-icons-round">add</span>
                </div>
                <div className="flex flex-col items-center text-neutral-400">
                  <span className="material-icons-round">folder</span>
                </div>
                <div className="flex flex-col items-center text-neutral-400">
                  <span className="material-icons-round">person</span>
                </div>
              </div>
              </div>
            </div>
          </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
