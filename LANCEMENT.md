# Avant de mettre le site en ligne

Tout ce qui suit est aujourd'hui rempli avec des valeurs d'exemple. Le
site fonctionne, mais il annonce des informations qui ne sont pas les
vôtres. Cette liste est dans l'ordre : les premières lignes sont
bloquantes, les dernières peuvent attendre.

## 1. Vos coordonnées — bloquant

Un seul fichier : **`src/lib/contact.ts`**.

| Champ | Aujourd'hui | À mettre |
| --- | --- | --- |
| `phone` | `+225 07 58 42 19 03` | votre numéro, tel qu'il doit s'afficher |
| `phoneHref` | `tel:+2250758421903` | le même, sans espaces, pour le clic |
| `whatsapp` | `2250758421903` | le même, **chiffres seuls**, indicatif compris, sans `+` |
| `email` | `contact@thedogmall.ci` | votre adresse |
| `address`, `city` | `Abidjan, Côte d'Ivoire` | votre adresse exacte |
| `openingHours` | `Du lundi au samedi, de 8 h à 19 h` | vos vraies heures |

Le numéro WhatsApp est le plus important : c'est lui qui reçoit les
commandes. Un numéro faux, et une commande part dans le vide.

## 2. Le nom de domaine — bloquant

**`src/lib/seo.ts`**, ligne `SITE_URL`. Aujourd'hui
`https://thedogmall.ci`.

Cette adresse sert aux URL canoniques, au sitemap et aux aperçus de
partage. Si elle ne correspond pas à l'adresse réelle du site, Google
indexera de mauvaises adresses et les aperçus WhatsApp afficheront des
images introuvables. À corriger **avant** la première mise en ligne.

## 3. Les informations légales — bloquant

**`src/pages/Legal.tsx`** contient encore des « à compléter » :

- raison sociale, forme juridique, adresse du siège, RCCM, compte
  contribuable ;
- nom du responsable de la publication ;
- nom et adresse de l'hébergeur (Vercel ou Netlify, une fois choisi).

## 4. Votre vrai catalogue — bloquant

Les chiens, produits et articles de `content/` sont des exemples. Le mode
d'emploi complet est dans [`content/README.md`](content/README.md).
Vérifiez en particulier **tous les prix** : ceux en place sont inventés.

## 5. Les conditions de livraison — bloquant

Trois endroits annoncent des délais et des tarifs inventés :

- **`src/pages/Help.tsx`**, tableau `deliveryRows` : les communes, les
  délais et les frais (2 000 / 2 500 / 3 000 FCFA) ;
- **`src/components/site/PromoBanner.tsx`** : le bandeau rouge en haut de
  page, « livraison dans tout Abidjan sous 24 h » ;
- **`src/pages/Legal.tsx`**, section Livraison des CGV.

## 6. Les photos — fortement recommandé

Sans photos, les fiches affichent un aplat de marque. C'est propre, mais
un chien ne se vend pas sans photo.

- `public/dogs/` — voir [`public/dogs/README.md`](public/dogs/README.md)
- `public/products/` — voir [`public/products/README.md`](public/products/README.md)
- `public/hero-chien.jpg` — la grande photo de la page d'accueil, format
  portrait, environ 1200 × 1500 px

## 7. Recevoir les formulaires par email — recommandé

Sans cela, le contact et la commande passent par WhatsApp, ce qui
fonctionne. Avec, vous recevez aussi une copie par email et la newsletter
s'affiche. Voir la section **Formulaires** du [README](README.md) et
`.env.example`.

Pensez à ajouter `VITE_FORM_ENDPOINT` **dans les réglages de
l'hébergeur** : un fichier `.env.local` reste sur votre machine.

## 8. Mettre en ligne sur Vercel

1. Créez un compte sur [vercel.com](https://vercel.com) et connectez-le à
   GitHub.
2. **Add New → Project**, choisissez `thedogmall-shop`.
3. Vercel détecte Vite tout seul. Vérifiez seulement :
   - Build Command : `npm run build`
   - Output Directory : `dist`
4. Ajoutez la variable `VITE_FORM_ENDPOINT` si vous avez fait l'étape 7.
5. **Deploy**.

`vercel.json` est déjà dans le dépôt : la redirection des adresses
inconnues vers la page « introuvable » est configurée.

Ensuite, chaque modification poussée sur GitHub — y compris une
modification de `content/` faite depuis le navigateur — remet le site à
jour toute seule en quelques minutes.

### Le nom de domaine

Dans Vercel : **Settings → Domains**. Ajoutez votre domaine et suivez les
instructions DNS. N'oubliez pas de reporter cette adresse dans
`src/lib/seo.ts` (étape 2) et de redéployer.

## 9. Après la mise en ligne

- **Vérifiez l'aperçu WhatsApp** : envoyez-vous le lien d'une fiche chien.
  Le titre, la description et la photo doivent apparaître.
- **Déclarez le site à Google** :
  [Search Console](https://search.google.com/search-console), puis
  soumettez `https://votre-domaine/sitemap.xml`.
- **Contrôlez** que `https://votre-domaine/robots.txt` et
  `/sitemap.xml` répondent.
- **Testez une commande de bout en bout** depuis un téléphone, avec un
  vrai numéro, pour voir ce que le client reçoit.

## Vérifier avant de pousser

```bash
npm run build   # échoue si un fichier de content/ est mal formé
npm run lint
npm run preview # le site tel qu'il sera en ligne
```
