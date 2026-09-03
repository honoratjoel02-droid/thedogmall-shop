import raw from "../../content/dogs.json";
import type { Dog, DogAvailability, DogSex } from "../types/dog";
import {
  optionalTextList,
  parseAll,
  text,
  textList,
  wholeNumber,
  among,
} from "./validate";

const sexes: readonly DogSex[] = ["Mâle", "Femelle"];
const availabilities: readonly DogAvailability[] = ["Disponible", "Réservé"];

export const dogs: Dog[] = parseAll(raw, "content/dogs.json", (source, where) => ({
  id: text(source, "id", where),
  name: text(source, "name", where),
  breed: text(source, "breed", where),
  sex: among(source, "sex", sexes, where),
  ageMonths: wholeNumber(source, "ageMonths", where),
  price: wholeNumber(source, "price", where),
  availability: among(source, "availability", availabilities, where),
  summary: text(source, "summary", where),
  description: text(source, "description", where),
  temperament: textList(source, "temperament", where),
  included: textList(source, "included", where),
  location: text(source, "location", where),
  images: optionalTextList(source, "images", where),
}));

export function findDog(dogId: string | undefined) {
  return dogs.find((dog) => dog.id === dogId);
}
