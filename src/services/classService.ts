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
}

let mockClasses: ClassType[] = [
  { id: 1, class_designation: "Class 10A", room_id: "RM-101", utilization: "30/40", status: "Active" },
  { id: 2, class_designation: "Class 10B", room_id: "RM-102", utilization: "32/40", status: "Active" }
];

export const classService = {
  async autocompleteClasses(query: string): Promise<ClassAutocompleteOption[]> {
    await new Promise(r => setTimeout(r, 300));
    if (!query || query.length < 3) return [];
    return mockClasses
      .filter(c => c.class_designation.toLowerCase().includes(query.toLowerCase()))
      .map(c => ({ id: c.id!, name: c.class_designation }));
  },
  async getAll(): Promise<ClassType[]> {
    await new Promise(r => setTimeout(r, 500));
    return [...mockClasses];
  },
  async getById(id: number | string): Promise<ClassType> {
    await new Promise(r => setTimeout(r, 500));
    const found = mockClasses.find(t => String(t.id) === String(id));
    if (!found) throw new Error("Class not found");
    return { ...found };
  },
  async create(payload: Omit<ClassType, 'id'>) {
    await new Promise(r => setTimeout(r, 500));
    const newItem = { ...payload, id: Date.now() };
    mockClasses.push(newItem);
    return { ...newItem };
  },
  async update(id: number | string, payload: Partial<ClassType>) {
    await new Promise(r => setTimeout(r, 500));
    const index = mockClasses.findIndex(t => String(t.id) === String(id));
    if (index === -1) throw new Error("Class not found");
    mockClasses[index] = { ...mockClasses[index], ...payload } as ClassType;
    return { ...mockClasses[index] };
  },
  async updateStatus(id: number | string, statusField: string, newValue: any) {
    await new Promise(r => setTimeout(r, 500));
    const index = mockClasses.findIndex(t => String(t.id) === String(id));
    if (index === -1) throw new Error("Class not found");
    (mockClasses[index] as any)[statusField] = newValue;
    return { ...mockClasses[index] };
  }
};
