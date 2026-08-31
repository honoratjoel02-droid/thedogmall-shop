import { useState } from "react";
import { Truck, X } from "@phosphor-icons/react";

export default function PromoBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative bg-primary px-12 py-2.5 text-center text-sm font-medium text-primary-foreground">
      <span className="inline-flex items-center gap-2">
        <Truck size={16} weight="bold" className="shrink-0" />
        Livraison gratuite dès 50 € d'achat, et -10 % sur votre
        première commande avec le code{" "}
        <span className="font-bold">BIENVENUE10</span>
      </span>

      <button
        type="button"
        aria-label="Fermer le message"
        className="absolute top-1/2 right-4 -translate-y-1/2 text-primary-foreground/70 transition-colors hover:text-primary-foreground"
        onClick={() => setDismissed(true)}
      >
        <X size={16} />
      </button>
    </div>
  );
}
