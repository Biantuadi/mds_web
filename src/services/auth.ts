import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:3000/api';
const TOKEN_COOKIE = 'auth_token';
const USER_COOKIE = 'user_data';
const TOKEN_EXPIRY = 7; // 7 jours

// Configuration d'Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour ajouter le token aux requêtes
api.interceptors.request.use((config) => {
  const token = Cookies.get(TOKEN_COOKIE);
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

    // Stocker le token et les informations utilisateur dans les cookies
    const token = btoa(JSON.stringify({ 
      userId: data.data.id, 
      email: data.data.email,
      timestamp: Date.now()
    }));

    // Stocker dans les cookies avec une durée de 7 jours
    Cookies.set(TOKEN_COOKIE, token, { expires: TOKEN_EXPIRY });
    Cookies.set(USER_COOKIE, JSON.stringify(data.data), { expires: TOKEN_EXPIRY });

    // Stocker aussi dans localStorage pour la compatibilité
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
  // Essayer d'abord de récupérer depuis les cookies
  const token = Cookies.get(TOKEN_COOKIE);
  const user = Cookies.get(USER_COOKIE);
  
  // Si pas dans les cookies, essayer localStorage
  if (!token || !user) {
    const localToken = localStorage.getItem('token');
    const localUser = localStorage.getItem('user');
    
    if (localToken && localUser) {
      // Migrer vers les cookies
      Cookies.set(TOKEN_COOKIE, localToken, { expires: TOKEN_EXPIRY });
      Cookies.set(USER_COOKIE, localUser, { expires: TOKEN_EXPIRY });
      return JSON.parse(localUser);
    }
    
    console.log('❌ Pas de token ou d\'utilisateur trouvé');
    return null;
  }
  
  try {
    const decoded = JSON.parse(atob(token));
    const userData = JSON.parse(user);
    
    // Vérifier si le token a plus de 7 jours
    const tokenAge = Date.now() - decoded.timestamp;
    if (tokenAge > TOKEN_EXPIRY * 24 * 60 * 60 * 1000) {
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
  // Supprimer les cookies
  Cookies.remove(TOKEN_COOKIE);
  Cookies.remove(USER_COOKIE);
  // Supprimer le localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Exporter l'instance axios configurée pour une utilisation dans d'autres services
export { api };