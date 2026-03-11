import { defineStore } from 'pinia';
import { useTeacherStore } from './useTeacherStore';
import { useStudentStore } from './useStudentStore';
import { useClassStore } from './useClassStore';
import { useSubjectStore } from './useSubjectStore';

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

      try {
        // Fetch all base data from real API via their respective stores
        await Promise.all([
          teacherStore.fetchList(),
          studentStore.fetchList(),
          classStore.fetchList(),
          subjectStore.fetchList()
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

        // Mock events (These could also be moved to a separate service in the future)
        this.academicEvents = [
          { id: 1, title: 'Mid-term Exams Preparation', date: 'Oct 15 - Oct 22', type: 'Exam', color: 'primary' },
          { id: 2, title: 'Parent-Teacher Meeting', date: 'Oct 25, 09:00 AM', type: 'Meeting', color: 'secondary' },
          { id: 3, title: 'Inter-school Sport Day', date: 'Nov 02', type: 'Event', color: 'accent' },
          { id: 4, title: 'Science Fair Submission', date: 'Nov 05', type: 'Deadline', color: 'error' }
        ];

        // Mock Audit Logs
        this.auditLogs = [
          { id: 101, action: 'CREATE', entity: 'User', details: 'Added new teacher John Doe', timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString() },
          { id: 102, action: 'UPDATE', entity: 'Schedule', details: 'Modified Math class timings', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
          { id: 103, action: 'DELETE', entity: 'Student', details: 'Removed inactive student record', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() },
          { id: 104, action: 'CREATE', entity: 'Class', details: 'Created Class 11-Science', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
          { id: 105, action: 'UPDATE', entity: 'Settings', details: 'Administrator changed global locale', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() }
        ];

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
