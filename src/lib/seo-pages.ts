import {
  articleMeta,
  dogMeta,
  productMeta,
  staticPagesMeta,
  type PageMeta,
} from "./seo";
import { articles } from "../data/articles";
import { dogs } from "../data/dogs";
import { products } from "../data/products";

/**
 * Toutes les pages du site, pour la pré-génération et le sitemap.
 *
 * Séparé de `seo.ts` parce que ce module importe tout le catalogue : il
 * n'est utilisé qu'au build, par `vite.config.ts`, jamais par le site.
 */
export function allPagesMeta(): PageMeta[] {
  return [
    ...staticPagesMeta,
    ...dogs.map(dogMeta),
    ...products.map(productMeta),
    ...articles.map(articleMeta),
  ];
}
