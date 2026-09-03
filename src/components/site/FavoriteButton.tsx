import { Heart } from "@phosphor-icons/react";

import { useFavorites } from "../../hooks/useFavorites";
import type { FavoriteKind } from "../../context/favorites-context";
import { cn } from "../../lib/utils";

type FavoriteButtonProps = {
  kind: FavoriteKind;
  id: string;
  /** Nom de l'élément, repris dans le libellé accessible du bouton. */
  label: string;
  className?: string;
  size?: number;
};

export default function FavoriteButton({
  kind,
  id,
  label,
  className,
  size = 18,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(kind, id);

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={
        active
          ? `Retirer ${label} des favoris`
          : `Ajouter ${label} aux favoris`
      }
      onClick={() => toggleFavorite(kind, id)}
      className={cn(
        "flex size-9 items-center justify-center rounded-full bg-card/95 text-foreground/60 ring-1 ring-border transition-[color,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-95",
        active && "text-primary",
        className
      )}
    >
      <Heart size={size} weight={active ? "fill" : "regular"} />
    </button>
  );
}
