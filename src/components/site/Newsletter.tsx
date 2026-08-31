import { useState, type FormEvent } from "react";
import { EnvelopeSimple } from "@phosphor-icons/react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubscribed(true);
  }

  return (
    <section className="bg-primary">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-6 py-16 text-center">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-primary-foreground/15 text-primary-foreground">
          <EnvelopeSimple size={22} />
        </span>

        <h2 className="text-2xl font-bold text-primary-foreground">
          Ne manquez aucune offre
        </h2>

        <p className="max-w-md text-primary-foreground/80">
          Inscrivez-vous à notre newsletter pour recevoir nos nouveautés
          et des réductions exclusives.
        </p>

        {subscribed ? (
          <p className="mt-2 font-medium text-primary-foreground">
            Merci ! Vous êtes bien inscrit(e).
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-2 flex w-full max-w-sm flex-col gap-2 sm:flex-row"
          >
            <Input
              type="email"
              required
              placeholder="vous@exemple.com"
              className="h-11 flex-1 border-transparent bg-primary-foreground text-foreground placeholder:text-muted-foreground"
            />
            <Button
              type="submit"
              size="lg"
              className="h-11 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              S'inscrire
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
