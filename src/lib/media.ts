import type { Dog } from "../types/dog";
import type { Product } from "../types/product";

/**
 * Les photos vivent dans `public/`, sans étape de build. Par défaut on
 * cherche `<identifiant>.jpg` ; pour en avoir plusieurs, listez les noms
 * de fichiers dans le champ `images` de la donnée.
 */
function resolve(folder: string, id: string, images?: string[]) {
  const files = images?.length ? images : [`${id}.jpg`];

  return files.map((file) => `/${folder}/${file}`);
}

export function dogPhotos(dog: Pick<Dog, "id" | "images">) {
  return resolve("dogs", dog.id, dog.images);
}

export function productPhotos(product: Pick<Product, "id" | "images">) {
  return resolve("products", product.id, product.images);
}
