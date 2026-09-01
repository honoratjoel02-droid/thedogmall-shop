import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./index.css";

import { router } from "./router";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FavoritesProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </FavoritesProvider>
  </StrictMode>
);
