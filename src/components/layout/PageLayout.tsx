import { type ReactNode } from "react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

const PAGE_WRAPPER_BASE =
  "min-h-screen bg-background-light dark:bg-background-dark font-display text-neutral-800 dark:text-neutral-200 antialiased flex flex-col";

interface PageLayoutProps {
  children: ReactNode;
  /** Dış wrapper için ek class'lar (örn. overflow-x-hidden, selection:...) */
  wrapperClassName?: string;
}

export function PageLayout({ children, wrapperClassName = "" }: PageLayoutProps) {
  return (
    <div className={`${PAGE_WRAPPER_BASE} ${wrapperClassName}`.trim()}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
