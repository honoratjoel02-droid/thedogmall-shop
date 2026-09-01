import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * React Router ne restaure pas la position de défilement : sans cela, on
 * arrive au milieu de la page après un clic depuis le bas d'une liste.
 * Gère aussi les ancres du type `/aide#livraison`.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));

      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}
