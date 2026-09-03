import { Navigate, useLocation, useParams } from "react-router-dom";

/**
 * `/produits` a été renommé `/boutique`. Les deux redirections gardent
 * valides les liens déjà partagés, filtres et recherche compris.
 */
export function ShopRedirect() {
  const { search } = useLocation();

  return <Navigate to={`/boutique${search}`} replace />;
}

export function ProductRedirect() {
  const { productId } = useParams();

  return <Navigate to={`/boutique/${productId}`} replace />;
}
