import { createContext } from "react";

import type { Product } from "../types/product";

export type CartItem = {
  product: Product;
  quantity: number;
};

export type CartContextValue = {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

export const CartContext = createContext<CartContextValue | null>(null);

// Suffixe `-v2` : les paniers enregistrés avant le passage au franc CFA
// contenaient des prix en euros, ils sont volontairement abandonnés.
export const CART_STORAGE_KEY = "thedogmall-cart-v2";
