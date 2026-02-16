import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { Footer } from "../components/Footer";

export function HomePage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-neutral-800 dark:text-neutral-200 antialiased overflow-x-hidden selection:bg-primary/20 selection:text-primary transition-colors duration-300">
      <Navbar />
      <HeroSection />
      <Footer />
    </div>
  );
}
