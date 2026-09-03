import type { ComponentType } from "react";
import type { RouteObject } from "react-router-dom";

import NotFound from "../pages/NotFound";
import PageLoading from "../components/site/PageLoading";
import { ProductRedirect, ShopRedirect } from "./LegacyRedirects";

type PageRoute = {
  path: string;
  load: () => Promise<{ default: ComponentType }>;
};

/**
 * Table des pages, écrite une seule fois. Le navigateur télécharge chaque
 * page à la demande ; la génération des pages au build, elle, les charge
 * toutes d'un coup.
 */
const pageRoutes: PageRoute[] = [
  { path: "/", load: () => import("../pages/Home") },

  { path: "/chiens", load: () => import("../pages/Dogs") },
  { path: "/chiens/:dogId", load: () => import("../pages/DogDetail") },

  { path: "/boutique", load: () => import("../pages/Products") },
  {
    path: "/boutique/:productId",
    load: () => import("../pages/ProductDetail"),
  },
  { path: "/accessoires", load: () => import("../pages/Products") },
  { path: "/alimentation", load: () => import("../pages/Food") },

  { path: "/favoris", load: () => import("../pages/Favorites") },
  { path: "/compte", load: () => import("../pages/Account") },
  { path: "/panier", load: () => import("../pages/Cart") },
  { path: "/commande", load: () => import("../pages/Checkout") },

  { path: "/conseils", load: () => import("../pages/Advice") },
  {
    path: "/conseils/:articleId",
    load: () => import("../pages/ArticleDetail"),
  },

  { path: "/a-propos", load: () => import("../pages/About") },
  { path: "/contact", load: () => import("../pages/Contact") },
  { path: "/aide", load: () => import("../pages/Help") },

  { path: "/mentions-legales", load: () => import("../pages/Legal") },
  { path: "/confidentialite", load: () => import("../pages/Legal") },
  { path: "/cgv", load: () => import("../pages/Legal") },
];

/** Anciennes URL et page 404 : trop légères pour valoir un téléchargement. */
const staticRoutes: RouteObject[] = [
  { path: "/produits", element: <ShopRedirect /> },
  { path: "/produits/:productId", element: <ProductRedirect /> },
  { path: "*", element: <NotFound /> },
];

/** Routes du navigateur : chaque page est téléchargée à la demande. */
export function createLazyRoutes(): RouteObject[] {
  return [
    ...pageRoutes.map(({ path, load }) => ({
      path,
      lazy: async () => ({ Component: (await load()).default }),
      HydrateFallback: PageLoading,
    })),
    ...staticRoutes,
  ];
}

/** Routes du générateur de pages : tout est chargé d'avance. */
export async function createEagerRoutes(): Promise<RouteObject[]> {
  const resolved = await Promise.all(
    pageRoutes.map(async ({ path, load }) => ({
      path,
      Component: (await load()).default,
    }))
  );

  return [...resolved, ...staticRoutes];
}
