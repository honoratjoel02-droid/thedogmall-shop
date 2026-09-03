import { useState, type FormEvent } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  ArrowClockwise,
  CheckCircle,
  Warning,
  WhatsappLogo,
} from "@phosphor-icons/react";

import PageLoading from "../components/site/PageLoading";
import WhatsAppButton from "../components/site/WhatsAppButton";
import SiteLayout from "../components/site/SiteLayout";
import { Button, buttonVariants } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Field } from "../components/ui/field";
import { Input } from "../components/ui/input";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../lib/format";
import { formsAreConnected, submitForm } from "../lib/forms";
import { orderMessage, whatsAppLink } from "../lib/whatsapp";
import { pageMeta } from "../lib/seo";
import {
  collectErrors,
  email as validateEmail,
  fieldAria,
  phone as validatePhone,
  required,
  type FieldErrors,
} from "../lib/validation";

type Fields =
  | "fullName"
  | "email"
  | "phone"
  | "address"
  | "district"
  | "city"
  | "notes";

const emptyValues: Record<Fields, string> = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  district: "",
  city: "",
  notes: "",
};

export default function Checkout() {
  const { items, subtotal, clearCart, isRestored } = useCart();
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState<FieldErrors<Fields>>({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "placed" | "handedOff" | "error"
  >("idle");
  const [failure, setFailure] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);

  function update(field: Fields, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = collectErrors<Fields>({
      fullName: required(values.fullName, "Le nom complet"),
      email: validateEmail(values.email),
      phone: validatePhone(values.phone),
      address: required(values.address, "L'adresse"),
      district: required(values.district, "Le quartier"),
      city: required(values.city, "La commune"),
      notes: undefined,
    });

    setErrors(found);

    if (Object.keys(found).length > 0) {
      document.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    // Sans service d'envoi configuré, la commande part dans WhatsApp. Le
    // panier reste donc rempli : rien n'est commandé tant que le client
    // n'a pas envoyé le message.
    if (!formsAreConnected) {
      window.open(
        whatsAppLink(orderMessage(values, items, subtotal)),
        "_blank",
        "noopener,noreferrer"
      );
      setStatus("handedOff");
      return;
    }

    setStatus("sending");
    setFailure("");

    try {
      await submitForm("Nouvelle commande THE DOG MALL", {
        ...values,
        commande: items
          .map(
            (item) =>
              `${item.product.name} x${item.quantity} = ${formatPrice(item.product.price * item.quantity)}`
          )
          .join(" | "),
        total: formatPrice(subtotal),
      });

      setOrderTotal(subtotal);
      clearCart();
      setStatus("placed");
    } catch (error) {
      setFailure(
        error instanceof Error
          ? error.message
          : "L'envoi a échoué. Réessayez ou passez par WhatsApp."
      );
      setStatus("error");
    }
  }

  if (status === "placed") {
    return (
      <SiteLayout meta={pageMeta("/commande")}>
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-24 text-center sm:px-6">
          <CheckCircle size={56} weight="duotone" className="text-primary" />

          <h1 className="text-2xl font-bold text-foreground">
            Merci pour votre commande
          </h1>

          <p className="max-w-md text-pretty text-muted-foreground">
            Votre commande de {formatPrice(orderTotal)} nous est parvenue.
            Nous vous appelons dans la journée pour confirmer l'adresse de
            livraison et le règlement.
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

  if (status === "handedOff") {
    return (
      <SiteLayout meta={pageMeta("/commande")}>
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-24 text-center sm:px-6">
          <WhatsappLogo size={56} weight="duotone" className="text-primary" />

          <h1 className="text-2xl font-bold text-balance text-foreground">
            Votre commande est prête dans WhatsApp
          </h1>

          <p className="max-w-md text-pretty text-muted-foreground">
            Elle ne nous parviendra qu'une fois le message envoyé depuis la
            conversation. Votre panier reste donc intact jusque-là.
          </p>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href={whatsAppLink(orderMessage(values, items, subtotal))}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants()}
            >
              <WhatsappLogo size={17} weight="fill" />
              Rouvrir WhatsApp
            </a>

            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Modifier mes informations
            </button>
          </div>
        </div>
      </SiteLayout>
    );
  }

  // Sans cette attente, un client qui ouvre directement cette adresse
  // serait renvoyé au panier avant même que son panier soit relu.
  if (!isRestored) {
    return <PageLoading meta={pageMeta("/commande")} />;
  }

  if (items.length === 0) {
    return <Navigate to="/panier" replace />;
  }

  return (
    <SiteLayout meta={pageMeta("/commande")}>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-foreground">
          Finaliser la commande
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-6 lg:col-span-2"
          >
            <Card className="shadow-sm">
              <CardContent className="flex flex-col gap-4 p-6">
                <h2 className="text-lg font-semibold text-foreground">
                  Vos coordonnées
                </h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    id="fullName"
                    label="Nom complet"
                    error={errors.fullName}
                  >
                    <Input
                      id="fullName"
                      value={values.fullName}
                      onChange={(event) =>
                        update("fullName", event.target.value)
                      }
                      placeholder="Aya Koffi"
                      autoComplete="name"
                      {...fieldAria("fullName", errors.fullName)}
                    />
                  </Field>

                  <Field id="email" label="Email" error={errors.email}>
                    <Input
                      id="email"
                      type="email"
                      value={values.email}
                      onChange={(event) =>
                        update("email", event.target.value)
                      }
                      placeholder="vous@exemple.com"
                      autoComplete="email"
                      {...fieldAria("email", errors.email)}
                    />
                  </Field>

                  <Field
                    id="phone"
                    label="Téléphone"
                    error={errors.phone}
                    className="sm:col-span-2"
                  >
                    <Input
                      id="phone"
                      type="tel"
                      value={values.phone}
                      onChange={(event) =>
                        update("phone", event.target.value)
                      }
                      placeholder="07 58 42 19 03"
                      autoComplete="tel"
                      {...fieldAria("phone", errors.phone)}
                    />
                  </Field>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="flex flex-col gap-4 p-6">
                <h2 className="text-lg font-semibold text-foreground">
                  Adresse de livraison
                </h2>

                <div className="grid gap-4 sm:grid-cols-3">
                  <Field
                    id="address"
                    label="Adresse"
                    error={errors.address}
                    className="sm:col-span-3"
                  >
                    <Input
                      id="address"
                      value={values.address}
                      onChange={(event) =>
                        update("address", event.target.value)
                      }
                      placeholder="Rue des Jardins, immeuble Kouassi"
                      autoComplete="street-address"
                      {...fieldAria("address", errors.address)}
                    />
                  </Field>

                  <Field
                    id="district"
                    label="Quartier"
                    error={errors.district}
                  >
                    <Input
                      id="district"
                      value={values.district}
                      onChange={(event) =>
                        update("district", event.target.value)
                      }
                      placeholder="Riviera 2"
                      {...fieldAria("district", errors.district)}
                    />
                  </Field>

                  <Field
                    id="city"
                    label="Commune"
                    error={errors.city}
                    className="sm:col-span-2"
                  >
                    <Input
                      id="city"
                      value={values.city}
                      onChange={(event) =>
                        update("city", event.target.value)
                      }
                      placeholder="Cocody"
                      autoComplete="address-level2"
                      {...fieldAria("city", errors.city)}
                    />
                  </Field>

                  <Field
                    id="notes"
                    label="Précisions (facultatif)"
                    error={errors.notes}
                    className="sm:col-span-3"
                  >
                    <Input
                      id="notes"
                      value={values.notes}
                      onChange={(event) =>
                        update("notes", event.target.value)
                      }
                      placeholder="Repère, étage, heure de passage..."
                      {...fieldAria("notes", errors.notes)}
                    />
                  </Field>
                </div>
              </CardContent>
            </Card>

            <p className="text-sm text-muted-foreground">
              Aucun paiement en ligne : nous vous appelons après votre
              commande pour confirmer la livraison et le règlement, en
              espèces ou par mobile money.
            </p>

            {status === "error" && (
              <div
                role="alert"
                className="flex flex-col gap-3 rounded-xl bg-destructive/10 p-3"
              >
                <p className="flex items-start gap-2 text-sm text-destructive">
                  <Warning size={17} className="mt-0.5 shrink-0" />
                  {failure}
                </p>

                {/* La commande est saisie : elle ne doit pas être perdue
                    parce que le service est en panne. */}
                <WhatsAppButton
                  size="sm"
                  className="w-fit"
                  label="Envoyer la commande sur WhatsApp"
                  message={orderMessage(values, items, subtotal)}
                />
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="h-11"
              disabled={status === "sending"}
            >
              {status === "sending" ? (
                <>
                  <ArrowClockwise size={17} className="animate-spin" />
                  Envoi en cours…
                </>
              ) : formsAreConnected ? (
                "Confirmer la commande"
              ) : (
                <>
                  <WhatsappLogo size={18} weight="fill" />
                  Confirmer sur WhatsApp
                </>
              )}
            </Button>

            {!formsAreConnected && (
              <p className="-mt-3 text-xs text-muted-foreground">
                Votre commande s'ouvrira dans WhatsApp, déjà rédigée avec
                vos coordonnées.
              </p>
            )}
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
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <span className="text-muted-foreground">
                      {item.product.name} × {item.quantity}
                    </span>

                    <span className="font-medium text-foreground tabular-nums">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-border pt-4 text-base font-bold text-foreground">
                <span>Total</span>
                <span className="tabular-nums">{formatPrice(subtotal)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SiteLayout>
  );
}
