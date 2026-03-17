import apiClient from './apiClient';

export interface UserType {
  id?: number | string;
  full_name?: string;
  username: string;
  email?: string;
  role?: string;
  avatar?: string;
  status?: string;
  last_login?: string | null;
  created_at?: string;
}

export const authService = {

  async login(credentials: { username: string; password?: string }): Promise<{ user: UserType, token: string }> {
    try {
      // Mengirim request POST ke endpoint login real di backend
      const response = await apiClient.post('/users/login', credentials);
      
      if (response.data && response.data.token) {
        const { user, token } = response.data;
        return {
          user: {
            ...user,
            avatar: user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`
          },
          token: token
        };
      } else {
        throw new Error('Respons login tidak valid');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  }
};
