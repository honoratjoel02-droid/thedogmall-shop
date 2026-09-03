import { Link } from "react-router-dom";
import { Heart, PawPrint, Truck } from "@phosphor-icons/react";

import SiteLayout from "../components/site/SiteLayout";
import Reveal from "../components/site/Reveal";
import { buttonVariants } from "../components/ui/button";
import { pageMeta } from "../lib/seo";

const values = [
  {
    icon: PawPrint,
    title: "Fondé par des maîtres",
    description:
      "THE DOG MALL est né à Abidjan, entre deux chiens qui réclamaient leur gamelle. Nous vendons ce que nous donnons aux nôtres.",
  },
  {
    icon: Heart,
    title: "Testé avant d'être vendu",
    description:
      "Chaque référence passe entre les pattes de nos chiens avant d'entrer au catalogue. Ce qui ne tient pas ne reste pas.",
  },
  {
    icon: Truck,
    title: "Une équipe joignable",
    description:
      "Un doute sur une taille, une transition alimentaire, un retour ? Vous nous écrivez, on répond dans la journée.",
  },
];

export default function About() {
  return (
    <SiteLayout meta={pageMeta("/a-propos")}>
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-4 pt-16 pb-16 sm:px-6 lg:pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-balance text-foreground sm:text-5xl">
            Une boutique tenue par des gens qui ont un chien
          </h1>

          <p className="mt-5 text-lg text-muted-foreground">
            Nous vendons peu de références, mais nous savons pourquoi
            chacune est là.
          </p>
        </div>
      </section>

      <Reveal>
        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <ul className="grid gap-10">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <li
                  key={value.title}
                  className="grid gap-4 sm:grid-cols-[auto_1fr] sm:gap-6"
                >
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-accent text-primary">
                    <Icon size={22} weight="duotone" />
                  </span>

                  <div>
                    <h2 className="text-lg font-semibold text-foreground">
                      {value.title}
                    </h2>

                    <p className="mt-2 text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </Reveal>

      <Reveal>
        <section className="border-t border-border bg-card">
          <div className="mx-auto flex max-w-3xl flex-col items-start gap-5 px-4 py-16 sm:px-6">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Prêt à gâter votre chien ?
            </h2>

            <Link
              to="/boutique"
              className={buttonVariants({ size: "lg" })}
            >
              Voir la boutique
            </Link>
          </div>
        </section>
      </Reveal>
    </SiteLayout>
  );
}
