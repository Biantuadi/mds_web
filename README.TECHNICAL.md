# 🛠️ Documentation Technique - MDS Web

## 📋 Table des matières
- [Architecture](#architecture)
- [Technologies](#technologies)
- [Installation](#installation)
- [Structure du Projet](#structure-du-projet)
- [Développement](#développement)
- [Authentification](#authentification)
- [Gestion d'État](#gestion-détat)

## Architecture

### Stack Technique
- **Frontend**: React 18 avec TypeScript
- **Bundler**: Vite 6
- **Styling**: Tailwind CSS + SASS
- **State Management**: Redux Toolkit + Redux Persist
- **UI Components**: Radix UI + Shadcn UI
- **Routing**: React Router v6
- **Validation**: Zod
- **Package Manager**: Yarn

### Architecture Globale
```
mds_web/
├── src/
│   ├── components/     # Composants réutilisables
│   │   ├── ui/        # Composants UI de base
│   │   └── ProtectedRoute.tsx
│   ├── screens/       # Pages principales
│   │   ├── Home/
│   │   ├── Login/
│   │   ├── ModulesList.tsx
│   │   ├── ModuleDetail/
│   │   └── Appointments/
│   ├── services/      # Services API
│   ├── store/         # Configuration Redux
│   ├── types/         # Types TypeScript
│   ├── lib/           # Utilitaires
│   ├── mocks/         # Données de test
│   └── index.tsx      # Point d'entrée
├── public/            # Assets statiques
├── tailwind.config.js # Configuration Tailwind
└── vite.config.ts     # Configuration Vite
```

## Technologies

### Dépendances Principales
- **React & React DOM**: ^18.2.0
- **Redux Toolkit**: ^2.2.1
- **React Router**: ^6.8.1
- **Radix UI**: Composants d'interface accessibles
- **Zod**: Validation de schémas
- **date-fns**: Manipulation de dates
- **jwt-decode**: Gestion des tokens JWT

### Dépendances de Développement
- **TypeScript**: Types pour React
- **Vite**: ^6.0.4
- **Tailwind CSS**: ^3.4.16
- **SASS**: ^1.86.3
- **ESLint**: Linting du code

## Installation

### Prérequis
- Node.js >= 18
- Yarn

### Installation
```bash
# Installation des dépendances
yarn install

# Démarrage du serveur de développement
yarn dev
```

## Structure du Projet

### Organisation des fichiers
- **components/**: Composants réutilisables
  - `ui/`: Composants UI de base (Shadcn UI)
  - `ProtectedRoute.tsx`: Route protégée pour l'authentification

- **screens/**: Pages principales
  - `Home/`: Page d'accueil
  - `Login/`: Page de connexion
  - `ModulesList.tsx`: Liste des modules
  - `ModuleDetail/`: Détail d'un module
  - `Appointments/`: Gestion des rendez-vous

- **services/**: Services API et logique métier
- **store/**: Configuration Redux et slices
- **types/**: Types TypeScript globaux
- **lib/**: Utilitaires et helpers
- **mocks/**: Données de test et mocks

## Développement

### Commandes disponibles
```bash
# Développement
yarn dev          # Démarre le serveur de développement
yarn build        # Build pour la production
yarn lint         # Vérifie le code avec ESLint
yarn lint:fix     # Corrige automatiquement les problèmes de linting
```

### Bonnes pratiques
1. **TypeScript**
   - Utiliser des types stricts
   - Éviter `any`
   - Documenter les interfaces complexes

2. **React**
   - Utiliser des composants fonctionnels
   - Implémenter React.memo pour les composants purs
   - Utiliser les hooks personnalisés pour la logique réutilisable

3. **Redux**
   - Utiliser Redux Toolkit pour la gestion d'état
   - Créer des slices pour chaque domaine
   - Utiliser Redux Persist pour la persistance

4. **Routing**
   - Utiliser les routes protégées pour l'authentification
   - Implémenter le lazy loading des routes

## Authentification

### Gestion des tokens
- Utilisation de JWT pour l'authentification
- Stockage sécurisé des tokens
- Routes protégées avec `ProtectedRoute`

### Sécurité
- Validation des entrées avec Zod
- Protection XSS
- Gestion sécurisée des variables d'environnement

## Gestion d'État

### Redux Store
- Utilisation de Redux Toolkit
- Persistance avec Redux Persist
- Organisation par slices

### Types d'État
- Authentification
- Modules
- Rendez-vous
- UI/UX

## 📈 Monitoring

### Outils recommandés
- React Developer Tools
- Redux DevTools
- Chrome DevTools
- Lighthouse pour les performances

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails. 