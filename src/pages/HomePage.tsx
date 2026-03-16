import { PageLayout } from "../components/layout/PageLayout";
import { HeroSection } from "../components/HeroSection";
import { HomeIntro } from "../components/HomeIntro";
import { FeaturesSection } from "../components/FeaturesSection";
import { SEOHead } from "../components/SEOHead";

export function HomePage() {
  return (
    <PageLayout wrapperClassName="overflow-x-hidden selection:bg-primary/20 selection:text-primary transition-colors duration-300">
      <main id="main-content">
        <SEOHead
          title="Minory – Guitar Tuner, Metronome & Chords App"
          description="Minory Studio is an all-in-one music practice app with guitar tuner, smart metronome, chord library and repertoire tools for iOS."
          url="https://minory.studio/"
        />
        <HeroSection />
        <HomeIntro />
        <FeaturesSection />
      </main>
    </PageLayout>
  );
}
