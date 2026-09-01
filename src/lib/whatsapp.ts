import { contactDetails } from "./contact";
import { formatAge, formatPrice } from "./format";
import type { Dog } from "../types/dog";
import type { CartItem } from "../context/cart-context";
import type { Product } from "../types/product";

/** Construit un lien wa.me avec un message déjà rédigé. */
export function whatsAppLink(message: string) {
  return `https://wa.me/${contactDetails.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function dogMessage(dog: Dog) {
  const identity = `${dog.breed}, ${dog.sex.toLowerCase()}, ${formatAge(dog.ageMonths)}`;

  return dog.availability === "Disponible"
    ? `Bonjour THE DOG MALL, je suis intéressé(e) par ${dog.name} (${identity}) à ${formatPrice(dog.price)}. Est-il possible de le rencontrer ?`
    : `Bonjour THE DOG MALL, ${dog.name} (${identity}) est indiqué réservé. Pouvez-vous me prévenir s'il redevient disponible ?`;
}

export function productMessage(product: Product) {
  return `Bonjour THE DOG MALL, je souhaite commander : ${product.name} — ${formatPrice(product.price)}. Est-il en stock ?`;
}

export function cartMessage(items: CartItem[], subtotal: number) {
  const lines = items.map(
    (item) =>
      `• ${item.product.name} × ${item.quantity} — ${formatPrice(item.product.price * item.quantity)}`
  );

  return [
    "Bonjour THE DOG MALL, je souhaite passer la commande suivante :",
    "",
    ...lines,
    "",
    `Total : ${formatPrice(subtotal)}`,
    "",
    "Merci de me confirmer la disponibilité et les frais de livraison.",
  ].join("\n");
}

export const generalMessage =
  "Bonjour THE DOG MALL, j'ai une question sur vos chiens et vos produits.";
