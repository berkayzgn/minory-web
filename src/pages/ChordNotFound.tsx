import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PageLayout } from "../components/layout/PageLayout";
import { Container } from "../components/ui/Container";
import { chordsHubPath } from "../constants/chordRoutes";
import type { Locale } from "../data/chords/catalog";
import { useRouteLocale } from "../hooks/useRouteLocale";

/**
 * Geçersiz akor/enstrüman slug'ı. Prerender listesinde yer almadığı için
 * bu sayfa yalnızca elle girilen adreslerde görünür; indekslenmemesi
 * gerektiğinden noindex veriliyor.
 */
export function ChordNotFound({ locale }: { locale: Locale }) {
  useRouteLocale(locale);

  useEffect(() => {
    const el = document.createElement("meta");
    el.name = "robots";
    el.content = "noindex, follow";
    document.head.appendChild(el);
    document.title =
      locale === "tr"
        ? "Akor bulunamadı | Minory"
        : "Chord not found | Minory";
    return () => el.remove();
  }, [locale]);

  return (
    <PageLayout>
      <main
        id="main-content"
        className="flex-grow pt-32 pb-24 flex items-center"
      >
        <Container>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            {locale === "tr" ? "Bu akoru bulamadık" : "We couldn’t find that chord"}
          </h1>
          <p className="text-lg text-white/90 max-w-xl mb-8">
            {locale === "tr"
              ? "Adres yanlış yazılmış olabilir ya da bu akor seçtiğiniz enstrüman için kütüphanede yok."
              : "The address may be mistyped, or this chord isn’t in the library for the instrument you picked."}
          </p>
          <Link
            to={chordsHubPath(locale)}
            className="inline-flex items-center rounded-xl bg-white px-5 py-3 font-bold text-neutral-900 hover:bg-white/90 transition-colors"
          >
            {locale === "tr"
              ? "Akor kütüphanesine git"
              : "Go to the chord library"}
          </Link>
        </Container>
      </main>
    </PageLayout>
  );
}
