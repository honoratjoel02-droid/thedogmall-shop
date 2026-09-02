/**
 * Validateurs de formulaire. Chacun renvoie un message d'erreur en
 * français, ou `undefined` si la valeur convient.
 */

export type FieldErrors<Field extends string> = Partial<
  Record<Field, string>
>;

export function required(value: string, label: string) {
  return value.trim() ? undefined : `${label} est obligatoire.`;
}

export function email(value: string) {
  const trimmed = value.trim();

  if (!trimmed) return "L'adresse email est obligatoire.";

  // Volontairement permissif : on écarte les fautes de frappe évidentes
  // sans refuser une adresse valide mais inhabituelle.
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)
    ? undefined
    : "Cette adresse email ne semble pas valide.";
}

export function phone(value: string) {
  const trimmed = value.trim();

  if (!trimmed) return "Le numéro de téléphone est obligatoire.";

  const digits = trimmed.replace(/[\s.\-()+]/g, "");

  if (!/^\d+$/.test(digits)) {
    return "Le numéro ne doit contenir que des chiffres.";
  }

  return digits.length >= 8 && digits.length <= 15
    ? undefined
    : "Le numéro doit comporter entre 8 et 15 chiffres.";
}

export function minLength(value: string, length: number, label: string) {
  const trimmed = value.trim();

  if (!trimmed) return `${label} est obligatoire.`;

  return trimmed.length >= length
    ? undefined
    : `${label} doit faire au moins ${length} caractères.`;
}

/** Retire les entrées `undefined` pour savoir s'il reste une erreur. */
export function collectErrors<Field extends string>(
  candidates: Record<Field, string | undefined>
): FieldErrors<Field> {
  const errors: FieldErrors<Field> = {};

  for (const [field, message] of Object.entries(candidates)) {
    if (message) errors[field as Field] = message as string;
  }

  return errors;
}

/** Attributs ARIA reliant un champ à son message d'erreur. */
export function fieldAria(id: string, error?: string) {
  return {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
  };
}
