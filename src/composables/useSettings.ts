import { ref, watch, onMounted } from 'vue'
import { userService } from '@/services/userService'
import { useAuthStore } from '@/stores/useAuthStore'

// Global singleton state for theme persistence
const savedTheme = localStorage.getItem('theme')
const isDarkInitial = savedTheme ? savedTheme === 'night' : true

const preferences = ref({
  darkMode: isDarkInitial
})

// Global Theme Switching Logic
const applyTheme = (isDark: boolean) => {
  const theme = isDark ? 'night' : 'winter'
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
}

// Side effect: Apply initial theme immediately on module load
if (typeof document !== 'undefined') {
  applyTheme(preferences.value.darkMode)
}

// Watch for changes and apply immediately
watch(() => preferences.value.darkMode, (newVal) => {
  applyTheme(newVal)
})

export function useSettings() {
  const authStore = useAuthStore()
  
  const profile = ref({
    username: authStore.user?.username || '',
    password: '' // Don't expose password or fetch it, it is empty until user inputs new password
  })

  // Pre-fill full_name, email, etc if we expand profile settings. 
  // For now just username to match the form.

  const security = ref({
    lastPasswordChange: '30 hari yang lalu'
  })

  const updateProfile = async () => {
    if (!authStore.user?.id) return;
    
    try {
      const payload: any = { username: profile.value.username }
      if (profile.value.password) {
        payload.password = profile.value.password;
      }
      const updatedUser = await userService.update(authStore.user.id, payload)
      // Update local storage/pinia
      authStore.user = { ...authStore.user, ...updatedUser }
      localStorage.setItem('user', JSON.stringify(authStore.user))
      
      console.log('Profile updated', updatedUser)
      alert("Profile successfully updated");
    } catch(err) {
      console.error(err);
      alert("Failed to update profile");
    }
  }

  const changePassword = () => {
    console.log('Redirecting to change password...')
  }

  // Set the profile if user data changes or component mounts
  onMounted(() => {
     if(authStore.user) {
        profile.value.username = authStore.user.username;
     }
  })

  return {
    profile,
    preferences,
    security,
    updateProfile,
    changePassword
  }
}
