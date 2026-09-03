import { createBrowserRouter, matchRoutes } from "react-router-dom";
import type { RouteObject } from "react-router-dom";

import { createLazyRoutes } from "./routes";

/**
 * Prépare le routeur du navigateur.
 *
 * La page d'entrée est chargée **avant** de rendre la main : son HTML est
 * déjà à l'écran, généré au build, et React doit pouvoir le reprendre tel
 * quel. Sans cela il afficherait l'écran d'attente à la place, le temps du
 * téléchargement, et l'on verrait la page clignoter au chargement.
 */
export async function createRouter(pathname: string) {
  const routes = createLazyRoutes();

  await Promise.all(
    (matchRoutes(routes, pathname) ?? []).map((match) =>
      resolveRoute(match.route)
    )
  );

  return createBrowserRouter(routes);
}

async function resolveRoute(route: RouteObject) {
  if (typeof route.lazy !== "function") return;

  const resolved = await route.lazy();

  Object.assign(route, resolved);
  delete route.lazy;
}
