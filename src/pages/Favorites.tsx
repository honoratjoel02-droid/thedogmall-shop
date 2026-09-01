import { Link } from "react-router-dom";
import { Heart } from "@phosphor-icons/react";

import SiteLayout from "../components/site/SiteLayout";
import PageHeader from "../components/site/PageHeader";
import DogCard from "../components/site/DogCard";
import ProductCard from "../components/site/ProductCard";
import { buttonVariants } from "../components/ui/button";
import { useFavorites } from "../hooks/useFavorites";
import { dogs } from "../data/dogs";
import { mockProducts } from "../data/mockProducts";

export default function Favorites() {
  const { favorites, favoriteCount } = useFavorites();

  const favoriteDogs = dogs.filter((dog) =>
    favorites.dogs.includes(dog.id)
  );

  const favoriteProducts = mockProducts.filter((product) =>
    favorites.products.includes(product.id)
  );

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Ma sélection"
        title="Mes favoris"
        description="Vos favoris restent enregistrés sur cet appareil, même après avoir fermé le navigateur."
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        {favoriteCount === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border py-20 text-center">
            <Heart size={48} weight="duotone" className="text-primary/60" />

            <p className="text-lg font-semibold text-foreground">
              Vous n'avez encore rien mis de côté
            </p>

            <p className="max-w-sm text-pretty text-muted-foreground">
              Touchez le cœur sur un chien ou un produit pour le
              retrouver ici.
            </p>

            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <Link to="/chiens" className={buttonVariants()}>
                Voir les chiens
              </Link>

              <Link
                to="/boutique"
                className={buttonVariants({ variant: "outline" })}
              >
                Voir la boutique
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-16">
            {favoriteDogs.length > 0 && (
              <section aria-labelledby="favoris-chiens-title">
                <h2
                  id="favoris-chiens-title"
                  className="mb-6 text-2xl font-bold tracking-tight text-foreground"
                >
                  Chiens ({favoriteDogs.length})
                </h2>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {favoriteDogs.map((dog) => (
                    <DogCard key={dog.id} dog={dog} />
                  ))}
                </div>
              </section>
            )}

            {favoriteProducts.length > 0 && (
              <section aria-labelledby="favoris-produits-title">
                <h2
                  id="favoris-produits-title"
                  className="mb-6 text-2xl font-bold tracking-tight text-foreground"
                >
                  Produits ({favoriteProducts.length})
                </h2>

                <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {favoriteProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
