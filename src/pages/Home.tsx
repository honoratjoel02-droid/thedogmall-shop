import { Link } from "react-router-dom";
import {
  ArrowRight,
  Handshake,
  ShieldCheck,
  Truck,
} from "@phosphor-icons/react";

import SiteLayout from "../components/site/SiteLayout";
import ProductCard from "../components/site/ProductCard";
import Reveal from "../components/site/Reveal";
import Newsletter from "../components/site/Newsletter";
import { buttonVariants } from "../components/ui/button";
import { mockProducts } from "../data/mockProducts";
import { categoryIcons, categoryOrder } from "../lib/categoryIcons";

const featuredProducts = mockProducts.slice(0, 4);

const valueProps = [
  {
    icon: Truck,
    title: "Livraison en 2 à 3 jours",
    description: "Commande expédiée sous 24h, suivi envoyé par email.",
  },
  {
    icon: ShieldCheck,
    title: "Produits sélectionnés",
    description: "Chaque référence est testée avant d'entrer au catalogue.",
  },
  {
    icon: Handshake,
    title: "30 jours pour changer d'avis",
    description: "Retour accepté sans justification, remboursement sous 7 jours.",
  },
];

export default function Home() {
  return (
    <SiteLayout>
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pt-16 pb-20 lg:grid-cols-[1.1fr_1fr] lg:pt-24">
          <Reveal>
            <h1 className="text-4xl font-bold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
              Tout pour votre chien, au même endroit
            </h1>

            <p className="mt-5 max-w-md text-lg text-muted-foreground">
              Alimentation, jouets, laisses et accessoires choisis un par
              un pour leur qualité.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/produits"
                className={buttonVariants({ size: "lg" })}
              >
                Voir le catalogue
                <ArrowRight size={18} weight="bold" />
              </Link>

              <Link
                to="/a-propos"
                className={buttonVariants({
                  size: "lg",
                  variant: "outline",
                })}
              >
                Qui sommes-nous
              </Link>
            </div>
          </Reveal>

          <Reveal>
            <img
              src="/logo.png"
              alt="TheDogMall"
              width={870}
              height={670}
              className="mx-auto w-full max-w-md"
            />
          </Reveal>
        </div>
      </section>

      <Reveal>
        <section
          aria-labelledby="categories-title"
          className="mx-auto max-w-6xl px-6 py-16"
        >
          <div className="flex items-end justify-between gap-4">
            <h2
              id="categories-title"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              Par catégorie
            </h2>

            <Link
              to="/produits"
              className="shrink-0 text-sm font-medium text-primary hover:underline"
            >
              Tout le catalogue
            </Link>
          </div>

          <ul className="mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2">
            {categoryOrder.map((category) => {
              const Icon = categoryIcons[category];

              return (
                <li key={category} className="snap-start">
                  <Link
                    to={`/produits?categorie=${encodeURIComponent(category)}`}
                    className="flex h-full w-44 flex-col justify-between gap-8 rounded-2xl bg-card p-5 ring-1 ring-border transition-colors hover:bg-accent"
                  >
                    <Icon
                      size={28}
                      weight="duotone"
                      className="text-primary"
                    />
                    <span className="text-sm font-semibold text-foreground">
                      {category}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </Reveal>

      <Reveal>
        <section
          aria-labelledby="populaires-title"
          className="mx-auto max-w-6xl px-6 pb-16"
        >
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2
              id="populaires-title"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              Les plus commandés
            </h2>

            <Link
              to="/produits"
              className="shrink-0 text-sm font-medium text-primary hover:underline"
            >
              Voir tout
            </Link>
          </div>

          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="border-y border-border bg-card">
          <ul className="mx-auto grid max-w-6xl divide-y divide-border px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {valueProps.map((item) => {
              const Icon = item.icon;

              return (
                <li
                  key={item.title}
                  className="py-10 sm:px-8 sm:first:pl-0 sm:last:pr-0"
                >
                  <Icon size={24} weight="duotone" className="text-primary" />

                  <h3 className="mt-4 font-semibold text-foreground">
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
      </Reveal>

      <Newsletter />
    </SiteLayout>
  );
}
