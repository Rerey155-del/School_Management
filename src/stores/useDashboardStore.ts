import { defineStore } from 'pinia';
import { useTeacherStore } from './useTeacherStore';
import { useStudentStore } from './useStudentStore';
import { useClassStore } from './useClassStore';
import { useSubjectStore } from './useSubjectStore';
import { useScheduleStore } from './useScheduleStore';
import { useAuthStore } from './useAuthStore';

/**
 * Interface representing the state of the dashboard store.
 */
interface DashboardState {
  /** Indicates if the dashboard data is currently being fetched */
  isLoading: boolean;
  /** Currently active dashboard language */
  locale: 'en' | 'id';
  /** Statistics cards data (totals for teachers, students, etc.) */
  stats: any[];
  /** List of upcoming academic events */
  academicEvents: any[];
  /** Breakdown of school summary data */
  schoolSummary: { totalAdmins: number; activeTeachers: number; avgStudentsPerClass: number };
  /** List of recent system audit logs */
  auditLogs: any[];
  /** Aggregated active vs inactive teacher status data */
  teacherStatus: { active: number; inactive: number; total: number };
  /** Data object for the dashboard chart */
  chartData: any;
  /** Configuration options for the dashboard chart */
  chartOptions: any;
}

/**
 * Store for managing Dashboard-specific data.
 * Aggregates data from other stores to provide a high-level overview.
 */
export const useDashboardStore = defineStore('dashboard', {
  state: (): DashboardState => ({
    isLoading: true,
    locale: 'id',
    stats: [],
    academicEvents: [],
    schoolSummary: { totalAdmins: 0, activeTeachers: 0, avgStudentsPerClass: 0 },
    auditLogs: [],
    teacherStatus: { active: 0, inactive: 0, total: 0 },
    chartData: null,
    chartOptions: null,
  }),

  actions: {
    /**
     * Aggregates and fetches data from multiple stores to populate the dashboard.
     * Simulates fetching of events and chart data as well.
     */
    async fetchDashboardData(): Promise<void> {
      this.isLoading = true;
      
      const teacherStore = useTeacherStore();
      const studentStore = useStudentStore();
      const classStore = useClassStore();
      const subjectStore = useSubjectStore();
      const scheduleStore = useScheduleStore();
      const authStore = useAuthStore();

      try {
        // Fetch all base data from real API via their respective stores
        await Promise.all([
          teacherStore.fetchList(),
          studentStore.fetchList(),
          classStore.fetchList(),
          subjectStore.fetchList(),
          scheduleStore.fetchList()
        ]);

        // Transform store counts into statistics objects
        this.stats = [
          { label: 'Total Guru', value: teacherStore.items.length, icon: 'fas fa-user-tie', color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Total Siswa', value: studentStore.items.length, icon: 'fas fa-user-graduate', color: 'text-secondary', bg: 'bg-secondary/10' },
          { label: 'Kelas Aktif', value: classStore.items.length, icon: 'fas fa-door-open', color: 'text-accent', bg: 'bg-accent/10' },
          { label: 'Total Subjects', value: subjectStore.items.length, icon: 'fas fa-book', color: 'text-info', bg: 'bg-info/10' }
        ];

        // Teacher status aggregation
        const activeCount = teacherStore.items.filter(t => t.status === 'Active').length;
        const totalTeachers = teacherStore.items.length;
        this.teacherStatus = {
          active: activeCount,
          inactive: totalTeachers - activeCount,
          total: totalTeachers
        };

        // School data summary aggregation
        this.schoolSummary = {
          totalAdmins: 1, // Assume 1 admin per initial mock layout instructions
          activeTeachers: activeCount,
          avgStudentsPerClass: classStore.items.length > 0 
            ? Math.round(studentStore.items.length / classStore.items.length) 
            : 0
        };

        // Real events from schedules
        const colors = ['primary', 'secondary', 'accent', 'info', 'warning'];
        this.academicEvents = scheduleStore.items
          .slice(0, 3)
          .map((sch, index) => ({
            id: sch.id,
            title: `${sch.subject} - ${sch.class_name}`,
            date: `${sch.day}, ${sch.period_duration}`,
            type: 'Class',
            color: colors[index % colors.length]
        }));

        try {
          const { systemService } = await import('@/services/systemService');
          this.auditLogs = await systemService.getRecentActivity();
        } catch (error) {
          console.error("Failed to fetch recent activity:", error);
          this.auditLogs = [];
        }

        // Mock chart configuration
        this.chartData = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'Average Attendance (%)',
              data: [95, 96, 94, 98, 97, 99, 98],
              fill: false,
              borderColor: '#4f46e5',
              tension: 0.4
            },
            {
              label: 'Average Grades',
              data: [82, 85, 87, 85, 88, 90, 91],
              fill: false,
              borderColor: '#ec4899',
              tension: 0.4
            }
          ]
        };

        this.chartOptions = {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            }
          }
        };

      } catch (err) {
        console.error('DashboardStore[fetchDashboardData]:', err);
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Toggles the global dashboard locale between ID and EN.
     */
    toggleLocale(): void {
      this.locale = this.locale === 'id' ? 'en' : 'id';
    }
  }
});
