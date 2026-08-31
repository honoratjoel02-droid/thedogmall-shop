# TheDogMall — Boutique

Site public de vente en ligne d'accessoires et d'alimentation pour
chiens. Projet React + TypeScript + Vite + Tailwind CSS v4,
entièrement indépendant de l'application de gestion `thedogmall-pro`.

## Pages

- `/` — Accueil
- `/produits` — Catalogue, filtrable par catégorie (`?categorie=...`)
- `/produits/:productId` — Fiche produit
- `/panier` — Panier (persisté en `localStorage`)
- `/commande` — Formulaire de commande simple (sans paiement en ligne)
- `/a-propos` — À propos
- `/contact` — Formulaire de contact

## Démarrer

```bash
npm install
npm run dev
```

## État actuel

- Les produits (`src/data/mockProducts.ts`) sont des données de test à
  remplacer par un vrai catalogue.
- Les formulaires de commande et de contact ne sont connectés à aucun
  backend : ils affichent une confirmation côté client uniquement. Il
  faudra brancher une API/base de données pour recevoir réellement les
  commandes et messages.
- Aucun paiement en ligne n'est intégré.
