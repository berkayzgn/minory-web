import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  chordPath,
  chordsHubPath,
  instrumentPath,
} from "../../constants/chordRoutes";
import {
  chordsForInstrument,
  findChord,
  INSTRUMENTS,
  instrumentName,
  NOTE_SEQUENCE,
  type ChordEntry,
  type InstrumentMeta,
  type Locale,
} from "../../data/chords/catalog";
import { SOLFEGE } from "../../data/chords/theory";
import { typeLabel } from "../../seo/chordCopy";
import { Breadcrumbs } from "./ChordUI";

const T = {
  en: {
    hub: "Chords",
    instrument: "Instrument",
    filter: "Filter chords",
    filterPlaceholder: "Am, maj7, sus…",
    noMatch: "No chord matches that filter.",
    roots: "Root note",
  },
  tr: {
    hub: "Akorlar",
    instrument: "Enstrüman",
    filter: "Akor filtrele",
    filterPlaceholder: "Am, maj7, sus…",
    noMatch: "Bu filtreye uyan akor yok.",
    roots: "Kök ses",
  },
} as const;

interface ChordExplorerProps {
  instrument: InstrumentMeta;
  locale: Locale;
  /** Sağ panelde açık olan akor; enstrüman sayfasında null */
  activeChord: ChordEntry | null;
  children: React.ReactNode;
}

/**
 * Akor bölümünün tek ekranlık gezinme kabuğu.
 *
 * Üstte enstrüman sekmeleri, solda kök sese göre açılır akor ağacı,
 * sağda seçili akorun içeriği. Seçimler `<Link>` olduğu için sayfa
 * yenilenmez (tek sayfa hissi) ama her akorun kendi adresi ve kendi
 * statik HTML'i olmaya devam eder.
 */
