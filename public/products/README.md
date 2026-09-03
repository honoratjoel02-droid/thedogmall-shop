# Photos des produits

Une photo par produit, nommée avec l'identifiant utilisé dans
`content/products.json` : `collier-premium.jpg`, `lit-premium.jpg`…

- Format : JPEG, cadrage carré (par exemple 1000 × 1000 px).
- Poids conseillé : moins de 200 Ko par photo.

## Plusieurs photos pour un même produit

Déposez les fichiers, puis listez-les dans l'ordre d'affichage sur le
produit concerné :

```json
{
  "id": "harnais-confort",
  "images": [
    "harnais-confort.jpg",
    "harnais-confort-dos.jpg",
    "harnais-confort-porte.jpg"
  ]
}
```

La fiche produit affiche alors une bande de miniatures sous la photo
principale, et l'agrandissement plein écran passe d'une photo à l'autre.
Sans le champ `images`, seule `<id>.jpg` est cherchée.

Un fichier manquant est ignoré : la fiche reste correcte, elle affiche
simplement un aplat de marque à la place.
