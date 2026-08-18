import { useParams } from "react-router-dom";
import { ChordExplorer } from "../components/chords/ChordExplorer";
import { AppCta, ChordPill, Section } from "../components/chords/ChordUI";
import { PageLayout } from "../components/layout/PageLayout";
import { SEOHead } from "../components/SEOHead";
import { Container } from "../components/ui/Container";
import {
  chordsForInstrument,
  findChord,
  instrumentBySlug,
  instrumentName,
  type ChordEntry,
  type Locale,
} from "../data/chords/catalog";
import { CHORD_TYPES } from "../data/chords/theory";
import { useRouteLocale } from "../hooks/useRouteLocale";
import { instrumentLabel, typeDescription, typeLabel } from "../seo/chordCopy";
import { instrumentSeo } from "../seo/chordSeo";
import { ChordNotFound } from "./ChordNotFound";

/** Her enstrümanda en çok aranan akorlar — sağ panelde hızlı giriş */
const STARTERS: Record<string, string[]> = {
  guitar: [
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
  ],
  ukulele: [
    "c-major",
    "f-major",
    "g-major",
    "a-minor",
    "d-minor",
    "e-minor",
    "g-7",
    "c-maj7",
  ],
  piano: [
    "c-major",
    "g-major",
    "f-major",
    "d-minor",
    "a-minor",
    "e-minor",
    "c-maj7",
    "g-7",
  ],
};

const T = {
  en: {
    starters: "Start with these",
    types: "Chord types explained",
    intro: (inst: string, count: number) =>
      `Every ${inst} chord in the Minory library — ${count} in total. Pick a root note on the left to open its chords, then choose one to see the fingering diagrams, the notes it contains and how to play it.`,
  },
  tr: {
    starters: "Buradan başlayın",
    types: "Akor tipleri ne anlama geliyor?",
    intro: (inst: string, count: number) =>
      `Minory kütüphanesindeki tüm ${inst} akorları — toplam ${count} akor. Soldan bir kök ses açın, ardından bir akor seçerek basış diyagramlarını, içerdiği notaları ve nasıl çalınacağını görün.`,
  },
} as const;

export function ChordInstrumentPage({ locale }: { locale: Locale }) {
  const { instrument: instrumentSlug = "" } = useParams();
  useRouteLocale(locale);

  const instrument = instrumentBySlug(instrumentSlug, locale);
  if (!instrument) return <ChordNotFound locale={locale} />;

  const t = T[locale];
  const entries = chordsForInstrument(instrument.id);
  const meta = instrumentSeo(instrument, locale);
  const instName = instrumentName(instrument, locale);
  const inst = instrumentLabel(instrument.id, locale);

  const starters = (STARTERS[instrument.id] ?? [])
    .map((slug) => findChord(instrument.id, slug))
    .filter((e): e is ChordEntry => e !== null);

  // Bu enstrümanda gerçekten verisi olan tipler
  const availableTypes = CHORD_TYPES.filter((type) =>
    entries.some((e) => e.type.id === type.id),
  );

  return (
    <PageLayout>
      <SEOHead meta={meta} />
      <main id="main-content" className="flex-grow pt-28 sm:pt-32 pb-20">
        <Container>
          <ChordExplorer
            instrument={instrument}
            locale={locale}
            activeChord={null}
          >
            <header className="mb-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.05] mb-4">
                {locale === "tr" ? `${instName} Akorları` : `${instName} Chords`}
              </h1>
              <p className="text-lg text-white/95 leading-relaxed">
                {t.intro(inst, entries.length)}
              </p>
            </header>

            {starters.length > 0 && (
              <Section title={t.starters} className="mb-5">
                <ul className="flex flex-wrap gap-2">
                  {starters.map((entry) => (
                    <li key={entry.slug}>
                      <ChordPill entry={entry} locale={locale} />
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            <Section title={t.types} className="mb-5">
              <dl className="space-y-4">
                {availableTypes.map((type) => (
                  <div key={type.id}>
                    <dt className="font-bold text-white">
                      {type.suffix === ""
                        ? typeLabel(type, locale)
                        : `${type.suffix} — ${typeLabel(type, locale)}`}
                    </dt>
                    <dd className="text-sm text-white/85 leading-relaxed">
                      {typeDescription(type.id, locale)}
                    </dd>
                  </div>
                ))}
              </dl>
            </Section>

            <AppCta locale={locale} />
          </ChordExplorer>
        </Container>
      </main>
    </PageLayout>
  );
}
