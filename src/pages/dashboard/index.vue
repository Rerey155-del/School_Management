<script setup lang="ts">
import { onMounted, computed } from "vue";
import Sidebar from "@/components/Sidebar.vue";
import { useDashboardStore } from "@/stores/useDashboardStore";
import Skeleton from "primevue/skeleton";
import Chart from "primevue/chart";

const store = useDashboardStore();

onMounted(() => {
  store.fetchDashboardData();
});

const i18n = computed(() => {
  const isId = store.locale === 'id';
  return {
    brand: "SCHOOL",
    version: "V3",
    header: {
      title: isId ? "Dasbor Akademi" : "Academy Dashboard",
      subtitle: isId ? "Halo, Admin. Ini adalah ringkasan hari ini." : "Hello, Admin. Here's what's happening today."
    },
    user: {
      role: isId ? "Administrator" : "Administrator",
      department: isId ? "Kantor Kepala Sekolah" : "Principal Office",
      profile: isId ? "Profil Saya" : "My Profile",
      security: isId ? "Keamanan" : "Security",
      logout: isId ? "Keluar" : "Logout",
      account: isId ? "Pengaturan Akun" : "Account Settings"
    },
    actions: {
      addTeacher: isId ? "+ Tambah Guru" : "+ Add Teacher",
      addStudent: isId ? "+ Tambah Siswa" : "+ Add Student"
    },
    widgets: {
      performance: isId ? "Perkembangan Akademik" : "Academic Performance Progress",
      events: isId ? "Acara Mendatang" : "Upcoming Events",
      userStatus: isId ? "Status Pengguna (Guru)" : "User Status (Teachers)",
      auditLogs: isId ? "Aktivitas Terbaru" : "Recent Activities",
      activeText: isId ? "Aktif" : "Active",
      inactiveText: isId ? "Non-Aktif" : "Inactive"
    }
  };
});
</script>

