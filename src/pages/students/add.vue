<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import { Icon } from "@iconify/vue";
import { useStudentStore } from "@/stores/useStudentStore";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useDashboardStore } from "@/stores/useDashboardStore";

const dashboardStore = useDashboardStore();
import { classService, type ClassAutocompleteOption } from "@/services/classService";
import AutoComplete from "primevue/autocomplete";

const store = useStudentStore();
const router = useRouter();
const isSubmitting = ref(false);

const form = ref({
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

const goBack = () => {
  router.push('/students');
};

const handleSubmit = async () => {
  try {
    isSubmitting.value = true;
    const finalPayload = {
      ...form.value,
      class_name: typeof form.value.class_name === 'object' 
          ? (form.value.class_name as any).name 
          : form.value.class_name
    };

    await store.createItem(finalPayload);
    router.push('/students');
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
      title: isId ? "Daftarkan Siswa" : "Register Student",
      subtitle: isId ? "Inisialisasi profil siswa baru di buku pendaftaran." : "Initialize a new student profile in the register."
    },
    actions: {
      back: isId ? "Kembali ke Daftar" : "Back to List",
      cancel: isId ? "Batal" : "Cancel",
      submit: isId ? "Daftarkan Siswa" : "Register Student"
    },
    form: {
      name: isId ? "Nama" : "Name",
      nis: "NIS",
      gender: isId ? "Jenis Kelamin" : "Gender",
      genderOptions: {
        male: isId ? "Laki-laki" : "Male",
        female: isId ? "Perempuan" : "Female"
      },
      className: isId ? "Nama Kelas" : "Class Name",
      status: isId ? "Status Pendaftaran" : "Enrollment Status",
      searchPlaceholder: isId ? "Cari Kelas (min. 3 karakter)" : "Search Class (min. 3 chars)"
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
            <input v-model="form.name" type="text" class="input input-bordered focus:border-secondary rounded-xl" required placeholder="Jane Doe" />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">{{ i18n.form.nis }}</span></label>
            <input v-model="form.nis" type="text" class="input input-bordered focus:border-secondary rounded-xl" required placeholder="12345678" />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">{{ i18n.form.gender }}</span></label>
            <select v-model="form.gender" class="select select-bordered focus:border-secondary rounded-xl" required>
              <option value="Male">{{ i18n.form.genderOptions.male }}</option>
              <option value="Female">{{ i18n.form.genderOptions.female }}</option>
            </select>
          </div>
          <div class="form-control flex flex-col pt-1">
            <label class="label"><span class="label-text font-bold">{{ i18n.form.className }}</span></label>
            <AutoComplete 
              v-model="form.class_name" 
              :suggestions="filteredClasses" 
              @complete="searchClass" 
              optionLabel="name" 
              :placeholder="i18n.form.searchPlaceholder"
              :delay="300"
              class="w-full"
              inputClass="input input-bordered focus:border-secondary rounded-xl w-full"
              panelClass="bg-base-100 border shadow-xl rounded-xl mt-1 z-50 text-sm menu p-2"
            />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">{{ i18n.form.status }}</span></label>
            <select v-model="form.enrollment_status" class="select select-bordered focus:border-secondary rounded-xl" required>
              <option value="Active">Active</option>
              <option value="Non-Active">Non-Active</option>
            </select>
          </div>
          <div class="form-actions mt-6 flex justify-end gap-3">
            <button type="button" class="btn btn-ghost rounded-xl font-bold" @click="goBack" :disabled="isSubmitting">{{ i18n.actions.cancel }}</button>
            <button type="submit" class="btn btn-secondary rounded-xl font-bold px-8 shadow-lg shadow-secondary/20" :disabled="isSubmitting">
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
