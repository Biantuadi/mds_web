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
    competences: 'Organisation, Communication, Pack Office, Anglais, HTML/CSS (débutant), React, Gestion de projet',
    experience: "8 ans d'expérience en tant qu'assistante administrative dans divers secteurs. Formation en ligne en développement web depuis 6 mois.",
    notes: 'Marie est très motivée pour sa reconversion. Elle travaille actuellement sur son portfolio et participe activement aux modules.',
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
    miniature: 'https://jeanmarcterrel.com/wp-content/uploads/2024/02/Articles-Blog-1280x720-force-interieure-1080x675.png',
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
    miniature: 'https://www.roberthalf.com/content/dam/roberthalf/images/blogs/fr/fr/migrated-blogs/hr1/manager%20preparation%20entretien.jpg',
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
    miniature: 'https://f.hellowork.com/edito/sites/3/2017/07/lettre-de-motivation.jpg',
    est_publie: true,
    est_gratuit: true,
    duree_estimee: 30,
    cree_par: 1,
    date_creation: '2024-01-10T09:00:00Z',
  },
  {
    id: 4,
    titre: 'Gestion du stress',
    description: 'Apprendre à gérer son stress au travail et en entretien',
    miniature: 'https://fiches-pratiques.chefdentreprise.com/Assets/Img/FICHEPRATIQUE/2021/10/366189/Formation-gestion-stress-quels-interets--F.jpg',
    est_publie: true,
    est_gratuit: false,
    duree_estimee: 50,
    cree_par: 1,
    date_creation: '2024-02-01T09:00:00Z',
  },
  {
    id: 5,
    titre: 'Découverte des métiers du numérique',
    description: 'Panorama des métiers du digital et des compétences associées',
    miniature: 'https://gretaformation.ac-orleans-tours.fr/sites/default/files/public/styles/illustration_view_full/public/metier_numerique.jpg',
    est_publie: true,
    est_gratuit: true,
    duree_estimee: 40,
    cree_par: 1,
    date_creation: '2024-02-10T09:00:00Z',
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
  { id: 6, module_id: 1, bloc_id: 5, contenu: '"Croyez en vous, même si personne d\'autre ne le fait."', ordre: 6 },
  // Module 2: Préparation à l'entretien
  { id: 7, module_id: 2, bloc_id: 1, contenu: "Réussir ses entretiens d'embauche", ordre: 1 },
  { id: 8, module_id: 2, bloc_id: 2, contenu: "L'entretien d'embauche est une étape cruciale dans votre reconversion. Ce module vous donne toutes les clés pour le réussir.", ordre: 2 },
  { id: 9, module_id: 2, bloc_id: 1, contenu: 'Se préparer efficacement', ordre: 3 },
  { id: 10, module_id: 2, bloc_id: 2, contenu: 'Une bonne préparation est essentielle pour mettre toutes les chances de votre côté.', ordre: 4 },
  { id: 11, module_id: 2, bloc_id: 4, contenu: "- Recherchez l'entreprise en profondeur\n- Préparez des réponses aux questions fréquentes\n- Préparez vos propres questions\n- Entraînez-vous avec des simulations", ordre: 5 },
  // Module 3: CV et lettre de motivation
  { id: 12, module_id: 3, bloc_id: 1, contenu: "Rédiger un CV efficace", ordre: 1 },
  { id: 13, module_id: 3, bloc_id: 2, contenu: "Votre CV doit refléter vos compétences et votre personnalité. Mettez en avant vos points forts.", ordre: 2 },
  { id: 14, module_id: 3, bloc_id: 1, contenu: "Lettre de motivation percutante", ordre: 3 },
  { id: 15, module_id: 3, bloc_id: 2, contenu: "La lettre de motivation doit être personnalisée pour chaque poste visé.", ordre: 4 },
  { id: 16, module_id: 3, bloc_id: 4, contenu: "- Soyez concis\n- Mettez en avant vos réussites\n- Adaptez votre discours à l'entreprise", ordre: 5 },
  // Module 4: Gestion du stress
  { id: 17, module_id: 4, bloc_id: 1, contenu: "Comprendre le stress", ordre: 1 },
  { id: 18, module_id: 4, bloc_id: 2, contenu: "Le stress est une réaction normale. L'objectif est de l'apprivoiser.", ordre: 2 },
  { id: 19, module_id: 4, bloc_id: 1, contenu: "Techniques de gestion", ordre: 3 },
  { id: 20, module_id: 4, bloc_id: 4, contenu: "- Respiration profonde\n- Méditation\n- Organisation du temps\n- Prendre du recul", ordre: 4 },
  { id: 21, module_id: 4, bloc_id: 5, contenu: '"Le stress est une réaction, pas une fatalité."', ordre: 5 },
  // Module 5: Découverte des métiers du numérique
  { id: 22, module_id: 5, bloc_id: 1, contenu: "Panorama des métiers", ordre: 1 },
  { id: 23, module_id: 5, bloc_id: 2, contenu: "Le numérique offre une grande diversité de métiers accessibles à tous les profils.", ordre: 2 },
  { id: 24, module_id: 5, bloc_id: 4, contenu: "- Développeur web\n- Chef de projet digital\n- UX/UI Designer\n- Community manager", ordre: 3 },
];

