/**
 * Prerender girişi.
 *
 * `scripts/prerender.mjs` build sonrası bu modülü yükleyip her akor
 * rotası için statik HTML üretir. Tarayıcı girişi `main.tsx` ile aynı
 * ağacı render eder, sadece router `StaticRouter` olur.
 */

import { renderToString } from "react-dom/server";
// React Router v7'de StaticRouter ana paketten geliyor (v6'daki /server alt yolu yok)
import { StaticRouter } from "react-router";
import { AppTree } from "./App";
import {
  chordPath,
  chordsHubPath,
  instrumentPath,
  LOCALES,
} from "./constants/chordRoutes";
import {
  chordsForInstrument,
  instrumentById,
  INSTRUMENTS,
  type Locale,
} from "./data/chords/catalog";
import { voicingsFor } from "./data/chords/voicings";
import i18n from "./i18n";
import { chordDetailBundle, chordsHubSeo, instrumentSeo } from "./seo/chordSeo";
import { renderHeadTags } from "./seo/renderHead";
import type { SeoMeta } from "./seo/types";

export interface PrerenderPage {
  /** "/chords/guitar/a-minor" */
  url: string;
  locale: Locale;
  meta: SeoMeta;
  /** Sitemap önceliği */
  priority: number;
}

/** Statik HTML üretilecek tüm akor sayfaları */
export function collectPages(): PrerenderPage[] {
  const pages: PrerenderPage[] = [];

  for (const locale of LOCALES) {
    pages.push({
      url: chordsHubPath(locale),
      locale,
      meta: chordsHubSeo(locale),
      priority: 0.9,
    });

    for (const instrument of INSTRUMENTS) {
      pages.push({
        url: instrumentPath(instrument, locale),
        locale,
        meta: instrumentSeo(instrument, locale),
        priority: 0.8,
      });

      for (const entry of chordsForInstrument(instrument.id)) {
        const voicings = voicingsFor(entry);
        // Diyagramı olmayan akor sayfası üretme
        if (voicings.length === 0) continue;

        pages.push({
          url: chordPath(entry, instrument, locale),
          locale,
          meta: chordDetailBundle(entry, locale, voicings).meta,
          priority: 0.6,
        });
      }
    }
  }

  return pages;
}

export function headFor(meta: SeoMeta): string {
  return renderHeadTags(meta);
}

export async function render(url: string, locale: Locale): Promise<string> {
  // useRouteLocale bir efekt olduğu için SSR'da çalışmaz; dili elle veriyoruz
  await i18n.changeLanguage(locale);

  return renderToString(
    <StaticRouter location={url}>
      <AppTree />
    </StaticRouter>,
  );
}

/** Prerender script'inin kontrol amaçlı kullandığı yardımcı */
export { instrumentById };
