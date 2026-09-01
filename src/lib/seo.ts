import { contactDetails } from "./contact";
import { formatAge, formatPrice } from "./format";
import { dogPhotos, productPhotos } from "./media";
import type { Article } from "../data/articles";
import type { Dog } from "../types/dog";
import type { Product } from "../types/product";

/**
 * Adresse publique du site, sans barre oblique finale. Elle sert aux URL
 * canoniques, aux aperçus de partage et au sitemap : à corriger si le nom
 * de domaine change.
 *
 * Ce module ne dépend d'aucune API de navigateur ni de React : il est
 * importé par l'application et par `vite.config.ts`, qui pré-génère les
 * balises de chaque page au moment du build.
 *
 * Il n'importe volontairement aucune donnée du catalogue : les fonctions
 * reçoivent le chien, le produit ou l'article en paramètre. Sinon la
 * moindre page réclamant son titre embarquerait tout le catalogue. La
 * liste complète des pages vit dans `seo-pages.ts`, utilisé au build.
 */
export const SITE_URL = "https://thedogmall.ci";

export const SITE_NAME = "THE DOG MALL";

const DEFAULT_IMAGE = "/logo.png";

export type PageMeta = {
  /** Chemin absolu, commençant par « / ». */
  path: string;
  title: string;
  description: string;
  /** Chemin de l'image d'aperçu, servie depuis `public/`. */
  image: string;
  /** `website` par défaut, `article` pour les conseils. */
  type?: "website" | "article";
  /** Pages personnelles ou transactionnelles, exclues de l'indexation. */
  noindex?: boolean;
  /** Date ISO utilisée par le sitemap. */
  updatedAt?: string;
  jsonLd?: Record<string, unknown>[];
};

function withSuffix(title: string) {
  return `${title} | ${SITE_NAME}`;
}

function absolute(path: string) {
  return `${SITE_URL}${path}`;
}

function breadcrumb(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: step.name,
      item: absolute(step.path),
    })),
  };
}

const organization = {
  "@context": "https://schema.org",
  "@type": "PetStore",
  name: SITE_NAME,
  url: SITE_URL,
  image: absolute(DEFAULT_IMAGE),
  logo: absolute(DEFAULT_IMAGE),
  telephone: contactDetails.phone,
  email: contactDetails.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: contactDetails.city,
    addressCountry: contactDetails.country,
  },
  currenciesAccepted: "XOF",
  paymentAccepted: "Espèces, mobile money",
  areaServed: "Abidjan, Côte d'Ivoire",
};

// ---------------------------------------------------------------- pages

