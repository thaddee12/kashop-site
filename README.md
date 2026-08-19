# KA SHOP

> La confiance qui va vite.

Site web de KA SHOP, distributeur d'équipements électroniques et accessoires à Yaoundé (téléphones, chargeurs, audio, sécurité, accessoires auto, pièces détachées). Catalogue interactif avec tunnel de commande entièrement orienté WhatsApp, sans paiement en ligne.

Client : KA SHOP / Anicet Kenne. Réalisation : [Innova Alpha](https://innovaalpha.com).

---

## Stack technique

HTML5, CSS et JavaScript vanilla, sans framework ni backend. Le catalogue est piloté par un unique fichier JSON.

```
site-kashop/
├── index.html          # Accueil
├── catalogue.html       # Catalogue, recherche, filtres
├── devis.html            # Commande spéciale + suivi de commande
├── apropos.html          # Histoire de la boutique, fondateur, valeurs
├── contact.html          # Carte, horaires, itinéraire
├── assets/
│   ├── css/styles.css
│   ├── js/
│   │   ├── app.js        # Rendu catalogue, filtres, favoris, fiche produit
│   │   ├── cart.js        # Panier, localStorage, calcul de livraison
│   │   └── whatsapp.js    # Génération des liens wa.me
│   └── images/
└── data/
    └── products.json     # Source de vérité du catalogue
```

## Fonctionnalités

- Panier persistant (`localStorage`), calcul de la livraison par carte interactive (rayon 7 km / 15 km autour de la boutique)
- Fiche produit en modale avec avis clients et produits similaires
- Favoris
- Suivi de commande (démo)
- Formulaire de devis / commande spéciale
- Mentions légales et CGV en modale
- Commande finalisée par message WhatsApp pré-rempli, aucun paiement en ligne

## Déploiement

Hébergé sur Hostinger, sur le même abonnement qu'Aquafarm Cameroun. Déploiement automatique via GitHub Actions à chaque push sur `main` (`.github/workflows/deploy.yml`), par FTP.

Secrets GitHub requis : `FTP_HOST`, `FTP_USER`, `FTP_PASS`.
