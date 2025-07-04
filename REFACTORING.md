## Objectif du refactoring  
Améliorer la lisibilité, réduire la duplication de code, séparer les responsabilités,
sécuriser l’application et moderniser le design React

## Changements apportés

### Avant  
- Routes longues, peu modulaires
- Absence de middleware centralisé pour validation JWT
- Styles CSS globaux et non scoped, limitant la modernisation du design React

### Après  
- **Routes** découpées en modules (`routes/user.routes.js`, `routes/snippet.routes.js`) pour une meilleure organisation
- **Middleware `auth.js`** créé pour valider automatiquement les tokens JWT sur les routes protégées
- **Séparation claire** des responsabilités : routes, contrôleurs, utilitaires, middleware
- **CSS Modules React** introduits pour chaque page (ex : `Dashboard.module.css`) afin de faciliter un style scoped, moderne et responsive  
- Design plus élégant, harmonieux et facile à maintenir grâce aux styles modulaires

## Résultat  
- Code plus lisible, maintenable et évolutif
- Sécurité renforcée grâce à la validation centralisée des tokens
- Interface utilisateur modernisée avec un design React plus professionnel et responsive

