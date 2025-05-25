const API_URL = 'http://localhost:3000/api';

export const loginUser = async (email: string, password: string): Promise<{ token: string; user: any }> => {
  try {
    console.log('Tentative de connexion avec:', { email });
    
    const response = await fetch(`${API_URL}/patients/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        mot_de_passe: password
      })
    });

    const data = await response.json();
    console.log('Réponse du serveur:', data);

    if (!data.success) {
      throw new Error(data.message || 'Erreur de connexion');
    }

    // Stocker le token dans le localStorage
    const token = btoa(JSON.stringify({ userId: data.data.id, email: data.data.email }));
    localStorage.setItem('token', token);

    return {
      token,
      user: data.data
    };
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    throw error;
  }
};

export const getCurrentUser = (): any => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    const decoded = JSON.parse(atob(token));
    return decoded;
  } catch (error) {
    console.error('Erreur lors de la lecture du token:', error);
    return null;
  }
};

export const logoutUser = () => {
  localStorage.removeItem('token');
};