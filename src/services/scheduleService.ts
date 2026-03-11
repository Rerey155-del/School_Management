import apiClient from './apiClient';

export interface ScheduleType {
  id?: number | string;
  class_name: string;
  day: string;
  period_duration: string;
  instructor: string;
  subject: string;
  status?: string;
  deleted_at?: string | null;
}

export const scheduleService = {
  async getAll(): Promise<ScheduleType[]> {
    const response = await apiClient.get('/schedules');
    return response.data;
  },
  async getById(id: number | string): Promise<ScheduleType> {
    const response = await apiClient.get(`/schedules/${id}`);
    return response.data;
  },
  async create(payload: Omit<ScheduleType, 'id'>) {
    const response = await apiClient.post('/schedules', payload);
    return response.data;
  },
  async update(id: number | string, payload: Partial<ScheduleType>) {
    const response = await apiClient.put(`/schedules/${id}`, payload);
    return response.data;
  },
  async updateStatus(id: number | string, statusField: string, newValue: any) {
    const current = await this.getById(id);
    const updated = { ...current, [statusField]: newValue };
    const response = await apiClient.put(`/schedules/${id}`, updated);
    return response.data || updated;
  }
};