export function ChordExplorer({
  instrument,
  locale,
  activeChord,
  children,
}: ChordExplorerProps) {
  const t = T[locale];
  const entries = useMemo(
    () => chordsForInstrument(instrument.id),
    [instrument.id],
  );

  const [filter, setFilter] = useState("");
  const query = filter.trim().toLowerCase();

  const groups = useMemo(() => {
    return NOTE_SEQUENCE.map((root) => ({
      root,
      chords: entries.filter(
        (e) =>
          e.root === root &&
          (query === "" ||
            e.name.toLowerCase().includes(query) ||
            (e.altName?.toLowerCase().includes(query) ?? false) ||
            e.type.id.toLowerCase().includes(query)),
      ),
    })).filter((g) => g.chords.length > 0);
  }, [entries, query]);

  const activeRoot = activeChord?.root ?? null;

  // Açık kök sesler. Filtre yazılıyken eşleşen tüm gruplar açılır.
  const [openRoots, setOpenRoots] = useState<Set<string>>(
    () => new Set(activeRoot ? [activeRoot] : []),
  );

  // Başka bir akora geçildiğinde onun kök sesini aç (render sırasında
  // türetilen state — React'in önerdiği "prop değişince state güncelle" kalıbı)
  const [syncedRoot, setSyncedRoot] = useState(activeRoot);
  if (syncedRoot !== activeRoot) {
    setSyncedRoot(activeRoot);
    if (activeRoot) {
      setOpenRoots((prev) => new Set(prev).add(activeRoot));
    }
  }

  const isOpen = (root: string) => query !== "" || openRoots.has(root);

  /**
   * `open` durumunu güncelle.
   *
   * DİKKAT: `open` değeri buraya parametre olarak geliyor. React sentetik
   * olayında `currentTarget`, handler döndükten sonra null'lanır; setState
   * güncelleyicisi daha sonra çalıştığı için değeri orada okumak çökmeye
   * yol açar.
   */
  const handleToggle = (root: string, open: boolean) => {
    setOpenRoots((prev) => {
      if (prev.has(root) === open) return prev;
      const next = new Set(prev);
      if (open) next.add(root);
      else next.delete(root);
      return next;
    });
  };

  return (
    <>
      <Breadcrumbs
        items={[
          { label: t.hub, to: chordsHubPath(locale) },
          activeChord
            ? { label: instrumentName(instrument, locale), to: instrumentPath(instrument, locale) }
            : { label: instrumentName(instrument, locale) },
          ...(activeChord ? [{ label: activeChord.name }] : []),
        ]}
      />

      {/* --- Enstrüman sekmeleri --- */}
      <nav aria-label={t.instrument} className="mb-8">
        <ul className="flex flex-wrap gap-2">
          {INSTRUMENTS.map((item) => {
            const isActive = item.id === instrument.id;
            // Aynı akor diğer enstrümanda varsa oraya, yoksa liste başına git
            const twin = activeChord
              ? findChord(item.id, activeChord.slug)
              : null;
            const to = twin
              ? chordPath(twin, item, locale)
              : instrumentPath(item, locale);

            return (
              <li key={item.id}>
                <Link
                  to={to}
                  aria-current={isActive ? "page" : undefined}
                  className={
                    isActive
                      ? "inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-extrabold text-neutral-900"
                      : "inline-flex rounded-full bg-white/15 border border-white/25 px-5 py-2.5 text-sm font-bold text-white hover:bg-white/25 transition-colors"
                  }
                >
                  {instrumentName(item, locale)}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-[16rem_minmax(0,1fr)] gap-6 lg:gap-8">
        {/* --- Sol: akor ağacı --- */}
        <aside className="min-w-0 max-h-[60vh] overflow-y-auto lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-8rem)] rounded-3xl bg-white p-4 shadow-float">
          <label className="block mb-4">
            <span className="block text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">
              {t.filter}
            </span>
            <input
              type="search"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder={t.filterPlaceholder}
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-[#07766D] focus:ring-1 focus:ring-[#07766D]"
            />
          </label>

          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">
            {t.roots}
          </h2>

          {groups.length === 0 ? (
            <p className="text-sm text-neutral-500 py-2">{t.noMatch}</p>
          ) : (
            <ul className="space-y-0.5">
              {groups.map(({ root, chords }) => (
                <li key={root}>
                  <details
                    className="group"
                    open={isOpen(root)}
                    onToggle={(e) => {
                      // Filtre açıkken tüm gruplar zorla açık; kullanıcı
                      // tercihini bozmamak için bu olayları yok say.
                      if (query !== "") return;
                      handleToggle(root, e.currentTarget.open);
                    }}
                  >
                    <summary className="flex cursor-pointer items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm font-bold text-neutral-900 hover:bg-neutral-100 marker:content-[''] [&::-webkit-details-marker]:hidden">
                      <span className="flex items-center gap-1.5">
                        <span
                          aria-hidden="true"
                          className="text-neutral-400 transition-transform group-open:rotate-90"
                        >
                          ›
                        </span>
                        <span>
                          {root.replace("#", "♯")}
                          {locale === "tr" && (
                            <span className="ml-1.5 font-medium text-neutral-500">
                              {SOLFEGE[root]}
                            </span>
                          )}
                        </span>
                      </span>
                      <span className="text-xs font-semibold text-neutral-400 tabular-nums">
                        {chords.length}
                      </span>
                    </summary>

                    <ul className="mt-0.5 mb-1 ml-3 border-l border-neutral-200 pl-2 space-y-0.5">
                      {chords.map((entry) => {
                        const isActive = entry.slug === activeChord?.slug;
                        return (
                          <li key={entry.slug}>
                            <Link
                              to={chordPath(entry, instrument, locale)}
                              aria-current={isActive ? "page" : undefined}
                              className={`flex items-baseline justify-between gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors ${
                                isActive
                                  ? "bg-[#07766D] font-extrabold text-white"
                                  : "text-neutral-700 font-semibold hover:bg-neutral-100"
                              }`}
                            >
                              <span className="shrink-0">{entry.name}</span>
                              <span
                                className={`min-w-0 shrink text-[11px] truncate ${isActive ? "text-white/80" : "text-neutral-400"}`}
                              >
                                {typeLabel(entry.type, locale)}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </details>
                </li>
              ))}
            </ul>
          )}
        </aside>

        {/* --- Sağ: içerik --- */}
        <div className="min-w-0">{children}</div>
      </div>
    </>
  );
}
