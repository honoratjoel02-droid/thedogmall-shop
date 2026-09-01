import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bone,
  BowlFood,
  ChatCircleText,
  Dog,
  Medal,
  Newspaper,
  SealCheck,
  ShoppingBag,
  Truck,
  type Icon,
} from "@phosphor-icons/react";

import SiteLayout from "../components/site/SiteLayout";
import SectionHeader from "../components/site/SectionHeader";
import HeroVisual from "../components/site/HeroVisual";
import DogCard from "../components/site/DogCard";
import ProductCard from "../components/site/ProductCard";
import Reveal from "../components/site/Reveal";
import Newsletter from "../components/site/Newsletter";
import { buttonVariants } from "../components/ui/button";
import { dogs } from "../data/dogs";
import { essentialProductIds, mockProducts } from "../data/mockProducts";
import { articles } from "../data/articles";
import { formatArticleDate } from "../lib/format";
import { homeMeta } from "../lib/seo";
import type { FoodStage } from "../types/product";

const universes: {
  icon: Icon;
  title: string;
  tagline: string;
  linkLabel: string;
  to: string;
  featured?: boolean;
}[] = [
  {
    icon: Dog,
    title: "Chiens",
    tagline: "Trouvez votre futur compagnon.",
    linkLabel: "Découvrir les chiens",
    to: "/chiens",
    featured: true,
  },
  {
    icon: Bone,
    title: "Accessoires",
    tagline: "Tout ce qu'il faut pour son quotidien.",
    linkLabel: "Voir les accessoires",
    to: "/accessoires",
  },
  {
    icon: BowlFood,
    title: "Alimentation",
    tagline: "Une alimentation adaptée à chaque étape.",
    linkLabel: "Découvrir l'alimentation",
    to: "/alimentation",
  },
];

const foodStages: FoodStage[] = [
  "Chiots",
  "Adultes",
  "Friandises",
  "Alimentation spécialisée",
];

const commitments: { icon: Icon; title: string; description: string }[] = [
  {
    icon: Medal,
    title: "Sélection",
    description:
      "Des produits choisis pour les chiens, pas empilés pour remplir un rayon.",
  },
  {
    icon: SealCheck,
    title: "Qualité",
    description:
      "Nous privilégions des références fiables, testées avant d'entrer au catalogue.",
  },
  {
    icon: Truck,
    title: "Livraison",
    description:
      "Livraison dans tout Abidjan sous 24 h, et partout ailleurs en Côte d'Ivoire.",
  },
  {
    icon: ChatCircleText,
    title: "Accompagnement",
    description:
      "Une équipe joignable par téléphone pour vous guider avant et après l'achat.",
  },
];

const homeDogs = dogs.slice(0, 4);

const essentials = essentialProductIds
  .map((id) => mockProducts.find((product) => product.id === id))
  .filter((product) => product !== undefined);

const homeArticles = articles.slice(0, 5);

