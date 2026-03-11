import { defineStore } from 'pinia';
import { teacherService, type TeacherType } from '@/services/teacherService';

/**
 * Store for managing Teacher data.
 * Handles fetching, creating, updating, and status toggling of teachers.
 */
export const useTeacherStore = defineStore('teacher', {
  state: () => ({
    /** List of all teacher items */
    items: [] as TeacherType[],
    /** Detailed data for a single teacher */
    detail: null as TeacherType | null,
    /** Loading status for the list of items */
    loadingList: false,
    /** Loading status for a single item detail */
    loadingDetail: false,
    /** Error message if any operation fails */
    error: null as string | null
  }),

  actions: {
    /**
     * Fetches the complete list of teachers from the service.
     */
    async fetchList(): Promise<void> {
      this.loadingList = true;
      this.error = null;
      try {
        this.items = await teacherService.getAll();
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch teachers';
        console.error('TeacherStore[fetchList]:', err);
      } finally {
        this.loadingList = false;
      }
    },

    /**
     * Fetches details for a specific teacher by ID.
     * @param id - The unique identifier of the teacher.
     */
    async fetchDetail(id: number | string): Promise<TeacherType> {
      this.loadingDetail = true;
      this.error = null;
      this.detail = null;
      try {
        this.detail = await teacherService.getById(id);
        return this.detail;
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch teacher details';
        console.error(`TeacherStore[fetchDetail]: id=${id}`, err);
        throw err;
      } finally {
        this.loadingDetail = false;
      }
    },

    /**
     * Creates a new teacher record.
     * @param payload - The teacher data (excluding ID).
     */
    async createItem(payload: Omit<TeacherType, 'id'>): Promise<TeacherType> {
      this.error = null;
      try {
        const newItem = await teacherService.create(payload);
        this.items.push(newItem);
        return newItem;
      } catch (err: any) {
        this.error = err.message || 'Failed to create teacher';
        console.error('TeacherStore[createItem]:', err);
        throw err;
      }
    },

    /**
     * Updates an existing teacher record.
     * @param id - The unique identifier of the teacher.
     * @param payload - Partial teacher data to update.
     */
    async updateItem(id: number | string, payload: Partial<TeacherType>): Promise<TeacherType> {
      this.error = null;
      try {
        const updatedItem = await teacherService.update(id, payload);
        const index = this.items.findIndex(i => String(i.id) === String(id));
        if (index !== -1) {
          this.items[index] = { ...this.items[index], ...updatedItem };
        }
        return updatedItem;
      } catch (err: any) {
        this.error = err.message || 'Failed to update teacher';
        console.error(`TeacherStore[updateItem]: id=${id}`, err);
        throw err;
      }
    },

    /**
     * Toggles a specific status field for a teacher.
     * @param id - The unique identifier of the teacher.
     * @param statusField - The name of the field to update.
     * @param newValue - The new value for the field.
     */
    async toggleItemStatus(id: number | string, statusField: string, newValue: any): Promise<void> {
      this.error = null;
      try {
        await teacherService.updateStatus(id, statusField, newValue);
        const index = this.items.findIndex(i => String(i.id) === String(id));
        if (index !== -1) {
          (this.items[index] as any)[statusField] = newValue;
        }
      } catch (err: any) {
        this.error = err.message || 'Failed to update teacher status';
        console.error(`TeacherStore[toggleStatus]: id=${id}, field=${statusField}`, err);
        throw err;
      }
    }
  }
});
