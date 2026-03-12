<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import { Icon } from "@iconify/vue";
import { useStudentStore } from "@/stores/useStudentStore";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
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
const showSkeleton = ref(true);

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

  const fetchPromise = store.fetchDetail(id);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const detail = await fetchPromise;

  showSkeleton.value = false;

  if (!detail) {
    router.push("/students");
    return;
  }

  form.value = {
    id: detail.id as string | number,
    name: detail.name,
    nis: detail.nis,
    gender: detail.gender,
    class_name: detail.class_name,
  };
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

const i18n = {
  brand: "SCHOOL",
  version: "V3",
  header: {
    title: "Edit Student",
    subtitle: "Modify student profile and academic status.",
  },
  actions: {
    back: "Back to List",
  },
};
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

        <button
          @click="goBack"
          class="btn btn-ghost rounded-xl px-6 font-bold gap-2"
        >
          <Icon icon="lucide:arrow-left" class="text-sm" />
          {{ i18n.actions.back }}
        </button>
      </header>

      <!-- FORM CARD -->
      <div
        class="bg-base-100 shadow-2xl border rounded-[2.5rem] p-8 max-w-3xl"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        <!-- Skeleton -->
        <div v-if="showSkeleton" class="space-y-6 animate-pulse">
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
              <span class="label-text font-bold">Name</span>
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
              <span class="label-text font-bold">NIS</span>
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
              <span class="label-text font-bold">Class Name</span>
            </label>

            <AutoComplete
              v-model="form.class_name"
              :suggestions="filteredClasses"
              @complete="searchClass"
              optionLabel="name"
              placeholder="Search Class"
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
              Cancel
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

              Save Updates
            </button>
          </div>
        </form>
      </div>
    </div>

    <Sidebar />
  </div>
</template>