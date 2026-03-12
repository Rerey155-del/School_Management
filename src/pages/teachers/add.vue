<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import { Icon } from "@iconify/vue";
import { useTeacherStore } from "@/stores/useTeacherStore";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useDashboardStore } from "@/stores/useDashboardStore";

const dashboardStore = useDashboardStore();
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

const i18n = computed(() => {
  const isId = dashboardStore.locale === 'id';
  return {
    brand: "SCHOOL",
    version: "V3",
    header: {
      title: isId ? "Tambah Guru" : "Add Teacher",
      subtitle: isId ? "Inisialisasi profil profesional baru untuk direktori fakultas." : "Initialize a new professional profile for the faculty directory."
    },
    actions: {
      back: isId ? "Kembali ke Daftar" : "Back to List",
      cancel: isId ? "Batal" : "Cancel",
      submit: isId ? "Tambah Guru" : "Create Teacher"
    },
    form: {
      name: isId ? "Nama" : "Name",
      nip: "NIP / NIK",
      email: "Email",
      department: isId ? "Departemen (Mata Pelajaran)" : "Department (Subject)",
      status: "Status",
      searchPlaceholder: isId ? "Cari Mata Pelajaran (min. 3 karakter)" : "Search Subject (min. 3 chars)"
    }
  };
});
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
          <!-- Global Language Switcher -->
          <div class="flex items-center gap-2 mr-2 border-r border-base-content/5 pr-4">
            <span class="text-xs font-bold font-mono" :class="dashboardStore.locale === 'id' ? 'text-primary' : 'text-base-content/40'">ID</span>
            <input type="checkbox" class="toggle toggle-primary toggle-sm" :checked="dashboardStore.locale === 'en'" @change="dashboardStore.toggleLocale()" />
            <span class="text-xs font-bold font-mono" :class="dashboardStore.locale === 'en' ? 'text-primary' : 'text-base-content/40'">EN</span>
          </div>

          <button @click="goBack" class="btn btn-ghost rounded-xl px-6 font-bold gap-2 capitalize">
            <Icon icon="lucide:arrow-left" class="text-sm" />
            {{ i18n.actions.back }}
          </button>
        </div>
      </header>

      <div class="bg-base-100 backdrop-blur-xl shadow-2xl border border-base-content/5 rounded-[2.5rem] p-8 max-w-3xl" data-aos="fade-up">
        <form @submit.prevent="handleSubmit" class="flex flex-col gap-5">
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">{{ i18n.form.name }}</span></label>
            <input v-model="form.name" type="text" class="input input-bordered focus:border-primary rounded-xl" required placeholder="John Doe" />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">{{ i18n.form.nip }}</span></label>
            <input v-model="form.nip" type="text" class="input input-bordered focus:border-primary rounded-xl" required placeholder="1987xxxxxxx" />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">{{ i18n.form.email }}</span></label>
            <input v-model="form.email" type="email" class="input input-bordered focus:border-primary rounded-xl" required placeholder="john.doe@school.edu" />
          </div>
          <div class="form-control flex flex-col pt-1">
            <label class="label"><span class="label-text font-bold">{{ i18n.form.department }}</span></label>
            <AutoComplete 
              v-model="form.department" 
              :suggestions="filteredDepartments" 
              @complete="searchDepartment" 
              optionLabel="name" 
              :placeholder="i18n.form.searchPlaceholder"
              :delay="300"
              class="w-full"
              inputClass="input input-bordered focus:border-primary rounded-xl w-full"
              panelClass="bg-base-100 border shadow-xl rounded-xl mt-1 z-50 text-sm menu p-2"
            />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">{{ i18n.form.status }}</span></label>
            <select v-model="form.status" class="select select-bordered focus:border-primary rounded-xl" required>
              <option value="Active">Active</option>
              <option value="Non-Active">Non-Active</option>
            </select>
          </div>

          <div class="form-actions mt-6 flex justify-end gap-3">
            <button type="button" class="btn btn-ghost rounded-xl font-bold" @click="goBack" :disabled="isSubmitting">{{ i18n.actions.cancel }}</button>
            <button type="submit" class="btn btn-primary rounded-xl font-bold px-8 shadow-lg shadow-primary/20" :disabled="isSubmitting">
              <span v-if="isSubmitting" class="loading loading-spinner loading-sm"></span>
              {{ i18n.actions.submit }}
            </button>
          </div>
        </form>
      </div>
    </div>
    <Sidebar />
  </div>
</template>
