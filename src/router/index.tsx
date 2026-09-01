import { createBrowserRouter, type RouteObject } from "react-router-dom";

import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import PageLoading from "../components/site/PageLoading";
import { ProductRedirect, ShopRedirect } from "./LegacyRedirects";

/**
 * L'accueil part avec le premier chargement ; les autres pages sont
 * téléchargées à la demande, ce qui allège d'autant l'arrivée sur le site
 * en connexion mobile.
 *
 * `HydrateFallback` ne sert qu'à l'ouverture directe d'une URL : pendant
 * une navigation interne, React Router garde la page précédente affichée
 * le temps du téléchargement.
 */
function lazyPage(
  load: () => Promise<{ default: React.ComponentType }>
): Pick<RouteObject, "lazy" | "HydrateFallback"> {
  return {
    lazy: async () => ({ Component: (await load()).default }),
    HydrateFallback: PageLoading,
  };
}

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },

  { path: "/chiens", ...lazyPage(() => import("../pages/Dogs")) },
  { path: "/chiens/:dogId", ...lazyPage(() => import("../pages/DogDetail")) },

  { path: "/boutique", ...lazyPage(() => import("../pages/Products")) },
  {
    path: "/boutique/:productId",
    ...lazyPage(() => import("../pages/ProductDetail")),
  },
  { path: "/accessoires", ...lazyPage(() => import("../pages/Products")) },
  { path: "/alimentation", ...lazyPage(() => import("../pages/Food")) },

  { path: "/favoris", ...lazyPage(() => import("../pages/Favorites")) },
  { path: "/compte", ...lazyPage(() => import("../pages/Account")) },
  { path: "/panier", ...lazyPage(() => import("../pages/Cart")) },
  { path: "/commande", ...lazyPage(() => import("../pages/Checkout")) },

  { path: "/conseils", ...lazyPage(() => import("../pages/Advice")) },
  {
    path: "/conseils/:articleId",
    ...lazyPage(() => import("../pages/ArticleDetail")),
  },

  { path: "/a-propos", ...lazyPage(() => import("../pages/About")) },
  { path: "/contact", ...lazyPage(() => import("../pages/Contact")) },
  { path: "/aide", ...lazyPage(() => import("../pages/Help")) },

  { path: "/mentions-legales", ...lazyPage(() => import("../pages/Legal")) },
  { path: "/confidentialite", ...lazyPage(() => import("../pages/Legal")) },
  { path: "/cgv", ...lazyPage(() => import("../pages/Legal")) },

  // Anciennes URL, conservées pour ne pas casser les liens déjà partagés.
  { path: "/produits", element: <ShopRedirect /> },
  { path: "/produits/:productId", element: <ProductRedirect /> },

  { path: "*", element: <NotFound /> },
]);