export const homeMeta: PageMeta & { path: StaticPath } = {
  path: "/",
  title: `${SITE_NAME} — Chiens, boutique et alimentation à Abidjan`,
  description:
    "Chiens à adopter, accessoires et alimentation pour chien à Abidjan. Livraison sous 24 h et paiement à la livraison.",
  image: DEFAULT_IMAGE,
  jsonLd: [
    organization,
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: "fr",
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/boutique?recherche={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

/**
 * Chemins des pages fixes. Le type force un appel à `pageMeta()` avec un
 * chemin qui existe : une faute de frappe casse la compilation.
 */
export type StaticPath =
  | "/"
  | "/chiens"
  | "/boutique"
  | "/accessoires"
  | "/alimentation"
  | "/conseils"
  | "/aide"
  | "/a-propos"
  | "/contact"
  | "/cgv"
  | "/confidentialite"
  | "/mentions-legales"
  | "/favoris"
  | "/compte"
  | "/panier"
  | "/commande";

export const staticPagesMeta: (PageMeta & { path: StaticPath })[] = [
  homeMeta,
  {
    path: "/chiens",
    title: withSuffix("Chiens disponibles à Abidjan"),
    description:
      "Nos chiens actuellement disponibles : race, sexe, âge et prix. Tous vaccinés, vermifugés et identifiés avant leur départ.",
    image: DEFAULT_IMAGE,
  },
  {
    path: "/boutique",
    title: withSuffix("Boutique pour chien à Abidjan"),
    description:
      "Colliers, harnais, couchage, jouets, hygiène et alimentation. Livraison sous 24 h à Abidjan, paiement à la livraison.",
    image: DEFAULT_IMAGE,
  },
  {
    path: "/accessoires",
    title: withSuffix("Accessoires pour chien"),
    description:
      "Couchage, promenade, jeu et toilettage : tout ce qu'il faut pour le quotidien de votre chien, livré à Abidjan.",
    image: DEFAULT_IMAGE,
  },
  {
    path: "/alimentation",
    title: withSuffix("Alimentation pour chien"),
    description:
      "Croquettes chiot, adulte et spécialisées, pâtée et friandises. Une alimentation adaptée à chaque étape de la vie du chien.",
    image: DEFAULT_IMAGE,
  },
  {
    path: "/conseils",
    title: withSuffix("Conseils canins"),
    description:
      "Alimentation, éducation, santé et choix du matériel : des repères pratiques pour bien s'occuper de son chien.",
    image: DEFAULT_IMAGE,
  },
  {
    path: "/aide",
    title: withSuffix("Livraison, commandes et questions fréquentes"),
    description:
      "Zones et délais de livraison à Abidjan, déroulé d'une commande, paiement à la livraison et réponses aux questions fréquentes.",
    image: DEFAULT_IMAGE,
  },
  {
    path: "/a-propos",
    title: withSuffix("À propos"),
    description:
      "THE DOG MALL est une boutique d'Abidjan tenue par des gens qui ont un chien. Nous vendons ce que nous donnons aux nôtres.",
    image: DEFAULT_IMAGE,
  },
  {
    path: "/contact",
    title: withSuffix("Contact"),
    description: `Une question sur un chien, un produit ou une commande ? Écrivez-nous ou appelez le ${contactDetails.phone}.`,
    image: DEFAULT_IMAGE,
  },
  {
    path: "/cgv",
    title: withSuffix("Conditions générales de vente"),
    description:
      "Commandes, paiement à la livraison, délais de livraison et conditions de retour de THE DOG MALL.",
    image: DEFAULT_IMAGE,
  },
  {
    path: "/confidentialite",
    title: withSuffix("Politique de confidentialité"),
    description:
      "Quelles données personnelles nous collectons, à quoi elles servent et comment demander leur suppression.",
    image: DEFAULT_IMAGE,
  },
  {
    path: "/mentions-legales",
    title: withSuffix("Mentions légales"),
    description:
      "Informations relatives à l'éditeur et à l'hébergeur du site THE DOG MALL.",
    image: DEFAULT_IMAGE,
  },
  {
    path: "/favoris",
    title: withSuffix("Mes favoris"),
    description:
      "Les chiens et les produits que vous avez mis de côté sur cet appareil.",
    image: DEFAULT_IMAGE,
    noindex: true,
  },
  {
    path: "/compte",
    title: withSuffix("Mon compte"),
    description:
      "Vos favoris, votre panier et le suivi de vos commandes chez THE DOG MALL.",
    image: DEFAULT_IMAGE,
    noindex: true,
  },
  {
    path: "/panier",
    title: withSuffix("Mon panier"),
    description: "Les articles que vous avez ajoutés à votre panier.",
    image: DEFAULT_IMAGE,
    noindex: true,
  },
  {
    path: "/commande",
    title: withSuffix("Finaliser ma commande"),
    description:
      "Vos coordonnées et votre adresse de livraison pour finaliser la commande.",
    image: DEFAULT_IMAGE,
    noindex: true,
  },
];

export function dogMeta(dog: Dog): PageMeta {
  const path = `/chiens/${dog.id}`;
  const identity = `${dog.breed} ${dog.sex.toLowerCase()} de ${formatAge(dog.ageMonths)}`;

  return {
    path,
    title: withSuffix(`${dog.name}, ${identity} à ${contactDetails.city}`),
    description: `${dog.summary} ${formatPrice(dog.price)}, ${dog.availability.toLowerCase()} à ${dog.location}.`,
    image: dogPhotos(dog)[0],
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Product",
        name: `${dog.name}, ${dog.breed}`,
        description: dog.description,
        image: absolute(dogPhotos(dog)[0]),
        category: "Chien",
        offers: {
          "@type": "Offer",
          price: dog.price,
          priceCurrency: "XOF",
          availability:
            dog.availability === "Disponible"
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          url: absolute(path),
          seller: { "@type": "Organization", name: SITE_NAME },
        },
      },
      breadcrumb([
        { name: "Accueil", path: "/" },
        { name: "Chiens", path: "/chiens" },
        { name: dog.name, path },
      ]),
    ],
  };
}

export function productMeta(product: Product): PageMeta {
  const path = `/boutique/${product.id}`;

  return {
    path,
    title: withSuffix(`${product.name} — ${formatPrice(product.price)}`),
    description: `${product.description} Livraison sous 24 h à ${contactDetails.city}, paiement à la livraison.`,
    image: productPhotos(product)[0],
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: absolute(productPhotos(product)[0]),
        category: product.category,
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "XOF",
          availability: "https://schema.org/InStock",
          url: absolute(path),
          seller: { "@type": "Organization", name: SITE_NAME },
        },
      },
      breadcrumb([
        { name: "Accueil", path: "/" },
        { name: "Boutique", path: "/boutique" },
        { name: product.name, path },
      ]),
    ],
  };
}

export function articleMeta(article: Article): PageMeta {
  const path = `/conseils/${article.id}`;

  return {
    path,
    title: withSuffix(article.title),
    description: article.excerpt,
    image: DEFAULT_IMAGE,
    type: "article",
    updatedAt: article.publishedAt,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.excerpt,
        datePublished: article.publishedAt,
        inLanguage: "fr",
        articleSection: article.category,
        mainEntityOfPage: absolute(path),
        author: { "@type": "Organization", name: SITE_NAME },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          logo: {
            "@type": "ImageObject",
            url: absolute(DEFAULT_IMAGE),
          },
        },
      },
      breadcrumb([
        { name: "Accueil", path: "/" },
        { name: "Conseils", path: "/conseils" },
        { name: article.title, path },
      ]),
    ],
  };
}

const metaByPath = new Map(
  staticPagesMeta.map((meta) => [meta.path, meta])
);

/** Métadonnées d'une page fixe, par son chemin. */
export function pageMeta(path: StaticPath): PageMeta {
  const meta = metaByPath.get(path);

  if (!meta) {
    throw new Error(`Métadonnées manquantes pour la page ${path}`);
  }

  return meta;
}
