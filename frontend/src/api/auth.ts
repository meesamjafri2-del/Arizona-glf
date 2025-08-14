
const API_BASE = 'https://www.arizonaglf.com/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'client';
}

export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<{ user: User; success: boolean }> => {
    const response = await fetch(`${API_BASE}/auth/login.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json();
  },

  logout: async (): Promise<{ success: boolean }> => {
    const response = await fetch(`${API_BASE}/auth/logout.php`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }

    return response.json();
  },

  checkAuth: async (): Promise<{ user: User | null; authenticated: boolean }> => {
    const response = await fetch(`${API_BASE}/auth/check.php`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      return { user: null, authenticated: false };
    }

    return response.json();
  },
};
