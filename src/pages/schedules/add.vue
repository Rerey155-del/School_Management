<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import { Icon } from "@iconify/vue";
import { useScheduleStore } from "@/stores/useScheduleStore";
import { ref } from "vue";
import { useRouter } from "vue-router";

const store = useScheduleStore();
const router = useRouter();

const isSubmitting = ref(false);

const form = ref({
  class_name: "",
  day: "",
  period_duration: "",
  instructor: "",
  subject: "",
  status: "Active"
});

const goBack = () => {
  router.push('/schedules');
};

const handleSubmit = async () => {
  try {
    isSubmitting.value = true;
    await store.createItem(form.value);
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
    title: "New Slot Allocation",
    subtitle: "Assign instructor, subject, and time slots."
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
            <label class="label"><span class="label-text font-bold">Class / Group</span></label>
            <input v-model="form.class_name" type="text" class="input input-bordered focus:border-primary rounded-xl" required placeholder="Grade 10A" />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">Day</span></label>
            <input v-model="form.day" type="text" class="input input-bordered focus:border-primary rounded-xl" required placeholder="Monday" />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">Period / Duration</span></label>
            <input v-model="form.period_duration" type="text" class="input input-bordered focus:border-primary rounded-xl" required placeholder="08:00 - 09:30" />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">Instructor Name</span></label>
            <input v-model="form.instructor" type="text" class="input input-bordered focus:border-primary rounded-xl" required placeholder="Mr. Wilson" />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">Subject</span></label>
            <input v-model="form.subject" type="text" class="input input-bordered focus:border-primary rounded-xl" required placeholder="Mathematics" />
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
              Assign Slot
            </button>
          </div>
        </form>
      </div>

    </div>

    <Sidebar />
  </div>
</template>
