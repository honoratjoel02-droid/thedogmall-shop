import { useState, type FormEvent } from "react";
import {
  ArrowClockwise,
  EnvelopeSimple,
  Warning,
} from "@phosphor-icons/react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { formsAreConnected, submitForm } from "../../lib/forms";
import { email as validateEmail, fieldAria } from "../../lib/validation";

/**
 * Masquée tant qu'aucun service d'envoi n'est configuré : un formulaire
 * d'inscription qui n'enregistre rien n'a pas sa place sur le site.
 */
export default function Newsletter() {
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string>();
  const [status, setStatus] = useState<
    "idle" | "sending" | "subscribed" | "error"
  >("idle");
  const [failure, setFailure] = useState("");

  if (!formsAreConnected) return null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = validateEmail(address);
    setError(found);
    if (found) return;

    setStatus("sending");
    setFailure("");

    try {
      await submitForm("Inscription à la newsletter", { email: address });
      setStatus("subscribed");
      setAddress("");
    } catch (caught) {
      setFailure(
        caught instanceof Error
          ? caught.message
          : "L'inscription a échoué. Réessayez dans un instant."
      );
      setStatus("error");
    }
  }

  return (
    <section className="bg-primary">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-16 text-center sm:px-6">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-primary-foreground/15 text-primary-foreground">
          <EnvelopeSimple size={22} />
        </span>

        <h2 className="text-2xl font-bold text-primary-foreground">
          Ne manquez aucune offre
        </h2>

        <p className="max-w-md text-primary-foreground/80">
          Inscrivez-vous pour recevoir nos nouveautés et les portées à
          venir.
        </p>

        {status === "subscribed" ? (
          <p role="status" className="mt-2 font-medium text-primary-foreground">
            Merci, votre inscription est enregistrée.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-2 flex w-full max-w-sm flex-col gap-2"
          >
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                id="newsletter-email"
                type="email"
                value={address}
                onChange={(event) => {
                  setAddress(event.target.value);
                  setError(undefined);
                }}
                aria-label="Votre adresse email"
                placeholder="vous@exemple.com"
                className="h-11 flex-1 border-transparent bg-primary-foreground text-foreground placeholder:text-muted-foreground"
                {...fieldAria("newsletter-email", error)}
              />

              <Button
                type="submit"
                size="lg"
                disabled={status === "sending"}
                className="h-11 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                {status === "sending" ? (
                  <ArrowClockwise size={16} className="animate-spin" />
                ) : (
                  "S'inscrire"
                )}
              </Button>
            </div>

            {(error || status === "error") && (
              <p
                id="newsletter-email-error"
                role="alert"
                className="flex items-start gap-2 text-left text-sm text-primary-foreground"
              >
                <Warning size={16} className="mt-0.5 shrink-0" />
                {error ?? failure}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
