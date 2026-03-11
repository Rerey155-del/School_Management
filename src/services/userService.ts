import apiClient from './apiClient';
import type { UserType } from './authService';

export const userService = {
  async getAll(): Promise<UserType[]> {
    const response = await apiClient.get('/users');
    return response.data;
  },
  async getById(id: number | string): Promise<UserType> {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },
  async create(payload: Omit<UserType, 'id'>) {
    const response = await apiClient.post('/users', payload);
    return response.data;
  },
  async update(id: number | string, payload: Partial<UserType>) {
    const response = await apiClient.put(`/users/${id}`, payload);
    return response.data;
  },
  async updateStatus(id: number | string, statusField: string, newValue: any) {
    const current = await this.getById(id);
    const updated = { ...current, [statusField]: newValue };
    const response = await apiClient.put(`/users/${id}`, updated);
    return response.data;
  }
};
