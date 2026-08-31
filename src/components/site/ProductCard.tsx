import { Link } from "react-router-dom";
import { Plus } from "@phosphor-icons/react";

import type { Product } from "../../types/product";
import { Button } from "../ui/button";
import ProductImage from "./ProductImage";
import { useCart } from "../../hooks/useCart";

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
      <Link
        to={`/produits/${product.id}`}
        className="block overflow-hidden rounded-2xl"
      >
        <ProductImage
          product={product}
          className="aspect-square w-full transition-transform duration-500 group-hover:scale-105"
          iconSize={56}
        />
      </Link>

      <div className="flex flex-1 flex-col pt-4">
        <p className="text-xs font-medium text-muted-foreground">
          {product.category}
        </p>

        <h3 className="mt-1 font-semibold text-foreground">
          <Link
            to={`/produits/${product.id}`}
            className="transition-colors hover:text-primary"
          >
            {product.name}
          </Link>
        </h3>

        <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-lg font-bold text-foreground">
            {product.price.toFixed(2)} €
          </span>

          <Button size="sm" onClick={handleAddToCart}>
            <Plus size={14} weight="bold" />
            Ajouter
          </Button>
        </div>
      </div>
    </article>
  );
}
