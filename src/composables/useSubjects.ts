import { ref } from 'vue'

export function useSubjects() {
  const subjects = ref([
    { id: 1, name: "Mathematics (Advanced)", code: "MATH-ADV-101", tags: ["Calculus", "Phase 1"] },
    { id: 2, name: "Theoretical Physics", code: "PHYS-THE-202", tags: ["Quantum", "Senior"] },
    { id: 3, name: "English Literature", code: "LANG-ENG-303", tags: ["Poetry", "Common"] },
    { id: 4, name: "Digital Arts & Design", code: "ARTS-DIG-404", tags: ["Creative", "Lab"] },
    { id: 5, name: "Informatics & AI", code: "TECH-INI-505", tags: ["Python", "Modern"] },
    { id: 6, name: "Organic Chemistry", code: "CHEM-ORG-606", tags: ["Science", "Lab"] },
    { id: 7, name: "World History", code: "HIST-WOR-707", tags: ["Social", "Phase 2"] },
    { id: 8, name: "Molecular Biology", code: "BIOL-MOL-808", tags: ["Genetics", "Senior"] },
    { id: 9, name: "Classical Music", code: "MUSI-CLA-909", tags: ["Arts", "Theory"] },
    { id: 10, name: "Global Sociology", code: "SOCI-GLO-010", tags: ["Social", "Advanced"] },
    { id: 11, name: "Physical Education", code: "PHED-GEN-111", tags: ["Health", "Sports"] },
    { id: 12, name: "Information Systems", code: "TECH-SYS-222", tags: ["Database", "IT"] },
    { id: 13, name: "Macro Economics", code: "ECON-MAC-333", tags: ["Business", "Phase 1"] },
    { id: 14, name: "Modern Geography", code: "GEOG-MOD-444", tags: ["Science", "Earth"] },
    { id: 15, name: "Philosophy 101", code: "PHIL-GEN-555", tags: ["Ethics", "Core"] }
  ]);

  const searchSubjects = async (query: string): Promise<string[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (!query) return subjects.value.map(s => s.name).slice(0, 10);
    
    return subjects.value
      .filter(s => s.name.toLowerCase().includes(query.toLowerCase()))
      .map(s => s.name);
  };

  return { subjects, searchSubjects }
}
