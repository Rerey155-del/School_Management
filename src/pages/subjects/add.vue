<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import { Icon } from "@iconify/vue";
import { useSubjectStore } from "@/stores/useSubjectStore";
import { ref } from "vue";
import { useRouter } from "vue-router";

const store = useSubjectStore();
const router = useRouter();

const isSubmitting = ref(false);

const form = ref({
  subject_name: "",
  academic_code: "",
  metadata: [] as string[],
  status: "Active"
});
const metadataInput = ref("");

const goBack = () => {
  router.push('/subjects');
};

const handleSubmit = async () => {
  try {
    isSubmitting.value = true;
    const finalPayload = {
      ...form.value,
      metadata: metadataInput.value.split(",").map(t => t.trim()).filter(Boolean)
    };

    await store.createItem(finalPayload);
    router.push('/subjects');
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
    title: "Define New Subject",
    subtitle: "Configure subject parameters."
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
            <label class="label"><span class="label-text font-bold">Subject Name</span></label>
            <input v-model="form.subject_name" type="text" class="input input-bordered focus:border-primary rounded-xl" required placeholder="Mathematics" />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">Academic Code</span></label>
            <input v-model="form.academic_code" type="text" class="input input-bordered focus:border-primary rounded-xl" required placeholder="MAT101" />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">Metadata (comma separated)</span></label>
            <input v-model="metadataInput" type="text" class="input input-bordered focus:border-primary rounded-xl" placeholder="Core, Science, Grade 10" />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">Status</span></label>
            <select v-model="form.status" class="select select-bordered focus:border-primary rounded-xl" required>
              <option value="Active">Active</option>
              <option value="Non-Aktif">Non-Aktif</option>
            </select>
          </div>
          <div class="form-actions mt-6 flex justify-end gap-3">
            <button type="button" class="btn btn-ghost rounded-xl font-bold" @click="goBack" :disabled="isSubmitting">Cancel</button>
            <button type="submit" class="btn btn-primary rounded-xl font-bold px-8 shadow-lg shadow-primary/20" :disabled="isSubmitting">
              <span v-if="isSubmitting" class="loading loading-spinner loading-sm"></span>
              Define Subject
            </button>
          </div>
        </form>
      </div>
    </div>
    <Sidebar />
  </div>
</template>
