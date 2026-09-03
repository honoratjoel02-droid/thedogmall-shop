import { useState } from "react";

import { cn } from "../../lib/utils";

type HeroVisualProps = {
  className?: string;
};

/**
 * Visuel du hero. Déposez la photo dans `public/hero-chien.jpg` : tant
 * qu'elle n'est pas là, on affiche un cadre de marque plutôt qu'un trou
 * dans la mise en page.
 */
export default function HeroVisual({ className }: HeroVisualProps) {
  const [failed, setFailed] = useState(false);

  return (
    // Cadre double : coque extérieure discrète, visuel encastré à l'intérieur.
    <div
      className={cn(
        "rounded-[2rem] bg-card p-2 ring-1 ring-border",
        className
      )}
    >
      {failed ? (
        <div className="dot-grid flex aspect-4/5 items-center justify-center rounded-[1.5rem] bg-accent sm:aspect-square lg:aspect-4/5">
          <img
            src="/logo.png"
            alt="THE DOG MALL"
            width={870}
            height={670}
            className="w-2/3 max-w-xs"
          />
        </div>
      ) : (
        <img
          src="/hero-chien.jpg"
          alt="Un chien attendant son maître dans la boutique THE DOG MALL"
          width={1200}
          height={1500}
          onError={() => setFailed(true)}
          className="media-fallback aspect-4/5 w-full rounded-[1.5rem] object-cover sm:aspect-square lg:aspect-4/5"
        />
      )}
    </div>
  );
}
