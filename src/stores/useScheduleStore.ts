import { defineStore } from 'pinia';
import { scheduleService, type ScheduleType } from '@/services/scheduleService';

/**
 * Store for managing Schedule data.
 * Handles fetching, creating, updating, and status toggling of schedules.
 */
export const useScheduleStore = defineStore('schedule', {
  state: () => ({
    /** List of all schedule items */
    items: [] as ScheduleType[],
    /** Detailed data for a single schedule */
    detail: null as ScheduleType | null,
    /** Loading status for the list of items */
    loadingList: false,
    /** Loading status for a single item detail */
    loadingDetail: false,
    /** Error message if any operation fails */
    error: null as string | null
  }),

  actions: {
    /**
     * Fetches the complete list of schedules from the service.
     */
    async fetchList(): Promise<void> {
      this.loadingList = true;
      this.error = null;
      try {
        this.items = await scheduleService.getAll();
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch schedules';
        console.error('ScheduleStore[fetchList]:', err);
      } finally {
        this.loadingList = false;
      }
    },

    /**
     * Fetches details for a specific schedule by ID.
     * @param id - The unique identifier of the schedule.
     */
    async fetchDetail(id: number | string): Promise<ScheduleType> {
      this.loadingDetail = true;
      this.error = null;
      this.detail = null;
      try {
        this.detail = await scheduleService.getById(id);
        return this.detail;
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch schedule details';
        console.error(`ScheduleStore[fetchDetail]: id=${id}`, err);
        throw err;
      } finally {
        this.loadingDetail = false;
      }
    },

    /**
     * Creates a new schedule record.
     * @param payload - The schedule data (excluding ID).
     */
    async createItem(payload: Omit<ScheduleType, 'id'>): Promise<ScheduleType> {
      this.error = null;
      try {
        const newItem = await scheduleService.create(payload);
        this.items.push(newItem);
        return newItem;
      } catch (err: any) {
        this.error = err.message || 'Failed to create schedule';
        console.error('ScheduleStore[createItem]:', err);
        throw err;
      }
    },

    /**
     * Updates an existing schedule record.
     * @param id - The unique identifier of the schedule.
     * @param payload - Partial schedule data to update.
     */
    async updateItem(id: number | string, payload: Partial<ScheduleType>): Promise<ScheduleType> {
      this.error = null;
      try {
        const updatedItem = await scheduleService.update(id, payload);
        const index = this.items.findIndex(i => String(i.id) === String(id));
        if (index !== -1) {
          this.items[index] = { ...this.items[index], ...updatedItem };
        }
        return updatedItem;
      } catch (err: any) {
        this.error = err.message || 'Failed to update schedule';
        console.error(`ScheduleStore[updateItem]: id=${id}`, err);
        throw err;
      }
    },

    /**
     * Toggles a specific status field for a schedule.
     * @param id - The unique identifier of the schedule.
     * @param statusField - The name of the field to update.
     * @param newValue - The new value for the field.
     */
    async toggleItemStatus(id: number | string, statusField: string, newValue: any): Promise<void> {
      this.error = null;
      try {
        await scheduleService.updateStatus(id, statusField, newValue);
        const index = this.items.findIndex(i => String(i.id) === String(id));
        if (index !== -1) {
          (this.items[index] as any)[statusField] = newValue;
        }
      } catch (err: any) {
        this.error = err.message || 'Failed to update schedule status';
        console.error(`ScheduleStore[toggleStatus]: id=${id}, field=${statusField}`, err);
        throw err;
      }
    }
  }
});
