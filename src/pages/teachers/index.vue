<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import { Icon } from "@iconify/vue";
import { useTeacherStore } from "@/stores/useTeacherStore";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const store = useTeacherStore();
const router = useRouter();

onMounted(() => {
  store.fetchList();
});

const openAddForm = () => {
  router.push('/teachers/add');
};

const openEditForm = (id: number | string) => {
  router.push(`/teachers/edit/${id}`);
};

const isStatusActive = (status: string | undefined) => {
  if (!status) return false;
  return status.toLowerCase() === 'active' || status.toLowerCase() === 'aktif';
};

const handleStatusToggle = async (id: number | string, currentStatus: string) => {
  const newStatus = isStatusActive(currentStatus) ? 'Non-Aktif' : 'Active';
  try {
    await store.toggleItemStatus(id, 'status', newStatus);
  } catch (err: any) {
    alert('Failed to toggle status: ' + (err.message || ''));
  }
};

const i18n = {
  brand: "SCHOOL",
  version: "V3",
  header: {
    title: "Faculty Directory",
    subtitle: "Professional profiles of administrative and teaching staff."
  },
  actions: {
    search: "Search by name...",
    add: "Add New Teacher"
  },
  table: {
    identity: "Teacher Identity",
    idNumber: "NIP / NIK",
    email: "Institutional Email",
    department: "Department",
    status: "Status",
    actions: "Actions",
    noResults: "No results found for"
  },
  pagination: {
    showing: "Showing",
    of: "of",
    staff: "Staff",
    page: "Page"
  }
};

// Search and Pagination Logic
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = 10;

const filteredTeachers = computed(() => {
  return store.items.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const totalPages = computed(() =>
  Math.ceil(filteredTeachers.value.length / itemsPerPage)
);

const paginatedTeachers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredTeachers.value.slice(start, end);
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
          >{{ i18n.brand }}<span class="text-primary">{{ i18n.version }}</span></span
        >
      </div>

      <!-- Header Section -->
      <header
        class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10"
        data-aos="fade-down"
      >
        <div>
          <h1 class="text-4xl font-extrabold tracking-tight text-base-content mb-2">
            {{ i18n.header.title }}
          </h1>
          <p class="text-base-content/40 font-medium">
            {{ i18n.header.subtitle }}
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
              :placeholder="i18n.actions.search"
              class="input bg-base-100 border-base-content/5 rounded-xl pl-12 w-64 focus:border-primary/50 text-base-content font-medium"
            />
          </div>
          <button
            @click="openAddForm"
            class="btn btn-primary rounded-xl px-6 font-bold gap-2 shadow-lg shadow-primary/20 capitalize"
          >
            <Icon icon="lucide:user-plus" class="text-sm" />
            {{ i18n.actions.add }}
          </button>
        </div>
      </header>

      <!-- Main Content Area -->
      <div
        class="bg-base-100 backdrop-blur-xl shadow-2xl border border-base-content/5 rounded-[2.5rem] overflow-hidden flex flex-col"
        data-aos="fade-right"
        data-aos-delay="200"
      >
        <div v-if="store.loadingList" class="p-10 flex justify-center">
          <span class="loading loading-spinner text-primary loading-lg"></span>
        </div>
        <div v-else class="overflow-x-auto">
          <table class="table table-lg w-full">
            <thead>
              <tr
                class="text-base-content/30 font-bold uppercase tracking-widest text-[10px] border-b border-base-content/5"
              >
                <th class="pl-12 py-8">{{ i18n.table.identity }}</th>
                <th class="py-8">{{ i18n.table.idNumber }}</th>
                <th class="py-8">{{ i18n.table.email }}</th>
                <th class="py-8 text-center">{{ i18n.table.department }}</th>
                <th class="py-8 text-center">{{ i18n.table.status }}</th>
                <th class="pr-12 py-8 text-right">{{ i18n.table.actions }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="teacher in paginatedTeachers"
                :key="teacher.id"
                class="border-b border-base-content/5 last:border-0 hover:bg-base-content/[0.02] transition-colors"
              >
                <td class="pl-12 py-10">
                  <div class="flex items-center gap-4">
                    <div class="avatar placeholder">
                      <div
                        class="bg-primary/10 text-primary font-black rounded-xl w-10 shadow-sm border border-primary/20 uppercase"
                      >
                        <span>{{ teacher.name[0] }}</span>
                      </div>
                    </div>
                    <span class="font-bold text-lg text-base-content/90">{{
                      teacher.name
                    }}</span>
                  </div>
                </td>
                <td
                  class="py-10 font-bold text-lg text-base-content/40 font-mono tracking-tighter"
                >
                  {{ teacher.nip }}
                </td>
                <td class="py-10 font-medium text-lg text-base-content/70">
                  {{ teacher.email }}
                </td>
                <td class="py-10 text-center">
                  <span
                    class="px-5 py-2.5 bg-base-content/5 text-base-content/40 rounded-xl font-bold text-xs border border-base-content/5"
                    >{{ teacher.department }}</span
                  >
                </td>
                <td class="py-10 text-center">
                  <span
                    :class="`badge badge-sm font-black uppercase text-[10px] p-2 h-auto ${
                      teacher.status === 'Active'
                        ? 'badge-success shadow-lg shadow-success/20'
                        : 'badge-ghost opacity-40'
                    }`"
                  >
                    {{ teacher.status }}
                  </span>
                </td>
                <td class="pr-12 py-10 text-right">
                  <div class="flex justify-end items-center gap-3">
                    <button
                      @click="() => openEditForm(teacher.id)"
                      class="btn btn-ghost btn-sm btn-circle text-base-content opacity-40 hover:opacity-100 transition-opacity"
                      title="Edit Teacher"
                    >
                      <Icon icon="lucide:edit-3" class="w-4 h-4" />
                    </button>
                    <!-- Status Toggle Switch -->
                    <input 
                      type="checkbox" 
                      class="toggle toggle-sm toggle-success" 
                      :checked="isStatusActive(teacher.status)" 
                      @change="handleStatusToggle(teacher.id, teacher.status)"
                      title="Toggle Status"
                    />
                  </div>
                </td>
              </tr>
              <!-- Empty State -->
              <tr v-if="paginatedTeachers.length === 0">
                <td
                  colspan="6"
                  class="py-20 text-center text-base-content/20 font-bold italic"
                >
                  {{ i18n.table.noResults }} "{{ searchQuery }}"
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination Controls -->
        <div v-if="!store.loadingList && store.items.length > 0"
          class="p-6 border-t border-base-content/5 flex items-center justify-between bg-base-content/5"
        >
          <span class="text-base-content/20 text-sm font-bold"
            >{{ i18n.pagination.showing }} {{ paginatedTeachers.length }} {{ i18n.pagination.of }}
            {{ filteredTeachers.length }} {{ i18n.pagination.staff }}</span
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
              class="btn btn-ghost join-item btn-sm text-primary font-black px-4"
            >
              {{ i18n.pagination.page }} {{ currentPage }}
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
