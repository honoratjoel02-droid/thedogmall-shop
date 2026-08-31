import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Contact from "../pages/Contact";
import About from "../pages/About";
import Legal from "../pages/Legal";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/produits",
    element: <Products />,
  },
  {
    path: "/produits/:productId",
    element: <ProductDetail />,
  },
  {
    path: "/panier",
    element: <Cart />,
  },
  {
    path: "/commande",
    element: <Checkout />,
  },
  {
    path: "/a-propos",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/mentions-legales",
    element: <Legal page="mentions" />,
  },
  {
    path: "/confidentialite",
    element: <Legal page="confidentialite" />,
  },
  {
    path: "/cgv",
    element: <Legal page="cgv" />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
