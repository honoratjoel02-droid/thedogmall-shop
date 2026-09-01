import { useCallback, useEffect, useState, type ReactNode } from "react";

import type {
  FavoriteKind,
  FavoritesState,
} from "./favorites-context";
import {
  FAVORITES_STORAGE_KEY,
  FavoritesContext,
} from "./favorites-context";

const emptyFavorites: FavoritesState = { dogs: [], products: [] };

function readStoredFavorites(): FavoritesState {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return emptyFavorites;

    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return emptyFavorites;

    const { dogs, products } = parsed as Partial<FavoritesState>;

    return {
      dogs: Array.isArray(dogs) ? dogs.filter(isString) : [],
      products: Array.isArray(products) ? products.filter(isString) : [],
    };
  } catch {
    return emptyFavorites;
  }
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

const stateKeys: Record<FavoriteKind, keyof FavoritesState> = {
  dog: "dogs",
  product: "products",
};

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] =
    useState<FavoritesState>(readStoredFavorites);

  useEffect(() => {
    try {
      localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(favorites)
      );
    } catch {
      // localStorage indisponible (navigation privée, quota) : les favoris
      // restent valables le temps de la visite.
    }
  }, [favorites]);

  const isFavorite = useCallback(
    (kind: FavoriteKind, id: string) =>
      favorites[stateKeys[kind]].includes(id),
    [favorites]
  );

  const toggleFavorite = useCallback((kind: FavoriteKind, id: string) => {
    const key = stateKeys[kind];

    setFavorites((prev) => ({
      ...prev,
      [key]: prev[key].includes(id)
        ? prev[key].filter((storedId) => storedId !== id)
        : [...prev[key], id],
    }));
  }, []);

  const favoriteCount = favorites.dogs.length + favorites.products.length;

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, toggleFavorite, favoriteCount }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
