<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import { Icon } from "@iconify/vue";
import { useClasses } from "@/composables/useClasses";
import { ref } from "vue";
const { classes, updateClass } = useClasses();

const isEditModalOpen = ref(false);
const editForm = ref({
  id: 0,
  class_designation: "",
  room_id: "",
  utilization: ""
});

const openEditModal = (cls: any) => {
  editForm.value = { ...cls };
  isEditModalOpen.value = true;
};

const handleUpdate = async () => {
  await updateClass(editForm.value.id, editForm.value);
  isEditModalOpen.value = false;
};

const i18n = {
  brand: "SCHOOL",
  version: "V3",
  header: {
    title: "Classrooms",
    subtitle: "Structural organization of students and capacity control."
  },
  actions: {
    add: "Initialize Room"
  },
  table: {
    designation: "Class Designation",
    roomId: "Room ID",
    utilization: "Utilization",
    actions: "Actions",
    unit: "Students"
  }
};
</script>

<template>
  <div class="drawer lg:drawer-open bg-base-200 min-h-screen font-sans">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />

    <div class="drawer-content flex flex-col p-6 lg:p-10">
      <!-- Mobile Navbar Toggle -->
      <div
        class="flex items-center justify-between lg:hidden mb-6 bg-base-100 p-4 rounded-2xl shadow-sm"
      >
        <label for="my-drawer-2" class="btn btn-ghost btn-circle drawer-button">
          <Icon icon="lucide:menu" class="text-xl" />
        </label>
        <span class="text-xl font-bold tracking-tight"
          >{{ i18n.brand }}<span class="text-primary">{{ i18n.version }}</span></span
        >
        <div class="avatar w-8 h-8 rounded-full overflow-hidden">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
        </div>
      </div>

      <!-- Header Section -->
      <header
        class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10"
        data-aos="fade-down"
      >
        <div>
          <h1 class="text-4xl font-extrabold tracking-tight text-base-content mb-2">
            {{ i18n.header.title }}
          </h1>
          <p class="text-base-content/40 font-medium">
            {{ i18n.header.subtitle }}
          </p>
        </div>
        <div>
          <button
            class="btn btn-primary rounded-xl px-6 font-bold gap-2 shadow-lg shadow-primary/20 capitalize"
          >
            <Icon icon="lucide:plus" class="text-sm" />
            {{ i18n.actions.add }}
          </button>
        </div>
      </header>

      <!-- Classrooms Table -->
      <div
        class="bg-base-100 backdrop-blur-xl shadow-2xl border border-base-content/5 rounded-[2.5rem] overflow-hidden"
        data-aos="fade-right"
        data-aos-delay="200"
      >
        <div class="overflow-x-auto">
          <table class="table table-lg w-full">
            <thead>
              <tr
                class="text-base-content/30 font-bold uppercase tracking-widest text-[10px] border-b border-base-content/5"
              >
                <th class="pl-12 py-8">{{ i18n.table.designation }}</th>
                <th class="py-8">{{ i18n.table.roomId }}</th>
                <th class="py-8">{{ i18n.table.utilization }}</th>
                <th class="pr-12 py-8 text-right">{{ i18n.table.actions }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="cls in classes"
                :key="cls.id"
                class="border-b border-base-content/5 last:border-0 hover:bg-base-content/[0.02] transition-colors"
              >
                <td class="pl-12 py-10 font-bold text-lg text-base-content/90">
                  {{ cls.class_designation }}
                </td>
                <td class="py-10 font-medium text-lg text-base-content/40">
                  {{ cls.room_id }}
                </td>
                <td class="py-10">
                  <div class="flex items-center gap-2">
                    <span class="font-bold text-lg text-base-content/90"
                      >{{ cls.utilization }}</span
                    >
                  </div>
                </td>
                <td class="pr-12 py-10 text-right">
                  <div
                    class="flex justify-end opacity-40 hover:opacity-100 transition-opacity"
                  >
                    <button
                      @click="() => openEditModal(cls)"
                      class="btn btn-ghost btn-sm btn-circle text-base-content"
                    >
                      <Icon icon="lucide:edit-3" class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <dialog v-if="isEditModalOpen" class="modal font-sans" :class="{ 'modal-open': isEditModalOpen }">
      <div class="modal-box rounded-[2rem] p-8 shadow-2xl bg-base-100 border border-base-content/5">
        <h3 class="font-extrabold text-2xl mb-6">Edit Class Data</h3>
        <form @submit.prevent="handleUpdate" class="flex flex-col gap-4">
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">Class Designation</span></label>
            <input v-model="editForm.class_designation" type="text" class="input input-bordered focus:border-primary rounded-xl" required />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">Room ID</span></label>
            <input v-model="editForm.room_id" type="text" class="input input-bordered focus:border-primary rounded-xl" required />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">Utilization (current/max)</span></label>
            <input v-model="editForm.utilization" type="text" class="input input-bordered focus:border-primary rounded-xl" required />
          </div>
          <div class="modal-action mt-6 gap-2">
            <button type="button" class="btn btn-ghost rounded-xl font-bold" @click="isEditModalOpen = false">Cancel</button>
            <button type="submit" class="btn btn-primary rounded-xl font-bold px-8 shadow-lg shadow-primary/20">Save Updates</button>
          </div>
        </form>
      </div>
      <form method="dialog" class="modal-backdrop bg-base-300/60 backdrop-blur-sm">
        <button @click="isEditModalOpen = false">close</button>
      </form>
    </dialog>

    <!-- Sidebar Component -->
    <Sidebar />
  </div>
</template>

<style scoped>
/* High performance scrolling */
.drawer-content {
  scrollbar-width: thin;
  scrollbar-color: hsl(var(--p) / 0.1) transparent;
}
</style>
