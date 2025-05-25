import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Configuration d'Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour ajouter le token aux requêtes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur pour logger les réponses et gérer les erreurs d'authentification
api.interceptors.response.use(
  (response) => {
    console.log('✅ Réponse API:', {
      url: response.config.url,
      method: response.config.method,
      status: response.status,
      data: response.data
    });
    return response;
  },
  async (error) => {
    console.error('❌ Erreur API:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data
    });

    // Si l'erreur est une erreur d'authentification (401)
    if (error.response?.status === 401) {
      // Ne pas déconnecter si c'est une tentative de login
      if (error.config?.url !== '/patients/login') {
        console.log('🔒 Session expirée, déconnexion...');
        logoutUser();
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export const loginUser = async (email: string, password: string): Promise<{ token: string; user: any }> => {
  try {
    const loginData = {
      email,
      mot_de_passe: password
    };
    
    console.log('🔑 Tentative de connexion avec:', { email });
    console.log('📤 Données envoyées:', { ...loginData, mot_de_passe: '******' });
    
    const { data } = await api.post('/patients/login', loginData);

    console.log('📥 Réponse du serveur:', data);

    if (!data.success) {
      throw new Error(data.message || 'Erreur de connexion');
    }

    // Stocker le token et les informations utilisateur dans le localStorage
    const token = btoa(JSON.stringify({ 
      userId: data.data.id, 
      email: data.data.email,
      timestamp: Date.now() // Ajouter un timestamp pour la durée de vie
    }));
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(data.data));

    console.log('✅ Connexion réussie pour:', data.data.email);

    return {
      token,
      user: data.data
    };
  } catch (error) {
    console.error('❌ Erreur lors de la connexion:', error);
    if (axios.isAxiosError(error)) {
      console.error('🔍 Détails de l\'erreur:', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers
      });
      
      if (error.response?.status === 401) {
        throw new Error('Email ou mot de passe incorrect');
      }
      if (error.response?.status === 400) {
        throw new Error('Données de connexion invalides');
      }
      throw new Error(error.response?.data?.message || 'Erreur de connexion');
    }
    throw error;
  }
};

export const getCurrentUser = async (): Promise<any> => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  if (!token || !user) {
    console.log('❌ Pas de token ou d\'utilisateur trouvé');
    return null;
  }
  
  try {
    const decoded = JSON.parse(atob(token));
    const userData = JSON.parse(user);
    
    // Vérifier si le token a plus de 24h
    const tokenAge = Date.now() - decoded.timestamp;
    if (tokenAge > 24 * 60 * 60 * 1000) { // 24 heures en millisecondes
      console.log('🔒 Token expiré');
      logoutUser();
      return null;
    }

    console.log('👤 Utilisateur actuel:', userData);
    return userData;
  } catch (error) {
    console.error('❌ Erreur lors de la lecture du token:', error);
    return null;
  }
};

export const logoutUser = () => {
  console.log('🚪 Déconnexion de l\'utilisateur');
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Exporter l'instance axios configurée pour une utilisation dans d'autres services
export { api };