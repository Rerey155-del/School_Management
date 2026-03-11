import apiClient from './apiClient';

export interface SubjectAutocompleteOption {
  id: string | number;
  name: string;
}

export interface SubjectType {
  id?: number | string;
  subject_name: string;
  academic_code?: string;
  metadata?: string[] | string;
  status?: string;
  deleted_at?: string | null;
}

export const subjectService = {
  async getAll(): Promise<SubjectType[]> {
    const response = await apiClient.get('/subjects');
    return response.data;
  },
  async getById(id: number | string): Promise<SubjectType> {
    const response = await apiClient.get(`/subjects/${id}`);
    return response.data;
  },
  async create(payload: Omit<SubjectType, 'id'>) {
    const response = await apiClient.post('/subjects', payload);
    return response.data;
  },
  async update(id: number | string, payload: Partial<SubjectType>) {
    const response = await apiClient.put(`/subjects/${id}`, payload);
    return response.data;
  },
  async updateStatus(id: number | string, statusField: string, newValue: any) {
    const response = await apiClient.patch(`/subjects/${id}`, { [statusField]: newValue });
    return response.data;
  },
  async autocompleteSubjects(query: string): Promise<SubjectAutocompleteOption[]> {
    const data = await this.getAll();
    return data
      .filter(s => s.subject_name.toLowerCase().includes(query.toLowerCase()))
      .map(s => ({ id: s.id as string | number, name: s.subject_name }));
  }
};
