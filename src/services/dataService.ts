import {
  mockUsers,
  mockModules,
  mockBlocs,
  mockContenuBlocs,
  mockModulePatient,
  mockRendezVous,
} from '../mocks/mockData';

export const dataService = {
  async getCurrentUser() {
    // Pour l'instant, retourne la première patiente
    return Promise.resolve(mockUsers[0]);
  },
  async getModules() {
    return Promise.resolve(mockModules);
  },
  async getModuleById(id: number) {
    return Promise.resolve(mockModules.find(m => m.id === id));
  },
  async getModulePatient(patientId: number) {
    return Promise.resolve(mockModulePatient.filter(mp => mp.patient_id === patientId));
  },
  async getRendezVous(patientId: number) {
    return Promise.resolve(mockRendezVous.filter(rdv => rdv.patient_id === patientId));
  },
  async getBlocs() {
    return Promise.resolve(mockBlocs);
  },
  async getContenuBlocs(moduleId: number) {
    return Promise.resolve(mockContenuBlocs.filter(cb => cb.module_id === moduleId));
  },
}; 