<template>
  <div class="drawer lg:drawer-open bg-base-200 min-h-screen">
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
      <header
        class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10"
        data-aos="fade-down"
      >
        <div>
          <h1 class="text-4xl font-extrabold tracking-tight text-base-content">
            {{ i18n.header.title }}
          </h1>
          <p class="text-base-content/60 font-medium mt-1">
            {{ i18n.header.subtitle }}
          </p>
        </div>
        <div
          class="flex items-center gap-3 bg-base-100 p-2 rounded-2xl shadow-sm border border-base-200"
        >
          <!-- Quick Action Buttons -->
          <div class="hidden lg:flex gap-2 mr-2 border-r border-base-200 pr-4">
             <router-link to="/teachers/add" class="btn btn-sm btn-primary rounded-xl text-xs">{{ i18n.actions.addTeacher }}</router-link>
             <router-link to="/students/add" class="btn btn-sm btn-secondary rounded-xl text-xs">{{ i18n.actions.addStudent }}</router-link>
          </div>
          
          <!-- Global Language Switcher -->
          <div class="flex items-center gap-2 mr-2 border-r border-base-200 pr-4">
            <span class="text-xs font-bold font-mono" :class="store.locale === 'id' ? 'text-primary' : 'text-base-content/40'">ID</span>
            <input type="checkbox" class="toggle toggle-primary toggle-sm" :checked="store.locale === 'en'" @change="store.toggleLocale()" />
            <span class="text-xs font-bold font-mono" :class="store.locale === 'en' ? 'text-primary' : 'text-base-content/40'">EN</span>
          </div>

          <div class="hidden md:block px-4 text-right">
            <p class="text-sm font-bold">{{ i18n.user.role }}</p>
            <p
              class="text-xs text-base-content/50 uppercase tracking-widest font-bold"
            >
              {{ i18n.user.department }}
            </p>
          </div>
          <div class="dropdown dropdown-end">
            <div
              tabindex="0"
              role="button"
              class="btn btn-ghost btn-circle avatar border-2 border-primary/20 p-0.5"
            >
              <div class="w-10 rounded-full">
                <img
                  alt="Admin Profile"
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                />
              </div>
            </div>
            <ul
              tabindex="0"
              class="mt-3 z-[1] p-2 shadow-xl menu menu-sm dropdown-content bg-base-100 rounded-2xl w-56 border border-base-200"
            >
              <li class="menu-title">{{ i18n.user.account }}</li>
              <li>
                <a><i class="fas fa-user-circle"></i> {{ i18n.user.profile }}</a>
              </li>
              <li>
                <a><i class="fas fa-shield-alt"></i> {{ i18n.user.security }}</a>
              </li>
              <div class="divider my-1"></div>
              <li>
                <a class="text-error font-bold"
                  ><i class="fas fa-sign-out-alt"></i> {{ i18n.user.logout }}</a
                >
              </li>
            </ul>
          </div>
        </div>
      </header>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <!-- Skeleton Loading State -->
        <template v-if="store.isLoading">
          <div
            v-for="i in 4"
            :key="i"
            class="stat bg-base-100 shadow-sm border border-base-200 rounded-3xl p-6 relative overflow-hidden flex flex-col gap-4"
          >
            <Skeleton width="100%" height="4rem" borderRadius="1rem"></Skeleton>
            <Skeleton width="60%" height="2rem" borderRadius="1rem"></Skeleton>
          </div>
        </template>
        
        <!-- Fetched Content -->
        <template v-else>
          <div
            v-for="(stat, index) in store.stats"
            :key="stat.label"
            class="group hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div
              class="stat bg-base-100 shadow-sm border border-base-200 rounded-3xl p-6 relative overflow-hidden"
            >
              <div
                class="absolute -right-4 -bottom-4 opacity-[0.03] text-8xl transition-all group-hover:scale-110 group-hover:opacity-[0.05]"
              >
                <i :class="stat.icon"></i>
              </div>
              <div class="stat-figure" :class="stat.color">
                <div class="p-3 rounded-2xl" :class="stat.bg">
                  <i :class="stat.icon" class="text-2xl"></i>
                </div>
              </div>
              <div class="stat-title font-bold text-base-content/50">
                {{ stat.label }}
              </div>
              <div
                class="stat-value text-3xl font-black mt-1"
                :class="stat.color"
              >
                {{ stat.value }}
              </div>
            </div>
          </div>
        </template>
      </div>

      <!-- Main Content Area -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        
        <!-- Graphic / Chart Area & User Status -->
        <div class="lg:col-span-2 flex flex-col gap-6">
          <div 
            class="bg-base-100 rounded-[2.5rem] p-8 shadow-sm border border-base-200" 
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <h3 class="text-xl font-extrabold tracking-tight mb-8">{{ i18n.widgets.performance }}</h3>
            
            <template v-if="store.isLoading">
               <div class="flex flex-col gap-4">
                  <Skeleton width="100%" height="300px" borderRadius="1rem" />
               </div>
            </template>
            
            <template v-else>
               <Chart type="line" :data="store.chartData" :options="store.chartOptions" class="h-[300px] w-full" />
            </template>
          </div>

          <!-- User Status Widget -->
          <div class="bg-base-100 rounded-[2.5rem] p-8 shadow-sm border border-base-200" data-aos="fade-up">
            <h3 class="text-xl font-extrabold tracking-tight mb-6">{{ i18n.widgets.userStatus }}</h3>
            <template v-if="store.isLoading">
              <Skeleton width="100%" height="2rem" borderRadius="1rem" class="mb-4" />
              <div class="flex justify-between">
                 <Skeleton width="30%" height="2rem" borderRadius="1rem" />
                 <Skeleton width="30%" height="2rem" borderRadius="1rem" />
              </div>
            </template>
            <template v-else>
              <div class="w-full bg-base-200 rounded-full h-4 mb-4 overflow-hidden flex">
                <div class="bg-success h-4 transition-all duration-1000" :style="{ width: `${(store.teacherStatus.active / store.teacherStatus.total) * 100}%` }"></div>
                <div class="bg-error h-4 transition-all duration-1000" :style="{ width: `${(store.teacherStatus.inactive / store.teacherStatus.total) * 100}%` }"></div>
              </div>
              <div class="flex justify-between items-center text-sm font-bold">
                <div class="flex items-center gap-2">
                   <div class="w-3 h-3 rounded-full bg-success"></div>
                   <span>{{ store.teacherStatus.active }} {{ i18n.widgets.activeText }}</span>
                </div>
                <div class="flex items-center gap-2">
                   <div class="w-3 h-3 rounded-full bg-error"></div>
                   <span>{{ store.teacherStatus.inactive }} {{ i18n.widgets.inactiveText }}</span>
                </div>
              </div>
            </template>
          </div>
        </div>

        <!-- Academic Events & Audit Logs Area -->
        <div class="flex flex-col gap-6">
          <!-- Upcoming Events -->
          <div 
            class="bg-base-100 rounded-[2.5rem] p-8 shadow-sm border border-base-200" 
            data-aos="fade-left"
            data-aos-delay="300"
          >
            <h3 class="text-xl font-extrabold tracking-tight mb-6">{{ i18n.widgets.events }}</h3>
            
            <template v-if="store.isLoading">
               <div class="flex flex-col gap-5">
                  <Skeleton v-for="i in 4" :key="i" width="100%" height="4.5rem" borderRadius="1rem" />
               </div>
            </template>
            
            <template v-else>
               <div class="flex flex-col gap-4">
                  <div 
                    v-for="event in store.academicEvents" 
                    :key="event.id" 
                    class="flex flex-col gap-2 p-4 rounded-2xl border border-base-200 bg-base-50/50 hover:bg-base-200/50 transition-colors"
                  >
                    <div class="flex items-start justify-between">
                      <span class="font-bold text-base-content/90">{{ event.title }}</span>
                      <span :class="`badge badge-sm badge-${event.color}`">{{ event.type }}</span>
                    </div>
                    <div class="text-xs font-bold text-base-content/40 uppercase tracking-widest mt-1">
                      <i class="fas fa-calendar-alt mr-2"></i>{{ event.date }}
                    </div>
                  </div>
               </div>
            </template>
          </div>

          <!-- Audit Log (Recent Activities) -->
          <div class="bg-base-100 rounded-[2.5rem] p-8 shadow-sm border border-base-200 flex-1" data-aos="fade-left" data-aos-delay="400">
             <h3 class="text-xl font-extrabold tracking-tight mb-6">{{ i18n.widgets.auditLogs }}</h3>
             <template v-if="store.isLoading">
               <div class="flex flex-col gap-4">
                 <Skeleton v-for="i in 5" :key="i" width="100%" height="3.5rem" borderRadius="1rem" />
               </div>
             </template>
             <template v-else>
               <div class="flex flex-col gap-3">
                 <div v-for="log in store.auditLogs" :key="log.id" class="flex gap-3 items-start p-3 rounded-xl hover:bg-base-200/50 transition-colors">
                    <div :class="[
                      'w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1',
                      log.action === 'CREATE' ? 'bg-success/20 text-success' :
                      log.action === 'UPDATE' ? 'bg-info/20 text-info' :
                      'bg-error/20 text-error'
                    ]">
                      <i :class="[
                        'fas text-xs',
                        log.action === 'CREATE' ? 'fa-plus' :
                        log.action === 'UPDATE' ? 'fa-pen' :
                        'fa-trash'
                      ]"></i>
                    </div>
                    <div>
                       <p class="text-sm font-bold text-base-content">{{ log.entity }} {{ log.action }}</p>
                       <p class="text-xs text-base-content/60">{{ log.details }}</p>
                       <p class="text-[10px] text-base-content/40 mt-1 font-mono">{{ new Date(log.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}</p>
                    </div>
                 </div>
               </div>
             </template>
          </div>

        </div>

      </div>
    </div>

    <!-- Integrate Sidebar Component -->
    <Sidebar />
  </div>
</template>

<style scoped>
/* High performance scrolling */
.drawer-content {
  scrollbar-width: thin;
  scrollbar-color: hsl(var(--p) / 0.1) transparent;
}

/* Animations */
.group:hover .stat-figure {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    opacity: 0.8;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  100% {
    opacity: 0.8;
    transform: scale(1);
  }
}
</style>
