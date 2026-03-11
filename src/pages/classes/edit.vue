<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Autocomplete from "@/components/Autocomplete.vue";
import EditSkeleton from "@/components/EditSkeleton.vue";
import { onMounted } from "vue";

const router = useRouter();
const isLoading = ref(true);

onMounted(() => {
  // Simulate API fetch delay
  setTimeout(() => {
    isLoading.value = false;
  }, 1200);
});

const searchRooms = async (query: string): Promise<string[]> => {
  const rooms = ["BLOCK-A-101", "BLOCK-A-102", "BLOCK-B-201", "BLOCK-B-202", "SCIENCE-LAB-1", "COMPUTER-LAB-A", "AUDITORIUM-MAIN"];
  await new Promise(resolve => setTimeout(resolve, 600));
  if (!query) return rooms;
  return rooms.filter(r => r.toLowerCase().includes(query.toLowerCase()));
};

// Mock initial data
const classroom = ref({
  name: "Class X - Science A",
  roomId: "BLOCK-A-102",
  capacity: 35,
});

const saveChanges = () => {
  console.log("Saving changes for class:", classroom.value);
  router.push("/classes");
};

const goBack = () => {
  router.back();
};
</script>

<template>
  <div class="drawer lg:drawer-open bg-base-200 min-h-screen font-sans">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />

    <div class="drawer-content flex flex-col p-6 lg:p-10">
      <EditSkeleton v-if="isLoading" />
      
      <template v-else>
        <!-- Mobile Navbar Toggle -->
        <div
          class="flex items-center justify-between lg:hidden mb-6 bg-base-100 p-4 rounded-2xl shadow-sm"
        >
          <label for="my-drawer-2" class="btn btn-ghost btn-circle drawer-button">
            <Icon icon="lucide:menu" class="text-xl" />
          </label>
          <span class="text-xl font-bold tracking-tight"
            >SCHOOL<span class="text-primary">V3</span></span
          >
        </div>

        <!-- Header Section -->
        <header class="flex items-center gap-4 mb-10" data-aos="fade-down">
          <button
            @click="goBack"
            class="btn btn-ghost btn-circle bg-base-content/5 border-base-content/10 hover:bg-base-content/10 text-base-content"
          >
            <Icon icon="lucide:arrow-left" class="text-xl" />
          </button>
          <div>
            <h1 class="text-3xl font-extrabold tracking-tight text-base-content">
              Edit Classroom Allocation
            </h1>
            <p class="text-base-content/40 font-medium">
              Manage physical room allocation and occupancy limits.
            </p>
          </div>
        </header>

        <div class="max-w-full">
          <div
            class="bg-base-100/50 backdrop-blur-xl shadow-2xl border border-base-content/10 rounded-[2.5rem] p-8 lg:p-12"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div class="flex items-center gap-6 mb-12">
              <div
                class="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center border border-primary/20 shadow-xl"
              >
                <Icon icon="lucide:school" class="text-4xl text-primary" />
              </div>
              <div>
                <h2 class="text-2xl font-bold text-base-content">
                  {{ classroom.name }}
                </h2>
                <p class="text-base-content/40 font-mono tracking-tighter">
                  {{ classroom.roomId }}
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="form-control w-full">
                <label class="label">
                  <span
                    class="label-text text-base-content/40 font-bold uppercase text-[10px] tracking-widest"
                    >Class Designation</span
                  >
                </label>
                <input
                  type="text"
                  v-model="classroom.name"
                  class="input bg-base-200/50 border-base-content/10 rounded-xl h-14 font-bold text-base-content/90 focus:border-primary/50"
                />
              </div>

              <Autocomplete
                v-model="classroom.roomId"
                label="Room ID"
                placeholder="Search rooms..."
                :fetch-items="searchRooms"
              />

              <div class="form-control w-full md:col-span-2">
                <label class="label">
                  <span
                    class="label-text text-base-content/40 font-bold uppercase text-[10px] tracking-widest"
                    >Total Capacity</span
                  >
                </label>
                <input
                  type="number"
                  v-model="classroom.capacity"
                  class="input bg-base-200/50 border-base-content/10 rounded-xl h-14 font-bold text-base-content/90 focus:border-primary/50"
                />
              </div>
            </div>

            <div class="divider opacity-5 my-12"></div>

            <div class="flex justify-end gap-4">
              <button
                @click="goBack"
                class="btn btn-ghost px-8 font-bold text-base-content/40 hover:text-base-content capitalize rounded-xl"
              >
                Cancel
              </button>
              <button
                @click="saveChanges"
                class="btn btn-primary px-10 font-bold shadow-lg shadow-primary/20 capitalize rounded-xl"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </template>
    </div>

    <Sidebar />
  </div>
</template>

<style scoped>
.drawer-content {
  scrollbar-width: thin;
  scrollbar-color: hsl(var(--p) / 0.1) transparent;
}
</style>
