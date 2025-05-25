import {
  // mockUsers,
  // mockModules,
  mockBlocs,
  mockContenuBlocs,
  // mockModulePatient,
  // mockRendezVous,
  // validateModuleMock,
} from '../mocks/mockData';

const API_URL = 'http://localhost:3000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };
};

export const dataService = {
  async getCurrentUser() {
    try {
      console.log('Récupération des informations utilisateur...');
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Non authentifié');

      const decoded = JSON.parse(atob(token));
      const response = await fetch(`${API_URL}/patients/${decoded.userId}`, {
        headers: getAuthHeaders()
      });

      const data = await response.json();
      console.log('Données utilisateur reçues:', data);

      if (!data.success) {
        throw new Error(data.message || 'Erreur lors de la récupération des données utilisateur');
      }

      return data.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur:', error);
      throw error;
    }
  },

  async getModules() {
    try {
      console.log('Récupération des modules...');
      const response = await fetch(`${API_URL}/modules`, {
        headers: getAuthHeaders()
      });

      const data = await response.json();
      console.log('Modules reçus:', data);

      if (!data.success) {
        throw new Error(data.message || 'Erreur lors de la récupération des modules');
      }

      return data.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des modules:', error);
      throw error;
    }
  },

  async getModuleById(id: number) {
    try {
      console.log('Récupération du module:', id);
      const response = await fetch(`${API_URL}/modules/${id}`, {
        headers: getAuthHeaders()
      });

      const data = await response.json();
      console.log('Module reçu:', data);

      if (!data.success) {
        throw new Error(data.message || 'Erreur lors de la récupération du module');
      }

      return data.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du module:', error);
      throw error;
    }
  },

  async getModulePatient(patientId: number) {
    try {
      console.log('Récupération des modules du patient:', patientId);
      const response = await fetch(`${API_URL}/patients/${patientId}/modules`, {
        headers: getAuthHeaders()
      });

      const data = await response.json();
      console.log('Modules du patient reçus:', data);

      if (!data.success) {
        throw new Error(data.message || 'Erreur lors de la récupération des modules du patient');
      }

      return data.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des modules du patient:', error);
      throw error;
    }
  },

  async getRendezVous(patientId: number) {
    try {
      console.log('Récupération des rendez-vous du patient:', patientId);
      const response = await fetch(`${API_URL}/patients/${patientId}/appointments`, {
        headers: getAuthHeaders()
      });

      const data = await response.json();
      console.log('Rendez-vous reçus:', data);

      if (!data.success) {
        throw new Error(data.message || 'Erreur lors de la récupération des rendez-vous');
      }

      return data.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des rendez-vous:', error);
      throw error;
    }
  },

  async getBlocs() {
    return Promise.resolve(mockBlocs);
  },

  async getContenuBlocs(moduleId: number) {
    return Promise.resolve(mockContenuBlocs.filter(cb => cb.module_id === moduleId));
  },

  async validateModule(moduleId: number, patientId: number) {
    try {
      console.log('Validation du module:', { moduleId, patientId });
      const response = await fetch(`${API_URL}/patients/${patientId}/modules/${moduleId}/validate`, {
        method: 'POST',
        headers: getAuthHeaders()
      });

      const data = await response.json();
      console.log('Réponse de validation:', data);

      if (!data.success) {
        throw new Error(data.message || 'Erreur lors de la validation du module');
      }

      return data.success;
    } catch (error) {
      console.error('Erreur lors de la validation du module:', error);
      throw error;
    }
  },
};

