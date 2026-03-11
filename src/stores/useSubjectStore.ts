import { defineStore } from 'pinia';
import { subjectService, type SubjectType } from '@/services/subjectService';

/**
 * Store for managing Subject data.
 * Handles fetching, creating, updating, and status toggling of subjects.
 */
export const useSubjectStore = defineStore('subject', {
  state: () => ({
    /** List of all subject items */
    items: [] as SubjectType[],
    /** Detailed data for a single subject */
    detail: null as SubjectType | null,
    /** Loading status for the list of items */
    loadingList: false,
    /** Loading status for a single item detail */
    loadingDetail: false,
    /** Error message if any operation fails */
    error: null as string | null
  }),

  actions: {
    /**
     * Fetches the complete list of subjects from the service.
     */
    async fetchList(): Promise<void> {
      this.loadingList = true;
      this.error = null;
      try {
        this.items = await subjectService.getAll();
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch subjects';
        console.error('SubjectStore[fetchList]:', err);
      } finally {
        this.loadingList = false;
      }
    },

    /**
     * Fetches details for a specific subject by ID.
     * @param id - The unique identifier of the subject.
     */
    async fetchDetail(id: number | string): Promise<SubjectType> {
      this.loadingDetail = true;
      this.error = null;
      this.detail = null;
      try {
        this.detail = await subjectService.getById(id);
        return this.detail;
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch subject details';
        console.error(`SubjectStore[fetchDetail]: id=${id}`, err);
        throw err;
      } finally {
        this.loadingDetail = false;
      }
    },

    /**
     * Creates a new subject record.
     * @param payload - The subject data (excluding ID).
     */
    async createItem(payload: Omit<SubjectType, 'id'>): Promise<SubjectType> {
      this.error = null;
      try {
        const newItem = await subjectService.create(payload);
        this.items.push(newItem);
        return newItem;
      } catch (err: any) {
        this.error = err.message || 'Failed to create subject';
        console.error('SubjectStore[createItem]:', err);
        throw err;
      }
    },

    /**
     * Updates an existing subject record.
     * @param id - The unique identifier of the subject.
     * @param payload - Partial subject data to update.
     */
    async updateItem(id: number | string, payload: Partial<SubjectType>): Promise<SubjectType> {
      this.error = null;
      try {
        const updatedItem = await subjectService.update(id, payload);
        const index = this.items.findIndex(i => String(i.id) === String(id));
        if (index !== -1) {
          this.items[index] = { ...this.items[index], ...updatedItem };
        }
        return updatedItem;
      } catch (err: any) {
        this.error = err.message || 'Failed to update subject';
        console.error(`SubjectStore[updateItem]: id=${id}`, err);
        throw err;
      }
    },

    /**
     * Toggles a specific status field for a subject.
     * @param id - The unique identifier of the subject.
     * @param statusField - The name of the field to update.
     * @param newValue - The new value for the field.
     */
    async toggleItemStatus(id: number | string, statusField: string, newValue: any): Promise<void> {
      this.error = null;
      try {
        await subjectService.updateStatus(id, statusField, newValue);
        const index = this.items.findIndex(i => String(i.id) === String(id));
        if (index !== -1) {
          (this.items[index] as any)[statusField] = newValue;
        }
      } catch (err: any) {
        this.error = err.message || 'Failed to update subject status';
        console.error(`SubjectStore[toggleStatus]: id=${id}, field=${statusField}`, err);
        throw err;
      }
    }
  }
});
