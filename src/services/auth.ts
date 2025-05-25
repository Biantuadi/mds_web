import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'https://dashboard-aud.vercel.app/api';
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
  const token = localStorage.getItem('token') || Cookies.get(TOKEN_COOKIE);
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

    // Stocker le token et les informations utilisateur
    const token = btoa(JSON.stringify({ 
      userId: data.data.id, 
      email: data.data.email,
      timestamp: Date.now()
    }));

    // Stocker dans les cookies et localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(data.data));
    Cookies.set(TOKEN_COOKIE, token, { expires: TOKEN_EXPIRY });
    Cookies.set(USER_COOKIE, JSON.stringify(data.data), { expires: TOKEN_EXPIRY });

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
  // Essayer d'abord de récupérer depuis localStorage
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  // Si pas dans localStorage, essayer les cookies
  if (!token || !user) {
    const cookieToken = Cookies.get(TOKEN_COOKIE);
    const cookieUser = Cookies.get(USER_COOKIE);
    
    if (cookieToken && cookieUser) {
      // Migrer vers localStorage
      localStorage.setItem('token', cookieToken);
      localStorage.setItem('user', cookieUser);
      return JSON.parse(cookieUser);
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