<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import { Icon } from "@iconify/vue";
import { useSchedules } from "@/composables/useSchedules";

const { schedules } = useSchedules();
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
            Academic Timeline
          </h1>
          <p class="text-base-content/40 font-medium">
            Dynamic scheduling and classroom occupancy monitoring.
          </p>
        </div>
        <div>
          <button
            class="btn btn-primary rounded-xl px-6 font-bold gap-2 shadow-lg shadow-primary/20 capitalize"
          >
            <Icon icon="lucide:calendar-plus" class="text-sm" />
            Slot Allocation
          </button>
        </div>
      </header>

      <!-- Schedules Table -->
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
                <th class="pl-12 py-8">Class</th>
                <th class="py-8">Day</th>
                <th class="py-8">Period / Duration</th>
                <th class="py-8">Instructor</th>
                <th class="py-8">Subject</th>
                <th class="pr-12 py-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="sch in schedules"
                :key="sch.id"
                class="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
              >
                <td class="pl-12 py-10 font-bold text-lg text-base-content/90">
                  {{ sch.class }}
                </td>
                <td class="py-10 font-bold text-lg text-base-content/90">
                  {{ sch.day }}
                </td>
                <td class="py-10">
                  <span
                    class="px-5 py-2.5 bg-primary/10 text-primary rounded-xl font-bold text-xs border border-primary/20"
                  >
                    {{ sch.time }}
                  </span>
                </td>
                <td class="py-10 text-lg font-medium text-base-content/70">
                  {{ sch.teacher }}
                </td>
                <td class="py-10 font-bold text-lg text-[#6366f1]">
                  {{ sch.subject }}
                </td>
                <td class="pr-12 py-10 text-right">
                  <div
                    class="flex justify-end opacity-40 hover:opacity-100 transition-opacity"
                  >
                    <router-link
                      to="/schedules/edit"
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

body {
  background-color: #020617;
}
</style>
