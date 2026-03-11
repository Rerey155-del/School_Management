import apiClient from './apiClient';

export interface SubjectAutocompleteOption {
  id: string | number;
  name: string;
}

export interface SubjectType {
  id?: number | string;
  subject_name: string;
  academic_code: string;
  metadata: string[] | string;
  status?: string; // Optional field for status changes
}

let mockSubjects: SubjectType[] = [
  { id: 1, subject_name: "Mathematics", academic_code: "MAT101", metadata: ["Core", "Science"], status: "Active" },
  { id: 2, subject_name: "English", academic_code: "ENG101", metadata: ["Core", "Language"], status: "Active" }
];

export const subjectService = {
  async autocompleteSubjects(query: string): Promise<SubjectAutocompleteOption[]> {
    await new Promise(r => setTimeout(r, 300));
    if (!query || query.length < 3) return [];
    return mockSubjects
      .filter(s => s.subject_name.toLowerCase().includes(query.toLowerCase()))
      .map(s => ({ id: s.id!, name: s.subject_name }));
  },
  async getAll(): Promise<SubjectType[]> {
    await new Promise(r => setTimeout(r, 500));
    return [...mockSubjects];
  },
  async getById(id: number | string): Promise<SubjectType> {
    await new Promise(r => setTimeout(r, 500));
    const found = mockSubjects.find(t => String(t.id) === String(id));
    if (!found) throw new Error("Subject not found");
    return { ...found };
  },
  async create(payload: Omit<SubjectType, 'id'>) {
    await new Promise(r => setTimeout(r, 500));
    const newItem = { ...payload, id: Date.now() };
    mockSubjects.push(newItem);
    return { ...newItem };
  },
  async update(id: number | string, payload: Partial<SubjectType>) {
    await new Promise(r => setTimeout(r, 500));
    const index = mockSubjects.findIndex(t => String(t.id) === String(id));
    if (index === -1) throw new Error("Subject not found");
    mockSubjects[index] = { ...mockSubjects[index], ...payload } as SubjectType;
    return { ...mockSubjects[index] };
  },
  async updateStatus(id: number | string, statusField: string, newValue: any) {
    await new Promise(r => setTimeout(r, 500));
    const index = mockSubjects.findIndex(t => String(t.id) === String(id));
    if (index === -1) throw new Error("Subject not found");
    (mockSubjects[index] as any)[statusField] = newValue;
    return { ...mockSubjects[index] };
  }
};
