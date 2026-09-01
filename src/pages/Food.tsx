import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Bone } from "@phosphor-icons/react";

import SiteLayout from "../components/site/SiteLayout";
import ProductCard from "../components/site/ProductCard";
import Reveal from "../components/site/Reveal";
import { Button } from "../components/ui/button";
import { mockProducts } from "../data/mockProducts";
import type { FoodStage } from "../types/product";
import { pageMeta } from "../lib/seo";

const stages: FoodStage[] = [
  "Chiots",
  "Adultes",
  "Friandises",
  "Alimentation spécialisée",
];

const stageNotes: Record<FoodStage, string> = {
  Chiots: "Jusqu'à douze mois, pendant toute la croissance.",
  Adultes: "La ration quotidienne, du premier au septième anniversaire.",
  Friandises: "Pour l'éducation, la mastication et l'hygiène dentaire.",
  "Alimentation spécialisée":
    "Digestion sensible, allergies, stérilisation.",
};

const foodProducts = mockProducts.filter(
  (product) => product.category === "Alimentation"
);

export default function Food() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeStage = searchParams.get("etape");

  const products = useMemo(
    () =>
      activeStage
        ? foodProducts.filter(
            (product) => product.foodStage === activeStage
          )
        : foodProducts,
    [activeStage]
  );

  function selectStage(stage: string | null) {
    const next = new URLSearchParams(searchParams);
    if (stage) {
      next.set("etape", stage);
    } else {
      next.delete("etape");
    }
    setSearchParams(next);
  }

  return (
    <SiteLayout meta={pageMeta("/alimentation")}>
      <header className="dot-grid border-b border-border bg-accent">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-card text-primary ring-1 ring-border">
            <Bone size={24} weight="duotone" />
          </span>

          <h1 className="mt-6 max-w-2xl text-4xl font-bold tracking-tight text-balance text-accent-foreground sm:text-5xl">
            Bien nourrir, c'est prendre soin.
          </h1>

          <p className="mt-4 max-w-xl text-pretty text-accent-foreground/75">
            Une sélection d'aliments et de friandises pour accompagner
            votre chien au quotidien, de ses premières semaines à son âge
            adulte.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeStage ? "outline" : "default"}
            size="sm"
            aria-pressed={!activeStage}
            onClick={() => selectStage(null)}
          >
            Tout
          </Button>

          {stages.map((stage) => (
            <Button
              key={stage}
              variant={activeStage === stage ? "default" : "outline"}
              size="sm"
              aria-pressed={activeStage === stage}
              onClick={() => selectStage(stage)}
            >
              {stage}
            </Button>
          ))}
        </div>

        {activeStage && (
          <p className="mt-4 text-sm text-muted-foreground">
            {stageNotes[activeStage as FoodStage] ??
              "Étape inconnue, voici tout le rayon."}
          </p>
        )}

        <Reveal>
          <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Reveal>

        {products.length === 0 && (
          <div className="mt-8 rounded-3xl border border-dashed border-border py-20 text-center">
            <p className="font-medium text-foreground">
              Ce rayon est en cours de réassort.
            </p>
            <Button
              variant="outline"
              className="mt-5"
              onClick={() => selectStage(null)}
            >
              Voir toute l'alimentation
            </Button>
          </div>
        )}

        <section
          aria-labelledby="transition-title"
          className="mt-16 grid gap-8 rounded-3xl bg-card p-6 ring-1 ring-border sm:p-10 lg:grid-cols-[1fr_1.2fr]"
        >
          <div>
            <h2
              id="transition-title"
              className="text-xl font-bold tracking-tight text-balance text-foreground"
            >
              Changer d'aliment sans déranger la digestion
            </h2>

            <p className="mt-2 text-pretty text-muted-foreground">
              Une transition trop rapide provoque presque toujours des
              selles molles. Étalez-la sur sept jours.
            </p>
          </div>

          <ol className="flex flex-col gap-4">
            {[
              "Jours 1 et 2 : un quart de nouvel aliment, trois quarts d'ancien.",
              "Jours 3 et 4 : moitié-moitié.",
              "Jours 5 et 6 : trois quarts de nouvel aliment.",
              "Jour 7 : la ration complète avec le nouvel aliment.",
            ].map((step, index) => (
              <li key={step} className="flex gap-3 text-sm text-foreground/80">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground tabular-nums">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </SiteLayout>
  );
}
