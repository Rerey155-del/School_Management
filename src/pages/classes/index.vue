<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import { Icon } from "@iconify/vue";
import { useClassStore } from "@/stores/useClassStore";
import { ref, computed, onMounted } from "vue";

const store = useClassStore();

onMounted(() => {
  store.fetchList();
});

const currentView = ref<"list" | "form">("list");
const isEditMode = ref(false);
const isSubmitting = ref(false);

const form = ref({
  id: "" as string | number,
  class_designation: "",
  room_id: "",
  utilization: "",
  status: "Active",
});

const openAddForm = () => {
  isEditMode.value = false;
  form.value = {
    id: "",
    class_designation: "",
    room_id: "",
    utilization: "",
    status: "Active",
  };
  currentView.value = "form";
};

const openEditForm = async (id: number | string) => {
  isEditMode.value = true;
  currentView.value = "form";
  const detail = await store.fetchDetail(id);
  if (detail) {
    form.value = {
      id: detail.id as string | number,
      class_designation: detail.class_designation,
      room_id: detail.room_id,
      utilization: detail.utilization,
      status: detail.status || "Active",
    };
  }
};

const goBack = () => {
  currentView.value = "list";
};

const handleSubmit = async () => {
  try {
    isSubmitting.value = true;

    if (isEditMode.value) {
      const { id, ...putPayload } = form.value;
      await store.updateItem(id, putPayload);
    } else {
      const { id, ...postPayload } = form.value;
      await store.createItem(postPayload);
    }

    await store.fetchList();
    goBack();
  } catch (error: any) {
    alert(error.message || "An error occurred");
  } finally {
    isSubmitting.value = false;
  }
};

const isStatusActive = (status: string | undefined) => {
  if (!status) return false;
  return status.toLowerCase() === "active" || status.toLowerCase() === "aktif";
};

const handleStatusToggle = async (
  id: number | string,
  currentStatus: string | undefined
) => {
  const newStatus = isStatusActive(currentStatus) ? "Non-Aktif" : "Active";
  try {
    await store.toggleItemStatus(id, "status", newStatus);
  } catch (err: any) {
    alert("Failed to toggle status: " + (err.message || ""));
  }
};

const i18n = {
  brand: "SCHOOL",
  version: "V3",
  header: {
    title: "Classrooms",
    subtitle: "Structural organization of students and capacity control.",
  },
  actions: {
    search: "Search classes...",
    add: "Initialize Room",
    back: "Back to List",
  },
  table: {
    designation: "Class Designation",
    roomId: "Room ID",
    utilization: "Utilization",
    status: "Status",
    actions: "Actions",
    noResults: "No results found for",
  },
  pagination: {
    showing: "Showing",
    of: "of",
    classes: "Classes",
    page: "Page",
  },
};

// Search and Pagination Logic
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = 10;

