import { useState } from "react";

import type { Product } from "../../types/product";
import { categoryIcons } from "../../lib/categoryIcons";
import { productPhotos } from "../../lib/media";
import { cn } from "../../lib/utils";
import MediaFallback from "./MediaFallback";

type ProductImageProps = {
  product: Pick<Product, "id" | "name" | "category" | "images">;
  className?: string;
  iconSize?: number;
};

/** Première photo du produit, pour les cartes de liste et le panier. */
export default function ProductImage({
  product,
  className,
  iconSize = 40,
}: ProductImageProps) {
  const [failed, setFailed] = useState(false);
  const [photo] = productPhotos(product);

  if (failed) {
    return (
      <MediaFallback
        icon={categoryIcons[product.category]}
        label={product.name}
        className={className}
        iconSize={iconSize}
      />
    );
  }

  return (
    <img
      src={photo}
      alt={product.name}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={cn("media-fallback object-cover", className)}
    />
  );
}
