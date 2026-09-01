import { Link, Navigate, useParams } from "react-router-dom";
import {
  CheckCircle,
  MapPin,
  Phone,
  type Icon,
} from "@phosphor-icons/react";

import SiteLayout from "../components/site/SiteLayout";
import DogImage from "../components/site/DogImage";
import DogCard from "../components/site/DogCard";
import FavoriteButton from "../components/site/FavoriteButton";
import { buttonVariants } from "../components/ui/button";
import { dogs, findDog } from "../data/dogs";
import { formatAge, formatPrice } from "../lib/format";
import { contactDetails } from "../lib/navigation";
import { cn } from "../lib/utils";

export default function DogDetail() {
  const { dogId } = useParams();
  const dog = findDog(dogId);

  if (!dog) {
    return <Navigate to="/chiens" replace />;
  }

  const available = dog.availability === "Disponible";
  const otherDogs = dogs.filter((item) => item.id !== dog.id).slice(0, 3);

  const facts: { label: string; value: string }[] = [
    { label: "Race", value: dog.breed },
    { label: "Sexe", value: dog.sex },
    { label: "Âge", value: formatAge(dog.ageMonths) },
    { label: "Disponibilité", value: dog.availability },
  ];

  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
        <nav aria-label="Fil d'Ariane" className="mb-6 text-sm text-muted-foreground">
          <Link to="/chiens" className="transition-colors hover:text-foreground">
            Chiens
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <span className="text-foreground">{dog.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="relative">
            <DogImage
              dog={dog}
              className="aspect-4/5 w-full rounded-3xl"
              iconSize={96}
            />

            <FavoriteButton
              kind="dog"
              id={dog.id}
              label={dog.name}
              size={20}
              className="absolute top-4 right-4 size-11"
            />
          </div>

          <div className="flex flex-col">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-muted py-1 pr-3 pl-2.5 text-xs font-semibold text-foreground">
              <span
                aria-hidden="true"
                className={cn(
                  "size-1.5 rounded-full",
                  available ? "bg-primary" : "bg-muted-foreground"
                )}
              />
              {dog.availability}
            </span>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground uppercase sm:text-5xl">
              {dog.name}
            </h1>

            <p className="mt-2 text-lg text-muted-foreground">
              {dog.breed} · {dog.sex} · {formatAge(dog.ageMonths)}
            </p>

            <p className="mt-6 text-3xl font-bold text-foreground tabular-nums">
              {formatPrice(dog.price)}
            </p>

            <p className="mt-6 text-pretty text-foreground/80">
              {dog.summary}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {dog.temperament.map((trait) => (
                <li
                  key={trait}
                  className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                >
                  {trait}
                </li>
              ))}
            </ul>

            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-border ring-1 ring-border">
              {facts.map((fact) => (
                <div key={fact.label} className="bg-card p-4">
                  <dt className="text-xs text-muted-foreground">
                    {fact.label}
                  </dt>
                  <dd className="mt-0.5 font-semibold text-foreground">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/contact"
                className={buttonVariants({
                  size: "lg",
                  className: "flex-1",
                })}
              >
                {available
                  ? `Demander à rencontrer ${dog.name}`
                  : "Être prévenu si disponible"}
              </Link>

              <a
                href={contactDetails.phoneHref}
                className={buttonVariants({
                  size: "lg",
                  variant: "outline",
                })}
              >
                <Phone size={18} />
                Appeler
              </a>
            </div>

            <p className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin size={15} className="shrink-0" />
              {dog.location}
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <section aria-labelledby="presentation-title">
            <h2
              id="presentation-title"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              Sa présentation
            </h2>

            <p className="mt-4 max-w-prose text-pretty text-foreground/80">
              {dog.description}
            </p>
          </section>

          <section
            aria-labelledby="inclus-title"
            className="rounded-3xl bg-card p-6 ring-1 ring-border"
          >
            <h2
              id="inclus-title"
              className="text-lg font-semibold text-foreground"
            >
              Compris dans le prix
            </h2>

            <ul className="mt-4 flex flex-col gap-3">
              {dog.included.map((item) => (
                <IncludedRow key={item} icon={CheckCircle} label={item} />
              ))}
            </ul>
          </section>
        </div>

        {otherDogs.length > 0 && (
          <section aria-labelledby="autres-chiens-title" className="mt-16">
            <h2
              id="autres-chiens-title"
              className="mb-6 text-2xl font-bold tracking-tight text-foreground"
            >
              Nos autres chiens
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otherDogs.map((item) => (
                <DogCard key={item.id} dog={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </SiteLayout>
  );
}

function IncludedRow({ icon: Icon, label }: { icon: Icon; label: string }) {
  return (
    <li className="flex items-start gap-2.5 text-sm text-foreground/80">
      <Icon
        size={18}
        weight="duotone"
        className="mt-px shrink-0 text-primary"
      />
      {label}
    </li>
  );
}
