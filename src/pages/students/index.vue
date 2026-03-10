<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import { Icon } from "@iconify/vue";
import { useStudents } from "@/composables/useStudents";
import { ref, computed } from "vue";

const { students } = useStudents();

// Search and Pagination Logic
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = 5;

const filteredStudents = computed(() => {
  return students.value.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const totalPages = computed(() =>
  Math.ceil(filteredStudents.value.length / itemsPerPage)
);

const paginatedStudents = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredStudents.value.slice(start, end);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
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
          <Icon icon="lucide:menu" class="text-xl" />
        </label>
        <span class="text-xl font-bold tracking-tight"
          >SCHOOL<span class="text-primary">V3</span></span
        >
      </div>

      <!-- Header Section -->
      <header
        class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10"
        data-aos="fade-down"
      >
        <div>
          <h1 class="text-4xl font-extrabold tracking-tight text-base-content mb-2">
            Student Register
          </h1>
          <p class="text-base-content/40 font-medium">
            Complete database of enrolled students and their academic status.
          </p>
        </div>
        <div class="flex items-center gap-3">
          <!-- Search Bar -->
          <div class="relative group">
            <Icon
              icon="lucide:search"
              class="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/20 group-focus-within:text-primary transition-colors"
            />
            <input
              v-model="searchQuery"
              @input="currentPage = 1"
              type="text"
              placeholder="Search students..."
              class="input bg-base-100 border-base-content/5 rounded-xl pl-12 w-64 focus:border-primary/50 text-base-content font-medium"
            />
          </div>
          <button
            class="btn btn-secondary rounded-xl px-6 font-bold gap-2 shadow-lg shadow-secondary/20 capitalize"
          >
            <Icon icon="lucide:user-plus" class="text-sm" />
            Register Student
          </button>
        </div>
      </header>

      <!-- Students Table -->
      <div
        class="bg-base-100 backdrop-blur-xl shadow-2xl border border-base-content/5 rounded-[2.5rem] overflow-hidden flex flex-col"
        data-aos="fade-right"
        data-aos-delay="200"
      >
        <div class="overflow-x-auto">
          <table class="table table-lg w-full">
            <thead>
              <tr
                class="text-base-content/30 font-bold uppercase tracking-widest text-[10px] border-b border-white/5"
              >
                <th class="pl-12 py-8">Student Name</th>
                <th class="py-8">NIS</th>
                <th class="py-8">Class</th>
                <th class="py-8">Enrollment Status</th>
                <th class="pr-12 py-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="student in paginatedStudents"
                :key="student.id"
                class="border-b border-base-content/5 last:border-0 hover:bg-base-content/[0.02] transition-colors"
              >
                <td class="pl-12 py-10">
                  <div class="flex items-center gap-4">
                    <div class="avatar placeholder">
                      <div
                        class="bg-secondary/10 text-secondary font-black rounded-xl w-10 shadow-sm border border-secondary/20 uppercase"
                      >
                        <span>{{ student.name[0] }}</span>
                      </div>
                    </div>
                    <span class="font-bold text-lg text-base-content/90">{{
                      student.name
                    }}</span>
                  </div>
                </td>
                <td
                  class="py-10 font-bold text-lg text-base-content/40 font-mono tracking-tighter"
                >
                  {{ student.nis }}
                </td>
                <td class="py-10 text-center">
                  <span
                    class="px-5 py-2.5 bg-base-content/5 text-base-content/40 rounded-xl font-bold text-xs border border-base-content/5"
                    >{{ student.class_name }}</span
                  >
                </td>
                <td class="py-10">
                  <span
                    :class="`badge badge-sm font-black uppercase text-[10px] p-2 h-auto ${
                      student.enrollment_status === 'Active'
                        ? 'badge-success shadow-lg shadow-success/20'
                        : 'badge-ghost opacity-40'
                    }`"
                  >
                    {{ student.enrollment_status }}
                  </span>
                </td>
                <td class="pr-12 py-10 text-right">
                  <div
                    class="flex justify-end opacity-40 hover:opacity-100 transition-opacity"
                  >
                    <router-link
                      to="/students/edit"
                      class="btn btn-ghost btn-sm btn-circle text-base-content"
                    >
                      <Icon icon="lucide:edit-3" class="w-4 h-4" />
                    </router-link>
                  </div>
                </td>
              </tr>
              <tr v-if="paginatedStudents.length === 0">
                <td
                  colspan="6"
                  class="py-20 text-center text-base-content/20 font-bold italic"
                >
                  No results found for "{{ searchQuery }}"
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination Controls -->
        <div
          class="p-6 border-t border-base-content/5 flex items-center justify-between bg-base-content/5"
        >
          <span class="text-base-content/20 text-sm font-bold"
            >Showing {{ paginatedStudents.length }} of
            {{ filteredStudents.length }} Students</span
          >
          <div class="join bg-base-200/50 rounded-xl border border-base-content/5">
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="btn btn-ghost join-item btn-sm text-base-content/40 disabled:opacity-10"
            >
              <Icon icon="lucide:chevron-left" />
            </button>
            <button
              class="btn btn-ghost join-item btn-sm text-secondary font-black px-4"
            >
              Page {{ currentPage }}
            </button>
            <button
              @click="nextPage"
              :disabled="currentPage >= totalPages"
              class="btn btn-ghost join-item btn-sm text-base-content/40 disabled:opacity-10"
            >
              <Icon icon="lucide:chevron-right" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <Sidebar />
  </div>
</template>

<style scoped>
.drawer-content {
  scrollbar-width: thin;
  scrollbar-color: hsl(var(--p) / 0.1) transparent;
}
</style>
