import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./index.css";

import { createRouter } from "./router";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";

const container = document.getElementById("root")!;
const router = await createRouter(window.location.pathname);

const app = (
  <StrictMode>
    <FavoritesProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </FavoritesProvider>
  </StrictMode>
);

/*
 * Les pages du site en ligne sont générées au build : on reprend le HTML
 * déjà affiché. En développement, `index.html` est vide et il n'y a rien à
 * reprendre — on rend alors normalement.
 */
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
