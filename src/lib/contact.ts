/**
 * Coordonnées de la boutique, à jour dans un seul fichier.
 *
 * Ce module ne doit dépendre de rien : il est aussi importé par
 * `vite.config.ts` pour générer les métadonnées des pages au build.
 */
export const contactDetails = {
  phone: "+225 07 58 42 19 03",
  phoneHref: "tel:+2250758421903",
  email: "contact@thedogmall.ci",
  address: "Abidjan, Côte d'Ivoire",
  city: "Abidjan",
  country: "CI",
  /**
   * Numéro WhatsApp au format international, chiffres uniquement (indicatif
   * pays compris, sans « + » ni espaces) : c'est ce qu'attend wa.me.
   * À remplacer par le vrai numéro de la boutique avant la mise en ligne.
   */
  whatsapp: "2250758421903",
  openingHours: "Du lundi au samedi, de 8 h à 19 h",
};
