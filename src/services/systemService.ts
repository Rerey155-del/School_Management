import apiClient from './apiClient';

export interface MenuItem {
  name: string;
  path: string;
  icon: string;
}

export interface MenuSection {
  section: string;
  items: MenuItem[];
}

export interface AuditLog {
  id: number;
  title: string;
  description: string;
  date: string;
  user: string;
  color: string;
}

export const systemService = {
  // Fetch dynamic menu
  async getMenu(): Promise<MenuSection[]> {
    const response = await apiClient.get('/system/menu');
    return response.data;
  },

  // Fetch recent activity (audit logs)
  async getRecentActivity(): Promise<AuditLog[]> {
    const response = await apiClient.get('/system/audit-logs');
    return response.data;
  }
};
