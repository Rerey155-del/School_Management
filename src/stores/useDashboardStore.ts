import { defineStore } from 'pinia';
import { useTeachers } from '@/composables/useTeachers';
import { useStudents } from '@/composables/useStudents';
import { useClasses } from '@/composables/useClasses';
import { useSubjects } from '@/composables/useSubjects';

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    isLoading: true,
    stats: [] as any[],
    academicEvents: [] as any[],
    chartData: null as any,
    chartOptions: null as any,
  }),
  actions: {
    async fetchDashboardData() {
      this.isLoading = true;
      
      // MENSIMULASIKAN DELAY FETCHING API selama 1.5 detik
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const { teachers } = useTeachers();
      const { students } = useStudents();
      const { classes } = useClasses();
      const { subjects } = useSubjects();

      this.stats = [
        { label: 'Total Guru', value: teachers.value.length, icon: 'fas fa-user-tie', color: 'text-primary', bg: 'bg-primary/10' },
        { label: 'Total Siswa', value: students.value.length, icon: 'fas fa-user-graduate', color: 'text-secondary', bg: 'bg-secondary/10' },
        { label: 'Kelas Aktif', value: classes.value.length, icon: 'fas fa-door-open', color: 'text-accent', bg: 'bg-accent/10' },
        { label: 'Total Subjects', value: subjects.value.length, icon: 'fas fa-book', color: 'text-info', bg: 'bg-info/10' }
      ];

      this.academicEvents = [
        { id: 1, title: 'Mid-term Exams Preparation', date: 'Oct 15 - Oct 22', type: 'Exam', color: 'primary' },
        { id: 2, title: 'Parent-Teacher Meeting', date: 'Oct 25, 09:00 AM', type: 'Meeting', color: 'secondary' },
        { id: 3, title: 'Inter-school Sport Day', date: 'Nov 02', type: 'Event', color: 'accent' },
        { id: 4, title: 'Science Fair Submission', date: 'Nov 05', type: 'Deadline', color: 'error' }
      ];

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

      this.isLoading = false;
    }
  }
});
