# THE DOG MALL — Boutique

Site public de THE DOG MALL (Abidjan, Côte d'Ivoire) : présentation des
chiens disponibles, boutique d'accessoires et rayon alimentation.
Projet React + TypeScript + Vite + Tailwind CSS v4, entièrement
indépendant de l'application de gestion `thedogmall-pro`.

Le site est pensé mobile d'abord : navigation par barre d'onglets fixe
en bas de l'écran sur téléphone, menu latéral pour le reste, puis
navigation horizontale classique à partir de 1024 px.

## Pages

| URL | Contenu |
| --- | --- |
| `/` | Accueil : hero, trois univers, chiens disponibles, indispensables, alimentation, engagements, bannière, conseils |
| `/chiens` | Liste des chiens, filtrable par disponibilité |
| `/chiens/:dogId` | Fiche d'un chien |
| `/boutique` | Catalogue complet, filtrable (`?categorie=...`, `?recherche=...`) |
| `/boutique/:productId` | Fiche produit |
| `/accessoires` | Catalogue sans le rayon alimentation |
| `/alimentation` | Rayon alimentation par étape de vie (`?etape=...`) |
| `/favoris` | Chiens et produits mis de côté |
| `/compte` | Espace client (raccourcis, contact) |
| `/panier`, `/commande` | Panier et formulaire de commande |
| `/conseils`, `/conseils/:articleId` | Conseils canins |
| `/aide` | Livraison, commandes et FAQ (ancres `#livraison`, `#commandes`, `#faq`) |
| `/a-propos`, `/contact` | Présentation et formulaire de contact |
| `/mentions-legales`, `/confidentialite`, `/cgv` | Pages légales |

Les anciennes URL `/produits` et `/produits/:id` redirigent vers
`/boutique`, filtres et recherche conservés.

## Démarrer

```bash
npm install
npm run dev     # serveur de développement
npm run build   # typage + build de production
npm run lint    # oxlint
```

## Photos

Les images sont servies depuis `public/`, sans build particulier :

- `public/products/<id-produit>.jpg` — photos produits (identifiants de
  `src/data/mockProducts.ts`).
- `public/dogs/<id-chien>.jpg` — photos des chiens, cadrage portrait 4/5
  (voir `public/dogs/README.md`).
- `public/hero-chien.jpg` — grande photo du hero de la page d'accueil,
  cadrage portrait, environ 1200 × 1500 px.

Tant qu'une photo manque, un aplat de marque prend sa place : la mise en
page reste correcte, mais le site gagne beaucoup avec les vraies photos.

## Prix et devise

Tous les prix sont stockés en francs CFA sous forme d'entiers et affichés
via `formatPrice()` (`src/lib/format.ts`) : `650 000 FCFA`. Les paniers
enregistrés avant le passage au franc CFA sont ignorés (la clé
`localStorage` est passée à `thedogmall-cart-v2`).

## État actuel

- Les chiens (`src/data/dogs.ts`), les produits
  (`src/data/mockProducts.ts`) et les articles (`src/data/articles.ts`)
  sont des données de démonstration, à remplacer par le vrai catalogue.
- Les formulaires de commande et de contact ne sont connectés à aucun
  backend : ils affichent une confirmation côté client uniquement. Il
  faudra brancher une API pour recevoir réellement les commandes et les
  messages.
- Aucun paiement en ligne n'est intégré : le parcours prévoit un appel de
  confirmation puis un règlement à la livraison.
- La création de compte n'existe pas encore. `/compte` regroupe les
  favoris, le panier et les moyens de nous joindre ; favoris et panier
  sont conservés dans le `localStorage` de l'appareil.
- Les coordonnées (téléphone, email, adresse) sont centralisées dans
  `src/lib/navigation.ts` : c'est le seul endroit à modifier.
