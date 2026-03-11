import { ref, onMounted } from 'vue'
import { userService } from '@/services/userService'
import type { UserType } from '@/services/authService'

export function useUsers() {
  const users = ref<UserType[]>([])
  const loading = ref(false)

  const fetchUsers = async () => {
    loading.value = true
    try {
      users.value = await userService.getAll()
    } catch (error) {
      console.error('Failed to fetch users', error)
    } finally {
      loading.value = false
    }
  }

  const updateUser = async (id: number | string, data: Partial<UserType>) => {
    try {
      // API update
      const updatedItem = await userService.update(id, data)
      // Local state update
      const index = users.value.findIndex(t => t.id === id)
      if (index !== -1) {
        users.value[index] = { ...users.value[index], ...updatedItem }
      }
    } catch (error) {
      console.error('Failed to update user', error)
      throw error
    }
  }

  onMounted(() => {
    fetchUsers()
  })

  return { users, loading, fetchUsers, updateUser }
}
