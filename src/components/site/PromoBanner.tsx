import { useState } from "react";
import { Truck, X } from "@phosphor-icons/react";

export default function PromoBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative bg-primary px-10 py-2.5 text-center text-[13px] font-medium text-primary-foreground sm:px-12 sm:text-sm">
      <span className="inline-flex items-center gap-2">
        <Truck size={16} weight="bold" className="shrink-0" />
        Livraison dans tout Abidjan sous 24 h, paiement à la livraison
      </span>

      <button
        type="button"
        aria-label="Fermer le message"
        className="absolute top-1/2 right-3 -translate-y-1/2 text-primary-foreground/70 transition-colors hover:text-primary-foreground sm:right-4"
        onClick={() => setDismissed(true)}
      >
        <X size={16} />
      </button>
    </div>
  );
}
