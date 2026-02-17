/**
 * Ortak telefon mockup bileşeni. Bireysel sayfalarda ve ana sayfa kartlarında
 * aynı dış çerçeve ve model görünümü için kullanılır.
 */
interface PhoneHeroProps {
  /** Ekran görüntüsü (örn. /IMG_1813.PNG) */
  src: string;
  /** Görsel alt metni */
  alt?: string;
  /** Ek wrapper className (konumlama için) */
  className?: string;
  /** "page" = sayfa mockup (büyük), "card" = özellik kartı (küçük) */
  variant?: "page" | "card";
  /** Telefonun içindeki görselin konumu (örn. "50% -18%" = yukarı kaydır) */
  imagePosition?: string;
}

export function PhoneHero({ src, alt = "Minory Studio", className = "", variant = "page", imagePosition }: PhoneHeroProps) {
  const isCard = variant === "card";

  if (isCard) {
    return (
      <div className={`relative flex-shrink-0 ${className}`.trim()}>
        <div className="relative w-[130px] h-[260px] sm:w-[160px] sm:h-[320px] md:w-[200px] md:h-[400px] rounded-[1.5rem] sm:rounded-[2rem] bg-black border-[3px] sm:border-4 border-black shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-2.5 w-8 sm:h-3 sm:w-10 bg-black rounded-b-md z-10" />
          <div className="rounded-[1.25rem] sm:rounded-[1.5rem] overflow-hidden w-full h-full bg-background-dark relative">
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover"
              style={imagePosition ? { objectPosition: imagePosition } : undefined}
            />
          </div>
        </div>
      </div>
    );
  }

  /* Sayfa mockup: ana sayfa kartları gibi ince siyah çerçeve, yan tuşsuz; sallanma animasyonu */
  return (
    <div className={`relative mx-auto animate-float-front ${className}`.trim()}>
      <div className="relative mx-auto w-[300px] h-[600px] rounded-[2.5rem] bg-black border-[6px] border-black shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-24 bg-black rounded-b-xl z-10" />
        <div className="rounded-[2rem] overflow-hidden w-full h-full bg-background-dark relative">
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover object-[50%_-8%]"
          />
        </div>
      </div>
    </div>
  );
}
