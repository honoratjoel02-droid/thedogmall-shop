import { useState, type FormEvent } from "react";
import { Link, Navigate } from "react-router-dom";
import { CheckCircle } from "@phosphor-icons/react";

import SiteLayout from "../components/site/SiteLayout";
import { Button, buttonVariants } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../lib/format";

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOrderTotal(subtotal);
    clearCart();
    setOrderPlaced(true);
  }

  if (orderPlaced) {
    return (
      <SiteLayout>
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-24 text-center">
          <CheckCircle size={56} weight="duotone" className="text-primary" />

          <h1 className="text-2xl font-bold text-foreground">
            Merci pour votre commande
          </h1>

          <p className="max-w-md text-muted-foreground">
            Votre commande de {formatPrice(orderTotal)} est
            enregistrée. Nous vous appelons dans la journée pour
            confirmer l'adresse de livraison et le règlement.
          </p>

          <Link
            to="/boutique"
            className={buttonVariants({ className: "mt-2" })}
          >
            Continuer mes achats
          </Link>
        </div>
      </SiteLayout>
    );
  }

  if (items.length === 0) {
    return <Navigate to="/panier" replace />;
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
          Finaliser la commande
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 lg:col-span-2"
          >
            <Card className="shadow-sm">
              <CardContent className="flex flex-col gap-4 p-6">
                <h2 className="text-lg font-semibold text-foreground">
                  Vos coordonnées
                </h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="fullName">Nom complet</Label>
                    <Input
                      id="fullName"
                      required
                      placeholder="Aya Koffi"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="vous@exemple.com"
                    />
                  </div>

                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      placeholder="07 58 42 19 03"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="flex flex-col gap-4 p-6">
                <h2 className="text-lg font-semibold text-foreground">
                  Adresse de livraison
                </h2>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="flex flex-col gap-2 sm:col-span-3">
                    <Label htmlFor="address">Adresse</Label>
                    <Input
                      id="address"
                      required
                      placeholder="Rue des Jardins, immeuble Kouassi"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="district">Quartier</Label>
                    <Input
                      id="district"
                      required
                      placeholder="Riviera 2"
                    />
                  </div>

                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <Label htmlFor="city">Commune</Label>
                    <Input id="city" required placeholder="Cocody" />
                  </div>

                  <div className="flex flex-col gap-2 sm:col-span-3">
                    <Label htmlFor="notes">
                      Notes (facultatif)
                    </Label>
                    <Input
                      id="notes"
                      placeholder="Instructions de livraison..."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <p className="text-sm text-muted-foreground">
              Aucun paiement en ligne pour le moment : nous vous
              appelons après votre commande pour confirmer la livraison
              et le règlement, en espèces ou par mobile money.
            </p>

            <Button type="submit" size="lg" className="h-11">
              Confirmer la commande
            </Button>
          </form>

          <Card className="h-fit shadow-sm">
            <CardContent className="flex flex-col gap-4 p-6">
              <h2 className="text-lg font-semibold text-foreground">
                Récapitulatif
              </h2>

              <div className="flex flex-col gap-3">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-muted-foreground">
                      {item.product.name} × {item.quantity}
                    </span>

                    <span className="font-medium text-foreground">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-border pt-4 text-base font-bold text-foreground">
                <span>Total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SiteLayout>
  );
}
