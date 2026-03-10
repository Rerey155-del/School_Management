import { ref, watch } from 'vue'

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
  const profile = ref({
    username: 'admin_sarah',
    password: 'password123'
  })

  const security = ref({
    lastPasswordChange: '30 hari yang lalu'
  })

  const updateProfile = () => {
    console.log('Profile updated', profile.value)
  }

  const changePassword = () => {
    console.log('Redirecting to change password...')
  }

  return {
    profile,
    preferences,
    security,
    updateProfile,
    changePassword
  }
}
