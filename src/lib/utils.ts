import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Chemin sans barre oblique finale : selon l'hébergeur, la même page peut
 * arriver en `/cgv` ou en `/cgv/`, et une comparaison brute se trompe.
 */
export function normalizePath(pathname: string) {
  return pathname.replace(/\/+$/, "") || "/";
}
