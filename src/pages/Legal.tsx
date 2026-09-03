import { useLocation } from "react-router-dom";

import SiteLayout from "../components/site/SiteLayout";
import { normalizePath } from "../lib/utils";
import { pageMeta } from "../lib/seo";
import type { StaticPath } from "../lib/seo";

export type LegalPageKey = "mentions" | "confidentialite" | "cgv";

const legalPaths: Record<LegalPageKey, StaticPath> = {
  mentions: "/mentions-legales",
  confidentialite: "/confidentialite",
  cgv: "/cgv",
};

/** Les trois pages légales partagent ce composant ; l'URL dit laquelle. */
const keysByPath: Record<string, LegalPageKey> = {
  "/mentions-legales": "mentions",
  "/confidentialite": "confidentialite",
  "/cgv": "cgv",
};

const pages: Record<
  LegalPageKey,
  { title: string; intro: string; sections: { heading: string; body: string }[] }
> = {
  mentions: {
    title: "Mentions légales",
    intro:
      "Informations relatives à l'éditeur et à l'hébergeur du site.",
    sections: [
      {
        heading: "Éditeur du site",
        body: "Raison sociale, forme juridique, capital social, adresse du siège à Abidjan, numéro de registre du commerce (RCCM) et numéro de compte contribuable à compléter.",
      },
      {
        heading: "Directeur de la publication",
        body: "Nom et prénom du responsable de la publication à compléter.",
      },
      {
        heading: "Hébergeur",
        body: "Nom, adresse et téléphone de l'hébergeur à compléter une fois le site mis en ligne.",
      },
    ],
  },
  confidentialite: {
    title: "Politique de confidentialité",
    intro:
      "Comment les données personnelles collectées sur ce site sont utilisées et conservées.",
    sections: [
      {
        heading: "Données collectées",
        body: "Les informations saisies lors d'une commande ou d'une prise de contact : nom, adresse email, téléphone et adresse de livraison.",
      },
      {
        heading: "Utilisation des données",
        body: "Ces données servent uniquement au traitement des commandes et aux réponses aux demandes de contact. Elles ne sont ni vendues ni cédées à des tiers.",
      },
      {
        heading: "Vos droits",
        body: "Vous pouvez demander l'accès, la rectification ou la suppression de vos données en écrivant à contact@thedogmall.ci. Durée de conservation à préciser.",
      },
    ],
  },
  cgv: {
    title: "Conditions générales de vente",
    intro:
      "Conditions applicables aux commandes passées sur THE DOG MALL.",
    sections: [
      {
        heading: "Commandes et paiement",
        body: "Les commandes ne sont pas réglées en ligne pour le moment : nous appelons chaque client après validation du panier pour organiser le paiement, en espèces à la livraison ou par mobile money.",
      },
      {
        heading: "Livraison",
        body: "Livraison dans les communes d'Abidjan sous 24 h ouvrées. Pour les autres villes, la livraison passe par un transporteur partenaire et le délai est confirmé lors de l'appel. Grille tarifaire détaillée à compléter.",
      },
      {
        heading: "Retours et remboursement",
        body: "Retour accepté pendant 14 jours après réception, produit non ouvert et dans son emballage d'origine. Remboursement sous 7 jours après récupération du colis. Prise en charge des frais de retour à préciser. Les chiens ne sont pas concernés par ce droit de retour : leur cession fait l'objet d'un accord écrit signé au moment de la remise.",
      },
    ],
  },
};

export default function Legal() {
  const { pathname } = useLocation();
  const page = keysByPath[normalizePath(pathname)] ?? "mentions";
  const content = pages[page];

  return (
    <SiteLayout meta={pageMeta(legalPaths[page])}>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {content.title}
        </h1>

        <p className="mt-3 text-muted-foreground">{content.intro}</p>

        <div className="mt-10 grid gap-8">
          {content.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-semibold text-foreground">
                {section.heading}
              </h2>
              <p className="mt-2 text-muted-foreground">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        <p className="mt-12 rounded-2xl bg-secondary p-5 text-sm text-secondary-foreground">
          Ce document est un modèle de travail. Faites-le relire et
          compléter avant l'ouverture de la boutique au public.
        </p>
      </div>
    </SiteLayout>
  );
}
