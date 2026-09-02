# Modifier le catalogue

Tout ce qui change souvent — les chiens, les produits, les articles de
conseils — vit dans ce dossier, dans trois fichiers texte. Vous pouvez les
modifier sans écrire de code, y compris depuis un téléphone.

| Fichier | Contenu |
| --- | --- |
| `dogs.json` | Les chiens présentés sur `/chiens` |
| `products.json` | Le catalogue de la boutique |
| `articles.json` | Les articles de la rubrique Conseils |

## Modifier depuis GitHub, sans rien installer

1. Ouvrez le fichier sur GitHub, par exemple `content/dogs.json`.
2. Cliquez sur le crayon **Edit this file**, en haut à droite.
3. Faites votre modification.
4. En bas, cliquez sur **Commit changes**.

Le site se remet à jour tout seul quelques minutes plus tard.

## Les règles à respecter

Le fichier suit un format strict. Trois habitudes suffisent à ne jamais se
tromper :

- **Chaque valeur texte est entre guillemets droits** `"comme ceci"`, pas
  entre guillemets typographiques « comme cela ».
- **Les prix s'écrivent en chiffres collés**, sans espace, sans point et
  sans `FCFA` : `650000`, jamais `650 000 FCFA`.
- **Une virgule sépare deux entrées**, mais il n'y en a pas après la
  dernière.

Si une règle n'est pas respectée, la mise en ligne s'arrête et vous
recevez un message qui dit précisément quoi corriger, par exemple :

```
content/dogs.json → entrée 2 (« luna ») : le champ « price » doit être un
nombre entier positif, sans espace ni « FCFA ».
```

**Le site déjà en ligne n'est pas touché** : il continue de fonctionner
avec la version précédente jusqu'à ce que l'erreur soit corrigée.

## Ajouter un chien

Copiez ce bloc dans `dogs.json`, entre deux `},` et `{`, et remplacez les
valeurs :

```json
{
  "id": "simba",
  "name": "Simba",
  "breed": "Chow Chow",
  "sex": "Mâle",
  "ageMonths": 7,
  "price": 680000,
  "availability": "Disponible",
  "summary": "Une phrase courte, affichée sur la carte et en haut de la fiche.",
  "description": "Le texte long : caractère, habitudes, ce qu'il sait déjà faire.",
  "temperament": ["Calme", "Joueur", "Attaché à sa famille"],
  "included": ["Carnet de santé à jour", "Vacciné et vermifugé", "Puce électronique"],
  "location": "Abidjan, Cocody",
  "images": ["simba.jpg", "simba-profil.jpg"]
}
```

- `id` : en minuscules, sans accent, les mots reliés par des tirets. Il
  devient l'adresse de la page (`/chiens/simba`) et ne doit exister qu'une
  seule fois. Évitez de le changer une fois la page partagée.
- `sex` : `"Mâle"` ou `"Femelle"`, exactement.
- `availability` : `"Disponible"` ou `"Réservé"`, exactement.
- `ageMonths` : l'âge **en mois**. Le site écrit tout seul « 1 an et
  4 mois ».
- `images` : facultatif. Les fichiers déposés dans `public/dogs/`. Sans ce
  champ, le site cherche `simba.jpg`. Voir `public/dogs/README.md`.

**Marquer un chien comme réservé** : remplacez `"Disponible"` par
`"Réservé"`. Inutile de supprimer la fiche.

## Ajouter un produit

```json
{
  "id": "gamelle-anti-glouton",
  "name": "Gamelle Anti-Glouton",
  "category": "Accessoires",
  "price": 14000,
  "description": "Une ou deux phrases : à quoi ça sert, pour quel chien.",
  "featured": true,
  "images": ["gamelle-anti-glouton.jpg"]
}
```

- `category` : au choix parmi `"Alimentation"`, `"Accessoires"`,
  `"Jouets"`, `"Hygiène"`, `"Laisses & Colliers"`.
- `foodStage` : **uniquement** pour la catégorie `"Alimentation"`, au
  choix parmi `"Chiots"`, `"Adultes"`, `"Friandises"`,
  `"Alimentation spécialisée"`. C'est ce qui range le produit dans les
  onglets de la page Alimentation.
- `featured` : mettez `true` pour afficher le produit dans « Les
  indispensables », sur la page d'accueil. Quatre y sont montrés au
  maximum. Retirez la ligne pour l'en enlever.
- `images` : facultatif, mêmes règles que pour les chiens, dans
  `public/products/`.

**Changer un prix** : modifiez le nombre, c'est tout. Il est repris
partout — fiche, panier, message WhatsApp, aperçu de partage.

## Ajouter un article de conseils

```json
{
  "id": "promener-son-chien-en-saison-des-pluies",
  "title": "Promener son chien en saison des pluies",
  "excerpt": "Une phrase d'accroche, affichée dans la liste des conseils.",
  "category": "Santé",
  "publishedAt": "2026-09-14",
  "readingMinutes": 4,
  "sections": [
    {
      "heading": "Le premier intertitre",
      "paragraphs": [
        "Un paragraphe.",
        "Un autre paragraphe de la même partie."
      ]
    },
    {
      "heading": "Le deuxième intertitre",
      "paragraphs": ["Et ainsi de suite."]
    }
  ]
}
```

- `publishedAt` : au format `2026-09-14`, dans cet ordre (année, mois,
  jour).
- `category` : le texte de votre choix, il sert d'étiquette.
- Les cinq premiers articles apparaissent sur la page d'accueil ; tous
  sont listés sur `/conseils`.

## Supprimer une entrée

Effacez le bloc entier, des accolades ouvrantes aux fermantes, ainsi que
la virgule qui le sépare du bloc suivant. Attention à ne pas laisser de
virgule après la dernière entrée de la liste.

Pour un chien vendu, préférez `"availability": "Réservé"` : la page reste
en ligne, ce qui est meilleur pour le référencement, et montre votre
activité.
