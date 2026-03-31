<script setup lang="ts">
import { useAuth } from "@/composables/useAuth";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAnnouncementStore } from "@/stores/useAnnouncementStore";
import { onMounted } from "vue";

const { user, logout } = useAuth();
const router = useRouter();

// inisialisasi state terlebih dahulu
const annountcementStore = useAnnouncementStore();

// ambil data
onMounted(() => {
  annountcementStore.fetchList();
});

// pembikinan filter data (siswa atau semuannya )
const notifications = computed(() => {
  return annountcementStore.items.filter(
    (item) => item.target_role === "siswa" || item.target_role === "semua",
  );
});

const handleLogout = () => {
  logout();
  router.push("/login");
};
</script>

<template>
  <div
    class="min-h-screen bg-base-200 flex flex-col items-center justify-center p-4"
  >
    <div
      class="card w-full max-w-lg bg-base-100 shadow-xl border border-base-content/10"
    >
      <div class="card-body items-center text-center">
        <!-- Avatar/Logo -->
        <div class="avatar placeholder mb-4">
          <div
            class="bg-secondary text-secondary-content rounded-full w-24 ring ring-secondary ring-offset-base-100 ring-offset-2"
          >
            <span class="text-3xl"><i class="fas fa-user-graduate"></i></span>
          </div>
        </div>

        <!-- Welcome Message -->
        <h2 class="card-title text-3xl font-black text-base-content">
          Dashboard Siswa
        </h2>

        <!-- bagian pemberitahuan -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div class="flex items-center gap-2 mb-4">
            <div class="i-lucided-bell text-green-500 text-xl" />
            <h2 class="text-lg font-semibold text-gray-800">
              Pemberitahuan dari admin
            </h2>
          </div>
          <div
            v-if="annountcementStore.loadingList"
            class="text-gray-500 flex items-center gap-2"
          >
            <div class="i-lucide-loader-2 animate-spin text-green-500" />
            Memuat pemberitahuan
          </div>

          <div
            v-else-if="notifications.length === 0"
            class="text-gray-500 italic"
          >
            Belum ada pemberitahuan untuk siswa
          </div>

          <div v-else="space - y - 4">
            <div
              v-for="item in notifications"
              :key="item.id"
              class="p-4 rounded-lg border-1.4 border-green-500 bg-green-50/50 hover:bg-green-50 transition-colors"
            >
              <div class="flex justify-between items-start mb-1">
                <h3 class="text-xs text-gray-500">{{ item.title }}</h3>
                <span class="text-xs text-gray-500" v-if="item.created_at">{{
                  item.created_at
                }}</span>
              </div>
              <p class="text-sm text-gray-600">{{ item.message }}</p>
            </div>
          </div>
        </div>

        <!-- Tombol Logout -->
        <div class="card-actions mt-8 w-full">
          <button
            @click="handleLogout"
            class="btn btn-error btn-outline w-full rounded-2xl font-bold"
          >
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
