import type { Product } from "../types/product";

export const mockProducts: Product[] = [
  {
    id: "croquettes-chiot",
    name: "Croquettes Chiot Croissance",
    category: "Alimentation",
    foodStage: "Chiots",
    price: 19000,
    description:
      "Formule croissance enrichie en DHA pour accompagner le développement du chiot jusqu'à douze mois.",
  },
  {
    id: "croquettes-adulte",
    name: "Croquettes Adulte Poulet & Riz",
    category: "Alimentation",
    foodStage: "Adultes",
    price: 22000,
    description:
      "Croquettes complètes pour chien adulte, à base de poulet frais et de riz complet.",
  },
  {
    id: "croquettes-sensible",
    name: "Croquettes Digestion Sensible",
    category: "Alimentation",
    foodStage: "Alimentation spécialisée",
    price: 26500,
    description:
      "Recette sans céréales à l'agneau, pensée pour les chiens sujets aux troubles digestifs.",
  },
  {
    id: "pate-humide-boeuf",
    name: "Pâtée Humide Bœuf & Légumes",
    category: "Alimentation",
    foodStage: "Adultes",
    price: 3500,
    description:
      "Barquette de 400 g à mélanger aux croquettes pour les chiens qui boudent leur gamelle.",
  },
  {
    id: "friandises-dentaires",
    name: "Friandises Dentaires Menthe",
    category: "Alimentation",
    foodStage: "Friandises",
    price: 5500,
    description:
      "Bâtonnets à mâcher qui aident à réduire le tartre tout en rafraîchissant l'haleine.",
  },
  {
    id: "friandises-entrainement",
    name: "Friandises d'Entraînement Poulet",
    category: "Alimentation",
    foodStage: "Friandises",
    price: 4000,
    description:
      "Petites bouchées de 2 g, assez tendres pour récompenser sans couper une séance d'éducation.",
  },
  {
    id: "collier-premium",
    name: "Collier Premium",
    category: "Laisses & Colliers",
    price: 25000,
    description:
      "Collier en nylon doublé, boucle métal et anneau soudé, réglable du chiot au chien adulte.",
  },
  {
    id: "harnais-confort",
    name: "Harnais Confort",
    category: "Laisses & Colliers",
    price: 35000,
    description:
      "Harnais rembourré à cinq points de réglage qui répartit la pression pour des balades sans tirer.",
  },
  {
    id: "laisse-cuir",
    name: "Laisse en Cuir Véritable",
    category: "Laisses & Colliers",
    price: 18000,
    description:
      "Laisse de 1,20 m en cuir tanné, mousqueton laiton, pour un usage quotidien.",
  },
  {
    id: "jouet-interactif",
    name: "Jouet Interactif",
    category: "Jouets",
    price: 15000,
    description:
      "Jouet d'occupation qui libère les friandises au fil du jeu et occupe le chien seul à la maison.",
  },
  {
    id: "balle-caoutchouc",
    name: "Balle en Caoutchouc Increvable",
    category: "Jouets",
    price: 6000,
    description:
      "Balle résistante aux morsures les plus vigoureuses, elle flotte et rebondit de façon imprévisible.",
  },
  {
    id: "corde-tressee",
    name: "Corde Tressée à Mâcher",
    category: "Jouets",
    price: 4500,
    description:
      "Corde en coton naturel pour les jeux de tir et le nettoyage des dents.",
  },
  {
    id: "lit-premium",
    name: "Lit Premium",
    category: "Accessoires",
    price: 65000,
    description:
      "Couchage à mémoire de forme, housse déhoussable et lavable en machine à 30 °C.",
  },
  {
    id: "gamelle-double",
    name: "Gamelle Double Inox",
    category: "Accessoires",
    price: 12000,
    description:
      "Set de deux gamelles en inox sur socle antidérapant, pour l'eau et la nourriture.",
  },
  {
    id: "sac-transport",
    name: "Sac de Transport Ventilé",
    category: "Accessoires",
    price: 45000,
    description:
      "Sac rigide à parois aérées pour les trajets en voiture et les visites chez le vétérinaire.",
  },
  {
    id: "shampoing-doux",
    name: "Shampoing Doux Avoine",
    category: "Hygiène",
    price: 8000,
    description:
      "Shampoing hypoallergénique à l'avoine pour peaux sensibles, sans parabène.",
  },
  {
    id: "brosse-demelante",
    name: "Brosse Démêlante Douce",
    category: "Hygiène",
    price: 9000,
    description:
      "Brosse à picots souples pour démêler les poils longs sans irriter la peau.",
  },
];

/** Les quatre produits mis en avant sur la page d'accueil. */
export const essentialProductIds = [
  "collier-premium",
  "harnais-confort",
  "jouet-interactif",
  "lit-premium",
];

export function findProduct(productId: string | undefined) {
  return mockProducts.find((product) => product.id === productId);
}
