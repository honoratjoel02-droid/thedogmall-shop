export type DogSex = "Mâle" | "Femelle";

export type DogAvailability = "Disponible" | "Réservé";

export type Dog = {
  id: string;
  name: string;
  breed: string;
  sex: DogSex;
  ageMonths: number;
  /** Prix en francs CFA (XOF), toujours un entier. */
  price: number;
  availability: DogAvailability;
  /** Présentation courte, affichée sur la carte et en tête de fiche. */
  summary: string;
  description: string;
  /** Trois à quatre traits de caractère, affichés en étiquettes. */
  temperament: string[];
  /** Ce qui est fourni avec le chien (carnet, vaccins, puce...). */
  included: string[];
  location: string;
};
