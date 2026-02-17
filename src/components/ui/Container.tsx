import { type ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** Container genişliğini içeriğe göre kullan (örn. grid için w-full) */
  fullWidth?: boolean;
}

const baseClasses = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

export function Container({ children, className = "", fullWidth }: ContainerProps) {
  return (
    <div className={`${baseClasses} ${fullWidth ? "w-full" : ""} ${className}`.trim()}>
      {children}
    </div>
  );
}
