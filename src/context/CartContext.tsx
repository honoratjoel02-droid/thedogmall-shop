import { useEffect, useState, type ReactNode } from "react";

import type { CartItem } from "./cart-context";
import { CART_STORAGE_KEY, CartContext } from "./cart-context";

function readStoredCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [restored, setRestored] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  /*
   * Le panier est relu après le premier rendu, pas pendant. Les pages
   * sont générées au build, où `localStorage` n'existe pas : partir de la
   * même liste vide des deux côtés évite que React reconstruise la page
   * au lieu de la reprendre.
   */
  useEffect(() => {
    // Lire pendant le rendu casserait la reprise du HTML généré au
    // build, qui ne connaît pas le localStorage.
    // oxlint-disable-next-line react/set-state-in-effect
    setItems(readStoredCart());
    setRestored(true);
  }, []);

  useEffect(() => {
    // Tant que le panier enregistré n'a pas été lu, l'écrire l'effacerait.
    if (!restored) return;

    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // localStorage indisponible (navigation privée, quota) : le panier
      // vaut alors le temps de la visite.
    }
  }, [items, restored]);

  function addItem(product: CartItem["product"], quantity = 1) {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id
      );

      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, { product, quantity }];
    });
  }

  function removeItem(productId: string) {
    setItems((prev) =>
      prev.filter((item) => item.product.id !== productId)
    );
  }

  function updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }

  function clearCart() {
    setItems([]);
  }

  function openDrawer() {
    setIsDrawerOpen(true);
  }

  function closeDrawer() {
    setIsDrawerOpen(false);
  }

  const itemCount = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        isRestored: restored,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
