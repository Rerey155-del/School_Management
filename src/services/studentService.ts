import apiClient from './apiClient';

export interface StudentType {
  id?: number | string;
  name: string;
  nis: string;
  gender: string;
  class_name: string;
  enrollment_status: string;
  deleted_at?: string | null;
}

export const studentService = {
  async getAll(): Promise<StudentType[]> {
    const response = await apiClient.get('/students');
    return response.data.map((s: any) => ({
      ...s,
      class_name: s.class_name || '-',
      enrollment_status: s.enrollment_status || 'Active'
    }));
  },
  async getById(id: number | string): Promise<StudentType> {
    const response = await apiClient.get(`/students/${id}`);
    const s = response.data;
    return {
      ...s,
      class_name: s.class_name || '-',
      enrollment_status: s.enrollment_status || 'Active'
    };
  },
  async create(payload: Omit<StudentType, 'id'>) {
    const response = await apiClient.post('/students', payload);
    return response.data;
  },
  async update(id: number | string, payload: Partial<StudentType>) {
    const response = await apiClient.put(`/students/${id}`, payload);
    return response.data;
  },
  async updateStatus(id: number | string, statusField: string, newValue: any) {
    // Backend doesn't support PATCH, so we fetch the item and PUT the full payload
    const current = await this.getById(id);
    const updated = { ...current, [statusField]: newValue };
    const response = await apiClient.put(`/students/${id}`, updated);
    
    // Normalize response same as getAll/getById
    const s = response.data || updated; // In case PUT doesn't return data
    return {
      ...s,
      class_name: s.class_name || '-',
      enrollment_status: s.enrollment_status || 'Active'
    };
  }
};
