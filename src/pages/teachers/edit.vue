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

const searchDepartments = async (query: string): Promise<string[]> => {
  const depts = ["Mathematics", "Physics", "Biology", "Chemistry", "Informatics", "English Literature", "Arts", "History", "Geography", "Physical Education"];
  await new Promise(resolve => setTimeout(resolve, 600));
  if (!query) return depts;
  return depts.filter(d => d.toLowerCase().includes(query.toLowerCase()));
};

// Mock initial data - in a real app, this would be fetched by ID
const teacher = ref({
  name: "Sarah Jones, M.Pd",
  nip: "198801202022031001",
  department: "Mathematics",
  email: "sarah.jones@school.v3",
  status: "Active",
});

const saveChanges = () => {
  console.log("Saving changes for teacher:", teacher.value);
  router.push("/teachers");
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
        <header class="flex items-center gap-4 mb-10">
          <button
            @click="goBack"
            class="btn btn-ghost btn-circle bg-base-content/5 border-base-content/10 hover:bg-base-content/10 text-base-content"
          >
            <Icon icon="lucide:arrow-left" class="text-xl" />
          </button>
          <div>
            <h1 class="text-3xl font-extrabold tracking-tight text-base-content">
              Edit Teacher Profile
            </h1>
            <p class="text-base-content/40 font-medium">
              Update credentials and institutional role.
            </p>
          </div>
        </header>

        <div class="max-w-full">
          <div
            class="bg-base-100/50 backdrop-blur-xl shadow-2xl border border-base-content/10 rounded-[2.5rem] p-8 lg:p-12"
          >
            <div class="flex items-center gap-6 mb-12">
              <div class="avatar placeholder">
                <div
                  class="bg-primary/20 text-primary font-black rounded-3xl w-24 h-24 text-3xl shadow-xl border-4 border-primary/10"
                >
                  <span>{{ teacher.name[0] }}</span>
                </div>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-base-content">{{ teacher.name }}</h2>
                <p class="text-base-content/40 font-mono tracking-tighter">
                  {{ teacher.nip }}
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="form-control w-full">
                <label class="label">
                  <span
                    class="label-text text-base-content/40 font-bold uppercase text-[10px] tracking-widest"
                    >Full Name</span
                  >
                </label>
                <input
                  type="text"
                  v-model="teacher.name"
                  class="input bg-base-200/50 border-base-content/10 rounded-xl h-14 font-bold text-base-content/90 focus:border-primary/50"
                />
              </div>

              <div class="form-control w-full">
                <label class="label">
                  <span
                    class="label-text text-base-content/40 font-bold uppercase text-[10px] tracking-widest"
                    >NIP / NIK</span
                  >
                </label>
                <input
                  type="text"
                  v-model="teacher.nip"
                  class="input bg-base-200/50 border-base-content/10 rounded-xl h-14 font-bold text-base-content/90 focus:border-primary/50"
                />
              </div>

              <Autocomplete
                v-model="teacher.department"
                label="Department"
                placeholder="Search departments..."
                :fetch-items="searchDepartments"
              />

              <div class="form-control w-full">
                <label class="label">
                  <span
                    class="label-text text-base-content/40 font-bold uppercase text-[10px] tracking-widest"
                    >Email Address</span
                  >
                </label>
                <input
                  type="email"
                  v-model="teacher.email"
                  class="input bg-base-200/50 border-base-content/10 rounded-xl h-14 font-bold text-base-content/90 focus:border-primary/50"
                />
              </div>

              <div class="form-control w-full">
                <label class="label">
                  <span
                    class="label-text text-base-content/40 font-bold uppercase text-[10px] tracking-widest"
                    >Status</span
                  >
                </label>
                <select
                  v-model="teacher.status"
                  class="select bg-base-200/50 border-base-content/10 rounded-xl h-14 font-bold text-base-content/90 focus:border-primary/50"
                >
                  <option>Active</option>
                  <option>Suspended</option>
                  <option>Non-Aktif</option>
                </select>
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
