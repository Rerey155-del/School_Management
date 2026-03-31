<script setup lang="ts">
import { useAuth } from "@/composables/useAuth";
import { useRouter } from "vue-router";

const { user, logout } = useAuth();
const router = useRouter();

const handleLogout = () => {
  logout();
  router.push("/login");
};
</script>

<template>
  <div class="min-h-screen bg-base-200 flex flex-col items-center justify-center p-4">
    <div class="card w-full max-w-lg bg-base-100 shadow-xl border border-base-content/10">
      <div class="card-body items-center text-center">
        <!-- Avatar/Logo -->
        <div class="avatar placeholder mb-4">
          <div class="bg-primary text-primary-content rounded-full w-24 ring ring-primary ring-offset-base-100 ring-offset-2">
            <span class="text-3xl"><i class="fas fa-chalkboard-teacher"></i></span>
          </div>
        </div>
        
        <!-- Welcome Message -->
        <h2 class="card-title text-3xl font-black text-base-content">
          Dashboard Guru
        </h2>
        <p class="text-base-content/60 font-medium mt-2">
          Halo Bapak/Ibu <span class="text-primary font-bold">{{ user?.full_name || user?.username || 'Guru' }}</span>, selamat datang!
        </p>

        <!-- Tempat Untuk Menulis Kode Anda Sendiri -->
        <div class="w-full mt-6 bg-info/10 text-info font-medium p-4 rounded-xl border border-info/20 text-sm">
          <p><i class="fas fa-info-circle mr-2"></i><strong>Area Bebas Edit:</strong></p>
          <p class="mt-1 opacity-80">Silakan Anda kembangkan tampilan dan fungsionalitas laman Guru Anda sendiri di sini.</p>
        </div>

        <!-- Tombol Logout -->
        <div class="card-actions mt-8 w-full">
          <button @click="handleLogout" class="btn btn-error btn-outline w-full rounded-2xl font-bold">
            <i class="fas fa-sign-out-alt mr-2"></i> Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Tambahkan CSS spesifik Anda di sini */
</style>
