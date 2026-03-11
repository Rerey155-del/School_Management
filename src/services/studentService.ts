import apiClient from './apiClient';

export interface StudentType {
  id?: number | string;
  name: string;
  nis: string;
  gender: string;
  class_name: string;
  enrollment_status: string;
}

let mockStudents: StudentType[] = [
  { id: 1, name: "Andi Wijaya", nis: "20230001", gender: "Male", class_name: "10A", enrollment_status: "Active" },
  { id: 2, name: "Bunga Pertiwi", nis: "20230002", gender: "Female", class_name: "10B", enrollment_status: "Active" }
];

export const studentService = {
  async getAll(): Promise<StudentType[]> {
    await new Promise(r => setTimeout(r, 500));
    return [...mockStudents];
  },
  async getById(id: number | string): Promise<StudentType> {
    await new Promise(r => setTimeout(r, 500));
    const found = mockStudents.find(t => String(t.id) === String(id));
    if (!found) throw new Error("Student not found");
    return { ...found };
  },
  async create(payload: Omit<StudentType, 'id'>) {
    await new Promise(r => setTimeout(r, 500));
    const newItem = { ...payload, id: Date.now() };
    mockStudents.push(newItem);
    return { ...newItem };
  },
  async update(id: number | string, payload: Partial<StudentType>) {
    await new Promise(r => setTimeout(r, 500));
    const index = mockStudents.findIndex(t => String(t.id) === String(id));
    if (index === -1) throw new Error("Student not found");
    mockStudents[index] = { ...mockStudents[index], ...payload } as StudentType;
    return { ...mockStudents[index] };
  },
  async updateStatus(id: number | string, statusField: string, newValue: any) {
    await new Promise(r => setTimeout(r, 500));
    const index = mockStudents.findIndex(t => String(t.id) === String(id));
    if (index === -1) throw new Error("Student not found");
    (mockStudents[index] as any)[statusField] = newValue;
    return { ...mockStudents[index] };
  }
};
