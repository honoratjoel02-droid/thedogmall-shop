import { useState } from "react";
import { PawPrint } from "@phosphor-icons/react";

import type { Dog } from "../../types/dog";
import { dogPhotos } from "../../lib/media";
import { cn } from "../../lib/utils";
import MediaFallback from "./MediaFallback";

type DogImageProps = {
  dog: Pick<Dog, "id" | "name" | "breed" | "images">;
  className?: string;
  iconSize?: number;
};

/** Première photo du chien, pour les cartes de liste. */
export default function DogImage({
  dog,
  className,
  iconSize = 48,
}: DogImageProps) {
  const [failed, setFailed] = useState(false);
  const [photo] = dogPhotos(dog);

  if (failed) {
    return (
      <MediaFallback
        icon={PawPrint}
        label={`${dog.name}, ${dog.breed}`}
        className={className}
        iconSize={iconSize}
      />
    );
  }

  return (
    <img
      src={photo}
      alt={`${dog.name}, ${dog.breed}`}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={cn("media-fallback object-cover", className)}
    />
  );
}
