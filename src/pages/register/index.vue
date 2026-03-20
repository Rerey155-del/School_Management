<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import { useDashboardStore } from "@/stores/useDashboardStore";
import { useAuth } from "@/composables/useAuth";

const dashboardStore = useDashboardStore();
const router = useRouter();
const { register } = useAuth();

// ==========================================
// 1. STATE MANAGEMENT (Terserah Anda untuk logicnya)
// ==========================================
const fullName = ref("");
const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const role = ref("");

const isLoading = ref(false);
const error = ref("");
const successMessage = ref("");

// ==========================================
// 2. TRANSLATION (i18n) BILINGUAL
// ==========================================
const i18n = computed(() => {
  const isId = dashboardStore.locale === 'id';
  return {
    title: isId ? "Buat Akun Baru" : "Create New Account",
    subtitle: isId ? "Daftarkan diri Anda untuk akses ke sistem" : "Register yourself for system access",
    labels: {
      fullName: isId ? "Nama Lengkap" : "Full Name",
      username: "Username",
      email: "Email",
      password: "Password",
      confirmPassword: isId ? "Konfirmasi Password" : "Confirm Password",
      role: isId ? "Daftar Sebagai (Role)" : "Register As (Role)", // <--- TAMBAHKAN INI
      registerBtn: isId ? "Daftar Sekarang" : "Register Now",
      backToLogin: isId ? "Sudah punya akun? Masuk di sini" : "Already have an account? Login here"
    },
    placeholders: {
      fullName: isId ? "Contoh: Budi Santoso" : "e.g., John Doe",
      email: "budi@school.id",
      role: isId ? "Pilih Role Akses..." : "Select Access Role...", // <--- TAMBAHKAN INI
    }
  };
});

