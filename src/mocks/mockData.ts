// Données mock pour l'application Les Audacieuses (partie cliente)

export const mockUsers = [
  {
    id: 1,
    nom: 'Dupont',
    prenom: 'Marie',
    email: 'marie.dupont@example.com',
    telephone: '0612345678',
    emploi_actuel: 'Assistante administrative',
    emploi_vise: 'Développeuse web',
    competences: 'Organisation, Communication, Pack Office, Anglais, HTML/CSS (débutant)',
    experience: "8 ans d'expérience en tant qu'assistante administrative dans divers secteurs. Formation en ligne en développement web depuis 6 mois.",
    notes: 'Marie est très motivée pour sa reconversion. Elle travaille actuellement sur son portfolio.',
    date_inscription: '2024-01-10T09:00:00Z',
  },
  {
    id: 2,
    nom: 'Martin',
    prenom: 'Sophie',
    email: 'sophie.martin@example.com',
    telephone: '0687654321',
    emploi_actuel: 'Vendeuse',
    emploi_vise: 'Chargée de communication',
    competences: 'Relation client, Vente, Réseaux sociaux, Photographie',
    experience: "5 ans d'expérience dans la vente. A suivi une formation en communication digitale.",
    notes: 'Sophie souhaite valoriser ses compétences en communication pour se reconvertir.',
    date_inscription: '2024-02-01T10:00:00Z',
  },
];

export const mockModules = [
  {
    id: 1,
    titre: 'Confiance en soi',
    description: 'Module pour développer sa confiance en soi',
    miniature: '/images/default-module.png',
    est_publie: true,
    est_gratuit: true,
    duree_estimee: 60,
    cree_par: 1,
    date_creation: '2024-01-01T09:00:00Z',
  },
  {
    id: 2,
    titre: "Préparation à l'entretien",
    description: "Techniques pour réussir ses entretiens d'embauche",
    miniature: '/images/default-module.png',
    est_publie: true,
    est_gratuit: true,
    duree_estimee: 45,
    cree_par: 1,
    date_creation: '2024-01-05T09:00:00Z',
  },
  {
    id: 3,
    titre: 'CV et lettre de motivation',
    description: 'Rédiger un CV et une lettre de motivation efficaces',
    miniature: '/images/default-module.png',
    est_publie: true,
    est_gratuit: true,
    duree_estimee: 30,
    cree_par: 1,
    date_creation: '2024-01-10T09:00:00Z',
  },
];

export const mockBlocs = [
  { id: 1, type: 'titre', date_creation: '2024-01-01T09:00:00Z' },
  { id: 2, type: 'texte', date_creation: '2024-01-01T09:00:00Z' },
  { id: 3, type: 'image', date_creation: '2024-01-01T09:00:00Z' },
  { id: 4, type: 'liste', date_creation: '2024-01-01T09:00:00Z' },
  { id: 5, type: 'citation', date_creation: '2024-01-01T09:00:00Z' },
];

export const mockContenuBlocs = [
  // Module 1: Confiance en soi
  { id: 1, module_id: 1, bloc_id: 1, contenu: 'Développer sa confiance en soi', ordre: 1 },
  { id: 2, module_id: 1, bloc_id: 2, contenu: 'La confiance en soi est essentielle pour réussir sa reconversion professionnelle. Ce module vous propose des techniques concrètes pour renforcer votre confiance.', ordre: 2 },
  { id: 3, module_id: 1, bloc_id: 1, contenu: 'Exercices pratiques', ordre: 3 },
  { id: 4, module_id: 1, bloc_id: 2, contenu: 'Voici quelques exercices que vous pouvez pratiquer quotidiennement pour renforcer votre confiance en vous.', ordre: 4 },
  { id: 5, module_id: 1, bloc_id: 4, contenu: '- Notez chaque jour trois succès, même minimes\n- Identifiez vos forces et qualités\n- Apprenez à accepter les compliments\n- Adoptez une posture confiante', ordre: 5 },
  // Module 2: Préparation à l'entretien
  { id: 6, module_id: 2, bloc_id: 1, contenu: "Réussir ses entretiens d'embauche", ordre: 1 },
  { id: 7, module_id: 2, bloc_id: 2, contenu: "L'entretien d'embauche est une étape cruciale dans votre reconversion. Ce module vous donne toutes les clés pour le réussir.", ordre: 2 },
  { id: 8, module_id: 2, bloc_id: 1, contenu: 'Se préparer efficacement', ordre: 3 },
  { id: 9, module_id: 2, bloc_id: 2, contenu: 'Une bonne préparation est essentielle pour mettre toutes les chances de votre côté.', ordre: 4 },
  { id: 10, module_id: 2, bloc_id: 4, contenu: "- Recherchez l'entreprise en profondeur\n- Préparez des réponses aux questions fréquentes\n- Préparez vos propres questions\n- Entraînez-vous avec des simulations", ordre: 5 },
];

export const mockModulePatient = [
  { id: 1, module_id: 1, patient_id: 1, date_assignation: '2024-01-11T10:00:00Z', progression: 75, derniere_activite: '2024-03-01T14:00:00Z' },
  { id: 2, module_id: 2, patient_id: 1, date_assignation: '2024-01-12T10:00:00Z', progression: 40, derniere_activite: '2024-03-02T14:00:00Z' },
  { id: 3, module_id: 3, patient_id: 1, date_assignation: '2024-01-13T10:00:00Z', progression: 90, derniere_activite: '2024-03-03T14:00:00Z' },
  { id: 4, module_id: 1, patient_id: 2, date_assignation: '2024-01-14T10:00:00Z', progression: 50, derniere_activite: '2024-03-04T14:00:00Z' },
  { id: 5, module_id: 2, patient_id: 2, date_assignation: '2024-01-15T10:00:00Z', progression: 25, derniere_activite: '2024-03-05T14:00:00Z' },
];

export const mockRendezVous = [
  { id: 1, patient_id: 1, psychologue_id: 1, date_heure: '2024-03-10T10:00:00Z', duree: 60, type: 'présentiel', notes: 'Premier rendez-vous pour faire le point sur ses progrès', statut: 'confirmé', date_creation: '2024-03-01T09:00:00Z' },
  { id: 2, patient_id: 2, psychologue_id: 1, date_heure: '2024-03-13T14:00:00Z', duree: 60, type: 'visio', notes: 'Bilan de mi-parcours', statut: 'planifié', date_creation: '2024-03-02T09:00:00Z' },
]; 