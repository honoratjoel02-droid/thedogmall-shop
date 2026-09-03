import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";

import type { Dog } from "../../types/dog";
import DogImage from "./DogImage";
import FavoriteButton from "./FavoriteButton";
import { formatAge, formatPrice } from "../../lib/format";
import { cn } from "../../lib/utils";

type DogCardProps = {
  dog: Dog;
  className?: string;
};

export default function DogCard({ dog, className }: DogCardProps) {
  const available = dog.availability === "Disponible";

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-3xl bg-card ring-1 ring-border transition-shadow duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_24px_50px_-40px_var(--foreground)]",
        className
      )}
    >
      <div className="relative">
        <Link
          to={`/chiens/${dog.id}`}
          tabIndex={-1}
          aria-hidden="true"
          className="block overflow-hidden"
        >
          <DogImage
            dog={dog}
            className="aspect-4/5 w-full transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
            iconSize={56}
          />
        </Link>

        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-card/95 py-1 pr-2.5 pl-2 text-[11px] font-semibold text-foreground ring-1 ring-border">
          <span
            aria-hidden="true"
            className={cn(
              "size-1.5 rounded-full",
              available ? "bg-primary" : "bg-muted-foreground"
            )}
          />
          {dog.availability}
        </span>

        <FavoriteButton
          kind="dog"
          id={dog.id}
          label={dog.name}
          className="absolute top-3 right-3"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold tracking-tight text-foreground uppercase">
          <Link
            to={`/chiens/${dog.id}`}
            className="transition-colors hover:text-primary"
          >
            {dog.name}
          </Link>
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          {dog.breed} · {dog.sex}
        </p>

        <p className="text-sm text-muted-foreground">
          {formatAge(dog.ageMonths)}
        </p>

        <p className="mt-4 text-xl font-bold text-foreground tabular-nums">
          {formatPrice(dog.price)}
        </p>

        <Link
          to={`/chiens/${dog.id}`}
          className="group/link mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-primary"
        >
          Voir le profil
          <ArrowRight
            size={15}
            weight="bold"
            className="transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/link:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}
