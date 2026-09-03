const numberFormat = new Intl.NumberFormat("fr-FR");

/** Formate un montant en francs CFA : `650 000 FCFA`. */
export function formatPrice(amount: number) {
  return `${numberFormat.format(amount)} FCFA`;
}

/** Formate un âge en mois : `8 mois`, `1 an`, `1 an et 4 mois`. */
export function formatAge(months: number) {
  if (months < 12) {
    return `${months} mois`;
  }

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  const yearLabel = years > 1 ? `${years} ans` : "1 an";

  return remainingMonths > 0
    ? `${yearLabel} et ${remainingMonths} mois`
    : yearLabel;
}

const dateFormat = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/** Formate une date ISO courte (`2026-08-19`) en `19 août 2026`. */
export function formatArticleDate(isoDate: string) {
  return dateFormat.format(new Date(`${isoDate}T00:00:00`));
}
