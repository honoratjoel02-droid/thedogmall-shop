import { useState, type FormEvent } from "react";
import {
  ArrowClockwise,
  CheckCircle,
  EnvelopeSimple,
  MapPin,
  Phone,
  Warning,
  WhatsappLogo,
} from "@phosphor-icons/react";

import SiteLayout from "../components/site/SiteLayout";
import WhatsAppLink from "../components/site/WhatsAppLink";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Field } from "../components/ui/field";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { contactDetails } from "../lib/contact";
import { formsAreConnected, submitForm } from "../lib/forms";
import { pageMeta } from "../lib/seo";
import {
  collectErrors,
  email as validateEmail,
  fieldAria,
  minLength,
  required,
  type FieldErrors,
} from "../lib/validation";
import { contactMessage, generalMessage, whatsAppLink } from "../lib/whatsapp";

type Fields = "name" | "email" | "subject" | "message";

const emptyValues: Record<Fields, string> = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState<FieldErrors<Fields>>({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "handedOff" | "error"
  >("idle");
  const [failure, setFailure] = useState("");

  function update(field: Fields, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = collectErrors<Fields>({
      name: required(values.name, "Le nom"),
      email: validateEmail(values.email),
      subject: required(values.subject, "Le sujet"),
      message: minLength(values.message, 10, "Le message"),
    });

    setErrors(found);

    if (Object.keys(found).length > 0) {
      document
        .querySelector<HTMLElement>("[aria-invalid='true']")
        ?.focus();
      return;
    }

    // Sans service d'envoi configuré, on remet le message rédigé entre les
    // mains du client plutôt que d'annoncer un envoi qui n'aura pas lieu.
    if (!formsAreConnected) {
      window.open(
        whatsAppLink(contactMessage(values)),
        "_blank",
        "noopener,noreferrer"
      );
      setStatus("handedOff");
      return;
    }

    setStatus("sending");
    setFailure("");

    try {
      await submitForm("Message depuis le site THE DOG MALL", values);
      setStatus("sent");
      setValues(emptyValues);
    } catch (error) {
      setFailure(
        error instanceof Error
          ? error.message
          : "L'envoi a échoué. Réessayez ou passez par WhatsApp."
      );
      setStatus("error");
    }
  }

  return (
    <SiteLayout meta={pageMeta("/contact")}>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Contactez-nous
        </h1>

        <p className="mt-1 max-w-xl text-muted-foreground">
          Une question sur un chien, un produit ou une commande ?
          Écrivez-nous, nous répondons sous une journée ouvrée.
        </p>

        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <Card className="shadow-sm md:col-span-2">
            <CardContent className="p-6">
              {status === "sent" ? (
                <Confirmation
                  title="Message envoyé"
                  body="Merci, nous revenons vers vous sous une journée ouvrée."
                  onReset={() => setStatus("idle")}
                />
              ) : status === "handedOff" ? (
                <Confirmation
                  title="Message préparé dans WhatsApp"
                  body="Votre message est prêt dans la conversation : il ne nous parviendra qu'une fois que vous l'aurez envoyé depuis WhatsApp."
                  onReset={() => setStatus("idle")}
                  action={
                    <a
                      href={whatsAppLink(contactMessage(values))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Rouvrir WhatsApp
                    </a>
                  }
                />
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col gap-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field id="name" label="Nom" error={errors.name}>
                      <Input
                        id="name"
                        value={values.name}
                        onChange={(event) =>
                          update("name", event.target.value)
                        }
                        placeholder="Aya Koffi"
                        autoComplete="name"
                        {...fieldAria("name", errors.name)}
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
                  </div>

                  <Field id="subject" label="Sujet" error={errors.subject}>
                    <Input
                      id="subject"
                      value={values.subject}
                      onChange={(event) =>
                        update("subject", event.target.value)
                      }
                      placeholder="Disponibilité d'un chiot"
                      {...fieldAria("subject", errors.subject)}
                    />
                  </Field>

                  <Field
                    id="message"
                    label="Message"
                    error={errors.message}
                    hint="Dix caractères minimum."
                  >
                    <Textarea
                      id="message"
                      rows={5}
                      value={values.message}
                      onChange={(event) =>
                        update("message", event.target.value)
                      }
                      placeholder="Votre message..."
                      {...fieldAria("message", errors.message)}
                    />
                  </Field>

                  {status === "error" && (
                    <p
                      role="alert"
                      className="flex items-start gap-2 rounded-xl bg-destructive/10 p-3 text-sm text-destructive"
                    >
                      <Warning size={17} className="mt-0.5 shrink-0" />
                      {failure}
                    </p>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="h-10"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? (
                      <>
                        <ArrowClockwise
                          size={16}
                          className="animate-spin"
                        />
                        Envoi en cours…
                      </>
                    ) : formsAreConnected ? (
                      "Envoyer le message"
                    ) : (
                      <>
                        <WhatsappLogo size={17} weight="fill" />
                        Envoyer sur WhatsApp
                      </>
                    )}
                  </Button>

                  {!formsAreConnected && (
                    <p className="text-xs text-muted-foreground">
                      Votre message s'ouvrira dans WhatsApp, déjà rédigé.
                    </p>
                  )}
                </form>
              )}
            </CardContent>
          </Card>

          <Card className="h-fit shadow-sm">
            <CardContent className="flex flex-col gap-4 p-6">
              <h2 className="text-lg font-semibold text-foreground">
                Nos coordonnées
              </h2>

              <a
                href={`mailto:${contactDetails.email}`}
                className="flex items-start gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <EnvelopeSimple size={18} className="mt-0.5 shrink-0 text-primary" />
                {contactDetails.email}
              </a>

              <a
                href={contactDetails.phoneHref}
                className="flex items-start gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Phone size={18} className="mt-0.5 shrink-0 text-primary" />
                {contactDetails.phone}
              </a>

              <WhatsAppLink
                message={generalMessage}
                label="Écrire sur WhatsApp"
                className="gap-3 text-sm text-muted-foreground hover:text-foreground [&>svg]:text-primary"
              />

              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin size={18} className="mt-0.5 shrink-0 text-primary" />
                {contactDetails.address}
              </div>

              <p className="border-t border-border pt-4 text-sm text-muted-foreground">
                {contactDetails.openingHours}.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </SiteLayout>
  );
}

function Confirmation({
  title,
  body,
  onReset,
  action,
}: {
  title: string;
  body: string;
  onReset: () => void;
  action?: React.ReactNode;
}) {
  return (
    <div
      role="status"
      className="flex flex-col items-center gap-3 py-12 text-center"
    >
      <CheckCircle size={44} weight="duotone" className="text-primary" />

      <h2 className="text-lg font-semibold text-foreground">{title}</h2>

      <p className="max-w-sm text-sm text-pretty text-muted-foreground">
        {body}
      </p>

      <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
        {action}

        <button
          type="button"
          onClick={onReset}
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          Écrire un autre message
        </button>
      </div>
    </div>
  );
}
