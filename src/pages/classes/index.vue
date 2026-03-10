<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import { Icon } from "@iconify/vue";
import { useClasses } from "@/composables/useClasses";

const { classes } = useClasses();
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
          <Icon icon="lucide:menu" class="text-xl" />
        </label>
        <span class="text-xl font-bold tracking-tight"
          >SCHOOL<span class="text-primary">V3</span></span
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
          <h1 class="text-4xl font-extrabold tracking-tight text-base-content mb-2">
            Classrooms
          </h1>
          <p class="text-base-content/40 font-medium">
            Structural organization of students and capacity control.
          </p>
        </div>
        <div>
          <button
            class="btn btn-primary rounded-xl px-6 font-bold gap-2 shadow-lg shadow-primary/20 capitalize"
          >
            <Icon icon="lucide:plus" class="text-sm" />
            Initialize Room
          </button>
        </div>
      </header>

      <!-- Classrooms Table -->
      <div
        class="bg-base-100 backdrop-blur-xl shadow-2xl border border-base-content/5 rounded-[2.5rem] overflow-hidden"
        data-aos="fade-right"
        data-aos-delay="200"
      >
        <div class="overflow-x-auto">
          <table class="table table-lg w-full">
            <thead>
              <tr
                class="text-base-content/30 font-bold uppercase tracking-widest text-[10px] border-b border-white/5"
              >
                <th class="pl-12 py-8">Class Designation</th>
                <th class="py-8">Room ID</th>
                <th class="py-8">Utilization</th>
                <th class="pr-12 py-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="cls in classes"
                :key="cls.id"
                class="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
              >
                <td class="pl-12 py-10 font-bold text-lg text-base-content/90">
                  {{ cls.name }}
                </td>
                <td class="py-10 font-medium text-lg text-base-content/40">
                  {{ cls.roomId }}
                </td>
                <td class="py-10">
                  <div class="flex items-center gap-2">
                    <span class="font-bold text-lg text-base-content/90"
                      >{{ cls.currentStudents }} Orang</span
                    >
                  </div>
                </td>
                <td class="pr-12 py-10 text-right">
                  <div
                    class="flex justify-end opacity-40 hover:opacity-100 transition-opacity"
                  >
                    <router-link
                      to="/classes/edit"
                      class="btn btn-ghost btn-sm btn-circle text-base-content"
                    >
                      <Icon icon="lucide:edit-3" class="w-4 h-4" />
                    </router-link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Sidebar Component -->
    <Sidebar />
  </div>
</template>

<style scoped>
/* High performance scrolling */
.drawer-content {
  scrollbar-width: thin;
  scrollbar-color: hsl(var(--p) / 0.1) transparent;
}
</style>
