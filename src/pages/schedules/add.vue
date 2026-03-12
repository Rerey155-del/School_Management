<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import { Icon } from "@iconify/vue";
import { useScheduleStore } from "@/stores/useScheduleStore";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useDashboardStore } from "@/stores/useDashboardStore";

const dashboardStore = useDashboardStore();
import AutoComplete from "primevue/autocomplete";
import { classService, type ClassAutocompleteOption } from "@/services/classService";
import { teacherService, type TeacherAutocompleteOption } from "@/services/teacherService";
import { subjectService, type SubjectAutocompleteOption } from "@/services/subjectService";

const store = useScheduleStore();
const router = useRouter();

const isSubmitting = ref(false);

const form = ref({
  class_name: "",
  day: "",
  period_duration: "",
  instructor: "",
  subject: "",
});

const startTime = ref("");
const endTime = ref("");

// Autocomplete Logic
const filteredClasses = ref<ClassAutocompleteOption[]>([]);
const searchClass = async (event: any) => {
  filteredClasses.value = await classService.autocompleteClasses(event.query);
};

const filteredTeachers = ref<TeacherAutocompleteOption[]>([]);
const searchTeacher = async (event: any) => {
  filteredTeachers.value = await teacherService.autocompleteTeachers(event.query);
};

const filteredSubjects = ref<SubjectAutocompleteOption[]>([]);
const searchSubject = async (event: any) => {
  filteredSubjects.value = await subjectService.autocompleteSubjects(event.query);
};

const goBack = () => {
  router.push('/schedules');
};

const handleSubmit = async () => {
  try {
    isSubmitting.value = true;
    const finalPayload = {
      ...form.value,
      class_name: typeof form.value.class_name === 'object' ? (form.value.class_name as any).name : form.value.class_name,
      period_duration: `${startTime.value} - ${endTime.value}`,
      instructor: typeof form.value.instructor === 'object' ? (form.value.instructor as any).name : form.value.instructor,
      subject: typeof form.value.subject === 'object' ? (form.value.subject as any).name : form.value.subject,
    };
    await store.createItem(finalPayload);
    router.push('/schedules');
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
      title: isId ? "Alokasi Slot Baru" : "New Slot Allocation",
      subtitle: isId ? "Tetapkan pengajar, mata pelajaran, dan slot waktu." : "Assign instructor, subject, and time slots."
    },
    actions: {
      back: isId ? "Kembali ke Daftar" : "Back to List",
      cancel: isId ? "Batal" : "Cancel",
      submit: isId ? "Tetapkan Slot" : "Assign Slot"
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
          <div class="form-control flex flex-col pt-1">
            <label class="label"><span class="label-text font-bold">{{ i18n.form.class }}</span></label>
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
            <label class="label"><span class="label-text font-bold">{{ i18n.form.date }}</span></label>
            <input v-model="form.day" type="date" class="input input-bordered focus:border-primary rounded-xl" required />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">{{ i18n.form.duration }}</span></label>
            <div class="flex items-center gap-3">
              <input type="time" v-model="startTime" class="input input-bordered focus:border-primary rounded-xl w-full" required />
              <span class="font-bold text-base-content/40">{{ i18n.form.to }}</span>
              <input type="time" v-model="endTime" class="input input-bordered focus:border-primary rounded-xl w-full" required />
            </div>
          </div>
          <div class="form-control flex flex-col pt-1">
            <label class="label"><span class="label-text font-bold">{{ i18n.form.instructor }}</span></label>
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
            <label class="label"><span class="label-text font-bold">{{ i18n.form.subject }}</span></label>
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
