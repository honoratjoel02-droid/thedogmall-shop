import type { Dog } from "../types/dog";

export const dogs: Dog[] = [
  {
    id: "roy",
    name: "Roy",
    breed: "Chow Chow",
    sex: "Mâle",
    ageMonths: 8,
    price: 650000,
    availability: "Disponible",
    summary:
      "Un jeune mâle calme, déjà habitué à la vie en appartement et à la marche en laisse.",
    description:
      "Roy a grandi avec sa portée jusqu'à ses trois mois, puis en famille. Il est propre, dort la nuit sans réveil et supporte bien la chaleur d'Abidjan à condition d'être brossé chaque semaine. Il connaît le rappel et l'ordre « assis », et se laisse manipuler pour le toilettage sans difficulté.",
    temperament: ["Calme", "Réservé avec les inconnus", "Attaché à sa famille"],
    included: [
      "Carnet de santé à jour",
      "Vacciné et vermifugé",
      "Puce électronique",
      "Premier sac de croquettes offert",
    ],
    location: "Abidjan, Cocody",
  },
  {
    id: "luna",
    name: "Luna",
    breed: "Chow Chow",
    sex: "Femelle",
    ageMonths: 6,
    price: 700000,
    availability: "Disponible",
    summary:
      "Femelle très sociable, à l'aise avec les enfants et les autres chiens de la maison.",
    description:
      "Luna vient d'une portée de quatre chiots suivie par notre vétérinaire depuis la naissance. Elle a été socialisée avec des enfants et un chat, ce qui la rend facile à intégrer dans un foyer déjà occupé. Son poil demande un brossage sérieux deux fois par semaine, surtout en saison des pluies.",
    temperament: ["Sociable", "Joueuse", "Curieuse"],
    included: [
      "Carnet de santé à jour",
      "Vaccinée et vermifugée",
      "Puce électronique",
      "Suivi vétérinaire pendant un mois",
    ],
    location: "Abidjan, Cocody",
  },
  {
    id: "kenzo",
    name: "Kenzo",
    breed: "Berger allemand",
    sex: "Mâle",
    ageMonths: 10,
    price: 550000,
    availability: "Disponible",
    summary:
      "Chien de garde attentif, déjà éduqué aux ordres de base et à la marche au pied.",
    description:
      "Kenzo est issu d'une lignée de travail. Il a suivi deux mois d'éducation avec notre partenaire éducateur : marche au pied, rappel, position couchée et retour au panier. Il lui faut un terrain ou deux sorties longues par jour, et un maître qui reprend le travail commencé.",
    temperament: ["Vigilant", "Obéissant", "Énergique"],
    included: [
      "Carnet de santé à jour",
      "Vacciné et vermifugé",
      "Puce électronique",
      "Deux séances d'éducation avec notre partenaire",
    ],
    location: "Abidjan, Bingerville",
  },
  {
    id: "nala",
    name: "Nala",
    breed: "Golden Retriever",
    sex: "Femelle",
    ageMonths: 5,
    price: 600000,
    availability: "Réservé",
    summary:
      "Chiot très demandeur de contact, idéal pour une première adoption en famille.",
    description:
      "Nala est encore en pleine découverte : elle mordille, réclame de l'attention et apprend vite dès qu'il y a une friandise en jeu. Elle est propre en journée mais demande encore une sortie tardive. Sa réservation court jusqu'à la fin du mois, contactez-nous pour être placé en liste d'attente.",
    temperament: ["Affectueuse", "Vive", "Gourmande"],
    included: [
      "Carnet de santé à jour",
      "Vaccinée et vermifugée",
      "Puce électronique",
      "Premier sac de croquettes chiot offert",
    ],
    location: "Abidjan, Riviera",
  },
];

export function findDog(dogId: string | undefined) {
  return dogs.find((dog) => dog.id === dogId);
}
