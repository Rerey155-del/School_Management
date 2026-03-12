<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import { Icon } from "@iconify/vue";
import { useScheduleStore } from "@/stores/useScheduleStore";
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useDashboardStore } from "@/stores/useDashboardStore";

const dashboardStore = useDashboardStore();
import AutoComplete from "primevue/autocomplete";

import {
  classService,
  type ClassAutocompleteOption,
} from "@/services/classService";

import {
  teacherService,
  type TeacherAutocompleteOption,
} from "@/services/teacherService";

import {
  subjectService,
  type SubjectAutocompleteOption,
} from "@/services/subjectService";

const store = useScheduleStore();
const router = useRouter();
const route = useRoute();

const isSubmitting = ref(false);

const form = ref({
  id: "" as string | number,
  class_name: "" as any,
  day: "",
  period_duration: "",
  instructor: "" as any,
  subject: "" as any,
});

const startTime = ref("");
const endTime = ref("");

/* Autocomplete */
const filteredClasses = ref<ClassAutocompleteOption[]>([]);
const searchClass = async (event: any) => {
  filteredClasses.value = await classService.autocompleteClasses(event.query);
};

const filteredTeachers = ref<TeacherAutocompleteOption[]>([]);
const searchTeacher = async (event: any) => {
  filteredTeachers.value = await teacherService.autocompleteTeachers(
    event.query
  );
};

const filteredSubjects = ref<SubjectAutocompleteOption[]>([]);
const searchSubject = async (event: any) => {
  filteredSubjects.value = await subjectService.autocompleteSubjects(
    event.query
  );
};

/* Load Detail */
onMounted(async () => {
  const id = route.params.id as string;
  try {
    await store.fetchDetail(id);
    if (store.detail) {
      if (store.detail.period_duration) {
        const times = store.detail.period_duration.split(" - ");
        startTime.value = times[0] || "";
        endTime.value = times[1] || "";
      }

      form.value = {
        id: store.detail.id as string | number,
        class_name: store.detail.class_name ? { name: store.detail.class_name } : "",
        day: store.detail.day,
        period_duration: store.detail.period_duration,
        instructor: store.detail.instructor ? { name: store.detail.instructor } : "",
        subject: store.detail.subject ? { name: store.detail.subject } : "",
      };
    } else {
      router.push("/schedules");
    }
  } catch (error) {
    console.error("Failed to fetch schedule detail:", error);
    router.push("/schedules");
  }
});

/* Navigation */
const goBack = () => {
  router.push("/schedules");
};

/* Submit */
const handleSubmit = async () => {
  try {
    isSubmitting.value = true;

    const { id, ...payloadTemp } = form.value;

    const payload = {
      ...payloadTemp,
      class_name:
        typeof payloadTemp.class_name === "object"
          ? payloadTemp.class_name.name
          : payloadTemp.class_name,

      period_duration: `${startTime.value} - ${endTime.value}`,

      instructor:
        typeof payloadTemp.instructor === "object"
          ? payloadTemp.instructor.name
          : payloadTemp.instructor,

      subject:
        typeof payloadTemp.subject === "object"
          ? payloadTemp.subject.name
          : payloadTemp.subject,
    };

    await store.updateItem(id, payload);
    router.push("/schedules");
  } catch (error: any) {
    alert(error.message || "An error occurred");
  } finally {
    isSubmitting.value = false;
  }
};

/* Text */
const i18n = computed(() => {
  const isId = dashboardStore.locale === 'id';
  return {
    brand: "SCHOOL",
    version: "V3",
    header: {
      title: isId ? "Edit Slot Jadwal" : "Edit Schedule Slot",
      subtitle: isId ? "Ubah penugasan jadwal yang ada." : "Modify existing schedule assignments.",
    },
    actions: {
      back: isId ? "Kembali ke Daftar" : "Back to List",
      cancel: isId ? "Batal" : "Cancel",
      submit: isId ? "Simpan Perubahan" : "Save Updates"
    },
    form: {
      class: isId ? "Kelas / Kelompok" : "Class / Group",
      date: isId ? "Tanggal" : "Date",
      duration: isId ? "Durasi" : "Duration",
      instructor: isId ? "Nama Pengajar" : "Instructor Name",
      subject: isId ? "Mata Pelajaran" : "Subject",
      to: isId ? "sampai" : "to",
      placeholderClass: isId ? "Cari Kelas (misal: Kelas 10A)" : "Search Class (e.g., Grade 10A)",
      placeholderInstructor: isId ? "Cari Pengajar (misal: Bpk. Wilson)" : "Search Instructor (e.g., Mr. Wilson)",
      placeholderSubject: isId ? "Cari Mata Pelajaran (misal: Matematika)" : "Search Subject (e.g., Mathematics)"
    }
  };
});
</script>

