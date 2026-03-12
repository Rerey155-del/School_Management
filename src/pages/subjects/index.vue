<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import { Icon } from "@iconify/vue";
import { useSubjectStore } from "@/stores/useSubjectStore";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const store = useSubjectStore();
const router = useRouter();

onMounted(() => {
  store.fetchList();
});

const openAddForm = () => {
  router.push('/subjects/add');
};

const openEditForm = (id: number | string) => {
  router.push(`/subjects/edit/${id}`);
};

const isStatusActive = (status: string | undefined) => {
  if (!status) return false;
  return status.toLowerCase() === 'active' || status.toLowerCase() === 'aktif';
};

const handleStatusToggle = async (id: number | string, currentStatus: string | undefined) => {
  const newStatus = isStatusActive(currentStatus) ? 'Non-Active' : 'Active';
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
    title: "Academic Subjects",
    subtitle: "Curriculum management for all grades and specialization."
  },
  actions: {
    search: "Search by name...",
    add: "Define New Subject",
    back: "Back to List"
  },
  table: {
    id: "ID",
    name: "Subject Name",
    code: "Academic Code",
    metadata: "Metadata",
    status: "Status",
    actions: "Actions",
    noResults: "No results found for"
  },
  pagination: {
    showing: "Showing",
    of: "of",
    subjects: "Subjects",
    page: "Page"
  }
};

// Search and Pagination Logic
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = 10;

const filteredSubjects = computed(() => {
  return store.items.filter((s) =>
    s.subject_name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const totalPages = computed(() =>
  Math.ceil(filteredSubjects.value.length / itemsPerPage)
);

const paginatedSubjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredSubjects.value.slice(start, end);
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
      <div class="flex items-center justify-between lg:hidden mb-6 bg-base-100 p-4 rounded-2xl shadow-sm">
        <label for="my-drawer-2" class="btn btn-ghost btn-circle drawer-button">
          <Icon icon="lucide:menu" class="text-xl" />
        </label>
        <span class="text-xl font-bold tracking-tight">{{ i18n.brand }}<span class="text-primary">{{ i18n.version }}</span></span>
      </div>

      <!-- Header Section -->
      <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10" data-aos="fade-down">
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
            <Icon icon="lucide:search" class="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/20 group-focus-within:text-primary transition-colors" />
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
            <Icon icon="lucide:plus" class="text-sm" />
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
              <tr class="text-base-content/20 font-bold uppercase tracking-widest text-[10px] border-b border-base-content/5 bg-base-content/[0.02]">
                <th class="pl-12 py-6 w-20 text-center">{{ i18n.table.id }}</th>
                <th class="py-6">{{ i18n.table.name }}</th>
                <th class="py-6">{{ i18n.table.code }}</th>
                <th class="pr-12 py-6 text-right">{{ i18n.table.actions }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="sub in paginatedSubjects"
                :key="sub.id"
                class="border-b border-base-content/5 last:border-0 hover:bg-base-content/[0.02] transition-colors"
              >
                <td class="pl-12 py-10 font-bold text-base-content/20 text-center">
                  #{{ sub.id }}
                </td>
                <td class="py-10 font-bold text-lg text-primary">
                  {{ sub.subject_name }}
                </td>
                <td class="py-10 font-bold text-lg text-base-content/40 font-mono tracking-tighter">
                  {{ sub.academic_code }}
                </td>
                <td class="pr-12 py-10 text-right">
                  <div class="flex justify-end items-center gap-3">
                    <button
                      @click="() => openEditForm(sub.id || 0)"
                      class="btn btn-ghost btn-sm btn-circle text-base-content opacity-40 hover:opacity-100 transition-opacity"
                      title="Edit Subject"
                    >
                      <Icon icon="lucide:edit-3" class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="paginatedSubjects.length === 0">
                <td colspan="4" class="py-20 text-center text-base-content/20 font-bold italic">
                  {{ i18n.table.noResults }} "{{ searchQuery }}"
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination Controls -->
        <div v-if="!store.loadingList && store.items.length > 0" class="p-6 border-t border-base-content/5 flex items-center justify-between bg-base-content/5">
          <span class="text-base-content/20 text-sm font-bold">
            {{ i18n.pagination.showing }} {{ paginatedSubjects.length }} {{ i18n.pagination.of }}
            {{ filteredSubjects.length }} {{ i18n.pagination.subjects }}
          </span>
          <div class="join bg-base-200/50 rounded-xl border border-base-content/5">
            <button @click="prevPage" :disabled="currentPage === 1" class="btn btn-ghost join-item btn-sm text-base-content/40 disabled:opacity-10">
              <Icon icon="lucide:chevron-left" />
            </button>
            <button class="btn btn-ghost join-item btn-sm text-primary font-black px-4">
              {{ i18n.pagination.page }} {{ currentPage }}
            </button>
            <button @click="nextPage" :disabled="currentPage >= totalPages" class="btn btn-ghost join-item btn-sm text-base-content/40 disabled:opacity-10">
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