export default function Home() {
  return (
    <SiteLayout meta={homeMeta}>
      {/* 1. Hero */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-12 pb-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pt-20 lg:pb-24">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
              Abidjan · Chiens, boutique & alimentation
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
              Tout pour votre compagnon, au même endroit.
            </h1>

            <p className="mt-5 max-w-lg text-lg text-pretty text-muted-foreground">
              Découvrez notre sélection de chiens, accessoires et aliments
              pour offrir le meilleur à votre compagnon.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to="/chiens"
                className={buttonVariants({ size: "lg", className: "group" })}
              >
                <Dog size={19} weight="duotone" />
                Découvrir nos chiens
                <ArrowRight
                  size={16}
                  weight="bold"
                  className="transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/boutique"
                className={buttonVariants({
                  size: "lg",
                  variant: "outline",
                })}
              >
                <ShoppingBag size={19} weight="duotone" />
                Visiter la boutique
              </Link>
            </div>

            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <li>Livraison sous 24 h à Abidjan</li>
              <li>Paiement à la livraison</li>
              <li>Chiens vaccinés et identifiés</li>
            </ul>
          </div>

          <HeroVisual className="mx-auto w-full max-w-md lg:max-w-none" />
        </div>
      </section>

      {/* 2. Les trois univers */}
      <Reveal>
        <section
          aria-labelledby="univers-title"
          className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24"
        >
          <h2 id="univers-title" className="sr-only">
            Nos trois univers
          </h2>

          <div className="grid gap-4 lg:grid-cols-2 lg:grid-rows-2">
            {universes.map((universe) => {
              const UniverseIcon = universe.icon;

              return (
                <Link
                  key={universe.to}
                  to={universe.to}
                  className={
                    universe.featured
                      ? "group flex flex-col justify-between gap-10 rounded-3xl bg-accent p-8 ring-1 ring-border transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary hover:text-primary-foreground lg:row-span-2 lg:p-10"
                      : "group flex flex-col justify-between gap-10 rounded-3xl bg-card p-8 ring-1 ring-border transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-accent"
                  }
                >
                  <UniverseIcon
                    size={universe.featured ? 40 : 32}
                    weight="duotone"
                    className={
                      universe.featured
                        ? "text-primary transition-colors duration-500 group-hover:text-primary-foreground"
                        : "text-primary"
                    }
                  />

                  <div>
                    <h3
                      className={
                        universe.featured
                          ? "text-2xl font-bold tracking-tight text-accent-foreground uppercase transition-colors duration-500 group-hover:text-primary-foreground sm:text-3xl"
                          : "text-xl font-bold tracking-tight text-foreground uppercase"
                      }
                    >
                      {universe.title}
                    </h3>

                    <p
                      className={
                        universe.featured
                          ? "mt-2 text-pretty text-accent-foreground/75 transition-colors duration-500 group-hover:text-primary-foreground/80"
                          : "mt-2 text-pretty text-muted-foreground"
                      }
                    >
                      {universe.tagline}
                    </p>

                    <span
                      className={
                        universe.featured
                          ? "mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent-foreground transition-colors duration-500 group-hover:text-primary-foreground"
                          : "mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
                      }
                    >
                      {universe.linkLabel}
                      <ArrowRight
                        size={15}
                        weight="bold"
                        className="transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </Reveal>

      {/* 3. Chiens disponibles */}
      <Reveal>
        <section
          aria-labelledby="chiens-title"
          className="border-y border-border bg-card"
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <SectionHeader
              icon={Dog}
              titleId="chiens-title"
              title="Nos chiens disponibles"
              description="Découvrez nos compagnons actuellement disponibles."
              link={{ label: "Tous les chiens", to: "/chiens" }}
            />

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {homeDogs.map((dog) => (
                <DogCard key={dog.id} dog={dog} />
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* 4. Boutique */}
      <Reveal>
        <section
          aria-labelledby="indispensables-title"
          className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24"
        >
          <SectionHeader
            icon={ShoppingBag}
            titleId="indispensables-title"
            title="Les indispensables"
            description="Le nécessaire du quotidien, celui que l'on rachète et que l'on garde des années."
            link={{ label: "Toute la boutique", to: "/boutique" }}
          />

          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {essentials.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </Reveal>

      {/* 5. Alimentation */}
      <Reveal>
        <section
          aria-labelledby="alimentation-title"
          className="dot-grid border-y border-border bg-accent"
        >
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:py-24">
            <div>
              <span className="flex size-12 items-center justify-center rounded-2xl bg-card text-primary ring-1 ring-border">
                <BowlFood size={24} weight="duotone" />
              </span>

              <h2
                id="alimentation-title"
                className="mt-6 text-3xl font-bold tracking-tight text-balance text-accent-foreground sm:text-4xl"
              >
                Bien nourrir, c'est prendre soin.
              </h2>

              <p className="mt-4 max-w-md text-pretty text-accent-foreground/75">
                Une sélection d'aliments et de friandises pour accompagner
                votre chien au quotidien.
              </p>
            </div>

            <div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {foodStages.map((stage) => (
                  <li key={stage}>
                    <Link
                      to={`/alimentation?etape=${encodeURIComponent(stage)}`}
                      className="group flex items-center justify-between gap-3 rounded-2xl bg-card px-5 py-4 text-sm font-semibold text-foreground ring-1 ring-border transition-colors duration-300 hover:text-primary"
                    >
                      {stage}
                      <ArrowRight
                        size={15}
                        weight="bold"
                        className="shrink-0 text-primary transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1"
                      />
                    </Link>
                  </li>
                ))}
              </ul>

              <Link
                to="/alimentation"
                className={buttonVariants({
                  size: "lg",
                  className: "group mt-6",
                })}
              >
                Voir toute l'alimentation
                <ArrowRight
                  size={16}
                  weight="bold"
                  className="transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* 6. Pourquoi THE DOG MALL */}
      <Reveal>
        <section
          aria-labelledby="engagements-title"
          className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24"
        >
          <h2
            id="engagements-title"
            className="text-2xl font-bold tracking-tight text-balance text-foreground sm:text-3xl"
          >
            Pourquoi THE DOG MALL ?
          </h2>

          <ul className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {commitments.map((commitment) => {
              const CommitmentIcon = commitment.icon;

              return (
                <li key={commitment.title}>
                  <CommitmentIcon
                    size={26}
                    weight="duotone"
                    className="text-primary"
                  />

                  <h3 className="mt-4 font-semibold text-foreground">
                    {commitment.title}
                  </h3>

                  <p className="mt-1.5 text-sm text-pretty text-muted-foreground">
                    {commitment.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
      </Reveal>

      {/* 7. Bannière promotionnelle */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:pb-24">
          <div className="dot-grid flex flex-col gap-6 rounded-[2rem] bg-primary px-6 py-14 text-primary-foreground sm:px-12 lg:flex-row lg:items-end lg:justify-between lg:py-20">
            <div>
              <h2 className="max-w-lg text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                Le meilleur pour votre compagnon.
              </h2>

              <p className="mt-3 text-primary-foreground/80">
                Découvrez notre boutique.
              </p>
            </div>

            <Link
              to="/boutique"
              className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-primary-foreground py-2 pr-2 pl-6 text-sm font-semibold text-primary transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
            >
              Explorer maintenant
              <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5">
                <ArrowRight size={16} weight="bold" />
              </span>
            </Link>
          </div>
        </section>
      </Reveal>

      {/* 8. Conseils canins */}
      <Reveal>
        <section
          aria-labelledby="conseils-title"
          className="border-t border-border bg-card"
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <SectionHeader
              icon={Newspaper}
              titleId="conseils-title"
              title="Conseils & actualités"
              description="Les réponses aux questions qu'on nous pose le plus souvent en boutique."
              link={{ label: "Tous les conseils", to: "/conseils" }}
            />

            <ul className="mt-10 grid gap-x-10 sm:grid-cols-2">
              {homeArticles.map((article) => (
                <li key={article.id} className="border-t border-border">
                  <Link
                    to={`/conseils/${article.id}`}
                    className="group flex flex-col gap-1.5 py-6"
                  >
                    <span className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                      {article.category}
                    </span>

                    <h3 className="font-semibold text-balance text-foreground transition-colors group-hover:text-primary">
                      {article.title}
                    </h3>

                    <span className="text-xs text-muted-foreground">
                      {formatArticleDate(article.publishedAt)} ·{" "}
                      {article.readingMinutes} min de lecture
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </Reveal>

      <Newsletter />
    </SiteLayout>
  );
}
