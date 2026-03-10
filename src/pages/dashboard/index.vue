<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import { useDashboard } from "@/composables/useDashboard";

const { stats, academicEvents, performanceProgress } = useDashboard();

const i18n = {
  brand: "SCHOOL",
  version: "V3",
  header: {
    title: "Academy Dashboard",
    subtitle: "Hello, Admin. Here's what's happening today."
  },
  user: {
    role: "Administrator",
    department: "Principal Office",
    profile: "My Profile",
    security: "Security",
    logout: "Logout",
    account: "Account Settings"
  }
};
</script>

<template>
  <div class="drawer lg:drawer-open bg-base-200 min-h-screen">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />

    <div class="drawer-content flex flex-col p-6 lg:p-10">
      <!-- Mobile Navbar Toggle -->
      <div
        class="flex items-center justify-between lg:hidden mb-6 bg-base-100 p-4 rounded-2xl shadow-sm"
      >
        <label for="my-drawer-2" class="btn btn-ghost btn-circle drawer-button">
          <i class="fas fa-bars text-xl"></i>
        </label>
        <span class="text-xl font-bold tracking-tight"
          >{{ i18n.brand }}<span class="text-primary">{{ i18n.version }}</span></span
        >
        <div class="avatar w-8 h-8 rounded-full overflow-hidden">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
        </div>
      </div>

      <!-- Header Section -->
      <header
        class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10"
        data-aos="fade-down"
      >
        <div>
          <h1 class="text-4xl font-extrabold tracking-tight text-base-content">
            {{ i18n.header.title }}
          </h1>
          <p class="text-base-content/60 font-medium mt-1">
            {{ i18n.header.subtitle }}
          </p>
        </div>
        <div
          class="flex items-center gap-3 bg-base-100 p-2 rounded-2xl shadow-sm border border-base-200"
        >
          <div class="hidden md:block px-4 text-right">
            <p class="text-sm font-bold">{{ i18n.user.role }}</p>
            <p
              class="text-xs text-base-content/50 uppercase tracking-widest font-bold"
            >
              {{ i18n.user.department }}
            </p>
          </div>
          <div class="dropdown dropdown-end">
            <div
              tabindex="0"
              role="button"
              class="btn btn-ghost btn-circle avatar border-2 border-primary/20 p-0.5"
            >
              <div class="w-10 rounded-full">
                <img
                  alt="Admin Profile"
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                />
              </div>
            </div>
            <ul
              tabindex="0"
              class="mt-3 z-[1] p-2 shadow-xl menu menu-sm dropdown-content bg-base-100 rounded-2xl w-56 border border-base-200"
            >
              <li class="menu-title">{{ i18n.user.account }}</li>
              <li>
                <a><i class="fas fa-user-circle"></i> {{ i18n.user.profile }}</a>
              </li>
              <li>
                <a><i class="fas fa-shield-alt"></i> {{ i18n.user.security }}</a>
              </li>
              <div class="divider my-1"></div>
              <li>
                <a class="text-error font-bold"
                  ><i class="fas fa-sign-out-alt"></i> {{ i18n.user.logout }}</a
                >
              </li>
            </ul>
          </div>
        </div>
      </header>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div
          v-for="(stat, index) in stats"
          :key="stat.label"
          class="group hover:-translate-y-1 transition-all duration-300"
          data-aos="fade-right"
          :data-aos-delay="index * 100"
        >
          <div
            class="stat bg-base-100 shadow-sm border border-base-200 rounded-3xl p-6 relative overflow-hidden"
          >
            <div
              class="absolute -right-4 -bottom-4 opacity-[0.03] text-8xl transition-all group-hover:scale-110 group-hover:opacity-[0.05]"
            >
              <i :class="stat.icon"></i>
            </div>
            <div class="stat-figure" :class="stat.color">
              <div class="p-3 rounded-2xl" :class="stat.bg">
                <i :class="stat.icon" class="text-2xl"></i>
              </div>
            </div>
            <div class="stat-title font-bold text-base-content/50">
              {{ stat.label }}
            </div>
            <div
              class="stat-value text-3xl font-black mt-1"
              :class="stat.color"
            >
              {{ stat.value }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Integrate Sidebar Component -->
    <Sidebar />
  </div>
</template>

<style scoped>
/* High performance scrolling */
.drawer-content {
  scrollbar-width: thin;
  scrollbar-color: hsl(var(--p) / 0.1) transparent;
}

/* Animations */
.group:hover .stat-figure {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    opacity: 0.8;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  100% {
    opacity: 0.8;
    transform: scale(1);
  }
}

/* Custom progress bar shadows */
.progress::-webkit-progress-value {
  @apply shadow-lg;
}
</style>
