import { PageLayout } from "../components/layout/PageLayout";
import { HeroSection } from "../components/HeroSection";
import { HomeIntro } from "../components/HomeIntro";
import { FeaturesSection } from "../components/FeaturesSection";

export function HomePage() {
  return (
    <PageLayout wrapperClassName="overflow-x-hidden selection:bg-primary/20 selection:text-primary transition-colors duration-300">
      <main id="main-content">
        <HeroSection />
        <HomeIntro />
        <FeaturesSection />
      </main>
    </PageLayout>
  );
}
