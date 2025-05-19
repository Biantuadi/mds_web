export interface User {
  id: string;
  username: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  date_inscription: string;
}

export interface Category {
  id: number;
  nom: string;
  description: string | null;
}

export interface Module {
  id: number;
  id_categorie: number;
  titre: string;
  description: string | null;
  est_gratuit: boolean;
  progression: number;
  totalLessons: number;
  completedLessons: number;
}

export interface ModuleContent {
  id: number;
  module_id: number;
  type_contenu: string;
  lien_ressource: string;
}

export interface Badge {
  id: number;
  name: string;
  icon: string;
  isLocked: boolean;
}

export interface NextSession {
  date: string;
  startTime: string;
  endTime: string;
  moduleTitle: string;
  lessonNumber: number;
}