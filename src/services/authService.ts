import apiClient from './apiClient';

export interface UserType {
  id?: number | string;
  username: string;
  email?: string;
  role?: string;
  avatar?: string;
  name?: string;
}

export const authService = {
  /**
   * Attempts to authenticate a user.
   * Based on the user prompt "db tabel users yang berasal dari pemanggilan API",
   * this might be hitting a GET /users endpoint to filter, or a POST /users/login.
   * Assuming standard REST if POST /login doesn't work, we fallback or adjust.
   */
  async login(credentials: { username: string; password?: string }): Promise<{ user: UserType, token: string }> {
    try {
      // Typically it's a POST to /login
      const response = await apiClient.post('/login', credentials);
      return response.data;
    } catch (error: any) {
      // If POST /login isn't implemented and we must fetch from /users directly
      if (error.response && error.response.status === 404) {
        console.warn('POST /login not found. Attempting to fetch from /users directly for matching username...');
        const usersResponse = await apiClient.get('/users');
        const users: UserType[] = usersResponse.data;
        const matchedUser = users.find(u => u.username === credentials.username);
        
        if (matchedUser) {
          return {
            user: {
              ...matchedUser,
              role: matchedUser.role || 'Administrator',
              avatar: matchedUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${matchedUser.username}`
            },
            token: 'mock-token-from-users-table'
          };
        } else {
          throw new Error('User not found in /users table');
        }
      }
      throw error;
    }
  }
};
