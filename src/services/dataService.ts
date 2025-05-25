import {
  // mockUsers,
  // mockModules,
  mockBlocs,
  mockContenuBlocs,
  // mockModulePatient,
  mockRendezVous,
  // validateModuleMock,
} from '../mocks/mockData';
import { api } from './auth';
import axios from 'axios';

export const dataService = {
  async getCurrentUser() {
    try {
      console.log('Récupération des informations utilisateur...');
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Non authentifié');

      const decoded = JSON.parse(atob(token));
      const { data } = await api.get(`/patients/${decoded.userId}`);

      console.log('Données utilisateur reçues:', data);

      if (!data.success) {
        throw new Error(data.message || 'Erreur lors de la récupération des données utilisateur');
      }

      return data.data;
    } catch (error: unknown) {
      console.error('Erreur lors de la récupération des données utilisateur:', error);
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des données utilisateur');
      }
      throw error;
    }
  },

  async getModules() {
    try {
      console.log('Récupération des modules...');
      const { data } = await api.get('/modules');

      console.log('Modules reçus:', data);

      if (!data.success) {
        throw new Error(data.message || 'Erreur lors de la récupération des modules');
      }

      return data.data;
    } catch (error: unknown) {
      console.error('Erreur lors de la récupération des modules:', error);
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des modules');
      }
      throw error;
    }
  },

  async getModuleById(id: number) {
    try {
      console.log('Récupération du module:', id);
      const { data } = await api.get(`/modules/${id}`);

      console.log('Module reçu:', data);

      if (!data.success) {
        throw new Error(data.message || 'Erreur lors de la récupération du module');
      }

      return data.data;
    } catch (error: unknown) {
      console.error('Erreur lors de la récupération du module:', error);
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Erreur lors de la récupération du module');
      }
      throw error;
    }
  },

  async getModulePatient(patientId: number) {
    try {
      console.log('Récupération des modules du patient:', patientId);
      const { data } = await api.get(`/patients/${patientId}/modules`);

      console.log('Modules du patient reçus:', data);

      if (!data.success) {
        throw new Error(data.message || 'Erreur lors de la récupération des modules du patient');
      }

      return data.data;
    } catch (error: unknown) {
      console.error('Erreur lors de la récupération des modules du patient:', error);
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des modules du patient');
      }
      throw error;
    }
  },

  async getRendezVous(patientId: number) {
    try {
      console.log('Récupération des rendez-vous du patient:', patientId);
      // TODO: Remplacer par l'appel API quand l'endpoint sera disponible
      // const { data } = await api.get(`/patients/${patientId}/appointments`);
      // return data.data;
      
      // Utilisation temporaire des données mockées
      console.log('Utilisation des données mockées pour les rendez-vous');
      return mockRendezVous;
    } catch (error: unknown) {
      console.error('Erreur lors de la récupération des rendez-vous:', error);
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des rendez-vous');
      }
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
      const { data } = await api.post(`/patients/${patientId}/modules/${moduleId}/validate`);

      console.log('Réponse de validation:', data);

      if (!data.success) {
        throw new Error(data.message || 'Erreur lors de la validation du module');
      }

      return data.success;
    } catch (error: unknown) {
      console.error('Erreur lors de la validation du module:', error);
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Erreur lors de la validation du module');
      }
      throw error;
    }
  },

  async getModuleDetail(moduleId: number) {
    try {
      console.log('Récupération des détails du module:', moduleId);
      const { data } = await api.get(`/patients/module/${moduleId}`);

      console.log('Détails du module reçus:', data);

      if (!data.success) {
        throw new Error(data.message || 'Erreur lors de la récupération des détails du module');
      }

      return data.data;
    } catch (error: unknown) {
      console.error('Erreur lors de la récupération des détails du module:', error);
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des détails du module');
      }
      throw error;
    }
  },
};