export const mockModulePatient = [
  { id: 1, module_id: 1, patient_id: 1, date_assignation: '2024-01-11T10:00:00Z', progression: 100, derniere_activite: '2024-03-01T14:00:00Z' },
  { id: 2, module_id: 2, patient_id: 1, date_assignation: '2024-01-12T10:00:00Z', progression: 60, derniere_activite: '2024-03-10T14:00:00Z' },
  { id: 3, module_id: 3, patient_id: 1, date_assignation: '2024-01-13T10:00:00Z', progression: 0, derniere_activite: '2024-03-15T14:00:00Z' },
  { id: 4, module_id: 4, patient_id: 1, date_assignation: '2024-02-01T10:00:00Z', progression: 100, derniere_activite: '2024-03-20T14:00:00Z' },
  { id: 5, module_id: 5, patient_id: 1, date_assignation: '2024-02-10T10:00:00Z', progression: 20, derniere_activite: '2024-03-22T14:00:00Z' },
  { id: 6, module_id: 1, patient_id: 2, date_assignation: '2024-01-14T10:00:00Z', progression: 50, derniere_activite: '2024-03-04T14:00:00Z' },
  { id: 7, module_id: 2, patient_id: 2, date_assignation: '2024-01-15T10:00:00Z', progression: 25, derniere_activite: '2024-03-05T14:00:00Z' },
];

export const mockRendezVous = [
  {
    id: 1,
    patient_id: 1,
    psychologue_id: 1,
    date_heure: '2025-06-10T14:00:00Z',
    duree: 60,
    type: 'visio',
    notes: 'Suivi régulier',
    statut: 'confirmé',
    date_creation: '2025-05-11T09:00:00Z'
  },
  {
    id: 2,
    patient_id: 1,
    psychologue_id: 1,
    date_heure: '2025-07-10T14:00:00Z',
    duree: 60,
    type: 'présentiel',
    notes: 'Bilan de mi-parcours',
    statut: 'planifié',
    date_creation: '2025-06-11T09:00:00Z'
  },
  {
    id: 3,
    patient_id: 1,
    psychologue_id: 1,
    date_heure: '2024-04-10T10:00:00Z',
    duree: 45,
    type: 'téléphone',
    notes: 'Retour sur le module Gestion du stress',
    statut: 'terminé',
    date_creation: '2024-03-20T09:00:00Z'
  },
  { id: 4, patient_id: 2, psychologue_id: 1, date_heure: '2024-03-13T14:00:00Z', duree: 60, type: 'visio', notes: 'Bilan de mi-parcours', statut: 'planifié', date_creation: '2024-03-02T09:00:00Z' },
];

export function validateModuleMock(moduleId: number, patientId: number) {
  const mp = mockModulePatient.find(
    (mp) => mp.module_id === moduleId && mp.patient_id === patientId
  );
  if (mp) {
    mp.progression = 100;
    mp.derniere_activite = new Date().toISOString();
  }
} 