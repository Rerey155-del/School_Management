<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import { Icon } from "@iconify/vue";
import { useTeacherStore } from "@/stores/useTeacherStore";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { subjectService, type SubjectAutocompleteOption } from "@/services/subjectService";
import AutoComplete from "primevue/autocomplete";

const store = useTeacherStore();
const router = useRouter();
const isSubmitting = ref(false);

const form = ref({
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

const goBack = () => {
  router.push('/teachers');
};

const handleSubmit = async () => {
  try {
    isSubmitting.value = true;
    const finalPayload = {
      ...form.value,
      department: typeof form.value.department === 'object' 
          ? (form.value.department as any).name 
          : form.value.department
    };

    await store.createItem(finalPayload);
    router.push('/teachers');
  } catch (error: any) {
    alert(error.message || 'An error occurred');
  } finally {
    isSubmitting.value = false;
  }
};

const i18n = {
  brand: "SCHOOL",
  version: "V3",
  header: {
    title: "Add Teacher",
    subtitle: "Initialize a new professional profile for the faculty directory."
  },
  actions: {
    back: "Back to List"
  }
};
</script>

<template>
  <div class="drawer lg:drawer-open bg-base-200 min-h-screen font-sans">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />

    <div class="drawer-content flex flex-col p-6 lg:p-10">
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
          <button @click="goBack" class="btn btn-ghost rounded-xl px-6 font-bold gap-2 capitalize">
            <Icon icon="lucide:arrow-left" class="text-sm" />
            {{ i18n.actions.back }}
          </button>
        </div>
      </header>

      <div class="bg-base-100 backdrop-blur-xl shadow-2xl border border-base-content/5 rounded-[2.5rem] p-8 max-w-3xl" data-aos="fade-up">
        <form @submit.prevent="handleSubmit" class="flex flex-col gap-5">
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">Name</span></label>
            <input v-model="form.name" type="text" class="input input-bordered focus:border-primary rounded-xl" required placeholder="John Doe" />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">NIP / NIK</span></label>
            <input v-model="form.nip" type="text" class="input input-bordered focus:border-primary rounded-xl" required placeholder="1987xxxxxxx" />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">Email</span></label>
            <input v-model="form.email" type="email" class="input input-bordered focus:border-primary rounded-xl" required placeholder="john.doe@school.edu" />
          </div>
          <div class="form-control flex flex-col pt-1">
            <label class="label"><span class="label-text font-bold">Department (Subject)</span></label>
            <AutoComplete 
              v-model="form.department" 
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
            <select v-model="form.status" class="select select-bordered focus:border-primary rounded-xl" required>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
              <option value="Non-Aktif">Non-Aktif</option>
            </select>
          </div>
          <div class="form-actions mt-6 flex justify-end gap-3">
            <button type="button" class="btn btn-ghost rounded-xl font-bold" @click="goBack" :disabled="isSubmitting">Cancel</button>
            <button type="submit" class="btn btn-primary rounded-xl font-bold px-8 shadow-lg shadow-primary/20" :disabled="isSubmitting">
              <span v-if="isSubmitting" class="loading loading-spinner loading-sm"></span>
              Create Teacher
            </button>
          </div>
        </form>
      </div>
    </div>
    <Sidebar />
  </div>
</template>
