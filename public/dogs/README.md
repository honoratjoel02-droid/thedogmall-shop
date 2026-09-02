# Photos des chiens

Déposez ici une photo par chien, nommée avec l'identifiant utilisé dans
`content/dogs.json` : `roy.jpg`, `luna.jpg`, `kenzo.jpg`, `nala.jpg`.

- Format : JPEG, cadrage portrait 4/5 (par exemple 1000 × 1250 px).
- Poids conseillé : moins de 200 Ko par photo.

## Plusieurs photos pour un même chien

Déposez les fichiers, puis listez-les dans l'ordre d'affichage sur le
chien concerné, dans `content/dogs.json` :

```json
{
  "id": "roy",
  "images": ["roy.jpg", "roy-profil.jpg", "roy-jardin.jpg"]
}
```

La fiche affiche alors une bande de miniatures sous la photo principale,
et l'agrandissement plein écran passe d'une photo à l'autre. Sans le
champ `images`, seule `<id>.jpg` est cherchée.

Tant qu'une photo est absente, la carte affiche un aplat de marque à la
place : la mise en page reste correcte, mais le site gagne beaucoup à
avoir les vraies photos.
