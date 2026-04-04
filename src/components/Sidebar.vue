<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import { useAuth } from "@/composables/useAuth";
import { useRouter, useRoute } from "vue-router";
import { useDashboardStore } from "@/stores/useDashboardStore";
import { systemService, MenuSection } from "@/services/systemService";

const dashboardStore = useDashboardStore();
const { logout } = useAuth();
const router = useRouter();
const route = useRoute();

const menuSections = ref<MenuSection[]>([]);

onMounted(async () => {
  try {
    menuSections.value = await systemService.getMenu();
  } catch (error) {
    console.error("Failed to load menu:", error);
  }
});

const i18n = computed(() => {
  const isId = dashboardStore.locale === 'id';
  return {
    brand: isId ? "Manajemen Sekolah" : "School Management",
    version: "V3",
    logout: isId ? "Keluar" : "Logout",
    menus: {
      system: isId ? "Sistem & Preferensi" : "System & Preferences",
    },
    items: {
      settings: isId ? "Pengaturan" : "Settings",
    },
  };
});

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
        <div>
          <span class="text-2xl font-black tracking-tight"
            >{{ i18n.brand
            }}<span class="text-primary"> {{ i18n.version }}</span></span
          >
        </div>
      </li>

      <!-- Dynamic Menu Sections -->
      <template v-for="section in menuSections" :key="section.section">
        <li
          class="menu-title uppercase text-xs font-bold tracking-widest text-base-content/40 mt-6 first:mt-2"
        >
          {{ section.section }}
        </li>
        <li v-for="item in section.items" :key="item.path">
          <router-link
            :to="item.path"
            class="flex items-center gap-3 py-3"
            :class="{
              'active bg-primary/10 text-primary font-bold': isActive(item.path),
            }"
          >
            <Icon :icon="item.icon" class="w-5 h-5" />
            <span>{{ item.name }}</span>
          </router-link>
        </li>
      </template>

      <!-- Static Settings System section disini -->
      <li
        class="menu-title uppercase text-xs font-bold tracking-widest text-base-content/40 mt-6"
      >
        {{ i18n.menus.system }}
      </li>
      <li>
        <router-link
          to="/settings"
          class="flex items-center gap-3 py-3"
          :class="{
            'active bg-primary/10 text-primary font-bold':
              isActive('/settings'),
          }"
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
</style>
