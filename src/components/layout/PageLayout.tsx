import { type ReactNode } from "react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { usePageAccentContext } from "../../contexts/PageAccentContext";

interface PageLayoutProps {
  children: ReactNode;
  wrapperClassName?: string;
}

export function PageLayout({ children, wrapperClassName = "" }: PageLayoutProps) {
  const { isColored } = usePageAccentContext();

  const base = isColored
    ? "min-h-screen font-display antialiased flex flex-col"
    : "min-h-screen bg-background-light dark:bg-background-dark font-display text-neutral-800 dark:text-neutral-200 antialiased flex flex-col";

  return (
    <div className={`${base} ${wrapperClassName}`.trim()}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
