import { useState } from "react";

import type { Product } from "../../types/product";
import { categoryIcons } from "../../lib/categoryIcons";
import { cn } from "../../lib/utils";

type ProductImageProps = {
  product: Pick<Product, "id" | "name" | "category">;
  className?: string;
  iconSize?: number;
};

export default function ProductImage({
  product,
  className,
  iconSize = 40,
}: ProductImageProps) {
  const [failed, setFailed] = useState(false);
  const Icon = categoryIcons[product.category];

  if (failed) {
    return (
      <div
        className={cn(
          "media-fallback flex items-center justify-center text-primary/50",
          className
        )}
        role="img"
        aria-label={`${product.name}, photo à venir`}
      >
        <Icon size={iconSize} weight="duotone" />
      </div>
    );
  }

  return (
    <img
      src={`/products/${product.id}.jpg`}
      alt={product.name}
      loading="lazy"
      onError={() => setFailed(true)}
      className={cn("media-fallback object-cover", className)}
    />
  );
}
