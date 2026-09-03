import raw from "../../content/products.json";
import type { FoodStage, Product, ProductCategory } from "../types/product";
import {
  among,
  flag,
  optionalAmong,
  optionalTextList,
  parseAll,
  text,
  wholeNumber,
} from "./validate";

const categories: readonly ProductCategory[] = [
  "Alimentation",
  "Accessoires",
  "Jouets",
  "Hygiène",
  "Laisses & Colliers",
];

const foodStages: readonly FoodStage[] = [
  "Chiots",
  "Adultes",
  "Friandises",
  "Alimentation spécialisée",
];

export const products: Product[] = parseAll(
  raw,
  "content/products.json",
  (source, where) => ({
    id: text(source, "id", where),
    name: text(source, "name", where),
    category: among(source, "category", categories, where),
    price: wholeNumber(source, "price", where),
    description: text(source, "description", where),
    foodStage: optionalAmong(source, "foodStage", foodStages, where),
    featured: flag(source, "featured", where),
    images: optionalTextList(source, "images", where),
  })
);

/** Produits mis en avant sur la page d'accueil (`"featured": true`). */
export const featuredProducts = products.filter(
  (product) => product.featured
);

export function findProduct(productId: string | undefined) {
  return products.find((product) => product.id === productId);
}
