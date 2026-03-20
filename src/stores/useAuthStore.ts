import { defineStore } from 'pinia';
import { authService, type UserType } from '@/services/authService';

/**
 * Store for managing Authentication data using Pinia.
 * Handles user sessions, login, and logout.
 */
export const useAuthStore = defineStore('auth', {
  state: () => ({
    /** The authenticated user data from localStorage or null */
    user: JSON.parse(localStorage.getItem('user') || 'null') as UserType | null,
    /** Login flow loading status */
    loading: false,
    /** Error message if login fails */
    error: null as string | null
  }),

  getters: {
    /** Check if a valid user session exists */
    isAuthenticated: (state) => !!state.user
  },

  actions: {
    /**
     * Authenticates a user and stores session details.
     * @param credentials - The user's username and optional password.
     */
    async login(credentials: { username: string; password?: string }): Promise<boolean> {
      this.loading = true;
      this.error = null;
      try {
        const response = await authService.login(credentials);
        this.user = response.user;
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        return true;
      } catch (err: any) {
        this.error = err.message || 'Login failed';
        console.error('AuthStore[login]:', err);
        throw err;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Registers a new user and authenticates them immediately.
     */
    async register(data: { full_name: string; username: string; email: string; password?: string; role?: string }): Promise<boolean> {
      this.loading = true;
      this.error = null;
      try {
        const response = await authService.register(data);
        this.user = response.user;
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        return true;
      } catch (err: any) {
        this.error = err.message || 'Registration failed';
        console.error('AuthStore[register]:', err);
        throw err;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Clears the user session data.
     */
    logout() {
      this.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token'); // Clear the token as well
    }
  }
});
