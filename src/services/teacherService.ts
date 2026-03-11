import apiClient from './apiClient';

export interface TeacherType {
  id?: number | string;
  name: string;
  nip: string;
  email: string;
  department: string;
  status: string;
}

let mockTeachers: TeacherType[] = [
  { id: 1, name: "Budi Santoso", nip: "198001012010011001", email: "budi.santoso@school.edu", department: "Mathematics", status: "Active" },
  { id: 2, name: "Siti Aminah", nip: "198502022012022002", email: "siti.aminah@school.edu", department: "Science", status: "Active" }
];

export const teacherService = {
  async getAll(): Promise<TeacherType[]> {
    await new Promise(r => setTimeout(r, 500));
    return [...mockTeachers];
  },
  async getById(id: number | string): Promise<TeacherType> {
    await new Promise(r => setTimeout(r, 500));
    const found = mockTeachers.find(t => String(t.id) === String(id));
    if (!found) throw new Error("Teacher not found");
    return { ...found };
  },
  async create(payload: Omit<TeacherType, 'id'>) {
    await new Promise(r => setTimeout(r, 500));
    const newTeacher = { ...payload, id: Date.now() };
    mockTeachers.push(newTeacher);
    return { ...newTeacher };
  },
  async update(id: number | string, payload: Partial<TeacherType>) {
    await new Promise(r => setTimeout(r, 500));
    const index = mockTeachers.findIndex(t => String(t.id) === String(id));
    if (index === -1) throw new Error("Teacher not found");
    mockTeachers[index] = { ...mockTeachers[index], ...payload } as TeacherType;
    return { ...mockTeachers[index] };
  },
  async updateStatus(id: number | string, statusField: string, newValue: any) {
    await new Promise(r => setTimeout(r, 500));
    const index = mockTeachers.findIndex(t => String(t.id) === String(id));
    if (index === -1) throw new Error("Teacher not found");
    (mockTeachers[index] as any)[statusField] = newValue;
    return { ...mockTeachers[index] };
  }
};