<template>
  <div class="drawer lg:drawer-open bg-base-200 min-h-screen font-sans">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />

    <div class="drawer-content flex flex-col p-6 lg:p-10">
      <header
        class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10"
        data-aos="fade-down"
      >
        <div>
          <h1
            class="text-4xl font-extrabold tracking-tight text-base-content mb-2"
          >
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

          <button
            @click="goBack"
            class="btn btn-ghost rounded-xl px-6 font-bold gap-2 capitalize"
          >
            <Icon icon="lucide:arrow-left" class="text-sm" />
            {{ i18n.actions.back }}
          </button>
        </div>
      </header>

      <div
        class="bg-base-100 backdrop-blur-xl shadow-2xl border border-base-content/5 rounded-[2.5rem] p-8 max-w-3xl"
        data-aos="fade-up"
      >
        <!-- Skeleton Loader -->
        <div v-if="store.loadingDetail" class="space-y-6 animate-pulse">
          <!-- Class -->
          <div class="space-y-2">
            <div class="h-3 w-32 bg-base-200 rounded"></div>
            <div class="h-12 bg-base-200 rounded-xl"></div>
          </div>

          <!-- Date -->
          <div class="space-y-2">
            <div class="h-3 w-20 bg-base-200 rounded"></div>
            <div class="h-12 bg-base-200 rounded-xl"></div>
          </div>

          <!-- Duration -->
          <div class="space-y-2">
            <div class="h-3 w-24 bg-base-200 rounded"></div>
            <div class="flex gap-3">
              <div class="h-12 bg-base-200 rounded-xl w-full"></div>
              <div class="h-12 bg-base-200 rounded-xl w-full"></div>
            </div>
          </div>

          <!-- Instructor -->
          <div class="space-y-2">
            <div class="h-3 w-36 bg-base-200 rounded"></div>
            <div class="h-12 bg-base-200 rounded-xl"></div>
          </div>

          <!-- Subject -->
          <div class="space-y-2">
            <div class="h-3 w-24 bg-base-200 rounded"></div>
            <div class="h-12 bg-base-200 rounded-xl"></div>
          </div>

          <!-- Buttons -->
          <div class="flex justify-end gap-3 pt-4">
            <div class="h-10 w-24 bg-base-200 rounded-xl"></div>
            <div class="h-10 w-36 bg-base-200 rounded-xl"></div>
          </div>
        </div>

        <form v-else @submit.prevent="handleSubmit" class="flex flex-col gap-5">
          <div class="form-control flex flex-col pt-1">
            <label class="label"
              ><span class="label-text font-bold">{{ i18n.form.class }}</span></label
            >
            <AutoComplete
              v-model="form.class_name"
              :suggestions="filteredClasses"
              @complete="searchClass"
              optionLabel="name"
              :placeholder="i18n.form.placeholderClass"
              :delay="300"
              class="w-full"
              inputClass="input input-bordered focus:border-primary rounded-xl w-full"
              panelClass="bg-base-100 border shadow-xl rounded-xl mt-1 z-50 text-sm menu p-2"
            />
          </div>
          <div class="form-control">
            <label class="label"
              ><span class="label-text font-bold">{{ i18n.form.date }}</span></label
            >
            <input
              v-model="form.day"
              type="date"
              class="input input-bordered focus:border-primary rounded-xl"
              required
            />
          </div>
          <div class="form-control">
            <label class="label"
              ><span class="label-text font-bold">{{ i18n.form.duration }}</span></label
            >
            <div class="flex items-center gap-3">
              <input
                type="time"
                v-model="startTime"
                class="input input-bordered focus:border-primary rounded-xl w-full"
                required
              />
              <span class="font-bold text-base-content/40">{{ i18n.form.to }}</span>
              <input
                type="time"
                v-model="endTime"
                class="input input-bordered focus:border-primary rounded-xl w-full"
                required
              />
            </div>
          </div>
          <div class="form-control flex flex-col pt-1">
            <label class="label"
              ><span class="label-text font-bold">{{ i18n.form.instructor }}</span></label
            >
            <AutoComplete
              v-model="form.instructor"
              :suggestions="filteredTeachers"
              @complete="searchTeacher"
              optionLabel="name"
              :placeholder="i18n.form.placeholderInstructor"
              :delay="300"
              class="w-full"
              inputClass="input input-bordered focus:border-primary rounded-xl w-full"
              panelClass="bg-base-100 border shadow-xl rounded-xl mt-1 z-50 text-sm menu p-2"
            />
          </div>
          <div class="form-control flex flex-col pt-1">
            <label class="label"
              ><span class="label-text font-bold">{{ i18n.form.subject }}</span></label
            >
            <AutoComplete
              v-model="form.subject"
              :suggestions="filteredSubjects"
              @complete="searchSubject"
              optionLabel="name"
              :placeholder="i18n.form.placeholderSubject"
              :delay="300"
              class="w-full"
              inputClass="input input-bordered focus:border-primary rounded-xl w-full"
              panelClass="bg-base-100 border shadow-xl rounded-xl mt-1 z-50 text-sm menu p-2"
            />
          </div>
          <div class="form-actions mt-6 flex justify-end gap-3">
            <button
              type="button"
              class="btn btn-ghost rounded-xl font-bold"
              @click="goBack"
              :disabled="isSubmitting"
            >
              {{ i18n.actions.cancel }}
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
              {{ i18n.actions.submit }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Sidebar Component -->
    <Sidebar />
  </div>
</template>
