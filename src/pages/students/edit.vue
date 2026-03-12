<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import { Icon } from "@iconify/vue";
import { useStudentStore } from "@/stores/useStudentStore";
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useDashboardStore } from "@/stores/useDashboardStore";

const dashboardStore = useDashboardStore();
import {
  classService,
  type ClassAutocompleteOption,
} from "@/services/classService";
import AutoComplete from "primevue/autocomplete";

import AOS from "aos";
import "aos/dist/aos.css";

const store = useStudentStore();
const router = useRouter();
const route = useRoute();

const isSubmitting = ref(false);

const form = ref({
  id: "" as string | number,
  name: "",
  nis: "",
  gender: "Male",
  class_name: "",
});

/* Autocomplete */
const filteredClasses = ref<ClassAutocompleteOption[]>([]);

const searchClass = async (event: any) => {
  filteredClasses.value = await classService.autocompleteClasses(event.query);
};

onMounted(async () => {
  AOS.init({
    duration: 700,
    easing: "ease-out-cubic",
    once: true,
  });

  const id = route.params.id as string;
  try {
    await store.fetchDetail(id);
    if (store.detail) {
      form.value = {
        id: store.detail.id as string | number,
        name: store.detail.name,
        nis: store.detail.nis,
        gender: store.detail.gender,
        class_name: store.detail.class_name,
      };
    } else {
      router.push("/students");
    }
  } catch (error) {
    console.error("Failed to fetch student detail:", error);
    router.push("/students");
  }
});

const goBack = () => {
  router.push("/students");
};

const handleSubmit = async () => {
  try {
    isSubmitting.value = true;

    const finalPayload = {
      ...form.value,
      class_name:
        typeof form.value.class_name === "object"
          ? (form.value.class_name as any).name
          : form.value.class_name,
    };

    const { id, ...putPayload } = finalPayload;

    await store.updateItem(id, putPayload);

    router.push("/students");
  } catch (error: any) {
    alert(error.message || "An error occurred");
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
      title: isId ? "Edit Siswa" : "Edit Student",
      subtitle: isId ? "Ubah profil siswa dan status akademik." : "Modify student profile and academic status.",
    },
    actions: {
      back: isId ? "Kembali ke Daftar" : "Back to List",
      cancel: isId ? "Batal" : "Cancel",
      submit: isId ? "Simpan Perubahan" : "Save Updates"
    },
    form: {
      name: isId ? "Nama" : "Name",
      nis: "NIS",
      className: isId ? "Nama Kelas" : "Class Name",
      searchPlaceholder: isId ? "Cari Kelas" : "Search Class"
    }
  };
});
</script>

<template>
  <div class="drawer lg:drawer-open bg-base-200 min-h-screen font-sans">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />

    <div class="drawer-content flex flex-col p-6 lg:p-10">
      <!-- HEADER -->
      <header
        class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10"
        data-aos="fade-down"
      >
        <div>
          <h1 class="text-4xl font-extrabold mb-2">
            {{ i18n.header.title }}
          </h1>

          <p class="text-base-content/40">
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

          <button
            @click="goBack"
            class="btn btn-ghost rounded-xl px-6 font-bold gap-2"
          >
            <Icon icon="lucide:arrow-left" class="text-sm" />
            {{ i18n.actions.back }}
          </button>
        </div>
      </header>

      <!-- FORM CARD -->
      <div
        class="bg-base-100 shadow-2xl border rounded-[2.5rem] p-8 max-w-3xl"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        <!-- Skeleton -->
        <div v-if="store.loadingDetail" class="space-y-6 animate-pulse">
          <div class="space-y-2">
            <div class="h-3 w-24 bg-base-200 rounded"></div>
            <div class="h-12 bg-base-200 rounded-xl"></div>
          </div>

          <div class="space-y-2">
            <div class="h-3 w-20 bg-base-200 rounded"></div>
            <div class="h-12 bg-base-200 rounded-xl"></div>
          </div>

          <div class="space-y-2">
            <div class="h-3 w-20 bg-base-200 rounded"></div>
            <div class="h-12 bg-base-200 rounded-xl"></div>
          </div>

          <div class="space-y-2">
            <div class="h-3 w-28 bg-base-200 rounded"></div>
            <div class="h-12 bg-base-200 rounded-xl"></div>
          </div>
        </div>

        <!-- FORM -->
        <form v-else @submit.prevent="handleSubmit" class="flex flex-col gap-5">
          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold">{{ i18n.form.name }}</span>
            </label>

            <input
              v-model="form.name"
              type="text"
              class="input input-bordered rounded-xl"
              required
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold">{{ i18n.form.nis }}</span>
            </label>

            <input
              v-model="form.nis"
              type="text"
              class="input input-bordered rounded-xl"
              required
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold">{{ i18n.form.className }}</span>
            </label>

            <AutoComplete
              v-model="form.class_name"
              :suggestions="filteredClasses"
              @complete="searchClass"
              optionLabel="name"
              :placeholder="i18n.form.searchPlaceholder"
              class="w-full"
              inputClass="input input-bordered rounded-xl w-full"
            />
          </div>

          <div class="flex justify-end gap-3 mt-6">
            <button
              type="button"
              class="btn btn-ghost rounded-xl"
              @click="goBack"
            >
              {{ i18n.actions.cancel }}
            </button>

            <button
              type="submit"
              class="btn btn-secondary rounded-xl px-8"
              :disabled="isSubmitting"
            >
              <span
                v-if="isSubmitting"
                class="loading loading-spinner loading-sm"
              ></span>

              {{ i18n.actions.submit }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <Sidebar />
  </div>
</template>