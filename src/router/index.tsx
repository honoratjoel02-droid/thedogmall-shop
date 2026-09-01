import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import Dogs from "../pages/Dogs";
import DogDetail from "../pages/DogDetail";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import Food from "../pages/Food";
import Favorites from "../pages/Favorites";
import Account from "../pages/Account";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Advice from "../pages/Advice";
import ArticleDetail from "../pages/ArticleDetail";
import Contact from "../pages/Contact";
import About from "../pages/About";
import Help from "../pages/Help";
import Legal from "../pages/Legal";
import NotFound from "../pages/NotFound";
import { ProductRedirect, ShopRedirect } from "./LegacyRedirects";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },

  { path: "/chiens", element: <Dogs /> },
  { path: "/chiens/:dogId", element: <DogDetail /> },

  { path: "/boutique", element: <Products universe="boutique" /> },
  { path: "/boutique/:productId", element: <ProductDetail /> },
  { path: "/accessoires", element: <Products universe="accessoires" /> },
  { path: "/alimentation", element: <Food /> },

  { path: "/favoris", element: <Favorites /> },
  { path: "/compte", element: <Account /> },
  { path: "/panier", element: <Cart /> },
  { path: "/commande", element: <Checkout /> },

  { path: "/conseils", element: <Advice /> },
  { path: "/conseils/:articleId", element: <ArticleDetail /> },

  { path: "/a-propos", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/aide", element: <Help /> },

  { path: "/mentions-legales", element: <Legal page="mentions" /> },
  { path: "/confidentialite", element: <Legal page="confidentialite" /> },
  { path: "/cgv", element: <Legal page="cgv" /> },

  // Anciennes URL, conservées pour ne pas casser les liens déjà partagés.
  { path: "/produits", element: <ShopRedirect /> },
  { path: "/produits/:productId", element: <ProductRedirect /> },

  { path: "*", element: <NotFound /> },
]);
