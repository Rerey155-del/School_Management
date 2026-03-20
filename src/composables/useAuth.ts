import { computed } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'

export function useAuth() {
  const store = useAuthStore()

  return {
    user: computed(() => store.user),
    isAuthenticated: computed(() => store.isAuthenticated),
    login: store.login,
    register: store.register,
    logout: store.logout,
    loading: computed(() => store.loading),
    error: computed(() => store.error)
  }
}