const filteredClasses = computed(() => {
  return store.items.filter((c) =>
    c.class_designation.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const totalPages = computed(() =>
  Math.ceil(filteredClasses.value.length / itemsPerPage)
);

const paginatedClasses = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredClasses.value.slice(start, end);
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
          >{{ i18n.brand
          }}<span class="text-primary">{{ i18n.version }}</span></span
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
          <h1
            class="text-4xl font-extrabold tracking-tight text-base-content mb-2"
          >
            {{
              currentView === "list"
                ? i18n.header.title
                : isEditMode
                ? "Edit Classroom"
                : "Initialize Room"
            }}
          </h1>
          <p class="text-base-content/40 font-medium">
            {{
              currentView === "list"
                ? i18n.header.subtitle
                : "Provide classroom utilization parameters."
            }}
          </p>
        </div>
        <div class="flex items-center gap-3">
          <template v-if="currentView === 'list'">
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
              <Icon icon="lucide:plus" class="text-sm" />
              {{ i18n.actions.add }}
            </button>
          </template>
          <template v-else>
            <button
              @click="goBack"
              class="btn btn-ghost rounded-xl px-6 font-bold gap-2 capitalize"
            >
              <Icon icon="lucide:arrow-left" class="text-sm" />
              {{ i18n.actions.back }}
            </button>
          </template>
        </div>
      </header>

      <!-- Main Content Area -->
      <div
        v-if="currentView === 'list'"
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
                <th class="pl-12 py-8">{{ i18n.table.designation }}</th>
                <th class="py-8">{{ i18n.table.roomId }}</th>
                <th class="py-8">{{ i18n.table.utilization }}</th>

                <th class="pr-12 py-8 text-right">{{ i18n.table.actions }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="cls in paginatedClasses"
                :key="cls.id"
                class="border-b border-base-content/5 last:border-0 hover:bg-base-content/[0.02] transition-colors"
              >
                <td class="pl-12 py-10 font-bold text-lg text-base-content/90">
                  {{ cls.class_designation }}
                </td>
                <td class="py-10 font-medium text-lg text-base-content/40">
                  {{ cls.room_id }}
                </td>
                <td class="py-10">
                  <span class="font-bold text-lg text-base-content/90">{{
                    cls.utilization
                  }}</span>
                </td>

                <td class="pr-12 py-10 text-right">
                  <div class="flex justify-end items-center gap-3">
                    <button
                      @click="() => openEditForm(cls.id!)"
                      class="btn btn-ghost btn-sm btn-circle text-base-content opacity-40 hover:opacity-100 transition-opacity"
                      title="Edit Class"
                    >
                      <Icon icon="lucide:edit-3" class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="paginatedClasses.length === 0">
                <td
                  colspan="5"
                  class="py-20 text-center text-base-content/20 font-bold italic"
                >
                  {{ i18n.table.noResults }} "{{ searchQuery }}"
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination Controls -->
        <div
          v-if="!store.loadingList && store.items.length > 0"
          class="p-6 border-t border-base-content/5 flex items-center justify-between bg-base-content/5"
        >
          <span class="text-base-content/20 text-sm font-bold">
            {{ i18n.pagination.showing }} {{ paginatedClasses.length }}
            {{ i18n.pagination.of }} {{ filteredClasses.length }}
            {{ i18n.pagination.classes }}
          </span>
          <div
            class="join bg-base-200/50 rounded-xl border border-base-content/5"
          >
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

      <!-- In-Page Form View -->
      <div
        v-else-if="currentView === 'form'"
        class="bg-base-100 backdrop-blur-xl shadow-2xl border border-base-content/5 rounded-[2.5rem] p-8 max-w-3xl"
        data-aos="fade-up"
      >
        <!-- Skeleton Loader -->
        <div v-if="store.loadingDetail" class="animate-pulse space-y-6">
          <div class="h-10 bg-base-200 rounded w-1/4"></div>
          <div class="h-12 bg-base-200 rounded-xl w-full"></div>
          <div class="h-12 bg-base-200 rounded-xl w-full"></div>
          <div class="h-12 bg-base-200 rounded-xl w-full"></div>
          <div class="h-12 bg-base-200 rounded-xl w-1/2"></div>
          <div class="h-12 bg-base-200 rounded-xl w-full mt-8"></div>
        </div>

        <form v-else @submit.prevent="handleSubmit" class="flex flex-col gap-5">
          <div class="form-control">
            <label class="label"
              ><span class="label-text font-bold"
                >Class Designation</span
              ></label
            >
            <input
              v-model="form.class_designation"
              type="text"
              class="input input-bordered focus:border-primary rounded-xl"
              required
              placeholder="Grade 10A"
            />
          </div>
          <div class="form-control">
            <label class="label"
              ><span class="label-text font-bold">Room ID</span></label
            >
            <input
              v-model="form.room_id"
              type="text"
              class="input input-bordered focus:border-primary rounded-xl"
              required
              placeholder="RM-101"
            />
          </div>
          <div class="form-control">
            <label class="label"
              ><span class="label-text font-bold"
                >Utilization (current/max)</span
              ></label
            >
            <input
              v-model="form.utilization"
              type="text"
              class="input input-bordered focus:border-primary rounded-xl"
              required
              placeholder="30/40"
            />
          </div>
          <div class="form-control">
            <label class="label"
              ><span class="label-text font-bold">Status</span></label
            >
          </div>
          <div class="form-actions mt-6 flex justify-end gap-3">
            <button
              type="button"
              class="btn btn-ghost rounded-xl font-bold"
              @click="goBack"
              :disabled="isSubmitting"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-primary rounded-xl font-bold px-8 shadow-lg shadow-primary/20"
              :disabled="isSubmitting"
            >
              <span
                v-if="isSubmitting"
                class="loading loading-spinner loading-sm"
              ></span>
              {{ isEditMode ? "Save Updates" : "Initialize Classroom" }}
            </button>
          </div>
        </form>
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
