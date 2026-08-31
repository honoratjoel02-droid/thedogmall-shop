import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

import type { Product } from "../../types/product";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
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
    <Card className="group flex flex-col shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:ring-primary/30">
      <CardContent className="flex flex-1 flex-col gap-3">
        <Link
          to={`/produits/${product.id}`}
          className="flex aspect-square items-center justify-center rounded-2xl bg-accent text-6xl transition-transform duration-300 group-hover:scale-105"
        >
          {product.emoji}
        </Link>

        <span className="text-xs font-medium tracking-wide text-primary uppercase">
          {product.category}
        </span>

        <Link to={`/produits/${product.id}`}>
          <h3 className="font-semibold text-foreground hover:text-primary">
            {product.name}
          </h3>
        </Link>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-foreground">
            {product.price.toFixed(2)} €
          </span>

          <Button size="sm" onClick={handleAddToCart}>
            <Plus size={14} />
            Ajouter
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
