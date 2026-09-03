import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";

import { cn } from "../../lib/utils";

type MediaGalleryProps = {
  /** Chemins des photos, dans l'ordre d'affichage. */
  photos: string[];
  /** Texte alternatif de base ; l'index est ajouté s'il y a plusieurs photos. */
  alt: string;
  /** Affiché tant qu'aucune photo n'a pu être chargée. */
  fallback: ReactNode;
  /** Classes de l'image principale : format, arrondi, etc. */
  imageClassName?: string;
  className?: string;
};

/**
 * Photo principale, bande de miniatures dès la deuxième photo, et
 * agrandissement plein écran au clic. Les fichiers absents sont retirés
 * silencieusement : la page reste correcte pendant que le catalogue photo
 * se remplit.
 */
export default function MediaGallery({
  photos,
  alt,
  fallback,
  imageClassName,
  className,
}: MediaGalleryProps) {
  const [broken, setBroken] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const available = photos.filter((photo) => !broken.includes(photo));
  const safeIndex = Math.min(activeIndex, Math.max(available.length - 1, 0));
  const activePhoto = available[safeIndex];

  const showNext = useCallback(() => {
    setActiveIndex((index) => (index + 1) % available.length);
  }, [available.length]);

  const showPrevious = useCallback(() => {
    setActiveIndex(
      (index) => (index - 1 + available.length) % available.length
    );
  }, [available.length]);

  useEffect(() => {
    if (!zoomed) return;

    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setZoomed(false);
      if (event.key === "ArrowRight") showNext();
      if (event.key === "ArrowLeft") showPrevious();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [zoomed, showNext, showPrevious]);

  if (!activePhoto) {
    return <div className={className}>{fallback}</div>;
  }

  const multiple = available.length > 1;

  return (
    <div className={className}>
      <button
        type="button"
        aria-label={`Agrandir la photo de ${alt}`}
        onClick={() => setZoomed(true)}
        className="block w-full cursor-zoom-in overflow-hidden rounded-3xl focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
      >
        <img
          src={activePhoto}
          alt={multiple ? `${alt}, photo ${safeIndex + 1}` : alt}
          width={1000}
          height={1250}
          decoding="async"
          onError={() =>
            setBroken((previous) => [...previous, activePhoto])
          }
          className={cn("media-fallback w-full object-cover", imageClassName)}
        />
      </button>

      {multiple && (
        <ul className="mt-3 flex gap-3 overflow-x-auto pb-1">
          {available.map((photo, index) => (
            <li key={photo}>
              <button
                type="button"
                aria-label={`Voir la photo ${index + 1} de ${alt}`}
                aria-current={index === safeIndex}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "block size-20 overflow-hidden rounded-2xl ring-1 transition-[opacity,box-shadow] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  index === safeIndex
                    ? "ring-2 ring-primary"
                    : "opacity-70 ring-border hover:opacity-100"
                )}
              >
                <img
                  src={photo}
                  alt=""
                  width={160}
                  height={160}
                  loading="lazy"
                  decoding="async"
                  onError={() =>
                    setBroken((previous) => [...previous, photo])
                  }
                  className="media-fallback size-20 object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      )}

      {zoomed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Photos de ${alt}`}
          className="fixed inset-0 z-50 flex flex-col bg-foreground/90"
        >
          <div className="flex justify-end p-4">
            <button
              type="button"
              autoFocus
              aria-label="Fermer l'agrandissement"
              onClick={() => setZoomed(false)}
              className="flex size-11 items-center justify-center rounded-full bg-background/15 text-background transition-colors hover:bg-background/25"
            >
              <X size={20} />
            </button>
          </div>

          {/* `min-h-0` : sans lui, la ligne refuse de se réduire et la photo
              déborde de l'écran au lieu d'être ramenée à sa hauteur. */}
          <div className="flex min-h-0 flex-1 items-center justify-center gap-2 px-4 pb-8 sm:gap-4">
            {multiple && (
              <GalleryArrow
                label="Photo précédente"
                onClick={showPrevious}
                icon={CaretLeft}
              />
            )}

            <img
              src={activePhoto}
              alt={multiple ? `${alt}, photo ${safeIndex + 1}` : alt}
              className="max-h-full max-w-full rounded-2xl object-contain"
            />

            {multiple && (
              <GalleryArrow
                label="Photo suivante"
                onClick={showNext}
                icon={CaretRight}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function GalleryArrow({
  label,
  onClick,
  icon: Icon,
}: {
  label: string;
  onClick: () => void;
  icon: typeof CaretLeft;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-11 shrink-0 items-center justify-center rounded-full bg-background/15 text-background transition-colors hover:bg-background/25"
    >
      <Icon size={20} weight="bold" />
    </button>
  );
}
