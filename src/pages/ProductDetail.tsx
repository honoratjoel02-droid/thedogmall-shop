import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Minus, Plus } from "@phosphor-icons/react";

import SiteLayout from "../components/site/SiteLayout";
import ProductCard from "../components/site/ProductCard";
import MediaGallery from "../components/site/MediaGallery";
import MediaFallback from "../components/site/MediaFallback";
import FavoriteButton from "../components/site/FavoriteButton";
import WhatsAppButton from "../components/site/WhatsAppButton";
import { Button } from "../components/ui/button";
import { useCart } from "../hooks/useCart";
import { products } from "../data/products";
import { formatPrice } from "../lib/format";
import { productMessage } from "../lib/whatsapp";
import { productPhotos } from "../lib/media";
import { productMeta } from "../lib/seo";
import { categoryIcons } from "../lib/categoryIcons";

export default function ProductDetail() {
  const { productId } = useParams();
  const { addItem, openDrawer } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((item) => item.id === productId);

  if (!product) {
    return <Navigate to="/boutique" replace />;
  }

  const relatedProducts = products
    .filter(
      (item) =>
        item.category === product.category && item.id !== product.id
    )
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity);
    openDrawer();
  };

  return (
    <SiteLayout meta={productMeta(product)}>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-12">
        <nav
          aria-label="Fil d'Ariane"
          className="mb-6 text-sm text-muted-foreground"
        >
          <Link
            to="/boutique"
            className="transition-colors hover:text-foreground"
          >
            Boutique
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-10 md:grid-cols-2">
          <div className="relative">
            <MediaGallery
              photos={productPhotos(product)}
              alt={product.name}
              imageClassName="aspect-square rounded-3xl"
              fallback={
                <MediaFallback
                  icon={categoryIcons[product.category]}
                  label={product.name}
                  className="aspect-square w-full rounded-3xl"
                  iconSize={96}
                />
              }
            />

            <FavoriteButton
              kind="product"
              id={product.id}
              label={product.name}
              size={20}
              className="absolute top-4 right-4 size-11"
            />
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xs font-medium tracking-wide text-primary uppercase">
              {product.category}
            </span>

            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {product.name}
            </h1>

            <p className="text-2xl font-bold text-foreground">
              {formatPrice(product.price)}
            </p>

            <p className="text-muted-foreground">
              {product.description}
            </p>

            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center rounded-xl border border-input">
                <button
                  type="button"
                  aria-label="Diminuer la quantité"
                  className="flex size-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
                  onClick={() =>
                    setQuantity((q) => Math.max(1, q - 1))
                  }
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>

                <span className="w-8 text-center font-medium text-foreground">
                  {quantity}
                </span>

                <button
                  type="button"
                  aria-label="Augmenter la quantité"
                  className="flex size-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>

              <Button
                size="lg"
                className="h-10 flex-1"
                onClick={handleAddToCart}
              >
                Ajouter au panier
              </Button>
            </div>

            <WhatsAppButton
              size="lg"
              className="mt-3 h-10 w-full"
              message={productMessage(product)}
            />

            <p className="mt-3 text-sm text-muted-foreground">
              Livraison sous 24 h à Abidjan, paiement à la livraison.
            </p>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold text-foreground">
              Vous aimerez aussi
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
