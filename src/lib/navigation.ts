import {
  Dog,
  House,
  ShoppingBag,
  ShoppingCart,
  UserCircle,
  type Icon,
} from "@phosphor-icons/react";

export type NavItem = {
  label: string;
  to: string;
  /** Passé à `NavLink` pour que « Accueil » ne reste pas actif partout. */
  end?: boolean;
};

/** Navigation principale, partagée par l'en-tête et le menu mobile. */
export const mainNav: NavItem[] = [
  { label: "Accueil", to: "/", end: true },
  { label: "Chiens", to: "/chiens" },
  { label: "Boutique", to: "/boutique" },
  { label: "Alimentation", to: "/alimentation" },
  { label: "Accessoires", to: "/accessoires" },
  { label: "À propos", to: "/a-propos" },
];

export type TabItem = NavItem & { icon: Icon };

/** Barre d'onglets affichée en bas de l'écran sur mobile. */
export const mobileTabs: TabItem[] = [
  { label: "Accueil", to: "/", end: true, icon: House },
  { label: "Chiens", to: "/chiens", icon: Dog },
  { label: "Boutique", to: "/boutique", icon: ShoppingBag },
  { label: "Panier", to: "/panier", icon: ShoppingCart },
  { label: "Compte", to: "/compte", icon: UserCircle },
];

export const footerNav = {
  navigation: [
    { label: "Accueil", to: "/" },
    { label: "Chiens", to: "/chiens" },
    { label: "Boutique", to: "/boutique" },
    { label: "Alimentation", to: "/alimentation" },
    { label: "Accessoires", to: "/accessoires" },
  ],
  assistance: [
    { label: "Contact", to: "/contact" },
    { label: "Livraison", to: "/aide#livraison" },
    { label: "Commandes", to: "/aide#commandes" },
    { label: "FAQ", to: "/aide#faq" },
  ],
  informations: [
    { label: "Conditions générales", to: "/cgv" },
    { label: "Politique de confidentialité", to: "/confidentialite" },
    { label: "Mentions légales", to: "/mentions-legales" },
  ],
};

export const contactDetails = {
  phone: "+225 07 58 42 19 03",
  phoneHref: "tel:+2250758421903",
  email: "contact@thedogmall.ci",
  address: "Abidjan, Côte d'Ivoire",
};
