<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import { Icon } from "@iconify/vue";
import { useClassStore } from "@/stores/useClassStore";
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useDashboardStore } from "@/stores/useDashboardStore";

const dashboardStore = useDashboardStore();

const store = useClassStore();
const router = useRouter();
const route = useRoute();

const isSubmitting = ref(false);
const localError = ref<string | null>(null);

const form = ref({
  id: "" as string | number,
  class_designation: "",
  room_id: "",
  utilization: "",
  status: "Active",
});

onMounted(async () => {
  const id = route.params.id as string;
  try {
    await store.fetchDetail(id);
    if (store.detail) {
      form.value = {
        id: store.detail.id as string | number,
        class_designation: store.detail.class_designation || "",
        room_id: store.detail.room_id || "",
        utilization: store.detail.utilization || "",
        status: store.detail.status || "Active",
      };
    } else {
      router.push('/classes');
    }
  } catch (error) {
    console.error("Failed to fetch class detail:", error);
    router.push('/classes');
  }
});

const goBack = () => {
  router.push('/classes');
};

const handleSubmit = async () => {
  localError.value = null;

  // Validation
  if (!form.value.class_designation.trim()) {
    localError.value = "Class designation is required";
    return;
  }
  if (!form.value.room_id.trim()) {
    localError.value = "Room ID is required";
    return;
  }
  if (!form.value.utilization.trim()) {
    localError.value = "Utilization is required";
    return;
  }

  try {
    isSubmitting.value = true;
    
    // Payload optimization
    const finalPayload = {
      class_designation: form.value.class_designation.trim(),
      room_id: form.value.room_id.trim(),
      utilization: form.value.utilization.trim(),
 
    };

    const idNum = Number(form.value.id);
    await store.updateItem(idNum, finalPayload);
    router.push('/classes');
  } catch (error: any) {
    localError.value = error.response?.data?.message || error.message || "Failed to update classroom";
    console.error("Edit Class Error:", error);
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
      title: isId ? "Edit Ruang Kelas" : "Edit Classroom",
      subtitle: isId ? "Ubah parameter utilisasi ruang kelas yang ada." : "Modify existing classroom utilization parameters."
    },
    actions: {
      back: isId ? "Kembali ke Daftar" : "Back to List",
      cancel: isId ? "Batal" : "Cancel",
      submit: isId ? "Simpan Perubahan" : "Save Updates"
    },
    form: {
      designation: isId ? "Designasi Kelas" : "Class Designation",
      roomId: "Room ID",
      utilization: isId ? "Utilisasi (saat ini/maks)" : "Utilization (current/max)"
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
          <!-- Error Message Display -->
          <div v-if="localError" class="alert alert-error rounded-xl shadow-sm py-3 mb-2 animate-in fade-in slide-in-from-top-4">
            <Icon icon="lucide:alert-circle" />
            <span class="text-sm font-semibold italic">{{ localError }}</span>
          </div>

          <div class="form-control">
            <label class="label"><span class="label-text font-bold">{{ i18n.form.designation }}</span></label>
            <input v-model="form.class_designation" type="text" class="input input-bordered focus:border-primary rounded-xl" required placeholder="Grade 10A" />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">{{ i18n.form.roomId }}</span></label>
            <input v-model="form.room_id" type="text" class="input input-bordered focus:border-primary rounded-xl" required placeholder="RM-101" />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">{{ i18n.form.utilization }}</span></label>
            <input v-model="form.utilization" type="text" class="input input-bordered focus:border-primary rounded-xl" required placeholder="30/40" />
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
