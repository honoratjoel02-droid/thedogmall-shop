import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { MagnifyingGlass, X } from "@phosphor-icons/react";

import SiteLayout from "../components/site/SiteLayout";
import ProductCard from "../components/site/ProductCard";
import { Button } from "../components/ui/button";
import { mockProducts } from "../data/mockProducts";
import type { ProductCategory } from "../types/product";

const categories: ProductCategory[] = [
  "Alimentation",
  "Jouets",
  "Laisses & Colliers",
  "Hygiène",
  "Accessoires",
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("categorie");
  const searchTerm = searchParams.get("recherche") ?? "";

  const products = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return mockProducts.filter((product) => {
      const matchesCategory =
        !activeCategory || product.category === activeCategory;

      const matchesSearch =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

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

  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Nos produits
        </h1>

        <p className="mt-1 text-muted-foreground">
          {products.length} produit{products.length > 1 ? "s" : ""}
          {activeCategory ? ` dans « ${activeCategory} »` : ""}
          {searchTerm ? ` pour « ${searchTerm} »` : ""}
        </p>

        <div className="mt-6 flex items-center gap-2 rounded-full border border-input bg-card px-4 py-2.5 sm:max-w-sm">
          <MagnifyingGlass size={16} className="shrink-0 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => updateSearch(event.target.value)}
            placeholder="Rechercher un produit..."
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          {searchTerm && (
            <button
              type="button"
              aria-label="Effacer la recherche"
              className="shrink-0 text-muted-foreground hover:text-foreground"
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
            onClick={() => selectCategory(null)}
          >
            Tous
          </Button>

          {categories.map((category) => (
            <Button
              key={category}
              variant={
                activeCategory === category ? "default" : "outline"
              }
              size="sm"
              onClick={() => selectCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {products.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-border bg-card/50 py-20 text-center text-muted-foreground">
            Aucun produit ne correspond à votre recherche.
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
