import SiteLayout from "../components/site/SiteLayout";

export type LegalPageKey = "mentions" | "confidentialite" | "cgv";

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
        body: "Raison sociale, forme juridique, capital social, adresse du siège, numéro SIRET et numéro de TVA intracommunautaire à compléter.",
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
        body: "Vous pouvez demander l'accès, la rectification ou la suppression de vos données en écrivant à contact@thedogmall.fr. Durée de conservation à préciser.",
      },
    ],
  },
  cgv: {
    title: "Conditions générales de vente",
    intro:
      "Conditions applicables aux commandes passées sur TheDogMall.",
    sections: [
      {
        heading: "Commandes et paiement",
        body: "Les commandes ne sont pas réglées en ligne pour le moment : nous contactons chaque client après validation du panier pour organiser le paiement.",
      },
      {
        heading: "Livraison",
        body: "Expédition sous 24h ouvrées, livraison en France métropolitaine sous 2 à 3 jours ouvrés. Frais offerts dès 50 € d'achat. Transporteur et tarifs détaillés à compléter.",
      },
      {
        heading: "Retours et remboursement",
        body: "Retour accepté pendant 30 jours après réception, produit non ouvert. Remboursement sous 7 jours après réception du colis retourné. Modalités de prise en charge des frais de retour à compléter.",
      },
    ],
  },
};

type LegalProps = {
  page: LegalPageKey;
};

export default function Legal({ page }: LegalProps) {
  const content = pages[page];

  return (
    <SiteLayout>
      <div className="mx-auto max-w-2xl px-6 py-16">
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
