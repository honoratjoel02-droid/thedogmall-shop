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
  `src/data/mockProducts.ts`), voir `public/products/README.md`.
- `public/dogs/<id-chien>.jpg` — photos des chiens, cadrage portrait 4/5,
  voir `public/dogs/README.md`.
- `public/hero-chien.jpg` — grande photo du hero de la page d'accueil,
  cadrage portrait, environ 1200 × 1500 px.

Tant qu'une photo manque, un aplat de marque prend sa place : la mise en
page reste correcte, mais le site gagne beaucoup avec les vraies photos.

Pour montrer plusieurs photos d'un même chien ou d'un même produit,
listez les noms de fichiers dans le champ `images` de la donnée
correspondante. La fiche affiche alors une bande de miniatures sous la
photo principale, et l'agrandissement plein écran (clic, flèches du
clavier, `Échap` pour fermer) passe de l'une à l'autre.

## WhatsApp

Le numéro se règle dans `src/lib/contact.ts` (champ `whatsapp`, chiffres
uniquement, indicatif pays compris). Les messages pré-remplis sont
rédigés dans `src/lib/whatsapp.ts` : demande de rencontre pour un chien,
commande d'un produit, et récapitulatif complet du panier avec le total.

## Référencement

Le site est une application monopage : sans traitement particulier, toutes
les URL partageraient le titre et l'aperçu de l'accueil pour les robots
qui n'exécutent pas de JavaScript, dont les aperçus de lien WhatsApp.

Le plugin `seo` de `vite.config.ts` écrit donc, à chaque build, un fichier
HTML par page (`dist/chiens/roy/index.html`…) avec ses propres balises
`head`, ses données structurées JSON-LD, plus `sitemap.xml` et
`robots.txt`. Vercel comme Netlify servent ces fichiers avant d'appliquer
la redirection vers `index.html`, sans configuration supplémentaire.

Les textes de chaque page sont regroupés dans `src/lib/seo.ts`. **Le nom
de domaine y est codé en dur** (`SITE_URL`) : c'est la première chose à
corriger si le site n'est pas publié sur `thedogmall.ci`, sinon les URL
canoniques et le sitemap pointeront au mauvais endroit.

En navigation interne, le composant `Seo` met à jour titre, description,
URL canonique et données structurées.

## Chargement

L'accueil part avec le premier chargement ; les autres pages sont
téléchargées à la demande (`lazy` de React Router, dans
`src/router/index.tsx`). Ajouter des pages, des chiens ou des articles ne
grossit donc plus l'arrivée sur le site.

Le gain immédiat reste modeste : environ 455 Ko de JavaScript sur
l'accueil au lieu de 524 Ko, soit 145 Ko compressés au lieu de 154 Ko.
L'essentiel du poids est React et React Router, nécessaires dès la
première image.

Pendant qu'une page se télécharge, React Router garde la page précédente
affichée ; à l'ouverture directe d'une URL, `PageLoading` montre l'en-tête,
le pied de page et un squelette de contenu.

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
- Les coordonnées (téléphone, WhatsApp, email, adresse) sont centralisées
  dans `src/lib/contact.ts` : c'est le seul endroit à modifier.
- Le contenu des pages est rendu par le navigateur : le HTML pré-généré ne
  contient que les balises `head` et une page vide. Rendre aussi le corps
  au build (rendu côté serveur statique) ferait apparaître le texte sans
  attendre le JavaScript ; ce n'est pas fait, cela demanderait de revoir la
  restauration du panier et des favoris depuis le `localStorage`.
