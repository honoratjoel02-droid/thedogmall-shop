import { Link } from "react-router-dom";
import { Plus } from "@phosphor-icons/react";

import type { Product } from "../../types/product";
import { Button } from "../ui/button";
import ProductImage from "./ProductImage";
import FavoriteButton from "./FavoriteButton";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../lib/format";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, openDrawer } = useCart();

  function handleAddToCart() {
    addItem(product);
    openDrawer();
  }

  return (
    <article className="group flex flex-col">
      <div className="relative">
        <Link
          to={`/boutique/${product.id}`}
          className="block overflow-hidden rounded-2xl"
        >
          <ProductImage
            product={product}
            className="aspect-square w-full transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
            iconSize={56}
          />
        </Link>

        <FavoriteButton
          kind="product"
          id={product.id}
          label={product.name}
          className="absolute top-3 right-3"
        />
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <p className="text-xs font-medium text-muted-foreground">
          {product.category}
        </p>

        <h3 className="mt-1 font-semibold text-balance text-foreground">
          <Link
            to={`/boutique/${product.id}`}
            className="transition-colors hover:text-primary"
          >
            {product.name}
          </Link>
        </h3>

        <p className="mt-1.5 line-clamp-2 text-sm text-pretty text-muted-foreground">
          {product.description}
        </p>

        <p className="mt-3 text-lg font-bold text-foreground tabular-nums">
          {formatPrice(product.price)}
        </p>

        {/* Bouton épinglé en bas pour que les CTA s'alignent d'une carte à
            l'autre, quelle que soit la longueur du nom du produit. */}
        <div className="mt-auto pt-4">
          <Button className="w-full" onClick={handleAddToCart}>
            <Plus size={14} weight="bold" />
            Ajouter au panier
          </Button>
        </div>
      </div>
    </article>
  );
}
