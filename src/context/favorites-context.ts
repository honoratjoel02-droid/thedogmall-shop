import { createContext } from "react";

/** Les favoris couvrent deux collections distinctes : les chiens et les produits. */
export type FavoriteKind = "dog" | "product";

export type FavoritesState = {
  dogs: string[];
  products: string[];
};

export type FavoritesContextValue = {
  favorites: FavoritesState;
  isFavorite: (kind: FavoriteKind, id: string) => boolean;
  toggleFavorite: (kind: FavoriteKind, id: string) => void;
  favoriteCount: number;
  /** Faux jusqu'à la relecture des favoris enregistrés. */
  isRestored: boolean;
};

export const FavoritesContext =
  createContext<FavoritesContextValue | null>(null);

export const FAVORITES_STORAGE_KEY = "thedogmall-favoris";
