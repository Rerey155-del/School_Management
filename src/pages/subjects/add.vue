<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import { Icon } from "@iconify/vue";
import { useSubjectStore } from "@/stores/useSubjectStore";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useDashboardStore } from "@/stores/useDashboardStore";

const dashboardStore = useDashboardStore();

const store = useSubjectStore();
const router = useRouter();

const isSubmitting = ref(false);
const localError = ref<string | null>(null);

const form = ref({
  subject_name: "",
  academic_code: "",
});

onMounted(async () => {
  if (store.items.length === 0) {
    await store.fetchList();
  }
});

const goBack = () => {
  router.push('/subjects');
};

const handleSubmit = async () => {
  localError.value = null;
  
  // Validation
  if (!form.value.subject_name.trim()) {
    localError.value = "Subject name is required";
    return;
  }
  if (!form.value.academic_code.trim()) {
    localError.value = "Academic code is required";
    return;
  }

  try {
    isSubmitting.value = true;
    
    // Ensure items are fetched for uniqueness check
    if (store.items.length === 0) {
      await store.fetchList();
    }
    
    // Unique check
    const existing = store.items.find(i => i.academic_code === form.value.academic_code.trim());
    if (existing) {
      localError.value = "Academic code already exists";
      isSubmitting.value = false;
      return;
    }

    const finalPayload = {
      subject_name: form.value.subject_name.trim(),
      academic_code: form.value.academic_code.trim()
    };

    await store.createItem(finalPayload);
    router.push('/subjects');
  } catch (error: any) {
    localError.value = error.response?.data?.message || error.message || 'Failed to save subject';
    console.error("Add Subject Error:", error);
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
      title: isId ? "Tentukan Mapel Baru" : "Define New Subject",
      subtitle: isId ? "Konfigurasi parameter mata pelajaran." : "Configure subject parameters."
    },
    actions: {
      back: isId ? "Kembali ke Daftar" : "Back to List",
      cancel: isId ? "Batal" : "Cancel",
      submit: isId ? "Tentukan Mapel" : "Define Subject"
    },
    form: {
      name: isId ? "Nama Mata Pelajaran" : "Subject Name",
      code: isId ? "Kode Akademik" : "Academic Code"
    },
    errors: {
      nameRequired: isId ? "Nama mata pelajaran wajib diisi" : "Subject name is required",
      codeRequired: isId ? "Kode akademik wajib diisi" : "Academic code is required",
      codeExists: isId ? "Kode akademik sudah ada" : "Academic code already exists",
      failed: isId ? "Gagal menyimpan mata pelajaran" : "Failed to save subject"
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
          <!-- Error Message Display -->
          <div v-if="localError" class="alert alert-error rounded-xl shadow-sm py-3 mb-2 animate-in fade-in slide-in-from-top-4">
            <Icon icon="lucide:alert-circle" />
            <span class="text-sm font-semibold italic">{{ localError }}</span>
          </div>

          <div class="form-control">
            <label class="label"><span class="label-text font-bold">{{ i18n.form.name }}</span></label>
            <input v-model="form.subject_name" type="text" class="input input-bordered focus:border-primary rounded-xl" required placeholder="Mathematics" />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">{{ i18n.form.code }}</span></label>
            <input v-model="form.academic_code" type="text" class="input input-bordered focus:border-primary rounded-xl" required placeholder="MAT101" />
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
