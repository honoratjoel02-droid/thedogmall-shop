import { Bed, Bone, Drop, PawPrint, TennisBall } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

import type { ProductCategory } from "../types/product";

export const categoryIcons: Record<ProductCategory, Icon> = {
  Alimentation: Bone,
  Jouets: TennisBall,
  "Laisses & Colliers": PawPrint,
  Hygiène: Drop,
  Accessoires: Bed,
};

export const categoryOrder: ProductCategory[] = [
  "Alimentation",
  "Jouets",
  "Laisses & Colliers",
  "Hygiène",
  "Accessoires",
];
