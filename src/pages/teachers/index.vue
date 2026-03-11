<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import { Icon } from "@iconify/vue";
import { useTeachers } from "@/composables/useTeachers";
import { ref, computed } from "vue";
import { teacherService, type CreateTeacherPayload } from "@/services/teacherService";
import { subjectService, type SubjectAutocompleteOption } from "@/services/subjectService";
import AutoComplete from "primevue/autocomplete";

const { teachers, updateTeacher } = useTeachers();

const isEditModalOpen = ref(false);
const editForm = ref({
  id: 0,
  name: "",
  nip: "",
  email: "",
  department: "",
  status: "Active"
});

const openEditModal = (teacher: any) => {
  editForm.value = { ...teacher };
  isEditModalOpen.value = true;
};

const handleUpdate = async () => {
  await updateTeacher(editForm.value.id, editForm.value);
  isEditModalOpen.value = false;
};

// --- Add Teacher Logic ---
const isAddModalOpen = ref(false);
const isSubmitting = ref(false);
const addForm = ref<CreateTeacherPayload>({
  name: "",
  nip: "",
  email: "",
  department: "",
  status: "Active"
});

// Autocomplete Logic
const filteredDepartments = ref<SubjectAutocompleteOption[]>([]);
const searchDepartment = async (event: any) => {
  const query = event.query;
  filteredDepartments.value = await subjectService.autocompleteSubjects(query);
};

