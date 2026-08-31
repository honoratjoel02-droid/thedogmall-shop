import { useState, type FormEvent } from "react";
import { CheckCircle, EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react";

import SiteLayout from "../components/site/SiteLayout";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Contactez-nous
        </h1>

        <p className="mt-1 max-w-xl text-muted-foreground">
          Une question sur un produit ou une commande ? Écrivez-nous,
          nous vous répondons rapidement.
        </p>

        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <Card className="shadow-sm md:col-span-2">
            <CardContent className="p-6">
              {sent ? (
                <div className="flex flex-col items-center gap-3 py-12 text-center">
                  <CheckCircle size={44} weight="duotone" className="text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">
                    Message envoyé
                  </h2>
                  <p className="max-w-sm text-sm text-muted-foreground">
                    Merci, nous revenons vers vous très vite.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="name">Nom</Label>
                      <Input
                        id="name"
                        required
                        placeholder="Votre nom"
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
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="subject">Sujet</Label>
                    <Input
                      id="subject"
                      required
                      placeholder="Sujet de votre message"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      required
                      rows={5}
                      placeholder="Votre message..."
                    />
                  </div>

                  <Button type="submit" size="lg" className="h-10">
                    Envoyer le message
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          <Card className="h-fit shadow-sm">
            <CardContent className="flex flex-col gap-4 p-6">
              <h2 className="text-lg font-semibold text-foreground">
                Nos coordonnées
              </h2>

              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <EnvelopeSimple size={18} className="mt-0.5 shrink-0 text-primary" />
                contact@thedogmall.fr
              </div>

              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <Phone size={18} className="mt-0.5 shrink-0 text-primary" />
                01 23 45 67 89
              </div>

              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin size={18} className="mt-0.5 shrink-0 text-primary" />
                12 rue des Chiots, 75000 Paris
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SiteLayout>
  );
}
