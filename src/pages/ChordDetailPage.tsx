import { useParams } from "react-router-dom";
import { ChordDiagram } from "../components/chords/ChordDiagram";
import { ChordExplorer } from "../components/chords/ChordExplorer";
import { AppCta, NoteChips, Section } from "../components/chords/ChordUI";
import { PageLayout } from "../components/layout/PageLayout";
import { SEOHead } from "../components/SEOHead";
import { Container } from "../components/ui/Container";
import {
  findChord,
  instrumentBySlug,
  instrumentName,
  type Locale,
} from "../data/chords/catalog";
import { SOLFEGE } from "../data/chords/theory";
import { voicingsFor, type FretVoicing } from "../data/chords/voicings";
import { useRouteLocale } from "../hooks/useRouteLocale";
import { describeVoicing, instrumentLabel, typeLabel } from "../seo/chordCopy";
import { chordDetailBundle } from "../seo/chordSeo";
import { ChordNotFound } from "./ChordNotFound";

const T = {
  en: {
    diagrams: "Chord diagrams",
    position: "Position",
    fret: "starts at fret",
    open: "open position",
    barre: "barre shape",
    howTo: "How to play",
    theory: "Theory behind the chord",
    notes: "Notes in this chord",
    faq: "Frequently asked questions",
    fingering: "Fingering",
    degrees: "Degrees",
    alsoWritten: "Also written",
  },
  tr: {
    diagrams: "Akor diyagramları",
    position: "Pozisyon",
    fret: "başlangıç perdesi",
    open: "açık pozisyon",
    barre: "barre",
    howTo: "Nasıl çalınır",
    theory: "Akorun teorisi",
    notes: "Akorun notaları",
    faq: "Sık sorulan sorular",
    fingering: "Basış",
    degrees: "Dereceler",
    alsoWritten: "Alternatif yazım",
  },
} as const;

export function ChordDetailPage({ locale }: { locale: Locale }) {
  const { instrument: instrumentSlug = "", chord: chordSlug = "" } = useParams();
  useRouteLocale(locale);

  const instrument = instrumentBySlug(instrumentSlug, locale);
  const entry = instrument ? findChord(instrument.id, chordSlug) : null;

  if (!instrument || !entry) return <ChordNotFound locale={locale} />;

  const t = T[locale];
  const voicings = voicingsFor(entry);
  const { copy, meta } = chordDetailBundle(entry, locale, voicings);
  const instName = instrumentName(instrument, locale);
  const inst = instrumentLabel(entry.instrument, locale);

  return (
    <PageLayout>
      <SEOHead meta={meta} />
      <main id="main-content" className="flex-grow pt-28 sm:pt-32 pb-20">
        <Container>
          <ChordExplorer
            instrument={instrument}
            locale={locale}
            activeChord={entry}
          >
            <header className="mb-8">
              <p className="text-sm font-bold uppercase tracking-widest text-white/80 mb-3">
                {locale === "tr"
                  ? `${SOLFEGE[entry.root]} ${typeLabel(entry.type, locale)} · ${instName}`
                  : `${entry.root} ${typeLabel(entry.type, locale)} · ${instName}`}
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.05] mb-4">
                {copy.h1}
              </h1>
              <p className="text-lg text-white/95 leading-relaxed">
                {copy.intro}
              </p>
            </header>

            {/* --- Diyagramlar --- */}
            <h2 className="text-xl font-bold text-white mb-4">{t.diagrams}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
              {voicings.map((voicing, i) => {
                const fret =
                  voicing.kind === "fret" ? (voicing as FretVoicing) : null;
                const diagramTitle =
                  locale === "tr"
                    ? `${entry.name} akoru ${inst} diyagramı${voicings.length > 1 ? ` — ${t.position} ${i + 1}` : ""}`
                    : `${entry.name} chord diagram for ${inst}${voicings.length > 1 ? ` — ${t.position} ${i + 1}` : ""}`;

                return (
                  <figure
                    key={voicing.id}
                    className="rounded-3xl bg-white p-5 flex flex-col"
                  >
                    <figcaption className="flex items-baseline justify-between gap-3 mb-3">
                      <span className="text-base font-extrabold text-neutral-900">
                        {voicings.length > 1
                          ? `${t.position} ${i + 1}`
                          : entry.name}
                      </span>
                      {fret && (
                        <span className="text-xs font-semibold text-neutral-500">
                          {[
                            fret.isBarre
                              ? t.barre
                              : fret.hasOpenStrings
                                ? t.open
                                : "",
                            // Açık pozisyonlarda perde numarası yanıltıcı olur:
                            // şekil boş tellere bağlıdır, kaydırılamaz.
                            !fret.hasOpenStrings && fret.chordFret
                              ? `${t.fret} ${fret.chordFret}`
                              : "",
                          ]
                            .filter(Boolean)
                            .join(" · ")}
                        </span>
                      )}
                    </figcaption>

                    <ChordDiagram
                      instrument={entry.instrument}
                      voicing={voicing}
                      title={diagramTitle}
                    />

                    {fret && (
                      <>
                        <h3 className="mt-4 mb-2 text-xs font-bold uppercase tracking-wider text-neutral-500">
                          {t.fingering}
                        </h3>
                        <ul className="text-sm text-neutral-700 space-y-1">
                          {describeVoicing(fret, entry.instrument, locale).map(
                            (line) => (
                              <li key={line}>{line}</li>
                            ),
                          )}
                        </ul>
                      </>
                    )}
                  </figure>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
              <Section title={t.notes} className="md:col-span-1">
                <NoteChips
                  notes={
                    locale === "tr"
                      ? entry.notes.map((n) => `${n} · ${SOLFEGE[n] ?? n}`)
                      : entry.notes
                  }
                />
                <p className="mt-4 text-sm text-white/85">
                  {t.degrees}: {entry.type.degrees.join(" – ")}
                </p>
                {entry.altName && (
                  <p className="mt-2 text-sm text-white/85">
                    {t.alsoWritten}:{" "}
                    <strong className="text-white">{entry.altName}</strong>
                  </p>
                )}
              </Section>

              <Section title={t.howTo} className="md:col-span-2">
                <p className="text-white/95 leading-relaxed">
                  {copy.howToPlay}
                </p>
              </Section>
            </div>

            <Section title={t.theory} className="mb-5">
              <p className="text-white/95 leading-relaxed">{copy.theory}</p>
            </Section>

            {/* --- SSS: FAQPage schema ile eşleşir --- */}
            <Section title={t.faq} className="mb-5">
              <dl className="space-y-5">
                {copy.faq.map((item) => (
                  <div key={item.q}>
                    <dt className="font-bold text-white mb-1">{item.q}</dt>
                    <dd className="text-white/90 leading-relaxed">{item.a}</dd>
                  </div>
                ))}
              </dl>
            </Section>

            <AppCta locale={locale} chordName={entry.name} />
          </ChordExplorer>
        </Container>
      </main>
    </PageLayout>
  );
}
