import apiClient from './apiClient';

export interface TeacherType {
  id?: number | string;
  name: string;
  nip: string;
  email: string;
  department: string;
  status: string;
  deleted_at?: string | null;
}

export const teacherService = {
  async getAll(): Promise<TeacherType[]> {
    const response = await apiClient.get('/teachers');
    return response.data;
  },
  async getById(id: number | string): Promise<TeacherType> {
    const response = await apiClient.get(`/teachers/${id}`);
    return response.data;
  },
  async create(payload: Omit<TeacherType, 'id'>) {
    const response = await apiClient.post('/teachers', payload);
    return response.data;
  },
  async update(id: number | string, payload: Partial<TeacherType>) {
    const response = await apiClient.put(`/teachers/${id}`, payload);
    return response.data;
  },
  async updateStatus(id: number | string, statusField: string, newValue: any) {
    const current = await this.getById(id);
    const updated = { ...current, [statusField]: newValue };
    const response = await apiClient.put(`/teachers/${id}`, updated);
    return response.data || updated;
  }
};
