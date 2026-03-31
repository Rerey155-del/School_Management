<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/composables/useAuth";
import { Icon } from "@iconify/vue";
import { useDashboardStore } from "@/stores/useDashboardStore";

const dashboardStore = useDashboardStore();

const router = useRouter();
const { login } = useAuth();

const username = ref("");
const password = ref("");
const isLoading = ref(false);
const error = ref("");

const i18n = computed(() => {
  const isId = dashboardStore.locale === 'id';
  return {
    brand: isId ? "Manajemen Sekolah" : "School Management",
    version: "V3",    
    subtitle: isId ? "Paket Manajemen Profesional" : "Professional Management Suite",
    errors: {
      emptyFields: isId ? "Silakan masukkan username dan password." : "Please enter both username and password.",
      invalid: isId ? "Kredensial tidak valid. Silakan coba lagi." : "Invalid credentials. Please try again."
    },
    labels: {
      username: "Username",
      password: "Password",
      remember: isId ? "Ingat saya" : "Remember me",
      forgot: isId ? "Lupa Kata Sandi?" : "Forgot Password?",
      authorize: isId ? "Otorisasi Akses" : "Authorize Access",
      copyright: isId ? "2024 Sistem Terintegrasi SchoolV3." : "2024 SchoolV3 Integrated Systems."
    },
    placeholders: {
      username: isId ? "Masukkan username Anda" : "Enter your username",
      password: "••••••••"
    },
    rights: isId ? "Hak cipta dilindungi." : "All rights reserved."
  };
});

const handleLogin = async () => {
  if (!username.value || !password.value) {
    error.value = i18n.value.errors.emptyFields;
    return;
  }

  isLoading.value = true;
  error.value = "";

  try {
    const success = await login({ username: username.value, password: password.value });
    if (success) {
      const { user } = useAuth();
      const role = user.value?.role;

      // Redirect berdasarkan role masing-masing
      if (role === 'Teacher') {
        router.push("/guru");
      } else if (role === 'Siswa') {
        router.push("/siswa");
      } else {
        router.push("/"); // Default dashboard untuk Admin atau lainnya
      }
    }
  } catch (err: any) {
    error.value = i18n.value.errors.invalid;
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-base-200 p-4 relative overflow-hidden"
  >
    <!-- Dynamic Background Elements -->
    <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full animate-pulse" style="animation-delay: 2s"></div>

    <div
      class="w-full max-w-md bg-base-100/50 backdrop-blur-2xl border border-base-content/10 p-10 rounded-[2.5rem] shadow-2xl relative z-10"
      data-aos="zoom-in"
    >
      <!-- Logo & Header -->
      <div class="text-center mb-10">
        <div
          class="w-16 h-16 bg-primary text-primary-content flex items-center justify-center rounded-2xl font-black text-3xl shadow-2xl shadow-primary/40 mx-auto mb-6 transform hover:rotate-6 transition-transform duration-300"
        >
          S
        </div>
        <h1 class="text-3xl font-black text-base-content tracking-tight capitalize">
          Management Sekolah <span class="text-primary font-black">V3</span>
        </h1>
        <p class="text-base-content/40 font-medium mt-2">{{ i18n.subtitle }}</p>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div class="flex justify-center mb-6">
          <div class="flex items-center gap-2 border border-base-content/5 p-1 rounded-xl bg-base-200/50">
            <button 
              type="button"
              @click="dashboardStore.locale = 'id'"
              class="px-3 py-1 rounded-lg text-xs font-black transition-all"
              :class="dashboardStore.locale === 'id' ? 'bg-primary text-primary-content shadow-lg' : 'text-base-content/40 hover:text-base-content'"
            >ID</button>
            <button 
              type="button"
              @click="dashboardStore.locale = 'en'"
              class="px-3 py-1 rounded-lg text-xs font-black transition-all"
              :class="dashboardStore.locale === 'en' ? 'bg-primary text-primary-content shadow-lg' : 'text-base-content/40 hover:text-base-content'"
            >EN</button>
          </div>
        </div>

        <div v-if="error" class="alert alert-error bg-error/10 border-error/20 text-error rounded-xl font-bold py-3 flex gap-2">
          <Icon icon="lucide:alert-circle" />
          <span>{{ error }}</span>
        </div>

        <div class="space-y-2">
          <label class="text-xs font-black uppercase tracking-widest text-base-content/40 ml-1">{{ i18n.labels.username }}</label>
          <div class="relative group">
            <Icon
              icon="lucide:user"
              class="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/20 group-focus-within:text-primary transition-colors"
            />
            <input
              v-model="username"
              type="text"
              :placeholder="i18n.placeholders.username"
              class="input bg-base-200/50 border-base-content/5 rounded-2xl pl-12 w-full focus:border-primary/50 text-base-content font-medium h-14 focus:outline-none focus:ring-4 focus:ring-primary/10"
              required
            />
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-xs font-black uppercase tracking-widest text-base-content/40 ml-1">{{ i18n.labels.password }}</label>
          <div class="relative group">
            <Icon
              icon="lucide:lock"
              class="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/20 group-focus-within:text-primary transition-colors"
            />
            <input
              v-model="password"
              type="password"
              :placeholder="i18n.placeholders.password"
              class="input bg-base-200/50 border-base-content/5 rounded-2xl pl-12 w-full focus:border-primary/50 text-base-content font-medium h-14 focus:outline-none focus:ring-4 focus:ring-primary/10"
              required
            />
          </div>
        </div>

        <div class="flex items-center justify-between px-1">
          <label class="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" class="checkbox checkbox-primary checkbox-xs border-base-content/20 bg-base-content/5" />
            <span class="text-xs font-bold text-base-content/40 group-hover:text-base-content/60 transition-colors">{{ i18n.labels.remember }}</span>
          </label>
          <router-link to="/register" class="text-xs font-bold text-primary hover:underline underline-offset-4">{{ i18n.labels.forgot }}</router-link>
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="btn btn-primary w-full h-14 rounded-2xl font-black text-lg gap-3 shadow-xl shadow-primary/30 mt-4 border-none"
        >
          <span v-if="isLoading" class="loading loading-spinner loading-md"></span>
          <span v-else>{{ i18n.labels.authorize }}</span>
          <Icon v-if="!isLoading" icon="lucide:arrow_right" class="w-5 h-5 text-white/50" />
        </button>
      </form>

      <!-- Footer -->
      <p class="text-center text-base-content/20 text-xs font-bold mt-10">
        &copy; {{ i18n.labels.copyright }}<br />{{ i18n.rights }}
      </p>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0%, 100% { opacity: 0.1; transform: scale(1); }
  50% { opacity: 0.2; transform: scale(1.1); }
}

.animate-pulse {
  animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