const handleAddTeacher = async () => {
  try {
    isSubmitting.value = true;
    
    // Konversi object autocomplete ke string department atau ID relasi jika diperlukan
    const finalPayload: CreateTeacherPayload = {
      ...addForm.value,
      department: typeof addForm.value.department === 'object' 
          ? (addForm.value.department as any).name 
          : addForm.value.department
    };

    const newTeacherResponse = await teacherService.createTeacher(finalPayload);
    console.log("Teacher created successfully:", newTeacherResponse);
    
    // Idealnya update `teachers` global state disini jika API mengembalikan data insert utuh
    // teachers.value.push(newTeacherResponse.data);

    isAddModalOpen.value = false;
    // Reset Form
    addForm.value = { name: "", nip: "", email: "", department: "", status: "Active" };
  } catch (error: any) {
    alert(error.message);
  } finally {
    isSubmitting.value = false;
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
const itemsPerPage = 5;

const filteredTeachers = computed(() => {
  return teachers.value.filter((t) =>
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
            @click="isAddModalOpen = true"
            class="btn btn-primary rounded-xl px-6 font-bold gap-2 shadow-lg shadow-primary/20 capitalize"
          >
            <Icon icon="lucide:user-plus" class="text-sm" />
            {{ i18n.actions.add }}
          </button>
        </div>
      </header>

      <!-- Teachers Table -->
      <div
        class="bg-base-100 backdrop-blur-xl shadow-2xl border border-base-content/5 rounded-[2.5rem] overflow-hidden flex flex-col"
        data-aos="fade-right"
        data-aos-delay="200"
      >
        <div class="overflow-x-auto">
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
                  <div
                    class="flex justify-end opacity-40 hover:opacity-100 transition-opacity"
                  >
                    <button
                      @click="() => openEditModal(teacher)"
                      class="btn btn-ghost btn-sm btn-circle text-base-content"
                    >
                      <Icon icon="lucide:edit-3" class="w-4 h-4" />
                    </button>
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
        <div
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

    <!-- Add Modal -->
    <dialog v-if="isAddModalOpen" class="modal font-sans" :class="{ 'modal-open': isAddModalOpen }">
      <div class="modal-box rounded-[2rem] p-8 shadow-2xl bg-base-100 border border-base-content/5 overflow-visible">
        <h3 class="font-extrabold text-2xl mb-6">Add New Teacher</h3>
        <form @submit.prevent="handleAddTeacher" class="flex flex-col gap-4">
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">Name</span></label>
            <input v-model="addForm.name" type="text" class="input input-bordered focus:border-primary rounded-xl" required placeholder="John Doe" />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">NIP / NIK</span></label>
            <input v-model="addForm.nip" type="text" class="input input-bordered focus:border-primary rounded-xl" required placeholder="1987xxxxxxx" />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">Email</span></label>
            <input v-model="addForm.email" type="email" class="input input-bordered focus:border-primary rounded-xl" required placeholder="john.doe@school.edu" />
          </div>
          <div class="form-control flex flex-col pt-1">
            <label class="label"><span class="label-text font-bold">Department (Subject)</span></label>
            <AutoComplete 
              v-model="addForm.department" 
              :suggestions="filteredDepartments" 
              @complete="searchDepartment" 
              optionLabel="name" 
              placeholder="Search Subject (min. 3 chars)"
              :delay="300"
              class="w-full"
              inputClass="input input-bordered focus:border-primary rounded-xl w-full"
              panelClass="bg-base-100 border shadow-xl rounded-xl mt-1 z-50 text-sm menu p-2"
            />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">Status</span></label>
            <select v-model="addForm.status" class="select select-bordered focus:border-primary rounded-xl" required>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
              <option value="Non-Aktif">Non-Aktif</option>
            </select>
          </div>
          <div class="modal-action mt-6 gap-2">
            <button type="button" class="btn btn-ghost rounded-xl font-bold" @click="isAddModalOpen = false" :disabled="isSubmitting">Cancel</button>
            <button type="submit" class="btn btn-primary rounded-xl font-bold px-8 shadow-lg shadow-primary/20" :disabled="isSubmitting">
              <span v-if="isSubmitting" class="loading loading-spinner loading-sm"></span>
              Create Teacher
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" class="modal-backdrop bg-base-300/60 backdrop-blur-sm">
        <button @click="isAddModalOpen = false" :disabled="isSubmitting">close</button>
      </form>
    </dialog>

    <!-- Edit Modal -->
    <dialog v-if="isEditModalOpen" class="modal font-sans" :class="{ 'modal-open': isEditModalOpen }">
      <div class="modal-box rounded-[2rem] p-8 shadow-2xl bg-base-100 border border-base-content/5">
        <h3 class="font-extrabold text-2xl mb-6">Edit Teacher Data</h3>
        <form @submit.prevent="handleUpdate" class="flex flex-col gap-4">
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">Name</span></label>
            <input v-model="editForm.name" type="text" class="input input-bordered focus:border-primary rounded-xl" required />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">NIP / NIK</span></label>
            <input v-model="editForm.nip" type="text" class="input input-bordered focus:border-primary rounded-xl" required />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">Email</span></label>
            <input v-model="editForm.email" type="email" class="input input-bordered focus:border-primary rounded-xl" required />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">Department</span></label>
            <input v-model="editForm.department" type="text" class="input input-bordered focus:border-primary rounded-xl" required />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">Status</span></label>
            <select v-model="editForm.status" class="select select-bordered focus:border-primary rounded-xl" required>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
              <option value="Non-Aktif">Non-Aktif</option>
            </select>
          </div>
          <div class="modal-action mt-6 gap-2">
            <button type="button" class="btn btn-ghost rounded-xl font-bold" @click="isEditModalOpen = false">Cancel</button>
            <button type="submit" class="btn btn-primary rounded-xl font-bold px-8 shadow-lg shadow-primary/20">Save Updates</button>
          </div>
        </form>
      </div>
      <form method="dialog" class="modal-backdrop bg-base-300/60 backdrop-blur-sm">
        <button @click="isEditModalOpen = false">close</button>
      </form>
    </dialog>

    <Sidebar />
  </div>
</template>

<style scoped>
.drawer-content {
  scrollbar-width: thin;
  scrollbar-color: hsl(var(--p) / 0.1) transparent;
}
</style>
