import apiClient from './apiClient';

export interface TeacherAutocompleteOption {
  id: string | number;
  name: string;
}

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
  async getAll(params?: { page?: number; limit?: number; search?: string }): Promise<TeacherType[]> {
    const response = await apiClient.get('/teachers', { params });
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
  },
  async autocompleteTeachers(query: string): Promise<TeacherAutocompleteOption[]> {
    const data = await this.getAll();
    return data
      .filter(t => t.name.toLowerCase().includes(query.toLowerCase()))
      .map(t => ({ id: t.id!, name: t.name }));
  }
};
