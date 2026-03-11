import apiClient from './apiClient';

export interface ScheduleType {
  id?: number | string;
  class_name: string;
  day: string;
  period_duration: string;
  instructor: string;
  subject: string;
  status?: string;
}

let mockSchedules: ScheduleType[] = [
  { id: 1, class_name: "Class 10A", day: "Monday", period_duration: "08:00 - 09:30", instructor: "Budi Santoso", subject: "Mathematics", status: "Active" },
  { id: 2, class_name: "Class 10B", day: "Tuesday", period_duration: "10:00 - 11:30", instructor: "Siti Aminah", subject: "Science", status: "Active" }
];

export const scheduleService = {
  async getAll(): Promise<ScheduleType[]> {
    await new Promise(r => setTimeout(r, 500));
    return [...mockSchedules];
  },
  async getById(id: number | string): Promise<ScheduleType> {
    await new Promise(r => setTimeout(r, 500));
    const found = mockSchedules.find(t => String(t.id) === String(id));
    if (!found) throw new Error("Schedule not found");
    return { ...found };
  },
  async create(payload: Omit<ScheduleType, 'id'>) {
    await new Promise(r => setTimeout(r, 500));
    const newItem = { ...payload, id: Date.now() };
    mockSchedules.push(newItem);
    return { ...newItem };
  },
  async update(id: number | string, payload: Partial<ScheduleType>) {
    await new Promise(r => setTimeout(r, 500));
    const index = mockSchedules.findIndex(t => String(t.id) === String(id));
    if (index === -1) throw new Error("Schedule not found");
    mockSchedules[index] = { ...mockSchedules[index], ...payload } as ScheduleType;
    return { ...mockSchedules[index] };
  },
  async updateStatus(id: number | string, statusField: string, newValue: any) {
    await new Promise(r => setTimeout(r, 500));
    const index = mockSchedules.findIndex(t => String(t.id) === String(id));
    if (index === -1) throw new Error("Schedule not found");
    (mockSchedules[index] as any)[statusField] = newValue;
    return { ...mockSchedules[index] };
  }
};
