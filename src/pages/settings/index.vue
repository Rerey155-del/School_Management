<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import { useSettings } from "@/composables/useSettings";
const { profile, preferences, security, updateProfile, changePassword } = useSettings();

const i18n = {
  brand: "SCHOOL",
  version: "V3",
  header: {
    title: "Settings",
    subtitle: "Manage your account settings and application preferences."
  },
  profile: {
    title: "Admin Profile",
    username: "Username",
    password: "Password",
    update: "Update Profile"
  },
  preferences: {
    title: "App Preferences",
    darkMode: "Dark Mode",
    darkModeDesc: "Turn on dark theme for the dashboard."
  },
  security: {
    title: "Security Settings",
    lastChange: "Last changed",
    change: "Change Password"
  }
};
</script>

<template>
  <div class="drawer lg:drawer-open bg-base-200 min-h-screen font-sans">
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
      <header class="mb-10" data-aos="fade-down">
        <h1 class="text-4xl font-extrabold tracking-tight text-base-content mb-2">
          {{ i18n.header.title }}
        </h1>
        <p class="text-base-content/40 font-medium tracking-tight">
          {{ i18n.header.subtitle }}
        </p>
      </header>

      <div class="space-y-8 max-w-4xl">
        <!-- Admin Profile -->
        <section
          class="bg-base-100 backdrop-blur-xl shadow-2xl border border-base-content/5 rounded-[2.5rem] p-8 lg:p-12"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h2 class="text-xl font-bold text-base-content mb-8">{{ i18n.profile.title }}</h2>

          <div class="space-y-6">
            <div class="form-control w-full">
              <label class="label mb-1">
                <span
                  class="label-text text-base-content/40 font-bold uppercase text-[10px] tracking-widest"
                  >{{ i18n.profile.username }}</span
                >
              </label>
              <input
                type="text"
                v-model="profile.username"
                class="input bg-base-200 border-base-content/5 rounded-xl h-14 font-bold text-base-content/90 focus:border-primary/50"
              />
            </div>

            <div class="form-control w-full">
              <label class="label mb-1">
                <span
                  class="label-text text-base-content/40 font-bold uppercase text-[10px] tracking-widest"
                  >{{ i18n.profile.password }}</span
                >
              </label>
              <input
                type="password"
                v-model="profile.password"
                class="input bg-base-200 border-base-content/5 rounded-xl h-14 font-bold text-base-content/90 focus:border-primary/50"
              />
            </div>

            <div class="pt-4">
              <button
                @click="updateProfile"
                class="btn btn-primary rounded-xl px-8 font-bold shadow-lg shadow-primary/20 capitalize"
              >
                {{ i18n.profile.update }}
              </button>
            </div>
          </div>
        </section>

        <!-- App Preferences -->
        <section
          class="bg-base-100 backdrop-blur-xl shadow-2xl border border-base-content/5 rounded-[2.5rem] p-8 lg:p-12"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <h2 class="text-xl font-bold text-base-content mb-8">{{ i18n.preferences.title }}</h2>

          <div class="flex items-center justify-between">
            <div>
              <p class="font-bold text-base-content/90">{{ i18n.preferences.darkMode }}</p>
              <p class="text-sm text-base-content/30 font-medium">
                {{ i18n.preferences.darkModeDesc }}
              </p>
            </div>
            <input
              type="checkbox"
              v-model="preferences.darkMode"
              class="toggle toggle-primary scale-125"
            />
          </div>
        </section>

        <!-- Security Settings -->
        <section
          class="bg-base-100 backdrop-blur-xl shadow-2xl border border-base-content/5 rounded-[2.5rem] p-8 lg:p-12"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <h2 class="text-xl font-bold text-base-content mb-8">{{ i18n.security.title }}</h2>

          <p class="text-sm text-base-content/30 font-medium mb-6">
            {{ i18n.security.lastChange }} {{ security.lastPasswordChange }}.
          </p>

          <button
            @click="changePassword"
            class="btn btn-outline border-base-content/10 hover:bg-base-content/5 text-base-content/90 rounded-xl px-8 font-bold capitalize"
          >
            {{ i18n.security.change }}
          </button>
        </section>
      </div>
    </div>

    <!-- Sidebar Component -->
    <Sidebar />
  </div>
</template>

<style scoped>
.drawer-content {
  scrollbar-width: thin;
  scrollbar-color: hsl(var(--p) / 0.1) transparent;
}
</style>
