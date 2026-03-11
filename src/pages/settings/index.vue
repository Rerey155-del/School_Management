<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import { useSettings } from "@/composables/useSettings";
import { useUsers } from "@/composables/useUsers";
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const { profile, preferences, security, updateProfile, changePassword } = useSettings();
const { users, updateUser } = useUsers();

const isUserModalOpen = ref(false);
const editUserForm = ref({
  id: 0,
  full_name: "",
  username: "",
  email: "",
  role: "",
  status: "",
  last_login: ""
});

const openUserModal = (user: any) => {
  editUserForm.value = { ...user };
  isUserModalOpen.value = true;
};

const handleUserUpdate = async () => {
  await updateUser(editUserForm.value.id, editUserForm.value);
  isUserModalOpen.value = false;
};

const i18n = {
  brand: "SCHOOL",
  version: "V3",
  header: {
    title: "Settings",
    subtitle: "Manage your account settings and application preferences."
  },
  profile: {
    title: "Admin Profile",
    fullName: "Full Name",
    username: "Username",
    email: "Email",
    password: "Password",
    update: "Update Profile"
  },
  preferences: {
    title: "App Preferences",
    darkMode: "Dark Mode",
    darkModeDesc: "Turn on dark theme for the dashboard."
  },
  security: {
    title: "Security Settings",
    lastChange: "Last changed",
    change: "Change Password"
  },
  usersTable: {
    title: "Admin Users Management",
    fullName: "Full Name",
    username: "Username",
    email: "Email",
    role: "Role",
    status: "Status",
    lastLogin: "Last Login",
    actions: "Actions"
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
          <i class="fas fa-bars text-xl"></i>
        </label>
        <span class="text-xl font-bold tracking-tight"
          >{{ i18n.brand }}<span class="text-primary">{{ i18n.version }}</span></span
        >
        <div class="avatar w-8 h-8 rounded-full overflow-hidden">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
        </div>
      </div>

      <!-- Header Section -->
      <header class="mb-10" data-aos="fade-down">
        <h1 class="text-4xl font-extrabold tracking-tight text-base-content mb-2">
          {{ i18n.header.title }}
        </h1>
        <p class="text-base-content/40 font-medium tracking-tight">
          {{ i18n.header.subtitle }}
        </p>
      </header>

      <div class="space-y-8 w-full">
        <!-- Admin Profile -->
        <section
          class="bg-base-100 backdrop-blur-xl shadow-2xl border border-base-content/5 rounded-[2.5rem] p-8 lg:p-12"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h2 class="text-xl font-bold text-base-content mb-8">{{ i18n.profile.title }}</h2>

          <div class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="form-control w-full">
                <label class="label mb-1">
                  <span
                    class="label-text text-base-content/40 font-bold uppercase text-[10px] tracking-widest"
                    >{{ i18n.profile.fullName }}</span
                  >
                </label>
                <input
                  type="text"
                  v-model="profile.full_name"
                  class="input bg-base-200 border-base-content/5 rounded-xl h-14 font-bold text-base-content/90 focus:border-primary/50"
                />
              </div>

              <div class="form-control w-full">
                <label class="label mb-1">
                  <span
                    class="label-text text-base-content/40 font-bold uppercase text-[10px] tracking-widest"
                    >{{ i18n.profile.username }}</span
                  >
                </label>
                <input
                  type="text"
                  v-model="profile.username"
                  class="input bg-base-200 border-base-content/5 rounded-xl h-14 font-bold text-base-content/90 focus:border-primary/50"
                />
              </div>

              <div class="form-control w-full">
                <label class="label mb-1">
                  <span
                    class="label-text text-base-content/40 font-bold uppercase text-[10px] tracking-widest"
                    >{{ i18n.profile.email }}</span
                  >
                </label>
                <input
                  type="email"
                  v-model="profile.email"
                  class="input bg-base-200 border-base-content/5 rounded-xl h-14 font-bold text-base-content/90 focus:border-primary/50"
                />
              </div>

              <div class="form-control w-full">
                <label class="label mb-1">
                  <span
                    class="label-text text-base-content/40 font-bold uppercase text-[10px] tracking-widest"
                    >{{ i18n.profile.password }}</span
                  >
                </label>
                <input
                  type="password"
                  v-model="profile.password"
                  class="input bg-base-200 border-base-content/5 rounded-xl h-14 font-bold text-base-content/90 focus:border-primary/50"
                  placeholder="Leave blank to keep current password"
                />
              </div>
            </div>

            <div class="pt-4">
              <button
                @click="updateProfile"
                class="btn btn-primary rounded-xl px-8 font-bold shadow-lg shadow-primary/20 capitalize"
              >
                {{ i18n.profile.update }}
              </button>
            </div>
          </div>
        </section>

        <!-- App Preferences -->
        <section
          class="bg-base-100 backdrop-blur-xl shadow-2xl border border-base-content/5 rounded-[2.5rem] p-8 lg:p-12"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <h2 class="text-xl font-bold text-base-content mb-8">{{ i18n.preferences.title }}</h2>

          <div class="flex items-center justify-between">
            <div>
              <p class="font-bold text-base-content/90">{{ i18n.preferences.darkMode }}</p>
              <p class="text-sm text-base-content/30 font-medium">
                {{ i18n.preferences.darkModeDesc }}
              </p>
            </div>
            <input
              type="checkbox"
              v-model="preferences.darkMode"
              class="toggle toggle-primary scale-125"
            />
          </div>
        </section>

        <!-- Security Settings -->
       

        <!-- Admin Users Management -->
        <section
          class="bg-base-100 backdrop-blur-xl shadow-2xl border border-base-content/5 rounded-[2.5rem] p-8 lg:p-12"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <h2 class="text-xl font-bold text-base-content mb-8">{{ i18n.usersTable.title }}</h2>

          <div class="overflow-x-auto">
            <table class="table table-lg w-full">
              <thead>
                <tr class="text-base-content/30 font-bold uppercase tracking-widest text-[10px] border-b border-base-content/5">
                  <th class="py-8">{{ i18n.usersTable.fullName }}</th>
                  <th class="py-8">{{ i18n.usersTable.username }}</th>
                  <th class="py-8">{{ i18n.usersTable.email }}</th>
                  <th class="py-8">{{ i18n.usersTable.role }}</th>
                  <th class="py-8">{{ i18n.usersTable.status }}</th>
                  <th class="py-8">{{ i18n.usersTable.lastLogin }}</th>
                  <th class="pr-12 py-8 text-right">{{ i18n.usersTable.actions }}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="user in users"
                  :key="user.id"
                  class="border-b border-base-content/5 last:border-0 hover:bg-base-content/[0.02] transition-colors"
                >
                  <td class="py-10 font-bold text-lg text-base-content/90">{{ user.full_name }}</td>
                  <td class="py-10 font-bold text-base-content/60">@{{ user.username }}</td>
                  <td class="py-10 text-base-content/60">{{ user.email }}</td>
                  <td class="py-10 font-bold text-primary">{{ user.role }}</td>
                  <td class="py-10">
                    <span
                      :class="`badge badge-sm font-black uppercase text-[10px] p-2 h-auto ${
                        user.status === 'Active' ? 'badge-success shadow-lg shadow-success/20' : 'badge-ghost opacity-40'
                      }`"
                    >
                      {{ user.status }}
                    </span>
                  </td>
                  <td class="py-10 text-base-content/40 text-sm font-mono">{{ user.last_login }}</td>
                  <td class="pr-12 py-10 text-right">
                    <div class="flex justify-end opacity-40 hover:opacity-100 transition-opacity">
                      <button
                        @click="() => openUserModal(user)"
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
        </section>
      </div>
    </div>

    <!-- Edit User Modal -->
    <dialog class="modal font-sans" :class="{ 'modal-open': isUserModalOpen }">
      <div class="modal-box rounded-[2rem] p-8 shadow-2xl bg-base-100 border border-base-content/5">
        <h3 class="font-extrabold text-2xl mb-6">Edit Admin Data</h3>
        <form @submit.prevent="handleUserUpdate" class="flex flex-col gap-4">
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">Full Name</span></label>
            <input v-model="editUserForm.full_name" type="text" class="input input-bordered focus:border-primary rounded-xl" required />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">Username</span></label>
            <input v-model="editUserForm.username" type="text" class="input input-bordered focus:border-primary rounded-xl" required />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">Email</span></label>
            <input v-model="editUserForm.email" type="email" class="input input-bordered focus:border-primary rounded-xl" required />
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">Role</span></label>
            <select v-model="editUserForm.role" class="select select-bordered focus:border-primary rounded-xl" required>
              <option value="Super Admin">Super Admin</option>
              <option value="Admin">Admin</option>
              <option value="Management">Management</option>
              <option value="Staff">Staff</option>
            </select>
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">Status</span></label>
            <select v-model="editUserForm.status" class="select select-bordered focus:border-primary rounded-xl" required>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-bold">Last Login</span></label>
            <input v-model="editUserForm.last_login" type="text" class="input input-bordered focus:border-primary rounded-xl" required />
          </div>
          <div class="modal-action mt-6 gap-2">
            <button type="button" class="btn btn-ghost rounded-xl font-bold" @click="isUserModalOpen = false">Cancel</button>
            <button type="submit" class="btn btn-primary rounded-xl font-bold px-8 shadow-lg shadow-primary/20">Save Updates</button>
          </div>
        </form>
      </div>
      <form method="dialog" class="modal-backdrop bg-base-300/60 backdrop-blur-sm">
        <button @click="isUserModalOpen = false">close</button>
      </form>
    </dialog>

    <!-- Sidebar Component -->
    <Sidebar />
  </div>
</template>

<style scoped>
.drawer-content {
  scrollbar-width: thin;
  scrollbar-color: hsl(var(--p) / 0.1) transparent;
}
</style>
