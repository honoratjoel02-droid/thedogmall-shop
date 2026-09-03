import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router-dom";

import { createEagerRoutes } from "./router/routes";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { allPagesMeta } from "./lib/seo-pages";
import { SITE_NAME, SITE_URL } from "./lib/seo";

/**
 * Point d'entrée du générateur de pages. `scripts/prerender.mjs` importe
 * ce module après le build et écrit un fichier HTML complet par page.
 */
export { allPagesMeta, SITE_NAME, SITE_URL };

export async function render(path: string) {
  const routes = await createEagerRoutes();
  const handler = createStaticHandler(routes);
  const context = await handler.query(
    new Request(`http://localhost${path}`)
  );

  if (context instanceof Response) {
    throw new Error(
      `La page ${path} a renvoyé une redirection au lieu d'un contenu.`
    );
  }

  const router = createStaticRouter(routes, context);

  return renderToString(
    <StrictMode>
      <FavoritesProvider>
        <CartProvider>
          <StaticRouterProvider
            router={router}
            context={context}
            hydrate={false}
          />
        </CartProvider>
      </FavoritesProvider>
    </StrictMode>
  );
}
