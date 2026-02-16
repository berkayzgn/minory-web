import { useTranslation } from "react-i18next";

export function TrustedByStrip() {
  const { t } = useTranslation();
  return (
    <div className="absolute bottom-0 left-0 w-full bg-white/50 dark:bg-black/20 backdrop-blur-sm py-4 sm:py-6 pb-[max(1rem,env(safe-area-inset-bottom))] border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-[10px] sm:text-xs font-bold tracking-widest text-neutral-400 uppercase mb-3 sm:mb-4">{t("trustedBy.label")}</p>
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          <svg className="h-6 w-auto fill-current text-neutral-600 dark:text-neutral-400" viewBox="0 0 100 30">
            <path d="M10,15 L20,5 L30,15 L20,25 Z M40,5 H50 V25 H40 Z M60,5 H80 L70,25 H60 Z" />
          </svg>
          <svg className="h-5 w-auto fill-current text-neutral-600 dark:text-neutral-400" viewBox="0 0 100 30">
            <circle cx="15" cy="15" r="10" />
            <rect height="20" width="20" x="35" y="5" />
            <polygon points="70,25 80,5 90,25" />
          </svg>
          <svg className="h-6 w-auto fill-current text-neutral-600 dark:text-neutral-400" viewBox="0 0 100 30">
            <path d="M10,5 Q20,25 30,5 T50,5" fill="none" stroke="currentColor" strokeWidth="3" />
            <circle cx="70" cy="15" r="8" />
          </svg>
          <svg className="h-5 w-auto hidden sm:block fill-current text-neutral-600 dark:text-neutral-400" viewBox="0 0 100 30">
            <rect height="10" rx="5" width="30" x="10" y="10" />
            <rect height="20" width="10" x="50" y="5" />
            <rect height="20" width="10" x="70" y="5" />
          </svg>
        </div>
      </div>
    </div>
  );
}
