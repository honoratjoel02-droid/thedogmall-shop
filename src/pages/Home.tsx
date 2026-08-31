import { Link } from "react-router-dom";
import { Truck, ShieldCheck, HeartHandshake } from "lucide-react";

import SiteLayout from "../components/site/SiteLayout";
import ProductCard from "../components/site/ProductCard";
import Reveal from "../components/site/Reveal";
import Newsletter from "../components/site/Newsletter";
import { LogoMark } from "../components/site/Logo";
import { buttonVariants } from "../components/ui/button";
import { mockProducts } from "../data/mockProducts";
import type { ProductCategory } from "../types/product";

const categories: {
  label: ProductCategory;
  emoji: string;
}[] = [
  { label: "Alimentation", emoji: "🍖" },
  { label: "Jouets", emoji: "🎾" },
  { label: "Laisses & Colliers", emoji: "🦮" },
  { label: "Hygiène", emoji: "🧴" },
  { label: "Accessoires", emoji: "🛏️" },
];

const featuredProducts = mockProducts.slice(0, 4);

const offers = [
  {
    emoji: "🚚",
    title: "Livraison gratuite",
    description: "Dès 50 € d'achat, partout en France",
  },
  {
    emoji: "🎉",
    title: "-10 % sur votre 1ère commande",
    description: "Avec le code BIENVENUE10",
  },
];

const valueProps = [
  {
    icon: Truck,
    title: "Livraison rapide",
    description: "Expédié sous 24h, chez vous en 2 à 3 jours ouvrés.",
  },
  {
    icon: ShieldCheck,
    title: "Produits de qualité",
    description: "Sélectionnés avec soin pour le bien-être de votre chien.",
  },
  {
    icon: HeartHandshake,
    title: "Satisfait ou remboursé",
    description: "30 jours pour changer d'avis, sans question.",
  },
];

export default function Home() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-gradient-to-b from-accent/60 to-background">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 pt-16 pb-24 lg:grid-cols-2 lg:items-center lg:pt-20">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              🐾 Livraison gratuite dès 50 € d'achat
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Tout ce dont votre chien a besoin, au même endroit
            </h1>

            <p className="mt-4 max-w-lg text-lg text-muted-foreground">
              Alimentation, jouets, laisses et accessoires
              soigneusement choisis pour le bonheur de votre
              compagnon.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/produits"
                className={buttonVariants({ size: "lg" })}
              >
                Découvrir les produits
              </Link>

              <Link
                to="/a-propos"
                className={buttonVariants({
                  size: "lg",
                  variant: "outline",
                })}
              >
                En savoir plus
              </Link>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <div className="absolute inset-6 rounded-[3rem] bg-primary/10" />

              <div className="absolute inset-0 flex items-center justify-center">
                <LogoMark className="size-24 rounded-3xl shadow-xl" />
              </div>

              <div className="absolute top-[6%] left-[2%] w-2/5 rotate-[-6deg] rounded-2xl bg-card p-4 text-center shadow-lg ring-1 ring-border transition-transform duration-300 hover:-translate-y-1 hover:rotate-0">
                <span className="text-4xl">🍖</span>
                <p className="mt-1 text-xs font-semibold text-foreground">
                  Alimentation
                </p>
              </div>

              <div className="absolute top-0 right-0 w-2/5 rotate-[5deg] rounded-2xl bg-card p-4 text-center shadow-lg ring-1 ring-border transition-transform duration-300 hover:-translate-y-1 hover:rotate-0">
                <span className="text-4xl">🎾</span>
                <p className="mt-1 text-xs font-semibold text-foreground">
                  Jouets
                </p>
              </div>

              <div className="absolute bottom-[6%] left-[14%] w-2/5 rotate-[4deg] rounded-2xl bg-card p-4 text-center shadow-lg ring-1 ring-border transition-transform duration-300 hover:-translate-y-1 hover:rotate-0">
                <span className="text-4xl">🦮</span>
                <p className="mt-1 text-xs font-semibold text-foreground">
                  Laisses
                </p>
              </div>

              <div className="absolute right-[4%] bottom-0 w-1/3 rotate-[-4deg] rounded-2xl bg-card p-4 text-center shadow-lg ring-1 ring-border transition-transform duration-300 hover:-translate-y-1 hover:rotate-0">
                <span className="text-3xl">🛏️</span>
                <p className="mt-1 text-xs font-semibold text-foreground">
                  Confort
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-10 max-w-6xl px-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {offers.map((offer) => (
            <div
              key={offer.title}
              className="flex items-center gap-4 rounded-2xl bg-card p-5 shadow-md ring-1 ring-border"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-2xl">
                {offer.emoji}
              </span>

              <div>
                <p className="font-semibold text-foreground">
                  {offer.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {offer.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Reveal>
        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-bold text-foreground">
            Nos catégories
          </h2>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {categories.map((category) => (
              <Link
                key={category.label}
                to={`/produits?categorie=${encodeURIComponent(category.label)}`}
                className="flex flex-col items-center gap-3 rounded-2xl bg-card p-6 text-center shadow-sm ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <span className="text-4xl">{category.emoji}</span>
                <span className="text-sm font-medium text-foreground">
                  {category.label}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">
              Produits populaires
            </h2>

            <Link
              to="/produits"
              className="text-sm font-medium text-primary hover:underline"
            >
              Voir tout →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="border-t border-border bg-card">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 sm:grid-cols-3">
            {valueProps.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="flex flex-col items-center gap-3 text-center">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon size={22} />
                  </div>

                  <h3 className="font-semibold text-foreground">
                    {item.title}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </Reveal>

      <Newsletter />
    </SiteLayout>
  );
}
