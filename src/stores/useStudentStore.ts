import { defineStore } from 'pinia';
import { studentService, type StudentType } from '@/services/studentService';

/**
 * Store for managing Student data.
 * Handles fetching, creating, updating, and status toggling of students.
 */
export const useStudentStore = defineStore('student', {
  state: () => ({
    /** List of all student items */
    items: [] as StudentType[],
    /** Detailed data for a single student */
    detail: null as StudentType | null,
    /** Loading status for the list of items */
    loadingList: false,
    /** Loading status for a single item detail */
    loadingDetail: false,
    /** Error message if any operation fails */
    error: null as string | null
  }),

  actions: {
    /**
     * Fetches the complete list of students from the service.
     */
    async fetchList(): Promise<void> {
      this.loadingList = true;
      this.error = null;
      try {
        this.items = await studentService.getAll();
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch students';
        console.error('StudentStore[fetchList]:', err);
      } finally {
        this.loadingList = false;
      }
    },

    /**
     * Fetches details for a specific student by ID.
     * @param id - The unique identifier of the student.
     */
    async fetchDetail(id: number | string): Promise<StudentType> {
      this.loadingDetail = true;
      this.error = null;
      this.detail = null;
      try {
        this.detail = await studentService.getById(id);
        return this.detail;
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch student details';
        console.error(`StudentStore[fetchDetail]: id=${id}`, err);
        throw err;
      } finally {
        this.loadingDetail = false;
      }
    },

    /**
     * Creates a new student record.
     * @param payload - The student data (excluding ID).
     */
    async createItem(payload: Omit<StudentType, 'id'>): Promise<StudentType> {
      this.error = null;
      try {
        const newItem = await studentService.create(payload);
        this.items.push(newItem);
        return newItem;
      } catch (err: any) {
        this.error = err.message || 'Failed to create student';
        console.error('StudentStore[createItem]:', err);
        throw err;
      }
    },

    /**
     * Updates an existing student record.
     * @param id - The unique identifier of the student.
     * @param payload - Partial student data to update.
     */
    async updateItem(id: number | string, payload: Partial<StudentType>): Promise<StudentType> {
      this.error = null;
      try {
        const updatedItem = await studentService.update(id, payload);
        const index = this.items.findIndex(i => String(i.id) === String(id));
        if (index !== -1) {
          this.items[index] = { ...this.items[index], ...updatedItem };
        }
        return updatedItem;
      } catch (err: any) {
        this.error = err.message || 'Failed to update student';
        console.error(`StudentStore[updateItem]: id=${id}`, err);
        throw err;
      }
    },

    /**
     * Toggles a specific status field for a student.
     * @param id - The unique identifier of the student.
     * @param statusField - The name of the field to update.
     * @param newValue - The new value for the field.
     */
    async toggleItemStatus(id: number | string, statusField: string, newValue: any): Promise<void> {
      this.error = null;
      try {
        await studentService.updateStatus(id, statusField, newValue);
        const index = this.items.findIndex(i => String(i.id) === String(id));
        if (index !== -1) {
          (this.items[index] as any)[statusField] = newValue;
        }
      } catch (err: any) {
        this.error = err.message || 'Failed to update student status';
        console.error(`StudentStore[toggleStatus]: id=${id}, field=${statusField}`, err);
        throw err;
      }
    }
  }
});
