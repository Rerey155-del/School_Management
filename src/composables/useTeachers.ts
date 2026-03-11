import { ref } from 'vue'

export function useTeachers() {
  const teachers = ref([
    { id: 1, name: "Sarah Jones, M.Pd", nip: "198801202022031001", email: "sarah.jones@school.v3", department: "Mathematics", status: "Active" },
    { id: 2, name: "Michael Smith, S.T", nip: "198505122015041002", email: "michael.smith@school.v3", department: "Physics", status: "Active" },
    { id: 3, name: "Emily Brown, M.Si", nip: "199002282023012003", email: "emily.brown@school.v3", department: "Biology", status: "Suspended" },
    { id: 4, name: "David Wilson, M.A", nip: "198211152010081004", email: "david.wilson@school.v3", department: "English Literature", status: "Active" },
    { id: 5, name: "Jessica Garcia, S.Sn", nip: "199207042022092005", email: "jessica.garcia@school.v3", department: "Arts", status: "Active" },
    { id: 6, name: "Robert Miller, M.Kom", nip: "198703192018021006", email: "robert.miller@school.v3", department: "Informatics", status: "Active" },
    { id: 7, name: "Linda Davis, M.Pd", nip: "198409252012052007", email: "linda.davis@school.v3", department: "Mathematics", status: "Active" },
    { id: 8, name: "James Taylor, S.Pd", nip: "198906142020031008", email: "james.taylor@school.v3", department: "Physical Education", status: "Active" },
    { id: 9, name: "Karen Martinez, M.Hum", nip: "199101102022102009", email: "karen.martinez@school.v3", department: "History", status: "Non-Aktif" },
    { id: 10, name: "Richard Anderson, S.Si", nip: "198608222016071010", email: "richard.anderson@school.v3", department: "Chemistry", status: "Active" },
    { id: 11, name: "Susan Thomas, M.Pd", nip: "198304052011032011", email: "susan.thomas@school.v3", department: "Indonesian", status: "Active" },
    { id: 12, name: "William Jackson, M.A", nip: "198110122010011012", email: "william.jackson@school.v3", department: "Sociology", status: "Active" },
    { id: 13, name: "Barbara White, S.Sn", nip: "199305182023022013", email: "barbara.white@school.v3", department: "Music", status: "Active" },
    { id: 14, name: "Christopher Harris, M.T", nip: "198812302021031014", email: "christopher.harris@school.v3", department: "Informatics", status: "Active" },
    { id: 15, name: "Margaret Martin, M.Si", nip: "198502142014052015", email: "margaret.martin@school.v3", department: "Geography", status: "Active" }
  ]);

  const searchTeachers = async (query: string): Promise<string[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (!query) return teachers.value.map(t => t.name).slice(0, 10);
    
    return teachers.value
      .filter(t => t.name.toLowerCase().includes(query.toLowerCase()))
      .map(t => t.name);
  };

  return { teachers, searchTeachers }
}
