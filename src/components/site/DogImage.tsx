import { useState } from "react";
import { PawPrint } from "@phosphor-icons/react";

import type { Dog } from "../../types/dog";
import { cn } from "../../lib/utils";

type DogImageProps = {
  dog: Pick<Dog, "id" | "name" | "breed">;
  className?: string;
  iconSize?: number;
};

/**
 * Photo du chien, servie depuis `public/dogs/<id>.jpg`. Tant qu'une photo
 * n'a pas été déposée, on affiche un aplat de marque plutôt qu'une image
 * cassée.
 */
export default function DogImage({
  dog,
  className,
  iconSize = 48,
}: DogImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={`${dog.name}, ${dog.breed}, photo à venir`}
        className={cn(
          "media-fallback flex items-center justify-center text-primary/60",
          className
        )}
      >
        <PawPrint size={iconSize} weight="duotone" />
      </div>
    );
  }

  return (
    <img
      src={`/dogs/${dog.id}.jpg`}
      alt={`${dog.name}, ${dog.breed}`}
      loading="lazy"
      onError={() => setFailed(true)}
      className={cn("media-fallback object-cover", className)}
    />
  );
}
