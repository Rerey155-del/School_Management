<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useAuth } from "@/composables/useAuth";
import { useRouter, useRoute } from "vue-router";
import { computed } from "vue";

const { logout } = useAuth();
const router = useRouter();
const route = useRoute();

const i18n = {
  brand: "SCHOOL",
  version: "V3",
  logout: "Logout",
  menus: {
    main: "Main Menu",
    academic: "Academic Center",
    system: "System & Preferences"
  },
  items: {
    dashboard: "Dashboard",
    teachers: "Teachers",
    students: "Students",
    subjects: "Subjects",
    classes: "Classes",
    schedules: "Schedules",
    settings: "Settings"
  }
};

const menuItems = [
  { name: i18n.items.dashboard, path: "/", icon: "lucide:layout-dashboard" },
  { name: i18n.items.teachers, path: "/teachers", icon: "lucide:users" },
  { name: i18n.items.students, path: "/students", icon: "lucide:graduation-cap" },
  { name: i18n.items.subjects, path: "/subjects", icon: "lucide:book-open" },
  { name: i18n.items.classes, path: "/classes", icon: "lucide:school" },
  { name: i18n.items.schedules, path: "/schedules", icon: "lucide:calendar" },
];

const isActive = (path: string) => {
  if (path === "/") return route.path === "/";
  return route.path.startsWith(path);
};

const handleLogout = () => {
  logout();
  router.push("/login");
};
</script>

<template>
  <div class="drawer-side z-50">
    <label
      for="my-drawer-2"
      aria-label="close sidebar"
      class="drawer-overlay"
    ></label>
    <ul
      class="menu p-4 w-72 min-h-full bg-base-100 text-base-content gap-2 border-r border-base-200"
    >
      <!-- Logo -->
      <li class="mb-6 px-4 py-2">
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 bg-primary text-primary-content flex items-center justify-center rounded-xl font-black text-xl shadow-lg shadow-primary/20"
          >
            S
          </div>
          <span class="text-2xl font-black tracking-tight"
            >{{ i18n.brand }}<span class="text-primary">{{ i18n.version }}</span></span
          >
        </div>
      </li>

      <li
        class="menu-title uppercase text-xs font-bold tracking-widest text-base-content/40 mt-2"
      >
        {{ i18n.menus.main }}
      </li>
      <li>
        <router-link
          to="/"
          class="flex items-center gap-3 py-3"
          :class="{ 'active bg-primary/10 text-primary font-bold': isActive('/') }"
        >
          <Icon icon="lucide:layout-dashboard" class="w-5 h-5" />
          <span>{{ i18n.items.dashboard }}</span>
        </router-link>
      </li>

      <li
        class="menu-title uppercase text-xs font-bold tracking-widest text-base-content/40 mt-6"
      >
        {{ i18n.menus.academic }}
      </li>
      <li v-for="item in menuItems.slice(1)" :key="item.path">
        <router-link
          :to="item.path"
          class="flex items-center gap-3 py-3"
          :class="{ 'active bg-primary/10 text-primary font-bold': isActive(item.path) }"
        >
          <Icon :icon="item.icon" class="w-5 h-5" />
          <span>{{ item.name }}</span>
        </router-link>
      </li>

      <li
        class="menu-title uppercase text-xs font-bold tracking-widest text-base-content/40 mt-6"
      >
        {{ i18n.menus.system }}
      </li>
      <li>
        <router-link
          to="/settings"
          class="flex items-center gap-3 py-3"
          :class="{ 'active bg-primary/10 text-primary font-bold': isActive('/settings') }"
        >
          <Icon icon="lucide:settings" class="w-5 h-5" />
          <span>{{ i18n.items.settings }}</span>
        </router-link>
      </li>

      <li class="mt-auto pt-6 border-t border-base-200">
        <button
          @click="handleLogout"
          class="btn btn-ghost text-error flex items-center justify-start gap-3 py-3 hover:bg-error/10 w-full px-4 rounded-xl"
        >
          <Icon icon="lucide:log-out" class="w-5 h-5" />
          <span>{{ i18n.logout }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.active {
  @apply bg-primary/10 text-primary font-bold;
}
</style>
