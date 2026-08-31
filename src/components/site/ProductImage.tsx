import { useState } from "react";

import type { Product } from "../../types/product";
import { cn } from "../../lib/utils";

type ProductImageProps = {
  product: Pick<Product, "id" | "name" | "emoji">;
  className?: string;
  emojiClassName?: string;
};

export default function ProductImage({
  product,
  className,
  emojiClassName,
}: ProductImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-accent",
          className
        )}
      >
        <span className={emojiClassName}>{product.emoji}</span>
      </div>
    );
  }

  return (
    <img
      src={`/products/${product.id}.jpg`}
      alt={product.name}
      onError={() => setFailed(true)}
      className={cn("bg-accent object-cover", className)}
    />
  );
}
