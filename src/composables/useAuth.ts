import { ref, computed } from 'vue'
import { authService, type UserType } from '@/services/authService'

const user = ref<UserType | null>(JSON.parse(localStorage.getItem('user') || 'null'))

export function useAuth() {
  const isAuthenticated = computed(() => !!user.value)

  const login = async (credentials: { username: string; password?: string }) => {
    try {
      const response = await authService.login(credentials);
      user.value = response.user;
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('user')
  }

  return {
    user,
    isAuthenticated,
    login,
    logout
  }
}
