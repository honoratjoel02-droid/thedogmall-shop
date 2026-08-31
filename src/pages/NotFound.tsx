import { Link } from "react-router-dom";
import { PawPrint } from "@phosphor-icons/react";

import { buttonVariants } from "../components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <PawPrint size={56} weight="duotone" className="text-primary" />

      <h1 className="text-4xl font-bold text-foreground">404</h1>

      <p className="max-w-sm text-muted-foreground">
        Cette page n'existe pas ou a été déplacée.
      </p>

      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <Link to="/" className={buttonVariants()}>
          Retour à l'accueil
        </Link>

        <Link
          to="/produits"
          className={buttonVariants({ variant: "outline" })}
        >
          Voir le catalogue
        </Link>
      </div>
    </div>
  );
}
