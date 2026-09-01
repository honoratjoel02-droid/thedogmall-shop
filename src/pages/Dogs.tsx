import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import SiteLayout from "../components/site/SiteLayout";
import PageHeader from "../components/site/PageHeader";
import DogCard from "../components/site/DogCard";
import Reveal from "../components/site/Reveal";
import { Button, buttonVariants } from "../components/ui/button";
import { dogs } from "../data/dogs";

const filters = ["Tous", "Disponible", "Réservé"] as const;

type Filter = (typeof filters)[number];

export default function Dogs() {
  const [filter, setFilter] = useState<Filter>("Tous");

  const visibleDogs = useMemo(
    () =>
      filter === "Tous"
        ? dogs
        : dogs.filter((dog) => dog.availability === filter),
    [filter]
  );

  const availableCount = dogs.filter(
    (dog) => dog.availability === "Disponible"
  ).length;

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Nos compagnons"
        title="Nos chiens disponibles"
        description="Chaque chien est suivi par notre vétérinaire, vacciné et identifié avant son départ. Nous vous accompagnons pendant le premier mois."
      >
        <p className="mt-6 text-sm text-muted-foreground">
          {availableCount} chien{availableCount > 1 ? "s" : ""} actuellement
          disponible{availableCount > 1 ? "s" : ""} sur {dogs.length}{" "}
          présenté{dogs.length > 1 ? "s" : ""}.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {filters.map((item) => (
            <Button
              key={item}
              variant={filter === item ? "default" : "outline"}
              size="sm"
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
            </Button>
          ))}
        </div>
      </PageHeader>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        {visibleDogs.length > 0 ? (
          <Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleDogs.map((dog) => (
                <DogCard key={dog.id} dog={dog} />
              ))}
            </div>
          </Reveal>
        ) : (
          <div className="rounded-3xl border border-dashed border-border py-20 text-center">
            <p className="font-medium text-foreground">
              Aucun chien dans cette catégorie pour le moment.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Écrivez-nous pour être prévenu de la prochaine portée.
            </p>
            <Link
              to="/contact"
              className={buttonVariants({ className: "mt-5" })}
            >
              Nous contacter
            </Link>
          </div>
        )}

        <div className="mt-14 rounded-3xl bg-card p-6 ring-1 ring-border sm:p-10">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Vous cherchez une race en particulier ?
          </h2>

          <p className="mt-2 max-w-xl text-pretty text-muted-foreground">
            Dites-nous ce que vous cherchez et votre cadre de vie. Nous
            vous prévenons dès qu'un chien correspondant arrive, sans
            engagement de votre part.
          </p>

          <Link
            to="/contact"
            className={buttonVariants({ size: "lg", className: "mt-6" })}
          >
            Faire une demande
          </Link>
        </div>
      </div>
    </SiteLayout>
  );
}
