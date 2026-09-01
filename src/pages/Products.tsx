import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { MagnifyingGlass, X } from "@phosphor-icons/react";

import SiteLayout from "../components/site/SiteLayout";
import PageHeader from "../components/site/PageHeader";
import ProductCard from "../components/site/ProductCard";
import { Button } from "../components/ui/button";
import { mockProducts } from "../data/mockProducts";
import type { ProductCategory } from "../types/product";
import { pageMeta } from "../lib/seo";

/**
 * Deux entrées mènent à cette page : « Boutique », qui montre tout le
 * catalogue, et « Accessoires », qui masque le rayon alimentation traité
 * par sa propre page.
 */
export type ShopUniverse = "boutique" | "accessoires";

const allCategories: ProductCategory[] = [
  "Alimentation",
  "Jouets",
  "Laisses & Colliers",
  "Hygiène",
  "Accessoires",
];

const copy: Record<
  ShopUniverse,
  { eyebrow: string; title: string; description: string }
> = {
  boutique: {
    eyebrow: "Boutique",
    title: "Tout le catalogue",
    description:
      "Alimentation, couchage, laisses, jouets et hygiène : les références que nous utilisons et recommandons au quotidien.",
  },
  accessoires: {
    eyebrow: "Accessoires",
    title: "Tout ce qu'il faut pour son quotidien",
    description:
      "Couchage, promenade, jeu et toilettage. Le rayon alimentation a sa propre page.",
  },
};

type ProductsProps = {
  universe?: ShopUniverse;
};

export default function Products({ universe = "boutique" }: ProductsProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("categorie");
  const searchTerm = searchParams.get("recherche") ?? "";

  const categories = useMemo(
    () =>
      universe === "accessoires"
        ? allCategories.filter((category) => category !== "Alimentation")
        : allCategories,
    [universe]
  );

  const products = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return mockProducts.filter((product) => {
      const inUniverse =
        universe === "boutique" || product.category !== "Alimentation";

      const matchesCategory =
        !activeCategory || product.category === activeCategory;

      const matchesSearch =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term);

      return inUniverse && matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm, universe]);

  function selectCategory(category: string | null) {
    const next = new URLSearchParams(searchParams);
    if (category) {
      next.set("categorie", category);
    } else {
      next.delete("categorie");
    }
    setSearchParams(next);
  }

  function updateSearch(term: string) {
    const next = new URLSearchParams(searchParams);
    if (term) {
      next.set("recherche", term);
    } else {
      next.delete("recherche");
    }
    setSearchParams(next);
  }

  const { eyebrow, title, description } = copy[universe];

  return (
    <SiteLayout
      meta={pageMeta(universe === "accessoires" ? "/accessoires" : "/boutique")}
    >
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
      >
        <div className="mt-8 flex items-center gap-2 rounded-full border border-input bg-background px-4 py-2.5 sm:max-w-sm">
          <MagnifyingGlass
            size={16}
            className="shrink-0 text-muted-foreground"
          />
          <input
            type="text"
            value={searchTerm}
            aria-label="Rechercher un produit"
            onChange={(event) => updateSearch(event.target.value)}
            placeholder="Rechercher un produit..."
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          {searchTerm && (
            <button
              type="button"
              aria-label="Effacer la recherche"
              className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => updateSearch("")}
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button
            variant={activeCategory ? "outline" : "default"}
            size="sm"
            aria-pressed={!activeCategory}
            onClick={() => selectCategory(null)}
          >
            Tous
          </Button>

          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              aria-pressed={activeCategory === category}
              onClick={() => selectCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </PageHeader>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {products.length} produit{products.length > 1 ? "s" : ""}
          {activeCategory ? ` dans « ${activeCategory} »` : ""}
          {searchTerm ? ` pour « ${searchTerm} »` : ""}
        </p>

        {products.length > 0 ? (
          <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-dashed border-border py-20 text-center">
            <p className="font-medium text-foreground">
              Aucun produit ne correspond à votre recherche.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Essayez un autre mot, ou revenez à tout le catalogue.
            </p>
            <Button
              variant="outline"
              className="mt-5"
              onClick={() => setSearchParams(new URLSearchParams())}
            >
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
