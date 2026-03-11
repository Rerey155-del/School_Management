<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import { Icon } from "@iconify/vue";
import { useStudents } from "@/composables/useStudents";
import { ref, computed } from "vue";
import { studentService, type CreateStudentPayload } from "@/services/studentService";
import { classService, type ClassAutocompleteOption } from "@/services/classService";
import AutoComplete from "primevue/autocomplete";

const { students, updateStudent } = useStudents();

const isEditModalOpen = ref(false);
const editForm = ref({
  id: 0,
  name: "",
  nis: "",
  gender: "",
  class_name: "",
  enrollment_status: "Active"
});

const openEditModal = (student: any) => {
  editForm.value = { ...student };
  isEditModalOpen.value = true;
};

const handleUpdate = async () => {
  await updateStudent(editForm.value.id, editForm.value);
  isEditModalOpen.value = false;
};

// --- Add Student Logic ---
const isAddModalOpen = ref(false);
const isSubmitting = ref(false);
const addForm = ref<CreateStudentPayload>({
  name: "",
  nis: "",
  gender: "Male",
  class_name: "",
  enrollment_status: "Active"
});

// Autocomplete Logic
const filteredClasses = ref<ClassAutocompleteOption[]>([]);
const searchClass = async (event: any) => {
  const query = event.query;
  filteredClasses.value = await classService.autocompleteClasses(query);
};

const handleAddStudent = async () => {
  try {
    isSubmitting.value = true;
    
    // Konversi object autocomplete ke string class_name atau ID relasi jika diperlukan
    const finalPayload: CreateStudentPayload = {
      ...addForm.value,
      class_name: typeof addForm.value.class_name === 'object' 
          ? (addForm.value.class_name as any).name 
          : addForm.value.class_name
    };

    const newStudentResponse = await studentService.createStudent(finalPayload);
    console.log("Student created successfully:", newStudentResponse);

    isAddModalOpen.value = false;
    // Reset Form
    addForm.value = { name: "", nis: "", gender: "Male", class_name: "", enrollment_status: "Active" };
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
    title: "Student Register",
    subtitle: "Complete database of enrolled students and their academic status."
  },
  actions: {
    search: "Search students...",
    register: "Register Student"
  },
  table: {
    name: "Student Name",
    nis: "NIS",
    className: "Class",
    status: "Enrollment Status",
    actions: "Actions",
    noResults: "No results found for"
  },
  pagination: {
    showing: "Showing",
    of: "of",
    students: "Students",
    page: "Page"
  }
};

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
            class="btn btn-secondary rounded-xl px-6 font-bold gap-2 shadow-lg shadow-secondary/20 capitalize"
          >
            <Icon icon="lucide:user-plus" class="text-sm" />
            {{ i18n.actions.register }}
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
                class="text-base-content/30 font-bold uppercase tracking-widest text-[10px] border-b border-base-content/5"
              >
                <th class="pl-12 py-8">{{ i18n.table.name }}</th>
                <th class="py-8">{{ i18n.table.nis }}</th>
                <th class="py-8">{{ i18n.table.className }}</th>
                <th class="py-8">{{ i18n.table.status }}</th>
                <th class="pr-12 py-8 text-right">{{ i18n.table.actions }}</th>
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
                    <button
                      @click="() => openEditModal(student)"
                      class="btn btn-ghost btn-sm btn-circle text-base-content"
                    >
                      <Icon icon="lucide:edit-3" class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="paginatedStudents.length === 0">
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
            >{{ i18n.pagination.showing }} {{ paginatedStudents.length }} {{ i18n.pagination.of }}
            {{ filteredStudents.length }} {{ i18n.pagination.students }}</span
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
        <h3 class="font-extrabold text-2xl mb-6">Register New Student</h3>
        <form @submit.prevent="handleAddStudent" class="flex flex-col gap-4">
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">Name</span></label>
            <input v-model="addForm.name" type="text" class="input input-bordered focus:border-secondary rounded-xl" required placeholder="Jane Doe" />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">NIS</span></label>
            <input v-model="addForm.nis" type="text" class="input input-bordered focus:border-secondary rounded-xl" required placeholder="12345678" />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">Gender</span></label>
            <select v-model="addForm.gender" class="select select-bordered focus:border-secondary rounded-xl" required>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div class="form-control flex flex-col pt-1">
            <label class="label"><span class="label-text font-bold">Class Name</span></label>
            <AutoComplete 
              v-model="addForm.class_name" 
              :suggestions="filteredClasses" 
              @complete="searchClass" 
              optionLabel="name" 
              placeholder="Search Class (min. 3 chars)"
              :delay="300"
              class="w-full"
              inputClass="input input-bordered focus:border-secondary rounded-xl w-full"
              panelClass="bg-base-100 border shadow-xl rounded-xl mt-1 z-50 text-sm menu p-2"
            />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">Enrollment Status</span></label>
            <select v-model="addForm.enrollment_status" class="select select-bordered focus:border-secondary rounded-xl" required>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
              <option value="Graduated">Graduated</option>
            </select>
          </div>
          <div class="modal-action mt-6 gap-2">
            <button type="button" class="btn btn-ghost rounded-xl font-bold" @click="isAddModalOpen = false" :disabled="isSubmitting">Cancel</button>
            <button type="submit" class="btn btn-secondary rounded-xl font-bold px-8 shadow-lg shadow-secondary/20" :disabled="isSubmitting">
              <span v-if="isSubmitting" class="loading loading-spinner loading-sm"></span>
              Register Student
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
        <h3 class="font-extrabold text-2xl mb-6">Edit Student Data</h3>
        <form @submit.prevent="handleUpdate" class="flex flex-col gap-4">
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">Name</span></label>
            <input v-model="editForm.name" type="text" class="input input-bordered focus:border-secondary rounded-xl" required />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">NIS</span></label>
            <input v-model="editForm.nis" type="text" class="input input-bordered focus:border-secondary rounded-xl" required />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">Gender</span></label>
            <select v-model="editForm.gender" class="select select-bordered focus:border-secondary rounded-xl" required>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">Class Name</span></label>
            <input v-model="editForm.class_name" type="text" class="input input-bordered focus:border-secondary rounded-xl" required />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">Enrollment Status</span></label>
            <select v-model="editForm.enrollment_status" class="select select-bordered focus:border-secondary rounded-xl" required>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
              <option value="Graduated">Graduated</option>
            </select>
          </div>
          <div class="modal-action mt-6 gap-2">
            <button type="button" class="btn btn-ghost rounded-xl font-bold" @click="isEditModalOpen = false">Cancel</button>
            <button type="submit" class="btn btn-secondary rounded-xl font-bold px-8 shadow-lg shadow-secondary/20">Save Updates</button>
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
