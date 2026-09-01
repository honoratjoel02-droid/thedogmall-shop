import { Link } from "react-router-dom";
import { EnvelopeSimple, Phone } from "@phosphor-icons/react";

import SiteLayout from "../components/site/SiteLayout";
import PageHeader from "../components/site/PageHeader";
import { buttonVariants } from "../components/ui/button";
import { contactDetails } from "../lib/navigation";

const deliveryRows = [
  { area: "Cocody, Riviera, Angré", delay: "Sous 24 h", cost: "2 000 FCFA" },
  { area: "Plateau, Marcory, Treichville", delay: "Sous 24 h", cost: "2 500 FCFA" },
  { area: "Yopougon, Abobo, Koumassi", delay: "24 à 48 h", cost: "3 000 FCFA" },
  {
    area: "Autres villes de Côte d'Ivoire",
    delay: "2 à 4 jours",
    cost: "Selon le transporteur",
  },
];

const faq = [
  {
    question: "Puis-je payer à la livraison ?",
    answer:
      "Oui. Le paiement se fait en espèces au livreur ou par mobile money au moment de la remise du colis. Aucun règlement n'est demandé avant l'appel de confirmation.",
  },
  {
    question: "Puis-je voir un chien avant de me décider ?",
    answer:
      "Oui, et nous le recommandons. Prenez rendez-vous depuis la fiche du chien ou par téléphone : la visite se fait sur place, à Abidjan, sans engagement.",
  },
  {
    question: "Les chiens sont-ils vaccinés ?",
    answer:
      "Tous nos chiens partent vaccinés, vermifugés et identifiés par puce électronique, avec leur carnet de santé à jour. Le suivi vétérinaire du premier mois est inclus.",
  },
  {
    question: "Un produit ne convient pas, que faire ?",
    answer:
      "Contactez-nous dans les quatorze jours suivant la réception. Un produit non ouvert, dans son emballage d'origine, est repris et remboursé sous sept jours.",
  },
  {
    question: "Livrez-vous en dehors d'Abidjan ?",
    answer:
      "Oui, par transporteur partenaire. Le délai et le coût sont confirmés lors de l'appel qui suit votre commande, avant toute expédition.",
  },
];

export default function Help() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Assistance"
        title="Livraison, commandes et questions fréquentes"
        description="Tout ce qu'il faut savoir avant et après avoir commandé chez THE DOG MALL."
      />

      <div className="mx-auto flex max-w-3xl flex-col gap-16 px-4 py-12 sm:px-6 lg:py-16">
        <section aria-labelledby="livraison" className="scroll-mt-28">
          <h2
            id="livraison"
            className="text-2xl font-bold tracking-tight text-foreground"
          >
            Livraison
          </h2>

          <p className="mt-3 text-pretty text-muted-foreground">
            Les commandes validées avant 15 h partent le jour même. Le
            livreur vous appelle avant de passer.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-md border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th scope="col" className="py-3 pr-4 font-medium">
                    Zone
                  </th>
                  <th scope="col" className="py-3 pr-4 font-medium">
                    Délai
                  </th>
                  <th scope="col" className="py-3 font-medium">
                    Frais
                  </th>
                </tr>
              </thead>

              <tbody>
                {deliveryRows.map((row) => (
                  <tr key={row.area} className="border-b border-border">
                    <th
                      scope="row"
                      className="py-3 pr-4 text-left font-medium text-foreground"
                    >
                      {row.area}
                    </th>
                    <td className="py-3 pr-4 text-muted-foreground">
                      {row.delay}
                    </td>
                    <td className="py-3 text-muted-foreground tabular-nums">
                      {row.cost}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="commandes" className="scroll-mt-28">
          <h2
            id="commandes"
            className="text-2xl font-bold tracking-tight text-foreground"
          >
            Commandes
          </h2>

          <ol className="mt-6 flex flex-col gap-5">
            {[
              "Vous validez votre panier en indiquant vos coordonnées et votre adresse de livraison.",
              "Nous vous appelons dans la journée pour confirmer la commande, les frais de livraison et le mode de règlement.",
              "Le colis part de notre dépôt et le livreur vous prévient avant de se présenter.",
              "Vous réglez à la remise, en espèces ou par mobile money, et recevez votre reçu.",
            ].map((step, index) => (
              <li key={step} className="flex gap-4">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground tabular-nums">
                  {index + 1}
                </span>
                <p className="text-pretty text-foreground/80">{step}</p>
              </li>
            ))}
          </ol>

          <p className="mt-6 text-sm text-muted-foreground">
            Pour suivre une commande en cours, appelez-nous en gardant le
            numéro communiqué lors de l'appel de confirmation.
          </p>
        </section>

        <section aria-labelledby="faq" className="scroll-mt-28">
          <h2
            id="faq"
            className="text-2xl font-bold tracking-tight text-foreground"
          >
            Questions fréquentes
          </h2>

          <dl className="mt-6 divide-y divide-border border-y border-border">
            {faq.map((entry) => (
              <div key={entry.question} className="py-5">
                <dt className="font-semibold text-balance text-foreground">
                  {entry.question}
                </dt>
                <dd className="mt-2 text-pretty text-muted-foreground">
                  {entry.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          aria-labelledby="aide-contact"
          className="rounded-3xl bg-card p-6 ring-1 ring-border sm:p-10"
        >
          <h2
            id="aide-contact"
            className="text-xl font-bold tracking-tight text-foreground"
          >
            Vous ne trouvez pas votre réponse ?
          </h2>

          <div className="mt-5 flex flex-col gap-3 text-sm sm:flex-row sm:gap-8">
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

          <Link
            to="/contact"
            className={buttonVariants({ className: "mt-6" })}
          >
            Écrire un message
          </Link>
        </section>
      </div>
    </SiteLayout>
  );
}
