import { Link } from "react-router-dom";
import {
  EnvelopeSimple,
  Heart,
  Package,
  Phone,
  ShoppingCart,
  type Icon,
} from "@phosphor-icons/react";

import SiteLayout from "../components/site/SiteLayout";
import PageHeader from "../components/site/PageHeader";
import { useCart } from "../hooks/useCart";
import { useFavorites } from "../hooks/useFavorites";
import { contactDetails } from "../lib/navigation";

export default function Account() {
  const { itemCount } = useCart();
  const { favoriteCount } = useFavorites();

  const shortcuts: {
    icon: Icon;
    title: string;
    detail: string;
    to: string;
  }[] = [
    {
      icon: Heart,
      title: "Mes favoris",
      detail:
        favoriteCount > 0
          ? `${favoriteCount} élément${favoriteCount > 1 ? "s" : ""} de côté`
          : "Rien de côté pour le moment",
      to: "/favoris",
    },
    {
      icon: ShoppingCart,
      title: "Mon panier",
      detail:
        itemCount > 0
          ? `${itemCount} article${itemCount > 1 ? "s" : ""} en attente`
          : "Votre panier est vide",
      to: "/panier",
    },
    {
      icon: Package,
      title: "Suivre une commande",
      detail: "Communiquez-nous votre numéro de commande",
      to: "/aide#commandes",
    },
  ];

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Espace client"
        title="Mon compte"
        description="La création de compte n'est pas encore ouverte. En attendant, vos favoris et votre panier sont conservés sur cet appareil et nous suivons vos commandes par téléphone."
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shortcuts.map((shortcut) => {
            const Icon = shortcut.icon;

            return (
              <li key={shortcut.to}>
                <Link
                  to={shortcut.to}
                  className="flex h-full flex-col gap-3 rounded-3xl bg-card p-6 ring-1 ring-border transition-colors duration-300 hover:bg-accent"
                >
                  <Icon size={24} weight="duotone" className="text-primary" />

                  <span className="font-semibold text-foreground">
                    {shortcut.title}
                  </span>

                  <span className="text-sm text-muted-foreground">
                    {shortcut.detail}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <section
          aria-labelledby="joindre-title"
          className="mt-10 rounded-3xl bg-card p-6 ring-1 ring-border sm:p-10"
        >
          <h2
            id="joindre-title"
            className="text-xl font-bold tracking-tight text-foreground"
          >
            Une question sur une commande ?
          </h2>

          <p className="mt-2 max-w-xl text-pretty text-muted-foreground">
            Appelez-nous entre 8 h et 19 h, ou écrivez-nous : nous
            répondons sous une journée ouvrée.
          </p>

          <div className="mt-6 flex flex-col gap-3 text-sm sm:flex-row sm:gap-8">
            <a
              href={contactDetails.phoneHref}
              className="flex items-center gap-2 font-medium text-foreground transition-colors hover:text-primary"
            >
              <Phone size={18} className="shrink-0 text-primary" />
              {contactDetails.phone}
            </a>

            <a
              href={`mailto:${contactDetails.email}`}
              className="flex items-center gap-2 font-medium text-foreground transition-colors hover:text-primary"
            >
              <EnvelopeSimple size={18} className="shrink-0 text-primary" />
              {contactDetails.email}
            </a>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
