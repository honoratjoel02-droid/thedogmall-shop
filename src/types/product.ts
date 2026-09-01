export type ProductCategory =
  | "Alimentation"
  | "Accessoires"
  | "Jouets"
  | "Hygiène"
  | "Laisses & Colliers";

/**
 * Sous-rayon utilisé uniquement par la page Alimentation, qui présente le
 * catalogue par étape de vie plutôt que par type de produit.
 */
export type FoodStage =
  | "Chiots"
  | "Adultes"
  | "Friandises"
  | "Alimentation spécialisée";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  /** Prix en francs CFA (XOF), toujours un entier. */
  price: number;
  description: string;
  foodStage?: FoodStage;
};
