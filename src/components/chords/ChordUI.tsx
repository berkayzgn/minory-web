import { Link } from "react-router-dom";
import { chordPath } from "../../constants/chordRoutes";
import {
  instrumentById,
  type ChordEntry,
  type Locale,
} from "../../data/chords/catalog";
import {
  APP_STORE_BADGE,
  APP_STORE_URL,
  GOOGLE_PLAY_BADGE,
  GOOGLE_PLAY_URL,
} from "../../constants/storeLinks";

/* ------------------------------------------------------------------ */
/* Akor sayfalarında paylaşılan küçük parçalar                          */
/* ------------------------------------------------------------------ */

export function Breadcrumbs({
  items,
}: {
  items: { label: string; to?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/80">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            {item.to ? (
              <Link
                to={item.to}
                className="hover:text-white underline-offset-4 hover:underline transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-white">
                {item.label}
              </span>
            )}
            {i < items.length - 1 && (
              <span aria-hidden="true" className="text-white/50">
                ›
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Section({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-3xl bg-white/10 border border-white/20 p-6 sm:p-8 ${className}`.trim()}
    >
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">{title}</h2>
      {children}
    </section>
  );
}

/** Akor adını gösteren bağlantı rozeti — iç linklemenin ana taşıyıcısı */
export function ChordPill({
  entry,
  locale,
  label,
}: {
  entry: ChordEntry;
  locale: Locale;
  label?: string;
}) {
  const instrument = instrumentById(entry.instrument);
  if (!instrument) return null;

  return (
    <Link
      to={chordPath(entry, instrument, locale)}
      className="inline-flex items-center justify-center rounded-xl bg-white/15 border border-white/25 px-3 py-2 text-sm font-semibold text-white hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
    >
      {label ?? entry.name}
    </Link>
  );
}

/** Akorun notalarını gösteren rozet satırı */
export function NoteChips({ notes }: { notes: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {notes.map((note) => (
        <li
          key={note}
          className="rounded-lg bg-white px-3 py-1.5 text-sm font-bold text-neutral-900"
        >
          {note.replace("#", "♯")}
        </li>
      ))}
    </ul>
  );
}

/** Store yönlendirmesi — akor sayfalarından uygulamaya trafik */
export function AppCta({
  locale,
  chordName,
}: {
  locale: Locale;
  chordName?: string;
}) {
  const heading =
    locale === "tr"
      ? chordName
        ? `${chordName} akorunu telefonunda çalış`
        : "Tüm kütüphaneyi cebine al"
      : chordName
        ? `Practise ${chordName} on your phone`
        : "Take the whole library with you";

  const body =
    locale === "tr"
      ? "Minory'de akor kütüphanesinin tamamı, akortçu, metronom ve repertuvar defteri bir arada — çevrimdışı çalışır."
      : "Minory bundles the full chord library with a tuner, metronome and repertoire notebook — and it all works offline.";

  return (
    <section className="rounded-3xl bg-white p-6 sm:p-8 text-neutral-900">
      <h2 className="text-xl sm:text-2xl font-extrabold mb-2">{heading}</h2>
      <p className="text-neutral-600 mb-6 max-w-2xl">{body}</p>
      <div className="flex flex-wrap items-center gap-3">
        <a
          href={APP_STORE_URL}
          className="inline-block"
          aria-label={locale === "tr" ? "App Store'dan indir" : "Download on the App Store"}
        >
          <img
            src={APP_STORE_BADGE}
            alt={locale === "tr" ? "App Store'dan indir" : "Download on the App Store"}
            className="h-12 w-auto"
            loading="lazy"
          />
        </a>
        <a
          href={GOOGLE_PLAY_URL}
          className="inline-block"
          aria-label={locale === "tr" ? "Google Play'den indir" : "Get it on Google Play"}
        >
          <img
            src={GOOGLE_PLAY_BADGE}
            alt={locale === "tr" ? "Google Play'den indir" : "Get it on Google Play"}
            className="h-12 w-auto"
            loading="lazy"
          />
        </a>
      </div>
    </section>
  );
}
