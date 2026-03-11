import { defineStore } from 'pinia';
import { classService, type ClassType } from '@/services/classService';

/**
 * Store for managing Class data.
 * Handles fetching, creating, updating, and status toggling of classes.
 */
export const useClassStore = defineStore('class', {
  state: () => ({
    /** List of all class items */
    items: [] as ClassType[],
    /** Detailed data for a single class */
    detail: null as ClassType | null,
    /** Loading status for the list of items */
    loadingList: false,
    /** Loading status for a single item detail */
    loadingDetail: false,
    /** Error message if any operation fails */
    error: null as string | null
  }),

  actions: {
    /**
     * Fetches the complete list of classes from the service.
     */
    async fetchList(): Promise<void> {
      this.loadingList = true;
      this.error = null;
      try {
        this.items = await classService.getAll();
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch classes';
        console.error('ClassStore[fetchList]:', err);
      } finally {
        this.loadingList = false;
      }
    },

    /**
     * Fetches details for a specific class by ID.
     * @param id - The unique identifier of the class.
     */
    async fetchDetail(id: number | string): Promise<ClassType> {
      this.loadingDetail = true;
      this.error = null;
      this.detail = null;
      try {
        this.detail = await classService.getById(id);
        return this.detail;
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch class details';
        console.error(`ClassStore[fetchDetail]: id=${id}`, err);
        throw err;
      } finally {
        this.loadingDetail = false;
      }
    },

    /**
     * Creates a new class record.
     * @param payload - The class data (excluding ID).
     */
    async createItem(payload: Omit<ClassType, 'id'>): Promise<ClassType> {
      this.error = null;
      try {
        const newItem = await classService.create(payload);
        this.items.push(newItem);
        return newItem;
      } catch (err: any) {
        this.error = err.message || 'Failed to create class';
        console.error('ClassStore[createItem]:', err);
        throw err;
      }
    },

    /**
     * Updates an existing class record.
     * @param id - The unique identifier of the class.
     * @param payload - Partial class data to update.
     */
    async updateItem(id: number | string, payload: Partial<ClassType>): Promise<ClassType> {
      this.error = null;
      try {
        const updatedItem = await classService.update(id, payload);
        const index = this.items.findIndex(i => String(i.id) === String(id));
        if (index !== -1) {
          this.items[index] = { ...this.items[index], ...updatedItem };
        }
        return updatedItem;
      } catch (err: any) {
        this.error = err.message || 'Failed to update class';
        console.error(`ClassStore[updateItem]: id=${id}`, err);
        throw err;
      }
    },

    /**
     * Toggles a specific status field for a class.
     * @param id - The unique identifier of the class.
     * @param statusField - The name of the field to update.
     * @param newValue - The new value for the field.
     */
    async toggleItemStatus(id: number | string, statusField: string, newValue: any): Promise<void> {
      this.error = null;
      try {
        await classService.updateStatus(id, statusField, newValue);
        const index = this.items.findIndex(i => String(i.id) === String(id));
        if (index !== -1) {
          (this.items[index] as any)[statusField] = newValue;
        }
      } catch (err: any) {
        this.error = err.message || 'Failed to update class status';
        console.error(`ClassStore[toggleStatus]: id=${id}, field=${statusField}`, err);
        throw err;
      }
    }
  }
});
