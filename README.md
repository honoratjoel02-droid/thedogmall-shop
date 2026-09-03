# THE DOG MALL — Boutique

Site public de THE DOG MALL (Abidjan, Côte d'Ivoire) : présentation des
chiens disponibles, boutique d'accessoires et rayon alimentation.
Projet React + TypeScript + Vite + Tailwind CSS v4, entièrement
indépendant de l'application de gestion `thedogmall-pro`.

Le site est pensé mobile d'abord : navigation par barre d'onglets fixe
en bas de l'écran sur téléphone, menu latéral pour le reste, puis
navigation horizontale classique à partir de 1024 px.

> **Avant la première mise en ligne**, suivez
> [`LANCEMENT.md`](LANCEMENT.md) : coordonnées, nom de domaine, mentions
> légales, catalogue et conditions de livraison sont encore remplis avec
> des valeurs d'exemple.

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
npm run preview # sert le résultat du build, comme en ligne
npm run lint    # oxlint
```

### Tester depuis un téléphone

Ajoutez `-- --host` pour que le serveur écoute sur le réseau local :

```bash
npm run dev -- --host        # ou : npm run preview -- --host
```

Vite affiche alors une adresse « Network » du type
`http://192.168.1.24:5173/`. Ouvrez-la depuis un téléphone connecté au
même Wi-Fi.

`npm run dev` suffit pour parcourir le site. Pour vérifier le
référencement (titres, aperçus de partage, sitemap), passez par
`npm run build` puis `npm run preview` : ce sont les fichiers pré-générés
qui sont alors servis, exactement comme en ligne.

## Photos

Les images sont servies depuis `public/`, sans build particulier :

- `public/products/<id-produit>.jpg` — photos produits (identifiants de
  `content/products.json`), voir `public/products/README.md`.
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

`scripts/prerender.mjs` écrit donc, à chaque build, un fichier HTML par
page (`dist/chiens/roy/index.html`…) avec son contenu, ses propres balises
`head`, ses données structurées JSON-LD, plus `sitemap.xml` et
`robots.txt`. Vercel comme Netlify servent ces fichiers avant d'appliquer
la redirection vers `index.html`, sans configuration supplémentaire.

Le plugin `thedogmall:prerendered-preview` de `vite.config.ts` fait en
sorte que `npm run preview` se comporte de la même façon : sans lui, le
serveur de prévisualisation de Vite renverrait la page d'accueil pour
toutes les URL profondes et le travail ne serait pas vérifiable en local. Pour contrôler une page, ouvrez son code source
(`curl http://localhost:4173/chiens/roy` ou « Afficher la source » dans le
navigateur) : le titre et les balises doivent être ceux de la page.

Les textes de chaque page sont regroupés dans `src/lib/seo.ts`. **Le nom
de domaine y est codé en dur** (`SITE_URL`) : c'est la première chose à
corriger si le site n'est pas publié sur `thedogmall.ci`, sinon les URL
canoniques et le sitemap pointeront au mauvais endroit.

En navigation interne, le composant `Seo` met à jour titre, description,
URL canonique et données structurées.

## Formulaires

Le site est hébergé en statique : il n'a pas de serveur capable de
recevoir un message. Une variable d'environnement désigne le service qui
s'en charge et vous transmet chaque envoi par email :

```bash
cp .env.example .env.local   # puis collez votre URL dans VITE_FORM_ENDPOINT
```

Formspree et Web3Forms sont gratuits et fonctionnent sans code : vous
créez un formulaire, vous copiez l'URL fournie. Pensez à ajouter la même
variable chez votre hébergeur (Vercel : Settings → Environment
Variables), sinon le site en ligne ne l'aura pas.

**Tant que la variable est vide**, rien ne casse et rien ne ment :

- le formulaire de contact et celui de commande ouvrent WhatsApp avec le
  message déjà rédigé, coordonnées et panier compris ;
- la commande n'est pas marquée comme passée et le panier reste rempli
  tant que le client n'a pas envoyé le message ;
- la newsletter n'est pas affichée du tout, faute d'endroit où enregistrer
  l'inscription.

Les trois formulaires valident leurs champs, affichent les erreurs sous
le champ concerné, gardent la saisie en cas d'échec et signalent
clairement ce qui s'est passé.

## Chargement

Le contenu de chaque page est écrit dans le HTML au moment du build
(`scripts/prerender.mjs`) : le texte, les prix et les photos sont à
l'écran avant même que le JavaScript soit téléchargé. Le navigateur
reprend ensuite cette page au lieu de la reconstruire.

Mesuré sur une 3G lente simulée (400 kbit/s, 300 ms de latence), le texte
s'affiche à **1,6 s** sur l'accueil et **1,8 s** sur une fiche chien, au
lieu de 11,8 s et 10,8 s quand le navigateur devait tout construire —
soit environ 85 % plus tôt. Le site reste entièrement lisible et
navigable **sans JavaScript du tout**.

Le JavaScript est par ailleurs découpé par route : ajouter des pages, des
chiens ou des articles ne grossit pas l'arrivée sur le site. La page
d'entrée est chargée avant la reprise du HTML (`src/router/index.tsx`),
sinon React remplacerait la page affichée par un écran d'attente.

### Comment le build est enchaîné

```
tsc -b                # typage
vite build            # bundle du navigateur      → dist/
vite build --ssr …    # bundle du générateur      → dist-ssr/
node scripts/prerender.mjs   # écrit les pages    → dist/**/index.html
```

La dernière étape produit aussi `404.html` (coquille vide servie aux
adresses inconnues), `sitemap.xml` et `robots.txt`.

### Panier et favoris

Ils sont relus depuis le `localStorage` **après** le premier rendu : les
pages sont générées au build, où le `localStorage` n'existe pas, et partir
du même état vide des deux côtés est ce qui permet au navigateur de
reprendre la page telle quelle. Les pages qui décident quelque chose à
partir du panier (`/panier`, `/commande`, `/favoris`) attendent le signal
`isRestored` avant d'annoncer un panier vide ou de rediriger.

## Catalogue

Les chiens, les produits et les articles vivent dans `content/`, en trois
fichiers texte modifiables sans écrire de code, y compris depuis
l'interface web de GitHub. Le mode d'emploi est dans
[`content/README.md`](content/README.md).

Chaque fichier est contrôlé au moment du build : identifiants uniques et
bien formés, prix entiers, valeurs autorisées pour le sexe, la
disponibilité, la catégorie et l'étape de vie. Une entrée mal formée
arrête la mise en ligne avec un message situé —

```
content/dogs.json → entrée 2 (« luna ») : le champ « price » doit être un
nombre entier positif, sans espace ni « FCFA ».
```

— plutôt que de casser une page en production. Le contrôle vit dans
`src/data/validate.ts` ; les trois modules de `src/data/` ne font que
l'appliquer.

## Prix et devise

Tous les prix sont stockés en francs CFA sous forme d'entiers et affichés
via `formatPrice()` (`src/lib/format.ts`) : `650 000 FCFA`. Les paniers
enregistrés avant le passage au franc CFA sont ignorés (la clé
`localStorage` est passée à `thedogmall-cart-v2`).

## État actuel

- Le contenu de `content/` est une démonstration, à remplacer par le vrai
  catalogue.
- Aucun paiement en ligne n'est intégré : le parcours prévoit un appel de
  confirmation puis un règlement à la livraison.
- La création de compte n'existe pas encore. `/compte` regroupe les
  favoris, le panier et les moyens de nous joindre ; favoris et panier
  sont conservés dans le `localStorage` de l'appareil.
- Les coordonnées (téléphone, WhatsApp, email, adresse) sont centralisées
  dans `src/lib/contact.ts` : c'est le seul endroit à modifier.
- Les adresses inconnues sont servies par la redirection de secours de
  l'hébergeur, qui renvoie `404.html` avec un code 404 sur Netlify, mais
  un code 200 sur Vercel (une réécriture ne peut pas changer le code). La
  page affichée est la bonne dans les deux cas.
