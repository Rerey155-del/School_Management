import apiClient from './apiClient';

export interface ClassAutocompleteOption {
  id: string | number;
  name: string;
}

export interface ClassType {
  id?: number | string;
  class_designation: string;
  room_id: string;
  utilization: string;
  status?: string;
  deleted_at?: string | null;
}

export const classService = {
  async getAll(): Promise<ClassType[]> {
    const response = await apiClient.get('/classes');
    return response.data;
  },
  async getById(id: number | string): Promise<ClassType> {
    const response = await apiClient.get(`/classes/${id}`);
    return response.data;
  },
  async create(payload: Omit<ClassType, 'id'>) {
    const response = await apiClient.post('/classes', payload);
    return response.data;
  },
  async update(id: number | string, payload: Partial<ClassType>) {
    const response = await apiClient.put(`/classes/${id}`, payload);
    return response.data;
  },
  async updateStatus(id: number | string, statusField: string, newValue: any) {
    const response = await apiClient.patch(`/classes/${id}`, { [statusField]: newValue });
    return response.data;
  },
  async autocompleteClasses(query: string): Promise<ClassAutocompleteOption[]> {
    const data = await this.getAll();
    return data
      .filter(c => c.class_designation.toLowerCase().includes(query.toLowerCase()))
      .map(c => ({ id: c.id as string | number, name: c.class_designation }));
  }
};