// ==========================================
// 3. FUNGSI SUBMIT FORM 
// ==========================================
const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = dashboardStore.locale === 'id' 
      ? "Password tidak cocok!" 
      : "Passwords do not match!";
    return;
  }

  error.value = "";
  successMessage.value = "";
  isLoading.value = true;

  try {
    const success = await register({
      full_name: fullName.value,
      username: username.value,
      email: email.value,
      password: password.value,
      role: role.value || "Admin"
    });
    
    if (success) {
      successMessage.value = dashboardStore.locale === 'id'
        ? "Pendaftaran berhasil! Mengalihkan ke Dashboard..."
        : "Registration successful! Redirecting to Dashboard...";
      
      // Auto login dan pindah ke dashboard
      setTimeout(() => router.push("/"), 1500);
    }
  } catch (err: any) {
    error.value = err.message || "Terjadi kesalahan saat pendaftaran.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200 p-4 relative overflow-hidden">
    <!-- Efek Background Animasi (Sama dengan Login) -->
    <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full animate-pulse" style="animation-delay: 2s"></div>

    <!-- Kotak Utama Form (Card Glassmorphism) -->
    <div class="w-full max-w-md bg-base-100/50 backdrop-blur-2xl border border-base-content/10 p-10 rounded-[2.5rem] shadow-2xl relative z-10" data-aos="zoom-in">
      
      <!-- LOGO & JUDUL -->
      <div class="text-center mb-10">
        <div class="w-16 h-16 bg-primary text-primary-content flex items-center justify-center rounded-2xl font-black text-3xl shadow-2xl shadow-primary/40 mx-auto mb-6 transform hover:rotate-6 transition-transform duration-300">
          S
        </div>
        <h1 class="text-2xl font-black text-base-content tracking-tight">{{ i18n.title }}</h1>
        <p class="text-base-content/40 font-medium mt-2 text-sm">{{ i18n.subtitle }}</p>
      </div>

      <!-- FORM REGISTER Mulai -->
      <form @submit.prevent="handleRegister" class="space-y-4">
        
        <!-- Toggle Bahasa ID/EN -->
        <div class="flex justify-center mb-6">
          <div class="flex items-center gap-2 border border-base-content/5 p-1 rounded-xl bg-base-200/50">
            <button type="button" @click="dashboardStore.locale = 'id'" class="px-3 py-1 rounded-lg text-xs font-black transition-all" :class="dashboardStore.locale === 'id' ? 'bg-primary text-primary-content shadow-lg' : 'text-base-content/40 hover:text-base-content'">ID</button>
            <button type="button" @click="dashboardStore.locale = 'en'" class="px-3 py-1 rounded-lg text-xs font-black transition-all" :class="dashboardStore.locale === 'en' ? 'bg-primary text-primary-content shadow-lg' : 'text-base-content/40 hover:text-base-content'">EN</button>
          </div>
        </div>

        <!-- Notifikasi Error / Success -->
        <div v-if="error" class="alert alert-error bg-error/10 border-error/20 text-error rounded-xl font-bold py-3 text-sm flex gap-2">
          <Icon icon="lucide:alert-circle" /> <span>{{ error }}</span>
        </div>
        <div v-if="successMessage" class="alert alert-success bg-success/10 border-success/20 text-success rounded-xl font-bold py-3 text-sm flex gap-2">
          <Icon icon="lucide:check-circle" /> <span>{{ successMessage }}</span>
        </div>

        <!-- INPUT: Nama Lengkap -->
        <div class="space-y-1">
          <label class="text-xs font-black uppercase tracking-widest text-base-content/40 ml-1">{{ i18n.labels.fullName }}</label>
          <div class="relative group">
            <Icon icon="lucide:user" class="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/20 group-focus-within:text-primary transition-colors" />
            <input v-model="fullName" type="text" :placeholder="i18n.placeholders.fullName" class="input bg-base-200/50 border-base-content/5 rounded-2xl pl-12 w-full focus:border-primary/50 text-base-content font-medium h-12 focus:outline-none focus:ring-4 focus:ring-primary/10" required />
          </div>
        </div>

        <!-- INPUT: Email -->
        <div class="space-y-1">
          <label class="text-xs font-black uppercase tracking-widest text-base-content/40 ml-1">{{ i18n.labels.email }}</label>
          <div class="relative group">
            <Icon icon="lucide:mail" class="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/20 group-focus-within:text-primary transition-colors" />
            <input v-model="email" type="email" :placeholder="i18n.placeholders.email" class="input bg-base-200/50 border-base-content/5 rounded-2xl pl-12 w-full focus:border-primary/50 text-base-content font-medium h-12 focus:outline-none focus:ring-4 focus:ring-primary/10" required />
          </div>
        </div>

        <!-- INPUT: Username -->
        <div class="space-y-1">
          <label class="text-xs font-black uppercase tracking-widest text-base-content/40 ml-1">{{ i18n.labels.username }}</label>
          <div class="relative group">
            <Icon icon="lucide:at-sign" class="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/20 group-focus-within:text-primary transition-colors" />
            <input v-model="username" type="text" placeholder="username123" class="input bg-base-200/50 border-base-content/5 rounded-2xl pl-12 w-full focus:border-primary/50 text-base-content font-medium h-12 focus:outline-none focus:ring-4 focus:ring-primary/10" required />
          </div>
        </div>

        <!-- INPUT: Password -->
        <div class="space-y-1">
          <label class="text-xs font-black uppercase tracking-widest text-base-content/40 ml-1">{{ i18n.labels.password }}</label>
          <div class="relative group">
            <Icon icon="lucide:lock" class="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/20 group-focus-within:text-primary transition-colors" />
            <input v-model="password" type="password" placeholder="••••••••" class="input bg-base-200/50 border-base-content/5 rounded-2xl pl-12 w-full focus:border-primary/50 text-base-content font-medium h-12 focus:outline-none focus:ring-4 focus:ring-primary/10" required />
          </div>
        </div>

        <!-- INPUT: Konfirmasi Password -->
        <div class="space-y-1">
          <label class="text-xs font-black uppercase tracking-widest text-base-content/40 ml-1">{{ i18n.labels.confirmPassword }}</label>
          <div class="relative group">
            <Icon icon="lucide:shield-check" class="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/20 group-focus-within:text-primary transition-colors" />
            <input v-model="confirmPassword" type="password" placeholder="••••••••" class="input bg-base-200/50 border-base-content/5 rounded-2xl pl-12 w-full focus:border-primary/50 text-base-content font-medium h-12 focus:outline-none focus:ring-4 focus:ring-primary/10" required />
          </div>
        </div>

                <!-- INPUT: Role -->
        <div class="space-y-1">
          <label class="text-xs font-black uppercase tracking-widest text-base-content/40 ml-1">{{ i18n.labels.role }}</label>
          <div class="relative group">
            <Icon icon="lucide:briefcase" class="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/20 group-focus-within:text-primary transition-colors pointer-events-none z-10" />
            
            <select v-model="role" class="select bg-base-200/50 border-base-content/5 rounded-2xl pl-12 w-full focus:border-primary/50 text-base-content font-medium h-12 focus:outline-none focus:ring-4 focus:ring-primary/10 appearance-none" required>
              <option disabled value="">{{ i18n.placeholders.role }}</option>
              <option value="Admin">Admin</option>
              <!-- Anda bisa tambahkan atau ubah role lainnya di sini -->
              <!-- <option value="Guru">Guru</option> -->
              <!-- <option value="Siswa">Siswa</option> -->
            </select>
            
            <!-- Ikon panah bawah kustom -->
            <Icon icon="lucide:chevron-down" class="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/40 pointer-events-none" />
          </div>
        </div>


        <!-- TOMBOL DAFTAR -->
        <button type="submit" :disabled="isLoading" class="btn btn-primary w-full h-14 rounded-2xl font-black text-lg gap-3 shadow-xl shadow-primary/30 mt-6 border-none">
          <span v-if="isLoading" class="loading loading-spinner loading-md"></span>
          <span v-else>{{ i18n.labels.registerBtn }}</span>
        </button>
      </form>

      <!-- TOMBOL KEMBALI KE LOGIN -->
      <div class="mt-8 text-center pt-6 border-t border-base-content/10">
        <router-link to="/login" class="text-sm font-bold text-base-content/60 hover:text-primary transition-colors flex items-center justify-center gap-2">
          <Icon icon="lucide:arrow-left" />
          {{ i18n.labels.backToLogin }}
        </router-link>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
/* Sama dengan page login */
@keyframes pulse {
  0%, 100% { opacity: 0.1; transform: scale(1); }
  50% { opacity: 0.2; transform: scale(1.1); }
}

.animate-pulse {
  animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
