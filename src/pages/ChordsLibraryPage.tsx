import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AppCta, ChordPill } from "../components/chords/ChordUI";
import { PageLayout } from "../components/layout/PageLayout";
import { PhoneHero } from "../components/PhoneHero";
import { SEOHead } from "../components/SEOHead";
import { Container } from "../components/ui/Container";
import { explorerEntryPath } from "../constants/chordRoutes";
import {
  chordsForInstrument,
  findChord,
  INSTRUMENTS,
  type ChordEntry,
  type Locale,
} from "../data/chords/catalog";
import { useRouteLocale } from "../hooks/useRouteLocale";
import { chordsHubSeo } from "../seo/chordSeo";

/** Yeni başlayanların en çok aradığı akorlar — hub'dan derin sayfalara giriş */
const POPULAR_GUITAR_SLUGS = [
  "c-major",
  "g-major",
  "d-major",
  "a-major",
  "e-major",
  "f-major",
  "a-minor",
  "e-minor",
  "d-minor",
  "b-minor",
  "g-7",
  "c-maj7",
];

const T = {
  en: {
    browse: "Browse the library",
    browseDesc: (total: number) =>
      `${total} chords for guitar, ukulele and piano — with fingering diagrams, the notes in each chord and alternate positions.`,
    popular: "Most searched chords",
    open: "Open the chord library",
  },
  tr: {
    browse: "Kütüphaneyi gez",
    browseDesc: (total: number) =>
      `Gitar, ukulele ve piyano için ${total} akor — basış diyagramları, akorun notaları ve alternatif pozisyonlarla birlikte.`,
    popular: "En çok aranan akorlar",
    open: "Akor kütüphanesini aç",
  },
} as const;

export function ChordsLibraryPage({ locale = "en" }: { locale?: Locale }) {
  const { t: tr } = useTranslation();
  useRouteLocale(locale);

  const t = T[locale];
  const meta = chordsHubSeo(locale);

  const totalChords = INSTRUMENTS.reduce(
    (sum, i) => sum + chordsForInstrument(i.id).length,
    0,
  );

  const popular = POPULAR_GUITAR_SLUGS.map((slug) =>
    findChord("guitar", slug),
  ).filter((e): e is ChordEntry => e !== null);

  return (
    <PageLayout>
      <SEOHead meta={meta} />

      {/* --- Mevcut tanıtım bölümü --- */}
      <main id="main-content" className="relative flex-grow py-24 overflow-hidden pt-28 sm:pt-32">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-black/5 rounded-full blur-3xl -z-10" />

        <Container fullWidth>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Sol: telefon görseli */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl scale-90 translate-y-8 -z-10 opacity-60" />
              <PhoneHero src="/chords.png" alt="Minory Chord Library" />
            </div>

            {/* Sağ: metin */}
            <div className="order-1 lg:order-2 flex flex-col justify-center space-y-8">
              <div>
                <div className="inline-flex items-center space-x-2 bg-white/15 px-3 py-1 rounded-full mb-6 border border-white/20">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-xs font-bold text-white tracking-widest uppercase">{tr("pages.chords.studioTools")}</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
                  {tr("pages.chords.title1")}
                  <br />
                  <span className="text-white/95">{tr("pages.chords.title2")}</span>
                </h1>
                <p className="text-lg text-white/95 leading-relaxed max-w-lg">
                  {tr("pages.chords.desc")}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center border border-white/20">
                    <span className="material-icons-round text-white text-2xl">library_music</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white mb-1">{tr("pages.chords.voicings")}</h2>
                    <p className="text-sm text-white/85">
                      {tr("pages.chords.voicingsDesc")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center border border-white/20">
                    <span className="material-icons-round text-white text-2xl">offline_bolt</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white mb-1">{tr("pages.chords.offline")}</h2>
                    <p className="text-sm text-white/85">
                      {tr("pages.chords.offlineDesc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- Kütüphaneye doğrudan giriş --- */}
          <section className="mt-20">
            <h2 className="text-3xl font-extrabold text-white mb-2">{t.browse}</h2>
            <p className="text-white/85 mb-8 max-w-2xl">{t.browseDesc(totalChords)}</p>

            <Link
              to={explorerEntryPath(locale)}
              className="group inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-4 text-lg font-extrabold text-neutral-900 hover:bg-white/90 transition-colors"
            >
              {t.open}
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </section>

          {/* --- Popüler akorlar --- */}
          <section className="mt-14">
            <h2 className="text-2xl font-extrabold text-white mb-5">{t.popular}</h2>
            <ul className="flex flex-wrap gap-2">
              {popular.map((entry) => (
                <li key={entry.slug}>
                  <ChordPill entry={entry} locale={locale} />
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-14">
            <AppCta locale={locale} />
          </div>
        </Container>
      </main>
    </PageLayout>
  );
}
