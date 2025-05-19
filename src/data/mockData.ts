import { Category, Module, ModuleContent, Badge, NextSession } from '../types';

export const mockCategories: Category[] = [
  {
    id: 1,
    nom: "Développement personnel",
    description: "Modules pour votre développement personnel"
  },
  {
    id: 2,
    nom: "Communication",
    description: "Améliorer vos compétences en communication"
  }
];

export const mockModules: Module[] = [
  {
    id: 1,
    id_categorie: 1,
    titre: "Arbre de vie",
    description: "Découvrez votre chemin de vie",
    est_gratuit: true,
    progression: 0,
    totalLessons: 1,
    completedLessons: 0
  },
  {
    id: 2,
    id_categorie: 1,
    titre: "Les autres et moi",
    description: "Comprendre les relations interpersonnelles",
    est_gratuit: true,
    progression: 0,
    totalLessons: 1,
    completedLessons: 0
  },
  {
    id: 3,
    id_categorie: 2,
    titre: "La portée réelle",
    description: "Impact de la communication",
    est_gratuit: false,
    progression: 0,
    totalLessons: 1,
    completedLessons: 0
  }
];

export const mockNextSessions = [
  {
    date: "24 janvier",
    startTime: "10:00",
    endTime: "11:00",
    title: "Point mensuel",
    description: "Revoir avec Laurène les derniers modules + compléter fiche de résultats afin d'établir les plus grands axes d'améliorations. Il faudra préparer en amont une liste de plusieurs..."
  },
  {
    date: "27 janvier",
    startTime: "14:00",
    endTime: "14:30",
    title: "Exercice oral",
    description: "Petit entraînement sur l'aisance à s'exprimer devant un certain..."
  },
  {
    date: "02 Mars",
    startTime: "09:15",
    endTime: "12:00",
    title: "Bilan annuel",
    description: "Dans le cadre de la procédure, nous allons procéder à la reco..."
  }
];

export const mockProgress = {
  completed: 2,
  total: 6
};

export const mockCurrentModule = {
  title: "Arbre de vie",
  duration: "1h",
  image: "/tree-of-life.jpg"
};

export const mockRecentModules = [
  { title: "Arbre de vie", duration: "1h", image: "/module-1.jpg" },
  { title: "Les autres et moi...", duration: "45m", image: "/module-2.jpg" },
  { title: "La portée réelle", duration: "2h", image: "/module-3.jpg" },
  { title: "Les autres et moi", duration: "30m", image: "/module-4.jpg" },
  { title: "En avant ça g...", duration: "1h45", image: "/module-5.jpg" }
];