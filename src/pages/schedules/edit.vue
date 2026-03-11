<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import { Icon } from "@iconify/vue";
import { useScheduleStore } from "@/stores/useScheduleStore";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import AutoComplete from "primevue/autocomplete";
import { classService, type ClassAutocompleteOption } from "@/services/classService";
import { teacherService, type TeacherAutocompleteOption } from "@/services/teacherService";
import { subjectService, type SubjectAutocompleteOption } from "@/services/subjectService";

const store = useScheduleStore();
const router = useRouter();
const route = useRoute();

const isSubmitting = ref(false);

const form = ref({
  id: '' as string | number,
  class_name: "",
  day: "",
  period_duration: "",
  instructor: "",
  subject: "",
  status: "Active"
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

onMounted(async () => {
  const id = route.params.id as string;
  const detail = await store.fetchDetail(id);
  if (detail) {
    if (detail.period_duration) {
      const times = detail.period_duration.split(' - ');
      startTime.value = times[0] || '';
      endTime.value = times[1] || '';
    }
    form.value = { 
      id: detail.id as string | number, 
      class_name: detail.class_name, 
      day: detail.day, 
      period_duration: detail.period_duration, 
      instructor: detail.instructor, 
      subject: detail.subject,
      status: detail.status || 'Active'
    };
  } else {
    router.push('/schedules');
  }
});

const goBack = () => {
  router.push('/schedules');
};

const handleSubmit = async () => {
  try {
    isSubmitting.value = true;
    const { id, ...putPayloadTemp } = form.value;
    const putPayload = {
      ...putPayloadTemp,
      class_name: typeof putPayloadTemp.class_name === 'object' ? (putPayloadTemp.class_name as any).name : putPayloadTemp.class_name,
      period_duration: `${startTime.value} - ${endTime.value}`,
      instructor: typeof putPayloadTemp.instructor === 'object' ? (putPayloadTemp.instructor as any).name : putPayloadTemp.instructor,
      subject: typeof putPayloadTemp.subject === 'object' ? (putPayloadTemp.subject as any).name : putPayloadTemp.subject,
    };
    await store.updateItem(id, putPayload);
    router.push('/schedules');
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
    title: "Edit Schedule Slot",
    subtitle: "Modify existing schedule assignments."
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
        <!-- Skeleton Loader -->
        <div v-if="store.loadingDetail" class="animate-pulse space-y-6">
          <div class="h-10 bg-base-200 rounded w-1/4"></div>
          <div class="h-12 bg-base-200 rounded-xl w-full"></div>
          <div class="h-12 bg-base-200 rounded-xl w-full"></div>
          <div class="h-12 bg-base-200 rounded-xl w-full"></div>
          <div class="h-12 bg-base-200 rounded-xl w-full"></div>
          <div class="h-12 bg-base-200 rounded-xl w-1/2"></div>
          <div class="h-12 bg-base-200 rounded-xl w-full mt-8"></div>
        </div>
        
        <form v-else @submit.prevent="handleSubmit" class="flex flex-col gap-5">
          <div class="form-control flex flex-col pt-1">
            <label class="label"><span class="label-text font-bold">Class / Group</span></label>
            <AutoComplete 
              v-model="form.class_name" 
              :suggestions="filteredClasses" 
              @complete="searchClass" 
              optionLabel="name" 
              placeholder="Search Class (e.g., Grade 10A)"
              :delay="300"
              class="w-full"
              inputClass="input input-bordered focus:border-primary rounded-xl w-full"
              panelClass="bg-base-100 border shadow-xl rounded-xl mt-1 z-50 text-sm menu p-2"
            />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">Date</span></label>
            <input v-model="form.day" type="date" class="input input-bordered focus:border-primary rounded-xl" required />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">Duration</span></label>
            <div class="flex items-center gap-3">
              <input type="time" v-model="startTime" class="input input-bordered focus:border-primary rounded-xl w-full" required />
              <span class="font-bold text-base-content/40">to</span>
              <input type="time" v-model="endTime" class="input input-bordered focus:border-primary rounded-xl w-full" required />
            </div>
          </div>
          <div class="form-control flex flex-col pt-1">
            <label class="label"><span class="label-text font-bold">Instructor Name</span></label>
            <AutoComplete 
              v-model="form.instructor" 
              :suggestions="filteredTeachers" 
              @complete="searchTeacher" 
              optionLabel="name" 
              placeholder="Search Instructor (e.g., Mr. Wilson)"
              :delay="300"
              class="w-full"
              inputClass="input input-bordered focus:border-primary rounded-xl w-full"
              panelClass="bg-base-100 border shadow-xl rounded-xl mt-1 z-50 text-sm menu p-2"
            />
          </div>
          <div class="form-control flex flex-col pt-1">
            <label class="label"><span class="label-text font-bold">Subject</span></label>
            <AutoComplete 
              v-model="form.subject" 
              :suggestions="filteredSubjects" 
              @complete="searchSubject" 
              optionLabel="name" 
              placeholder="Search Subject (e.g., Mathematics)"
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
            </select>
          </div>
          <div class="form-actions mt-6 flex justify-end gap-3">
            <button type="button" class="btn btn-ghost rounded-xl font-bold" @click="goBack" :disabled="isSubmitting">Cancel</button>
            <button type="submit" class="btn btn-primary rounded-xl font-bold px-8 shadow-lg shadow-primary/20" :disabled="isSubmitting">
              <span v-if="isSubmitting" class="loading loading-spinner loading-sm"></span>
              Save Updates
            </button>
          </div>
        </form>
      </div>

    </div>

    <!-- Sidebar Component -->
    <Sidebar />
  </div>
</template>
