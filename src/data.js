// src/data.js

// ==========================================
// 1. GRADING SYSTEMS
// ==========================================
export const GRADING_SYSTEMS = {
  "NEP2024": {
    labels: ['O', 'A+', 'A', 'B+', 'B', 'C', 'F', 'Ab', 'W'],
    points: { 'O': 10, 'A+': 9, 'A': 8, 'B+': 7, 'B': 6, 'C': 5, 'F': 0, 'Ab': 0, 'W': 0 },
    excludeCredits: ['W', 'X'] 
  },
  "R2020": {
    labels: ['S', 'A', 'B', 'C', 'D', 'E', 'F', 'Z', 'W'],
    points: { 'S': 10, 'A': 9, 'B': 8, 'C': 7, 'D': 6, 'E': 5, 'F': 0, 'Z': 0, 'W': 0 },
    excludeCredits: ['W', 'X']
  },
  "MTECH_R2024": {
    labels: ['S', 'A', 'B', 'C', 'D', 'E', 'F', 'Z', 'X'],
    points: { 'S': 10, 'A': 9, 'B': 8, 'C': 7, 'D': 6, 'E': 5, 'F': 0, 'Z': 0, 'X': 0 },
    excludeCredits: ['X', 'W'] 
  },
  "PG_R2020": {
    labels: ['S', 'A', 'B', 'C', 'D', 'E', 'F', 'Z'],
    points: { 'S': 10, 'A': 9, 'B': 8, 'C': 7, 'D': 6, 'E': 5, 'F': 0, 'Z': 0 },
    excludeCredits: ['W', 'X']
  }
};

// ==========================================
// 2. COLLEGE & PROGRAM HIERARCHY
// ==========================================
export const COLLEGES = [
  { id: 'PTU', label: 'Puducherry Technological University', type: 'complex' }, 
  { id: 'WEC', label: 'Women\'s Engineering College', type: 'simple', regulation: 'R2020', deptList: 'AFFILIATED_DEPARTMENTS' }, 
  { id: 'PKIET', label: 'PKIET (Karaikal)', type: 'simple', regulation: 'R2020', deptList: 'AFFILIATED_DEPARTMENTS' } 
];

export const PTU_LEVELS = [
  { id: 'UG', label: 'Undergraduate' },
  { id: 'PG', label: 'Postgraduate' }
];

// ==========================================
// 3. BATCHES / COURSES
// ==========================================
export const PTU_UG_BATCHES = [
  { id: '2025', label: 'Batch 2025-29', regulation: 'NEP2024' },
  { id: '2024', label: 'Batch 2024-28', regulation: 'NEP2024' },
  { id: '2023', label: 'Batch 2023-27', regulation: 'R2020' },
  { id: '2022', label: 'Batch 2022-26', regulation: 'R2020' }
];

export const AFFILIATED_BATCHES = [
  { id: '2025', label: 'Batch 2025-29', regulation: 'R2020' },
  { id: '2024', label: 'Batch 2024-28', regulation: 'R2020' },
  { id: '2023', label: 'Batch 2023-27', regulation: 'R2020' },
  { id: '2022', label: 'Batch 2022-26', regulation: 'R2020' }
];

export const PTU_PG_COURSES = [
  { id: 'MTECH', label: 'M.Tech', regulation: 'MTECH_R2024', deptList: 'MTECH_DEPARTMENTS' },
  { id: 'MCA', label: 'M.C.A.', regulation: 'PG_R2020', deptList: 'MCA_DEPARTMENTS' },
  { id: 'MBA', label: 'M.B.A.', regulation: 'PG_R2020', deptList: 'MBA_DEPARTMENTS' },
  { id: 'MSC', label: 'M.Sc.', regulation: 'PG_R2020', deptList: 'MSC_DEPARTMENTS' }
];

// ==========================================
// 4. DEPARTMENTS LISTS
// ==========================================

// 1. PTU UG (Strictly the 9 departments requested)
export const UG_DEPARTMENTS = [
  { id: 'CSE', name: 'Computer Science & Eng.', color: 'bg-blue-100 text-blue-600' },
  { id: 'IT', name: 'Information Technology', color: 'bg-sky-100 text-sky-600' },
  { id: 'ECE', name: 'Electronics & Comm.', color: 'bg-green-100 text-green-600' },
  { id: 'EEE', name: 'Electrical & Electronics', color: 'bg-yellow-100 text-yellow-600' },
  { id: 'EIE', name: 'Electronics & Instru.', color: 'bg-red-100 text-red-600' },
  { id: 'MECH', name: 'Mechanical Engineering', color: 'bg-orange-100 text-orange-600' },
  { id: 'CIVIL', name: 'Civil Engineering', color: 'bg-stone-100 text-stone-600' },
  { id: 'CHEM', name: 'Chemical Engineering', color: 'bg-teal-100 text-teal-600' },
  { id: 'MT', name: 'Mechatronics', color: 'bg-indigo-100 text-indigo-600' },
];

// 2. WEC & PKIET (Specific List: No Mech, Civil, Chem, EIE, MT)
export const AFFILIATED_DEPARTMENTS = [
  { id: 'CSE', name: 'Computer Science & Eng.', color: 'bg-blue-100 text-blue-600' },
  { id: 'IT', name: 'Information Technology', color: 'bg-sky-100 text-sky-600' },
  { id: 'ECE', name: 'Electronics & Comm.', color: 'bg-green-100 text-green-600' },
  { id: 'EEE', name: 'Electrical & Electronics', color: 'bg-yellow-100 text-yellow-600' },
  { id: 'BME', name: 'Biomedical Engineering', color: 'bg-pink-100 text-pink-600' },
  { id: 'PETRO', name: 'Petrochemical', color: 'bg-amber-100 text-amber-600' },
  { id: 'ARCH', name: 'Architectural', color: 'bg-purple-100 text-purple-600' },
  { id: 'AGRI', name: 'Agriculture', color: 'bg-emerald-100 text-emerald-600' },
  { id: 'ISE', name: 'Information Science', color: 'bg-violet-100 text-violet-600' }
];

export const MTECH_PARENTS = [
  { id: 'CSE', name: 'Computer Science (CSE)', color: 'bg-blue-600 text-white' },
  { id: 'IT', name: 'Information Technology (IT)', color: 'bg-sky-500 text-white' },
  { id: 'ECE', name: 'Electronics (ECE)', color: 'bg-green-600 text-white' },
  { id: 'EEE', name: 'Electrical (EEE)', color: 'bg-yellow-500 text-white' },
  { id: 'MECH', name: 'Mechanical', color: 'bg-orange-500 text-white' },
  { id: 'CIVIL', name: 'Civil Engineering', color: 'bg-stone-500 text-white' },
  { id: 'CHEM', name: 'Chemical', color: 'bg-teal-500 text-white' },
  { id: 'EIE', name: 'Instrumentation', color: 'bg-red-500 text-white' },
];

export const MTECH_DEPARTMENTS = [
  { id: 'MTECH_CSE_DS', name: 'Data Science', parentId: 'CSE', color: 'bg-blue-600 text-white' },
  { id: 'MTECH_CSE_IS', name: 'Information Security', parentId: 'CSE', color: 'bg-blue-700 text-white' },
  { id: 'MTECH_IT_IOT', name: 'Internet of Things (IoT)', parentId: 'IT', color: 'bg-sky-600 text-white' },
  { id: 'MTECH_ECE_WC', name: 'Wireless Communication', parentId: 'ECE', color: 'bg-green-700 text-white' },
  { id: 'MTECH_ECE_GEN', name: 'ECE (General)', parentId: 'ECE', color: 'bg-green-500 text-white' },
  { id: 'MTECH_EEE_EDC', name: 'Electrical Drives', parentId: 'EEE', color: 'bg-yellow-500 text-yellow-900' },
  { id: 'MTECH_MECH_PDM', name: 'Product Design', parentId: 'MECH', color: 'bg-orange-500 text-white' },
  { id: 'MTECH_MECH_ET', name: 'Energy Technology', parentId: 'MECH', color: 'bg-orange-600 text-white' },
  { id: 'MTECH_CIVIL_SE', name: 'Structural Engg', parentId: 'CIVIL', color: 'bg-stone-500 text-white' },
  { id: 'MTECH_CIVIL_EE', name: 'Environmental Engg', parentId: 'CIVIL', color: 'bg-emerald-600 text-white' },
  { id: 'MTECH_EIE_IE', name: 'Instrumentation', parentId: 'EIE', color: 'bg-red-500 text-white' },
  { id: 'MTECH_CHEM_CE', name: 'Chemical Engineering', parentId: 'CHEM', color: 'bg-teal-500 text-white' }
];

export const MCA_DEPARTMENTS = [
  { id: 'MCA_GEN', name: 'Computer Applications', color: 'bg-indigo-600 text-white' }
];

export const MBA_DEPARTMENTS = [
  { id: 'MBA_IEVD', name: 'Innovation & Venture Dev', color: 'bg-rose-600 text-white' },
  { id: 'MBA_IB', name: 'International Business', color: 'bg-rose-500 text-white' }
];

export const MSC_DEPARTMENTS = [
  { id: 'MSC_MAT', name: 'Materials Science', color: 'bg-cyan-600 text-white' }
];
// ==========================================
// 5. SYLLABUS CONTAINER
// ==========================================
export const SYLLABUS = {
  
  // ------------------------------------------------------
  // 1. PTU UG R2024 (NEP)
  // ------------------------------------------------------
  "NEP2024": {
    "CSE": {
      1: [
        { code: "MAUC101", name: "Mathematics I", credits: 4 },
        { code: "CSUC103", name: "Fundamentals of Computer Organization", credits: 4 },
        { code: "CYUC101", name: "Chemistry", credits: 3 },
        { code: "CSUC101", name: "Programming for Problem Solving", credits: 2 },
        { code: "HSUA101", name: "English for Communication", credits: 2 },
        { code: "GEUS102", name: "Basic Engineering Skills Lab II", credits: 3 },
        { code: "GEUV102", name: "Essence of Indian Traditional Knowledge", credits: 1 },
        { code: "CYUC102", name: "Chemistry Laboratory", credits: 1 },
        { code: "CSUC102", name: "Computer Programming Laboratory", credits: 1 }
      ],
      2: [
        { code: "MAUC102", name: "Mathematics II", credits: 4 },
        { code: "CSUC104", name: "Software Engineering", credits: 4 },
        { code: "PHUC101", name: "Physics", credits: 3 },
        { code: "MEUC101", name: "Engineering Graphics", credits: 3 },
        { code: "HSUA102", name: "Professional English", credits: 2 },
        { code: "GEUS102", name: "Basic Engineering Skills Lab I", credits: 3 },
        { code: "GEUV101", name: "NSS, Yoga and Health", credits: 1 },
        { code: "PHUC102", name: "Physics Laboratory", credits: 1 }
      ],
      3: [
        { code: "CSUC105", name: "Operating Systems", credits: 3 },
        { code: "CSUC106", name: "Data Structures", credits: 4 },
        { code: "CSUC107", name: "Python Programming", credits: 3 },
        { code: "ECUC130", name: "Fundamentals of VLSI System", credits: 4 },
        { code: "HSUA103", name: "Entrepreneurship", credits: 2 },
        { code: "GEUV104", name: "Universal Human Values", credits: 1 },
        { code: "CSUC108", name: "Operating Systems Laboratory", credits: 1.5 },
        { code: "CSUC109", name: "Data Structures Laboratory", credits: 1.5 },
        { code: "ECUC131", name: "VLSI System Laboratory", credits: 1.5 }
      ],
      4: [
        { code: "MAUC103", name: "Probability and Statistics", credits: 4 },
        { code: "CSUC110", name: "Design and Analysis of Algorithms", credits: 3 },
        { code: "CSUC111", name: "Database Systems", credits: 3 },
        { code: "CSUC112", name: "Object-Oriented Programming Languages", credits: 3 },
        { code: "HSUA104", name: "Foreign Language / Design Thinking", credits: 2 },
        { code: "GEUV103", name: "Environmental Education", credits: 1 },
        { code: "CSUC113", name: "Design and Analysis of Algorithms Lab", credits: 1.5 },
        { code: "CSUC114", name: "Database Systems Laboratory", credits: 1.5 },
        { code: "CSUC115", name: "OOP Languages Laboratory", credits: 1.5 }
      ],
      5: [
        { code: "CSUC116", name: "Computer Networks", credits: 3 },
        { code: "CSUC117", name: "Microprocessors and Microcontrollers", credits: 3 },
        { code: "CSUC118", name: "Mobile Application Development", credits: 3 },
        { code: "HSUA105", name: "Industrial Economics and Management", credits: 2 },
        { code: "CSUEXXX", name: "Professional Elective 1", credits: 4 },
        { code: "CSUC119", name: "Computer Networks Laboratory", credits: 1.5 },
        { code: "CSUC120", name: "Microprocessors Laboratory", credits: 1.5 },
        { code: "CSUC121", name: "Mobile Application Laboratory", credits: 1.5 }
      ],
      6: [
        { code: "CSUC122", name: "AI and Machine Learning", credits: 3 },
        { code: "CSUC123", name: "Full Stack Development", credits: 3 },
        { code: "CSUC124", name: "Principles of Cyber Security", credits: 3 },
        { code: "CSUCXXX", name: "Professional Elective 2", credits: 4 },
        { code: "CSUC125", name: "AI & ML Laboratory", credits: 1.5 },
        { code: "CSUC126", name: "Full Stack Development Laboratory", credits: 1.5 },
        { code: "CSUC127", name: "Security Tools Laboratory", credits: 1.5 },
        { code: "CSUC128", name: "Internship", credits: 2 }
      ],
      7: [
        { code: "CSUC129", name: "Deep Learning", credits: 4 },
        { code: "CSUC130", name: "High Performance Computing", credits: 3 },
        { code: "CSUC131", name: "Automata Theory and Compiler Design", credits: 4 },
        { code: "CSUCXXX", name: "Professional Elective 3", credits: 4 },
        { code: "CSUC132", name: "Mini Project", credits: 2 },
        { code: "CSUC133", name: "Comprehensive Viva", credits: 1 },
        { code: "CSUC134", name: "Deep Learning Laboratory", credits: 1.5 },
        { code: "CSUC135", name: "HPC Laboratory", credits: 1.5 }
      ],
      8: [
        { code: "CSUC136", name: "Project Work", credits: 8 }
      ]
    },
    "IT": {
      1: [
        { code: "MAUC101", name: "Mathematics I", credits: 4 },
        { code: "ITUC101", name: "Information Technology Essentials", credits: 4 },
        { code: "CYUC101", name: "Chemistry", credits: 3 },
        { code: "CSUC101", name: "Programming for Problem Solving", credits: 2 },
        { code: "HSUA101", name: "English for Communication", credits: 2 },
        { code: "GEUS102", name: "Basic Engineering Skills Lab II", credits: 3 },
        { code: "GEUV102", name: "Essence of Indian Traditional Knowledge", credits: 1 },
        { code: "CYUC102", name: "Chemistry Laboratory", credits: 1 },
        { code: "CSUC102", name: "Computer Programming Laboratory", credits: 1 }
      ],
      2: [
        { code: "MAUC102", name: "Mathematics II", credits: 4 },
        { code: "ITUC102", name: "Digital System Design", credits: 4 },
        { code: "PHUC101", name: "Physics", credits: 3 },
        { code: "MEUC101", name: "Engineering Graphics", credits: 3 },
        { code: "HSUA102", name: "Professional English", credits: 2 },
        { code: "GEUS102", name: "Basic Engineering Skills Lab I", credits: 3 },
        { code: "GEUV101", name: "NSS, Yoga and Health", credits: 1 },
        { code: "PHUC102", name: "Physics Laboratory", credits: 1 }
      ],
      3: [
        { code: "ITUC103", name: "Data Structures", credits: 4 },
        { code: "ITUC104", name: "OOP using C++ and Java", credits: 3 },
        { code: "ITUC105", name: "Operating Systems", credits: 3 },
        { code: "ITUC106", name: "Computer Architecture", credits: 4 },
        { code: "HSUA103", name: "Entrepreneurship", credits: 2 },
        { code: "GEUV104", name: "Universal Human Values", credits: 1 },
        { code: "ITUC107", name: "Data Structures Lab", credits: 1.5 },
        { code: "ITUC108", name: "OOP Lab", credits: 1.5 },
        { code: "ITUC109", name: "Operating Systems Lab", credits: 1.5 }
      ],
      4: [
        { code: "MAUC107", name: "Mathematics for Computing", credits: 4 },
        { code: "ITUC110", name: "Design and Analysis of Algorithms", credits: 3 },
        { code: "ITUC111", name: "Computer Networks", credits: 4 },
        { code: "ITUC112", name: "Information Coding Techniques", credits: 3 },
        { code: "HSUA104", name: "Design Thinking/Language", credits: 2 },
        { code: "GEUV103", name: "Environmental Education", credits: 1 },
        { code: "ITUC113", name: "Algorithms Lab", credits: 1.5 },
        { code: "ITUC114", name: "Computer Networks Lab", credits: 1.5 },
        { code: "ITUC115", name: "Python Programming Lab", credits: 1.5 }
      ],
      5: [
        { code: "ITUC116", name: "Software Engineering", credits: 4 },
        { code: "ITUC117", name: "Database Management Systems", credits: 3 },
        { code: "ITUC118", name: "Web Essentials", credits: 3 },
        { code: "HSUA105", name: "Industrial Economics and Management", credits: 2 },
        { code: "ITUEXXX", name: "Professional Elective 1", credits: 4 },
        { code: "ITUC119", name: "Mobile App Development Lab", credits: 1.5 },
        { code: "ITUC120", name: "DBMS Lab", credits: 1.5 },
        { code: "ITUC121", name: "Web Essentials Lab", credits: 1.5 }
      ],
      6: [
        { code: "ITUC122", name: "Data Mining and Warehousing", credits: 3 },
        { code: "ITUC123", name: "Information Security", credits: 3 },
        { code: "ITUC124", name: "AI and Machine Learning", credits: 3 },
        { code: "ITUEXXX", name: "Professional Elective 2", credits: 4 },
        { code: "ITUC125", name: "Data Mining Lab", credits: 1.5 },
        { code: "ITUC126", name: "AI & ML Lab", credits: 1.5 },
        { code: "ITUC127", name: "Data Visualization Lab", credits: 1.5 },
        { code: "ITUC128", name: "Internship", credits: 2 }
      ],
      7: [
        { code: "ITUC129", name: "Full Stack Web Development", credits: 3 },
        { code: "ITUC130", name: "Deep Learning", credits: 3 },
        { code: "ITUC131", name: "Automata and Compiler Design", credits: 4 },
        { code: "ITUEXXX", name: "Professional Elective 3", credits: 4 },
        { code: "ITUC132", name: "Mini Project", credits: 2 },
        { code: "ITUC133", name: "Full Stack Lab", credits: 2 },
        { code: "ITUC134", name: "Comprehensive Viva", credits: 1 }
      ],
      8: [
        { code: "ITUC135", name: "Project Work", credits: 8 }
      ]
    },
    "ECE": {
      1: [
        { code: "MAUC101", name: "Mathematics I", credits: 4 },
        { code: "ECUC101", name: "Electronic Devices and Circuits", credits: 4 },
        { code: "PHUC101", name: "Physics", credits: 3 },
        { code: "MEUC101", name: "Engineering Graphics", credits: 3 },
        { code: "HSUA101", name: "English for Communication", credits: 2 },
        { code: "GEUS101", name: "Basic Engineering Skills Laboratory - I", credits: 3 },
        { code: "GEUV101", name: "NSS, Yoga and Health", credits: 1 },
        { code: "PHUC102", name: "Physics Laboratory", credits: 1 }
      ],
      2: [
        { code: "MAUC102", name: "Mathematics II", credits: 4 },
        { code: "ECUC102", name: "Analog Communication", credits: 4 },
        { code: "CYUC101", name: "Chemistry", credits: 3 },
        { code: "CSUC101", name: "Programming for Problem Solving", credits: 2 },
        { code: "HSUA102", name: "Professional English", credits: 2 },
        { code: "GEUS102", name: "Basic Engineering Skills Laboratory - II", credits: 3 },
        { code: "GEUV102", name: "Essence of Indian Traditional Knowledge", credits: 1 },
        { code: "CYUC102", name: "Chemistry Laboratory", credits: 1 },
        { code: "CSUC102", name: "Computer Programming Laboratory", credits: 1 }
      ],
      3: [
        { code: "MAUC105", name: "Probability and Stochastic Processes", credits: 4 },
        { code: "ECUC103", name: "Circuits and Networks", credits: 4 },
        { code: "ECUC104", name: "Electronic Circuit Design", credits: 3 },
        { code: "ECUC105", name: "Digital System Design", credits: 3 },
        { code: "CSUC137", name: "Data Structures and Object-Oriented Programming", credits: 3 },
        { code: "HSUA103", name: "Entrepreneurship", credits: 2 },
        { code: "GEUV103", name: "Environmental Education", credits: 1 },
        { code: "ECUC106", name: "Electronic Devices and Circuit Design Laboratory", credits: 1.5 },
        { code: "CSUC138", name: "Data Structures and OOP Laboratory", credits: 1.5 }
      ],
      4: [
        { code: "ECUC107", name: "Signals and Systems", credits: 4 },
        { code: "ECUC108", name: "Control Systems Engineering", credits: 3 },
        { code: "ECUC109", name: "Electromagnetic Fields and Waveguides", credits: 3 },
        { code: "ECUC110", name: "Digital Communication", credits: 3 },
        { code: "HSUA104", name: "Modern Indian Language/Foreign Language/Design Thinking/Cybercrime and laws", credits: 2 },
        { code: "GEUV104", name: "Universal Human Values", credits: 1 },
        { code: "ECUC111", name: "Digital System Design Laboratory", credits: 1.5 },
        { code: "ECUC112", name: "Analog and Digital Communication Laboratory", credits: 1.5 }
      ],
      5: [
        { code: "ECUC113", name: "Digital Signal Processing", credits: 4 },
        { code: "ECUC114", name: "VLSI Design", credits: 4 },
        { code: "ECUC115", name: "Data Communication Networks", credits: 3 },
        { code: "HSUA105", name: "Industrial Economics and Management", credits: 2 },
        { code: "ECUEXXX", name: "Professional Elective 1", credits: 4 },
        { code: "ECUC116", name: "Digital Signal Processing Laboratory", credits: 1 },
        { code: "ECUC117", name: "VLSI Design Laboratory", credits: 1.5 },
        { code: "ECUC118", name: "Data Communication Networks Laboratory", credits: 1.5 }
      ],
      6: [
        { code: "ECUC119", name: "Microwave and Optical Engineering", credits: 3 },
        { code: "ECUC120", name: "Embedded System", credits: 3 },
        { code: "CSUC117", name: "Microprocessors and Microcontrollers", credits: 3 },
        { code: "ECUEXXX", name: "Professional Elective 2", credits: 4 },
        { code: "ECUC121", name: "Advanced Communication Laboratory", credits: 1.5 },
        { code: "ECUC122", name: "Embedded System Laboratory", credits: 1 },
        { code: "CSUC120", name: "Microprocessors and Microcontrollers Laboratory", credits: 1.5 },
        { code: "ECUC123", name: "Internship", credits: 2 }
      ],
      7: [
        { code: "ECUC124", name: "Wireless Communication", credits: 4 },
        { code: "ECUC125", name: "Information Theory and Coding", credits: 4 },
        { code: "ECUC126", name: "Artificial Intelligence and Machine Learning", credits: 4 },
        { code: "ECUEXXX", name: "Professional Elective 3", credits: 4 },
        { code: "ECUC127", name: "Mini Project", credits: 2 },
        { code: "ECUC128", name: "Comprehensive Viva", credits: 1 }
      ],
      8: [
        { code: "ECUC129", name: "Project Work", credits: 8 }
      ]
    },
    "MECH": {
      1: [
        { code: "MAUC101", name: "Mathematics I", credits: 4 },
        { code: "MEUC102", name: "Engineering Mechanics", credits: 4 },
        { code: "PHUC101", name: "Physics", credits: 3 },
        { code: "MEUC101", name: "Engineering Graphics", credits: 3 },
        { code: "HSUA101", name: "English for Communication", credits: 2 },
        { code: "GEUS101", name: "Basic Engineering Skills Lab I", credits: 3 },
        { code: "GEUV101", name: "NSS, Yoga and Health", credits: 1 },
        { code: "PHUC102", name: "Physics Laboratory", credits: 1 }
      ],
      2: [
        { code: "MAUC102", name: "Mathematics II", credits: 4 },
        { code: "MEUC103", name: "Engineering Thermodynamics", credits: 4 },
        { code: "CYUC101", name: "Chemistry", credits: 3 },
        { code: "CSUC101", name: "Programming for Problem Solving", credits: 2 },
        { code: "HSUA102", name: "Professional English", credits: 2 },
        { code: "GEUS102", name: "Basic Engineering Skills Lab II", credits: 3 },
        { code: "GEUV102", name: "Indian Traditional Knowledge", credits: 1 },
        { code: "CYUC102", name: "Chemistry Laboratory", credits: 1 },
        { code: "CSUC102", name: "Computer Programming Laboratory", credits: 1 }
      ],
      3: [
        { code: "MAUC104", name: "Transforms and PDE", credits: 4 },
        { code: "MEUC104", name: "Fluid Mechanics & Hydraulic Machines", credits: 4 },
        { code: "MEUC105", name: "Mechanics of Solids", credits: 4 },
        { code: "MEUC106", name: "Materials Technology", credits: 3 },
        { code: "MEUC107", name: "Machine Drawing and Drafting", credits: 3 },
        { code: "HSUA103", name: "Entrepreneurship", credits: 2 },
        { code: "GEUV103", name: "Environmental Education", credits: 1 },
        { code: "MEUC108", name: "Fluid Mechanics Lab", credits: 1 },
        { code: "MEUC109", name: "Material Testing Lab", credits: 1 }
      ],
      4: [
        { code: "MEUC110", name: "Renewable Energy Sources", credits: 3 },
        { code: "MEUC111", name: "Thermal Engineering I", credits: 4 },
        { code: "MEUC112", name: "Kinematics of Machines", credits: 4 },
        { code: "MEUC113", name: "Manufacturing Processes", credits: 3 },
        { code: "HSUA104", name: "Design Thinking/French", credits: 2 },
        { code: "GEUV104", name: "Universal Human Values", credits: 1 },
        { code: "MEUC114", name: "Dynamics of Machines Lab", credits: 1 },
        { code: "MEUC115", name: "Manufacturing Processes Lab", credits: 1 }
      ],
      5: [
        { code: "MEUC116", name: "Heat and Mass Transfer", credits: 4 },
        { code: "MEUC117", name: "Dynamics of Machines", credits: 4 },
        { code: "MEUC118", name: "Metrology and Measurements", credits: 4 },
        { code: "MEUC119", name: "Machining Processes", credits: 3 },
        { code: "MEUEXXX", name: "Professional Elective I", credits: 4 },
        { code: "MEUC120", name: "Heat Transfer Laboratory", credits: 1 },
        { code: "MEUC121", name: "Machining Processes Laboratory", credits: 1 }
      ],
      6: [
        { code: "MEUC122", name: "Thermal Engineering II", credits: 4 },
        { code: "MEUC123", name: "Design of Machine Elements", credits: 4 },
        { code: "HSUA105", name: "Industrial Economics & Mgmt", credits: 2 },
        { code: "MEUEXXX", name: "Professional Elective II", credits: 4 },
        { code: "MEUC124", name: "Thermal Engineering Lab", credits: 1 },
        { code: "MEUC125", name: "Metrology Lab", credits: 1 },
        { code: "MEUC126", name: "Internship", credits: 2 }
      ],
      7: [
        { code: "MEUC127", name: "Automobile Engineering", credits: 4 },
        { code: "MEUC128", name: "Computer Integrated Manufacturing", credits: 4 },
        { code: "MEUC129", name: "Industrial Engg & Safety", credits: 4 },
        { code: "MEUEXXX", name: "Professional Elective III", credits: 4 },
        { code: "MEUC130", name: "Modelling and Simulation Lab", credits: 1 },
        { code: "MEUC131", name: "Mini Project", credits: 2 },
        { code: "MEUC132", name: "Comprehensive Viva", credits: 1 }
      ],
      8: [
        { code: "MEUC133", name: "Project Work", credits: 8 }
      ]
    },
    "CIVIL": {
      1: [
        { code: "MAUC101", name: "Mathematics I", credits: 4 },
        { code: "CEUC101", name: "Applied Mechanics", credits: 4 },
        { code: "CYUC101", name: "Chemistry", credits: 3 },
        { code: "CSUC101", name: "Programming for Problem Solving", credits: 2 },
        { code: "HSUA101", name: "English for Communication", credits: 2 },
        { code: "GEUS102", name: "Basic Engineering Skills Lab II", credits: 3 },
        { code: "GEUV102", name: "Indian Traditional Knowledge", credits: 1 },
        { code: "CYUC102", name: "Chemistry Laboratory", credits: 1 },
        { code: "CSUC102", name: "Computer Programming Laboratory", credits: 1 }
      ],
      2: [
        { code: "MAUC102", name: "Mathematics II", credits: 4 },
        { code: "CEUC102", name: "Building Technology", credits: 4 },
        { code: "PHUC101", name: "Physics", credits: 3 },
        { code: "MEUC101", name: "Engineering Graphics", credits: 3 },
        { code: "HSUA102", name: "Professional English", credits: 2 },
        { code: "GEUS102", name: "Basic Engineering Skills Lab I", credits: 3 },
        { code: "GEUV101", name: "NSS, Yoga and Health", credits: 1 },
        { code: "PHUC102", name: "Physics Laboratory", credits: 1 }
      ],
      3: [
        { code: "CEUC103", name: "Mechanics of Fluids", credits: 4 },
        { code: "CEUC104", name: "Surveying and Geomatics", credits: 3 },
        { code: "CEUC105", name: "Mechanics of Solids", credits: 4 },
        { code: "CEUC106", name: "Concrete Technology", credits: 3 },
        { code: "HSUA103", name: "Entrepreneurship", credits: 2 },
        { code: "GEUV104", name: "Universal Human Values", credits: 1 },
        { code: "CEUC107", name: "Computer-Aided Civil Engg Drawing", credits: 1.5 },
        { code: "CEUC108", name: "Surveying Laboratory", credits: 1.5 }
      ],
      4: [
        { code: "CEUC109", name: "Mechanics of Materials", credits: 4 },
        { code: "MAUC103", name: "Numerical Methods and Statistics", credits: 4 },
        { code: "CEUC110", name: "Geotechnical Engineering", credits: 3 },
        { code: "CEUC111", name: "Hydraulics Engineering", credits: 3 },
        { code: "CEUC112", name: "Environmental Engineering", credits: 3 },
        { code: "HSUA104", name: "Design Thinking", credits: 2 },
        { code: "GEUV103", name: "Environmental Education", credits: 1 },
        { code: "CEUC113", name: "Materials Testing Lab I", credits: 1.5 },
        { code: "CEUC114", name: "Fluid Mechanics Laboratory", credits: 1.5 }
      ],
      5: [
        { code: "CEUC115", name: "Structural Analysis", credits: 4 },
        { code: "CEUC116", name: "Structural Concrete Design", credits: 4 },
        { code: "CEUC117", name: "Transportation Engineering", credits: 3 },
        { code: "HSUA105", name: "Industrial Economics and Management", credits: 2 },
        { code: "CEUEXXX", name: "Professional Elective 1", credits: 4 },
        { code: "CEUC118", name: "Materials Testing Lab II", credits: 1.5 },
        { code: "CEUC119", name: "Geotechnical Engineering Lab", credits: 1.5 }
      ],
      6: [
        { code: "CEUC120", name: "Hydrology & Irrigation Engg", credits: 3 },
        { code: "CEUC121", name: "Estimation Costing and Valuation", credits: 3 },
        { code: "CEUC122", name: "Design of Steel Structural Elements", credits: 4 },
        { code: "CEUEXXX", name: "Professional Elective 2", credits: 4 },
        { code: "CEUC123", name: "Environmental Engg Lab", credits: 1.5 },
        { code: "CEUC124", name: "Transportation Engg Lab", credits: 1.5 },
        { code: "CEUC125", name: "Internship", credits: 2 }
      ],
      7: [
        { code: "CEUC126", name: "Foundation Engineering", credits: 4 },
        { code: "CEUC127", name: "Construction Management", credits: 4 },
        { code: "CEUC128", name: "Industrial Waste Disposal", credits: 3 },
        { code: "CEUEXXX", name: "Professional Elective 3", credits: 4 },
        { code: "CEUC129", name: "Computer Aided Structural Design", credits: 2 },
        { code: "CEUC130", name: "Mini Project", credits: 2 },
        { code: "CEUC131", name: "Comprehensive Viva", credits: 1 }
      ],
      8: [
        { code: "CEUC132", name: "Project Work", credits: 8 }
      ]
    },
    "EEE": {
      1: [
        { code: "MAUC101", name: "Mathematics I", credits: 4 },
        { code: "EEUC101", name: "Elements of Electrical Engg", credits: 4 },
        { code: "CYUC101", name: "Chemistry", credits: 3 },
        { code: "CSUC101", name: "Programming for Problem Solving", credits: 2 },
        { code: "HSUA101", name: "English for Communication", credits: 2 },
        { code: "GEUS102", name: "Basic Engineering Skills Lab II", credits: 3 },
        { code: "GEUV102", name: "Indian Traditional Knowledge", credits: 1 },
        { code: "CYUC102", name: "Chemistry Laboratory", credits: 1 },
        { code: "CSUC102", name: "Computer Programming Laboratory", credits: 1 }
      ],
      2: [
        { code: "MAUC102", name: "Mathematics II", credits: 4 },
        { code: "EEUC102", name: "Electronic Devices and Circuits", credits: 4 },
        { code: "PHUC101", name: "Physics", credits: 3 },
        { code: "MEUC101", name: "Engineering Graphics", credits: 3 },
        { code: "HSUA102", name: "Professional English", credits: 2 },
        { code: "GEUS102", name: "Basic Engineering Skills Lab I", credits: 3 },
        { code: "GEUV101", name: "NSS, Yoga and Health", credits: 1 },
        { code: "PHUC102", name: "Physics Laboratory", credits: 1 }
      ],
      3: [
        { code: "MAUC104", name: "Transforms and PDE", credits: 4 },
        { code: "EEUC103", name: "Electric Circuit Analysis", credits: 3 },
        { code: "EEUC104", name: "Signals and Systems", credits: 4 },
        { code: "EEUC105", name: "Analog Electronics", credits: 3 },
        { code: "EEUC106", name: "DC Machines and Transformers", credits: 3 },
        { code: "HSUA103", name: "Entrepreneurship", credits: 2 },
        { code: "GEUV103", name: "Environmental Education", credits: 1 },
        { code: "EEUC107", name: "Electronic Devices Lab", credits: 1.5 },
        { code: "EEUC108", name: "DC Machines Lab", credits: 1.5 }
      ],
      4: [
        { code: "EEUC109", name: "Control Systems", credits: 4 },
        { code: "EEUC110", name: "Digital Electronics", credits: 3 },
        { code: "EEUC111", name: "AC Machines", credits: 3 },
        { code: "CSUC137", name: "Data Structures and OOP", credits: 3 },
        { code: "HSUA104", name: "Design Thinking", credits: 2 },
        { code: "GEUV104", name: "Universal Human Values", credits: 1 },
        { code: "EEUC112", name: "Digital Electronics Laboratory", credits: 1.5 },
        { code: "EEUC113", name: "AC Machines Laboratory", credits: 1.5 },
        { code: "CSUC138", name: "Data Structures Lab", credits: 1.5 }
      ],
      5: [
        { code: "EEUC114", name: "Power Electronics", credits: 3 },
        { code: "EEUC115", name: "Linear Integrated Circuits", credits: 3 },
        { code: "EEUC116", name: "Transmission and Distribution", credits: 3 },
        { code: "EEUC117", name: "Measurements and Instrumentation", credits: 3 },
        { code: "HSUA105", name: "Industrial Economics and Management", credits: 2 },
        { code: "EEUEXXX", name: "Professional Elective 1", credits: 4 },
        { code: "EEUC118", name: "Linear Integrated Circuits Lab", credits: 1.5 },
        { code: "EEUC119", name: "Measurements and Control Lab", credits: 1.5 }
      ],
      6: [
        { code: "EEUC120", name: "Power System Analysis", credits: 3 },
        { code: "EEUC121", name: "Microprocessors and Microcontrollers", credits: 3 },
        { code: "EEUC122", name: "Artificial Intelligence", credits: 3 },
        { code: "EEUEXXX", name: "Professional Elective 2", credits: 4 },
        { code: "EEUC123", name: "Microprocessors Laboratory", credits: 1.5 },
        { code: "EEUC124", name: "Power Electronics Laboratory", credits: 1.5 },
        { code: "EEUC125", name: "Internship", credits: 2 }
      ],
      7: [
        { code: "EEUC126", name: "Power System Operation & Control", credits: 3 },
        { code: "EEUC127", name: "Protection and Switchgear", credits: 3 },
        { code: "EEUC128", name: "Solid State Drives", credits: 3 },
        { code: "EEUEXXX", name: "Professional Elective 3", credits: 4 },
        { code: "EEUC129", name: "Power Systems Laboratory", credits: 1.5 },
        { code: "EEUC130", name: "Mini Project", credits: 2 },
        { code: "EEUC131", name: "Comprehensive Viva", credits: 1 }
      ],
      8: [
        { code: "EEUC132", name: "Project Work", credits: 8 }
      ]
    },
    "MT": {
      1: [
        { code: "MAUC101", name: "Mathematics I", credits: 4 },
        { code: "MTUC101", name: "Basics of Mechatronics", credits: 4 },
        { code: "PHUC101", name: "Physics", credits: 3 },
        { code: "MEUC101", name: "Engineering Graphics", credits: 3 },
        { code: "HSUA101", name: "English for Communication", credits: 2 },
        { code: "GEUS101", name: "Basic Engineering Skills Lab I", credits: 3 },
        { code: "GEUV101", name: "NSS, Yoga and Health", credits: 1 },
        { code: "PHUC102", name: "Physics Laboratory", credits: 1 }
      ],
      2: [
        { code: "MAUC102", name: "Mathematics II", credits: 4 },
        { code: "MTUC102", name: "Basics of Sensors and Measurements", credits: 4 },
        { code: "CYUC101", name: "Chemistry", credits: 3 },
        { code: "CSUC101", name: "Programming for Problem Solving", credits: 2 },
        { code: "HSUA101", name: "Professional English", credits: 2 },
        { code: "GEUS102", name: "Basic Engineering Skills Lab II", credits: 3 },
        { code: "GEUV102", name: "Indian Traditional Knowledge", credits: 1 },
        { code: "CYUC102", name: "Chemistry Laboratory", credits: 1 },
        { code: "CSUC102", name: "Computer Programming Laboratory", credits: 1 }
      ],
      3: [
        { code: "MAUC104", name: "Transforms and PDE", credits: 4 },
        { code: "MTUC103", name: "Manufacturing processes", credits: 3 },
        { code: "MTUC104", name: "Hydraulic and Pneumatic systems", credits: 3 },
        { code: "MTUC105", name: "Analog and Digital Electronics", credits: 3 },
        { code: "HSUA103", name: "Entrepreneurship", credits: 2 },
        { code: "GEUV103", name: "Environmental Education", credits: 1 },
        { code: "MTUC106", name: "Manufacturing processes Lab", credits: 1.5 },
        { code: "MTUC107", name: "Hydraulic and Pneumatic Systems Lab", credits: 1.5 },
        { code: "MTUC108", name: "Analog and Digital Electronics Lab", credits: 1.5 }
      ],
      4: [
        { code: "MTUC109", name: "Industrial Automation", credits: 4 },
        { code: "MTUC110", name: "Drone Technology and design", credits: 4 },
        { code: "CSUC137", name: "Data Structures and OOP", credits: 3 },
        { code: "MTUC111", name: "Micro controller and Embedded system", credits: 3 },
        { code: "HSUA104", name: "Design Thinking/Foreign Language", credits: 2 },
        { code: "GEUV104", name: "Universal Human Values", credits: 1 },
        { code: "MTUC112", name: "Industrial Automation Laboratory", credits: 1.5 },
        { code: "MTUC113", name: "Micro controller Laboratory", credits: 1.5 },
        { code: "CSUC138", name: "Data Structures Lab", credits: 1.5 }
      ],
      5: [
        { code: "MTUC114", name: "Control System", credits: 3 },
        { code: "MTUC115", name: "Automotive Electronics", credits: 4 },
        { code: "MTUEXXX", name: "Professional Elective I", credits: 4 },
        { code: "EEUC131", name: "Electric Motors and Power Electronics", credits: 3 },
        { code: "MTUC116", name: "Control System Laboratory", credits: 1.5 },
        { code: "MTUC117", name: "Automotive Electronics Laboratory", credits: 1.5 },
        { code: "MTUC118", name: "Drone Technology Laboratory", credits: 1.5 }
      ],
      6: [
        { code: "MTUC119", name: "Computer Integrated Manufacturing", credits: 3 },
        { code: "MTUC120", name: "Mechatronics System Design", credits: 4 },
        { code: "MTUC121", name: "Industrial Robotics", credits: 3 },
        { code: "MTUEXXX", name: "Professional Elective II", credits: 4 },
        { code: "HSUA105", name: "Industrial Economics Management", credits: 2 },
        { code: "MTUC122", name: "CIM Laboratory", credits: 1.5 },
        { code: "MTUC123", name: "System Integration Laboratory", credits: 1.5 },
        { code: "MTUC124", name: "Industrial Robotics Laboratory", credits: 1.5 },
        { code: "MTUC125", name: "Internship", credits: 2 }
      ],
      7: [
        { code: "MTUC126", name: "Machine Vision", credits: 3 },
        { code: "MTUC127", name: "Modeling and Simulation", credits: 3 },
        { code: "MTUC128", name: "Machine Learning in Mechatronics", credits: 3 },
        { code: "MTUEXXX", name: "Professional Elective III", credits: 4 },
        { code: "MTUC129", name: "Machine Vision Laboratory", credits: 1.5 },
        { code: "MTUC130", name: "Modeling and Simulation Laboratory", credits: 1.5 },
        { code: "MTUC131", name: "Mini Project", credits: 2 },
        { code: "MTUC132", name: "Comprehensive Viva", credits: 1 }
      ],
      8: [
        { code: "MTUC133", name: "Project Work", credits: 8 }
      ]
    },
    "CHEM": {
      1: [
        { code: "MAUC101", name: "Mathematics I", credits: 4 },
        { code: "CHUC101", name: "Basics of Chemical Engineering", credits: 4 },
        { code: "PHUC101", name: "Physics", credits: 3 },
        { code: "MEUC101", name: "Engineering Graphics", credits: 3 },
        { code: "HSUA101", name: "English for Communication", credits: 2 },
        { code: "GEUS101", name: "Basic Engineering Skills Lab I", credits: 3 },
        { code: "GEUV101", name: "NSS, Yoga and Health", credits: 1 },
        { code: "PHUC102", name: "Physics Laboratory", credits: 1 }
      ],
      2: [
        { code: "MAUC102", name: "Mathematics II", credits: 4 },
        { code: "CHUC102", name: "Process Calculations", credits: 4 },
        { code: "CYUC101", name: "Chemistry", credits: 3 },
        { code: "CSUC101", name: "Programming for Problem Solving", credits: 2 },
        { code: "HSUA101", name: "Professional English", credits: 2 },
        { code: "GEUS102", name: "Basic Engineering Skills Lab II", credits: 3 },
        { code: "GEUV102", name: "Indian Traditional Knowledge", credits: 1 },
        { code: "CYUC102", name: "Chemistry Laboratory", credits: 1 },
        { code: "CSUC102", name: "Computer Programming Laboratory", credits: 1 }
      ],
      3: [
        { code: "MAUC103", name: "Transforms and PDE", credits: 4 },
        { code: "CHUC103", name: "Chemical Engineering Thermodynamics", credits: 3 },
        { code: "CHUC104", name: "Chemical Engineering Fluid Mechanics", credits: 4 },
        { code: "CHUC105", name: "Process Heat Transfer", credits: 3 },
        { code: "CHUC106", name: "Mechanical Operations", credits: 3 },
        { code: "HSUA103", name: "Entrepreneurship", credits: 2 },
        { code: "GEUV103", name: "Environmental Education", credits: 1 },
        { code: "CHUC107", name: "Fluid Mechanics Lab", credits: 1.5 },
        { code: "CHUC108", name: "Process Heat Transfer Lab", credits: 1.5 }
      ],
      4: [
        { code: "CHUC109", name: "Basics of Mass Transfer", credits: 3 },
        { code: "CHUC110", name: "Chemical Reaction Engineering I", credits: 3 },
        { code: "CHUC111", name: "Chemical Process Industry", credits: 3 },
        { code: "CHUC112", name: "Chemical Engineering Practice", credits: 4 },
        { code: "HSUA104", name: "Design Thinking/Language", credits: 2 },
        { code: "GEUV104", name: "Universal Human Values", credits: 1 },
        { code: "CHUC113", name: "Mass Transfer Lab", credits: 1.5 },
        { code: "CHUC114", name: "Plant Simulation Lab", credits: 1.5 }
      ],
      5: [
        { code: "CHUC115", name: "Mass Transfer Operations", credits: 4 },
        { code: "CHUC116", name: "Chemical Reaction Engineering II", credits: 4 },
        { code: "CHUC117", name: "Process Equipment and Design", credits: 3 },
        { code: "HSUA105", name: "Industrial Economics and Management", credits: 2 },
        { code: "CHUE101", name: "Professional Elective 1", credits: 4 },
        { code: "CHUC118", name: "Equipment Design Lab", credits: 1.5 },
        { code: "CHUC119", name: "Reaction Engineering Lab", credits: 1.5 }
      ],
      6: [
        { code: "CHUC120", name: "Computational Methods", credits: 3 },
        { code: "CHUC121", name: "Process Dynamics and Control", credits: 4 },
        { code: "CHUC122", name: "Pollution Control", credits: 3 },
        { code: "CHUE101", name: "Professional Elective 2", credits: 4 },
        { code: "CHUC123", name: "Computational Lab", credits: 1.5 },
        { code: "CHUC124", name: "Process Control Lab", credits: 1.5 },
        { code: "CHUC125", name: "Internship", credits: 2 }
      ],
      7: [
        { code: "CHUC126", name: "Transport Phenomena", credits: 4 },
        { code: "CHUC127", name: "Process Engineering & Economics", credits: 4 },
        { code: "CHUC128", name: "Bio Process Engineering", credits: 4 },
        { code: "CHUE101", name: "Professional Elective 3", credits: 4 },
        { code: "CHUC129", name: "Mini Project", credits: 2 },
        { code: "CHUC130", name: "Comprehensive Viva", credits: 1 }
      ],
      8: [
        { code: "CHUC131", name: "Project Work", credits: 8 }
      ]
    },
    "EIE": {
      1: [
        { code: "MAUC101", name: "Mathematics I", credits: 4 },
        { code: "EIUC101", name: "Fundamentals of Instrumentation", credits: 4 },
        { code: "CYUC101", name: "Chemistry", credits: 3 },
        { code: "CSUC101", name: "Programming for Problem Solving", credits: 2 },
        { code: "HSUA101", name: "English for Communication", credits: 2 },
        { code: "GEUS102", name: "Basic Engineering Skills Lab II", credits: 3 },
        { code: "GEUV102", name: "Indian Traditional Knowledge", credits: 1 },
        { code: "CYUC102", name: "Chemistry Laboratory", credits: 1 },
        { code: "CSUC102", name: "Computer Programming Laboratory", credits: 1 }
      ],
      2: [
        { code: "MAUC102", name: "Mathematics II", credits: 4 },
        { code: "EIUC102", name: "Basics of Industrial Automation", credits: 4 },
        { code: "PHUC101", name: "Physics", credits: 3 },
        { code: "MEUC101", name: "Engineering Graphics", credits: 3 },
        { code: "HSUA102", name: "Professional English", credits: 2 },
        { code: "GEUS102", name: "Basic Engineering Skills Lab I", credits: 3 },
        { code: "GEUV101", name: "NSS, Yoga and Health", credits: 1 },
        { code: "PHUC102", name: "Physics Laboratory", credits: 1 }
      ],
      3: [
        { code: "MAUC104", name: "Transforms and PDE", credits: 4 },
        { code: "EIUC103", name: "Electric Circuits and Network Analysis", credits: 4 },
        { code: "EIUC104", name: "Analog Circuit Design", credits: 3 },
        { code: "EIUC105", name: "Transducers and Measurement Systems", credits: 3 },
        { code: "HSUA103", name: "Entrepreneurship", credits: 2 },
        { code: "GEUV103", name: "Environmental Education", credits: 1 },
        { code: "EIUC106", name: "Analog Circuits Lab", credits: 1.5 },
        { code: "EIUC107", name: "Transducers Lab", credits: 1.5 }
      ],
      4: [
        { code: "EIUC108", name: "Electrical and Electronics Instruments", credits: 3 },
        { code: "EIUC109", name: "Signal Processing", credits: 4 },
        { code: "CSUC137", name: "Data Structure and OOPS", credits: 3 },
        { code: "EIUC110", name: "Control Systems", credits: 4 },
        { code: "EIUC111", name: "Digital System Design", credits: 3 },
        { code: "HSUA104", name: "Design Thinking", credits: 2 },
        { code: "GEUC104", name: "Universal Human Values", credits: 1 },
        { code: "EIUC112", name: "Simulation Laboratory", credits: 1.5 },
        { code: "CSUC138", name: "Data Structure and OOPS Lab", credits: 1.5 }
      ],
      5: [
        { code: "EIUC113", name: "Industrial Instrumentation", credits: 3 },
        { code: "EIUC114", name: "VLSI Design", credits: 3 },
        { code: "EIUC115", name: "System Design using 8051", credits: 3 },
        { code: "HSUA105", name: "Industrial Economics and Management", credits: 2 },
        { code: "EIUE1xx", name: "Professional Elective 1", credits: 4 },
        { code: "EIUC116", name: "System Design Lab", credits: 1.5 },
        { code: "EIUC117", name: "VLSI Design Lab", credits: 1.5 },
        { code: "EIUC118", name: "Instrumentation System Design Lab", credits: 1.5 }
      ],
      6: [
        { code: "EIUC119", name: "Analytical Instruments", credits: 3 },
        { code: "EIUC120", name: "Embedded System Design", credits: 3 },
        { code: "EIUC121", name: "Process Control", credits: 3 },
        { code: "EIUE1xx", name: "Professional Elective 2", credits: 4 },
        { code: "EIUC122", name: "Process Control Lab", credits: 1.5 },
        { code: "EIUC123", name: "Embedded System Design Lab", credits: 1.5 },
        { code: "EIUC124", name: "Virtual Instruments Lab", credits: 1.5 },
        { code: "EIUC125", name: "Internship", credits: 2 }
      ],
      7: [
        { code: "EIUC126", name: "PLC & DCS", credits: 3 },
        { code: "EIUC127", name: "System Design Using Single Board Computer", credits: 4 },
        { code: "EIUE1xx", name: "Professional Elective 3", credits: 4 },
        { code: "EIUC128", name: "Robotics and Automation", credits: 3 },
        { code: "EIUC129", name: "Industrial Automation Lab", credits: 1.5 },
        { code: "EIUC130", name: "Single Board Computer Lab", credits: 1.5 },
        { code: "EIUC131", name: "Mini Project", credits: 2 },
        { code: "EIUC132", name: "Comprehensive Viva", credits: 1 }
      ],
      8: [
        { code: "EIUC133", name: "Main Project", credits: 8 }
      ]
    }
  },
  
  // ------------------------------------------------------
  // 2. PTU UG R2020 (Old Reg) - FULL 8 SEMESTERS
  // ------------------------------------------------------
  // Also used by WEC and PKIET
  "R2020": {
    "CSE": {
      1: [
        { code: "MA201", name: "Mathematics I", credits: 4 },
        { code: "PH201", name: "Physics", credits: 4 },
        { code: "CY201", name: "Chemistry", credits: 4 },
        { code: "HS201", name: "English for Communication", credits: 3 },
        { code: "ME201", name: "Workshop and Manufacturing Practice", credits: 1.5 },
        { code: "PH202", name: "Physics Laboratory", credits: 1.5 },
        { code: "CY202", name: "Chemistry Laboratory", credits: 1.5 }
      ],
      2: [
        { code: "MA202", name: "Mathematics II", credits: 4 },
        { code: "EE201", name: "Basic Electrical Engineering", credits: 4 },
        { code: "CS201", name: "Programming for Problem Solving", credits: 3 },
        { code: "ME202", name: "Engineering Graphics & CAD", credits: 3 },
        { code: "EE202", name: "Basic Electrical Engineering Lab", credits: 1.5 },
        { code: "CS202", name: "Programming Laboratory", credits: 1.5 }
      ],
      3: [
        { code: "SH201", name: "Biology for Engineers", credits: 2 },
        { code: "EC235", name: "Electronic Devices and Digital Systems", credits: 3 },
        { code: "CS203", name: "Computer Organization and Architecture", credits: 4 },
        { code: "CS204", name: "Data Structures", credits: 3 },
        { code: "CS205", name: "Object Oriented Programming Languages", credits: 3 },
        { code: "EC236", name: "Electronic Devices and Digital Systems Lab", credits: 1.5 },
        { code: "CS206", name: "Data Structures Laboratory", credits: 1.5 },
        { code: "CS207", name: "OOP Laboratory", credits: 1.5 }
      ],
      4: [
        { code: "MA206", name: "Mathematics for Computing", credits: 4 },
        { code: "CS208", name: "Operating Systems", credits: 3 },
        { code: "CS209", name: "Design and Analysis of Algorithms", credits: 3 },
        { code: "CS210", name: "Database Management Systems", credits: 3 },
        { code: "CS211", name: "Software Engineering", credits: 4 },
        { code: "CS212", name: "Operating System Laboratory", credits: 1.5 },
        { code: "CS213", name: "Algorithms Laboratory", credits: 1.5 },
        { code: "CS214", name: "DBMS Laboratory", credits: 1.5 }
      ],
      5: [
        { code: "HS202", name: "Industrial Economics and Management", credits: 3 },
        { code: "CS215", name: "Platform Technologies", credits: 3 },
        { code: "CS216", name: "Computer Networks", credits: 3 },
        { code: "CS217", name: "Automata Theory and Compiler Design", credits: 4 },
        { code: "CSYXX", name: "Professional Elective I", credits: 3 },
        { code: "CS218", name: "Platform Technologies Laboratory", credits: 1.5 },
        { code: "CS219", name: "Computer Networks Laboratory", credits: 1.5 }
      ],
      6: [
        { code: "EP201", name: "Entrepreneurship", credits: 2 },
        { code: "CS220", name: "Microprocessors and Microcontrollers", credits: 3 },
        { code: "CS221", name: "Web Technologies", credits: 3 },
        { code: "CS222", name: "Information Security", credits: 4 },
        { code: "CSYXX", name: "Professional Elective II", credits: 3 },
        { code: "CSYXX", name: "Professional Elective III", credits: 3 },
        { code: "CS223", name: "Microprocessors Laboratory", credits: 1.5 },
        { code: "CS224", name: "Web Technologies Laboratory", credits: 1.5 }
      ],
      7: [
        { code: "CS225", name: "Artificial Intelligence", credits: 3 },
        { code: "CS226", name: "Parallel and Distributed Systems", credits: 4 },
        { code: "CS227", name: "Data Science Essentials", credits: 4 },
        { code: "CSYXX", name: "Professional Elective IV", credits: 3 },
        { code: "CSYXX", name: "Professional Elective V", credits: 3 },
        { code: "CS228", name: "AI Laboratory", credits: 1.5 },
        { code: "CS229", name: "Seminar", credits: 1 }
      ],
      8: [
        { code: "SWOXX", name: "Open Elective (SWAYAM) 1", credits: 2 },
        { code: "SWOXX", name: "Open Elective (SWAYAM) 2", credits: 2 },
        { code: "CS231", name: "Comprehensive Test", credits: 1 },
        { code: "CS232", name: "Internship", credits: 2 },
        { code: "CS233", name: "Project Work", credits: 8 }
      ]
    },
    "IT": {
      1: [
        { code: "MA201", name: "Mathematics I", credits: 4 },
        { code: "PH201", name: "Physics", credits: 4 },
        { code: "CY201", name: "Chemistry", credits: 4 },
        { code: "HS201", name: "English for Communication", credits: 3 },
        { code: "ME201", name: "Workshop Practice", credits: 1.5 },
        { code: "PH202", name: "Physics Lab", credits: 1.5 },
        { code: "CY202", name: "Chemistry Lab", credits: 1.5 }
      ],
      2: [
        { code: "MA202", name: "Mathematics II", credits: 4 },
        { code: "EE201", name: "Basic Electrical Engineering", credits: 4 },
        { code: "CS201", name: "Programming for Problem Solving", credits: 3 },
        { code: "ME202", name: "Engg Graphics & CAD", credits: 3 },
        { code: "EE202", name: "Electrical Lab", credits: 1.5 },
        { code: "CS202", name: "Programming Lab", credits: 1.5 }
      ],
      3: [
        { code: "EC233", name: "Electronic Circuits", credits: 3 },
        { code: "IT201", name: "Digital System Design", credits: 3 },
        { code: "IT202", name: "Data Structures", credits: 3 },
        { code: "IT203", name: "OOP using C++ & Java", credits: 3 },
        { code: "SH201", name: "Biology for Engineers", credits: 2 },
        { code: "IT204", name: "Digital Laboratory", credits: 1.5 },
        { code: "IT205", name: "Data Structures Laboratory", credits: 1.5 },
        { code: "IT206", name: "OOP Laboratory", credits: 1.5 }
      ],
      4: [
        { code: "MA206", name: "Mathematics for Computing", credits: 4 },
        { code: "IT207", name: "Operating Systems", credits: 3 },
        { code: "IT208", name: "Computer Architecture", credits: 3 },
        { code: "IT209", name: "Microprocessors and Applications", credits: 3 },
        { code: "IT210", name: "Design and Analysis of Algorithms", credits: 3 },
        { code: "IT211", name: "OS Laboratory (UNIX/Linux)", credits: 1.5 },
        { code: "IT212", name: "Microprocessor Laboratory", credits: 1.5 },
        { code: "IT213", name: "Algorithms Laboratory", credits: 1.5 }
      ],
      5: [
        { code: "IT214", name: "Database Management System", credits: 3 },
        { code: "IT215", name: "Resource Mgmt & Graph Theory", credits: 4 },
        { code: "IT216", name: "Computer Networks", credits: 4 },
        { code: "IT217", name: "Information Coding Techniques", credits: 3 },
        { code: "ITYXX", name: "Program Elective I", credits: 3 },
        { code: "IT218", name: "DBMS Laboratory", credits: 1.5 },
        { code: "IT219", name: "Computer Networks Laboratory", credits: 1.5 },
        { code: "IT220", name: "Information Coding Lab", credits: 1.5 }
      ],
      6: [
        { code: "IT221", name: "Software Engineering", credits: 3 },
        { code: "IT222", name: "Automata and Formal Languages", credits: 4 },
        { code: "IT223", name: "Web Technology", credits: 3 },
        { code: "ITYXX", name: "Program Elective II", credits: 3 },
        { code: "ITYXX", name: "Program Elective III", credits: 3 },
        { code: "EP201", name: "Entrepreneurship", credits: 2 },
        { code: "IT224", name: "Web Technology Laboratory", credits: 1.5 },
        { code: "IT225", name: "Software Engineering Laboratory", credits: 1.5 }
      ],
      7: [
        { code: "IT226", name: "Artificial Intelligence", credits: 4 },
        { code: "HS202", name: "Industrial Economics & Mgmt", credits: 3 },
        { code: "ITYXX", name: "Program Elective IV", credits: 3 },
        { code: "ITYXX", name: "Program Elective V", credits: 3 },
        { code: "IT227", name: "AI Laboratory", credits: 1.5 },
        { code: "IT228", name: "Seminar", credits: 1 },
        { code: "IT229", name: "Mini Project", credits: 1.5 }
      ],
      8: [
        { code: "SWOXX", name: "Open Elective (SWAYAM) 1", credits: 2 },
        { code: "SWOXX", name: "Open Elective (SWAYAM) 2", credits: 2 },
        { code: "IT231", name: "Comprehensive Test", credits: 1 },
        { code: "IT232", name: "Internship", credits: 2 },
        { code: "IT233", name: "Project Work", credits: 8 }
      ]
    },
    "ECE": {
      1: [
        { code: "MA201", name: "Mathematics I", credits: 4 },
        { code: "EE201", name: "Basic Electrical Engineering", credits: 4 },
        { code: "CS201", name: "Programming for Problem Solving", credits: 3 },
        { code: "ME202", name: "Engg Graphics & CAD", credits: 3 },
        { code: "EE202", name: "Electrical Engg Lab", credits: 1.5 },
        { code: "CS202", name: "Programming Lab", credits: 1.5 }
      ],
      2: [
        { code: "MA202", name: "Mathematics II", credits: 4 },
        { code: "PH201", name: "Physics", credits: 4 },
        { code: "CY201", name: "Chemistry", credits: 4 },
        { code: "HS201", name: "English for Communication", credits: 3 },
        { code: "ME201", name: "Workshop Practice", credits: 1.5 },
        { code: "PH202", name: "Physics Lab", credits: 1.5 },
        { code: "CY202", name: "Chemistry Lab", credits: 1.5 }
      ],
      3: [
        { code: "MA205", name: "Linear Algebra & Numerical Methods", credits: 4 },
        { code: "EC201", name: "Circuits and Networks", credits: 3 },
        { code: "EC202", name: "Electronic Devices and Circuits", credits: 3 },
        { code: "EC203", name: "Electromagnetic Waves", credits: 3 },
        { code: "EC204", name: "Digital System Design", credits: 3 },
        { code: "CS234", name: "Data Structures and OOP", credits: 3 },
        { code: "EC205", name: "Devices and Networks Lab", credits: 1.5 },
        { code: "CS235", name: "Data Structures & OOP Lab", credits: 1.5 }
      ],
      4: [
        { code: "EC206", name: "Transmission Lines and Waveguides", credits: 3 },
        { code: "EC207", name: "Electronic Circuit Design", credits: 3 },
        { code: "EC208", name: "Signals and Systems", credits: 4 },
        { code: "EC209", name: "Analog Communication", credits: 3 },
        { code: "ECYXX", name: "Professional Elective I", credits: 3 },
        { code: "SH201", name: "Biology for Engineers", credits: 2 },
        { code: "EC210", name: "Digital System Design Lab", credits: 1.5 },
        { code: "EC211", name: "Electronic Circuit Design Lab", credits: 1.5 },
        { code: "EC212", name: "Analog Communication Lab", credits: 1.5 }
      ],
      5: [
        { code: "EC213", name: "Digital Signal Processing", credits: 4 },
        { code: "EC214", name: "Digital Communication", credits: 3 },
        { code: "ECYXX", name: "Professional Elective II", credits: 3 },
        { code: "CS236", name: "Microprocessors & Microcontrollers", credits: 3 },
        { code: "EP201", name: "Entrepreneurship", credits: 2 },
        { code: "EC215", name: "DSP Laboratory", credits: 1.5 },
        { code: "EC216", name: "Digital Communication Lab", credits: 1.5 },
        { code: "CS237", name: "Microprocessors Lab", credits: 1.5 }
      ],
      6: [
        { code: "EC217", name: "Microwave and Optical Engg", credits: 3 },
        { code: "EC218", name: "Data Communication Networks", credits: 3 },
        { code: "EC219", name: "VLSI Design", credits: 3 },
        { code: "ECYXX", name: "Professional Elective III", credits: 3 },
        { code: "HS202", name: "Industrial Economics & Mgmt", credits: 3 },
        { code: "EC220", name: "Microwave & Optical Lab", credits: 1.5 },
        { code: "EC221", name: "Networks Laboratory", credits: 1.5 },
        { code: "EC222", name: "VLSI Design Laboratory", credits: 1.5 }
      ],
      7: [
        { code: "EC223", name: "Wireless Communication", credits: 3 },
        { code: "EC224", name: "Information Theory and Coding", credits: 3 },
        { code: "EC225", name: "Embedded System", credits: 3 },
        { code: "ECYXX", name: "Professional Elective IV", credits: 3 },
        { code: "ECYXX", name: "Professional Elective V", credits: 3 },
        { code: "EC226", name: "Wireless Communication Lab", credits: 1.5 },
        { code: "EC227", name: "Embedded System Laboratory", credits: 1.5 },
        { code: "EC228", name: "Mini Project", credits: 1 }
      ],
      8: [
        { code: "SWOXX", name: "Open Elective (SWAYAM) 1", credits: 2 },
        { code: "SWOXX", name: "Open Elective (SWAYAM) 2", credits: 2 },
        { code: "EC230", name: "Comprehensive Test", credits: 1 },
        { code: "EC231", name: "Internship", credits: 2 },
        { code: "EC232", name: "Project Work", credits: 8 }
      ]
    },
    "MECH": {
      1: [
        { code: "MA201", name: "Mathematics I", credits: 4 },
        { code: "PH201", name: "Physics", credits: 4 },
        { code: "CY201", name: "Chemistry", credits: 4 },
        { code: "HS201", name: "English for Communication", credits: 3 },
        { code: "ME201", name: "Workshop Practice", credits: 1.5 },
        { code: "PH202", name: "Physics Lab", credits: 1.5 },
        { code: "CY202", name: "Chemistry Lab", credits: 1.5 }
      ],
      2: [
        { code: "MA202", name: "Mathematics II", credits: 4 },
        { code: "EE201", name: "Basic Electrical Engineering", credits: 4 },
        { code: "CS201", name: "Programming for Problem Solving", credits: 3 },
        { code: "ME202", name: "Engg Graphics & CAD", credits: 3 },
        { code: "EE202", name: "Electrical Lab", credits: 1.5 },
        { code: "CS202", name: "Programming Lab", credits: 1.5 }
      ],
      3: [
        { code: "MA204", name: "Transforms, PDE and Statistics", credits: 4 },
        { code: "ME203", name: "Engineering Mechanics", credits: 4 },
        { code: "ME204", name: "Fluid Mechanics", credits: 4 },
        { code: "ME205", name: "Engineering Thermodynamics", credits: 4 },
        { code: "ME206", name: "Materials Technology", credits: 3 },
        { code: "ME207", name: "Machine Drawing", credits: 3 }
      ],
      4: [
        { code: "SH201", name: "Biology for Engineers", credits: 2 },
        { code: "EC234", name: "Elements of Electronics", credits: 3 },
        { code: "ME208", name: "Mechanics of Solids", credits: 4 },
        { code: "ME209", name: "Thermal Engineering I", credits: 4 },
        { code: "ME210", name: "Machining Technology", credits: 3 },
        { code: "ME211", name: "Kinematics of Machines", credits: 4 },
        { code: "ME212", name: "Mechanical Engineering Lab I", credits: 1.5 }
      ],
      5: [
        { code: "ME213", name: "Heat and Mass Transfer", credits: 4 },
        { code: "ME214", name: "Manufacturing Processes", credits: 4 },
        { code: "ME215", name: "Dynamics of Machines", credits: 4 },
        { code: "MEYXX", name: "Professional Elective I", credits: 3 },
        { code: "MEYXX", name: "Professional Elective II", credits: 3 },
        { code: "ME216", name: "Mechanical Engineering Lab II", credits: 1.5 }
      ],
      6: [
        { code: "HS202", name: "Industrial Economics & Mgmt", credits: 3 },
        { code: "ME217", name: "Thermal Engineering II", credits: 4 },
        { code: "ME218", name: "Metrology and Measurements", credits: 4 },
        { code: "ME219", name: "Design of Machine Elements", credits: 4 },
        { code: "MEYXX", name: "Professional Elective III", credits: 3 },
        { code: "ME220", name: "Seminar", credits: 1 },
        { code: "ME221", name: "Mechanical Engineering Lab III", credits: 1.5 }
      ],
      7: [
        { code: "ME222", name: "Operations Research", credits: 4 },
        { code: "ME223", name: "Industrial Engg and Management", credits: 3 },
        { code: "ME224", name: "Advanced Manufacturing Tech", credits: 4 },
        { code: "MEYXX", name: "Professional Elective IV", credits: 3 },
        { code: "MEYXX", name: "Professional Elective V", credits: 3 },
        { code: "EP201", name: "Entrepreneurship", credits: 2 }
      ],
      8: [
        { code: "SWOXX", name: "Open Elective (SWAYAM) 1", credits: 2 },
        { code: "SWOXX", name: "Open Elective (SWAYAM) 2", credits: 2 },
        { code: "ME226", name: "Comprehensive Test", credits: 1 },
        { code: "ME227", name: "Internship", credits: 2 },
        { code: "ME228", name: "Project Work", credits: 8 }
      ]
    },
    "CIVIL": {
      1: [
        { code: "MA201", name: "Mathematics I", credits: 4 },
        { code: "EE201", name: "Basic Electrical Engineering", credits: 4 },
        { code: "CS201", name: "Programming for Problem Solving", credits: 3 },
        { code: "ME202", name: "Engg Graphics & CAD", credits: 3 },
        { code: "EE202", name: "Electrical Lab", credits: 1.5 },
        { code: "CS202", name: "Programming Lab", credits: 1.5 }
      ],
      2: [
        { code: "MA202", name: "Mathematics II", credits: 4 },
        { code: "PH201", name: "Physics", credits: 4 },
        { code: "CY201", name: "Chemistry", credits: 4 },
        { code: "HS201", name: "English for Communication", credits: 3 },
        { code: "ME201", name: "Workshop Practice", credits: 1.5 },
        { code: "PH202", name: "Physics Lab", credits: 1.5 },
        { code: "CY202", name: "Chemistry Lab", credits: 1.5 }
      ],
      3: [
        { code: "SH201", name: "Biology for Engineers", credits: 2 },
        { code: "CE202", name: "Engineering Mechanics", credits: 4 },
        { code: "CE203", name: "Engineering Geology", credits: 2 },
        { code: "CE204", name: "Fluid Mechanics", credits: 3 },
        { code: "CE205", name: "Building Technology", credits: 3 },
        { code: "CE206", name: "Surveying and Geomatics", credits: 3 },
        { code: "CE207", name: "Computer Aided Civil Engg Drawing", credits: 1.5 },
        { code: "CE208", name: "Surveying Laboratory", credits: 1.5 }
      ],
      4: [
        { code: "MA203", name: "Numerical Methods and Statistics", credits: 4 },
        { code: "CE209", name: "Disaster Management", credits: 3 },
        { code: "CE210", name: "Hydraulics Engineering", credits: 3 },
        { code: "EI212", name: "Instrumentation and Sensors", credits: 3 },
        { code: "CE211", name: "Concrete Technology", credits: 3 },
        { code: "CE212", name: "Basics of Solid Mechanics", credits: 4 },
        { code: "CE213", name: "Materials Testing Lab I", credits: 1.5 },
        { code: "CE214", name: "Fluid Mechanics Laboratory", credits: 1.5 }
      ],
      5: [
        { code: "CE215", name: "Mechanics of Materials", credits: 4 },
        { code: "CE216", name: "Environmental Engineering", credits: 3 },
        { code: "CE217", name: "Transportation Engineering", credits: 3 },
        { code: "CE218", name: "Hydrology & Irrigation Engg", credits: 4 },
        { code: "CEYXX", name: "Professional Elective I", credits: 3 },
        { code: "CE219", name: "Materials Testing Lab II", credits: 1.5 },
        { code: "CE220", name: "Environmental Engg Lab", credits: 1.5 },
        { code: "EP201", name: "Entrepreneurship", credits: 2 }
      ],
      6: [
        { code: "CE221", name: "Structural Analysis", credits: 4 },
        { code: "CE222", name: "Structural Concrete Design", credits: 4 },
        { code: "CE223", name: "Geotechnical Engineering", credits: 3 },
        { code: "CE224", name: "Estimation Costing and Valuation", credits: 3 },
        { code: "CEYXX", name: "Professional Elective II", credits: 3 },
        { code: "CE225", name: "Geotechnical Engg Lab", credits: 1.5 },
        { code: "CE226", name: "Structural Mechanics Lab", credits: 1.5 }
      ],
      7: [
        { code: "HS202", name: "Industrial Economics & Mgmt", credits: 3 },
        { code: "CEYXX", name: "Professional Elective III", credits: 3 },
        { code: "CEYXX", name: "Professional Elective IV", credits: 3 },
        { code: "CEYXX", name: "Professional Elective V", credits: 3 },
        { code: "CEYXX", name: "Professional Elective VI", credits: 3 },
        { code: "CE227", name: "Computer Aided Structural Design", credits: 1.5 },
        { code: "CE228", name: "Seminar", credits: 1 }
      ],
      8: [
        { code: "SWOXX", name: "Open Elective (SWAYAM) 1", credits: 2 },
        { code: "SWOXX", name: "Open Elective (SWAYAM) 2", credits: 2 },
        { code: "CE230", name: "Comprehensive Test", credits: 1 },
        { code: "CE231", name: "Internship", credits: 2 },
        { code: "CE232", name: "Project Work", credits: 8 }
      ]
    },
    "EEE": {
      1: [
        { code: "MA201", name: "Mathematics I", credits: 4 },
        { code: "EE201", name: "Basic Electrical Engineering", credits: 4 },
        { code: "CS201", name: "Programming for Problem Solving", credits: 3 },
        { code: "ME202", name: "Engg Graphics & CAD", credits: 3 },
        { code: "EE202", name: "Basic Electrical Engg Lab", credits: 1.5 },
        { code: "CS202", name: "Programming Lab", credits: 1.5 }
      ],
      2: [
        { code: "MA202", name: "Mathematics II", credits: 4 },
        { code: "PH201", name: "Physics", credits: 4 },
        { code: "CY201", name: "Chemistry", credits: 4 },
        { code: "HS201", name: "English for Communication", credits: 3 },
        { code: "ME201", name: "Workshop Practice", credits: 1.5 },
        { code: "PH202", name: "Physics Lab", credits: 1.5 },
        { code: "CY202", name: "Chemistry Lab", credits: 1.5 }
      ],
      3: [
        { code: "MA204", name: "Transforms, PDE and Statistics", credits: 4 },
        { code: "EE203", name: "Electrical Circuit Analysis", credits: 4 },
        { code: "EE204", name: "Electromagnetic Fields", credits: 3 },
        { code: "EE205", name: "Electronic Devices and Circuits", credits: 3 },
        { code: "EE206", name: "Electrical Machines I", credits: 3 },
        { code: "EE207", name: "Signals and Systems", credits: 3 },
        { code: "EE208", name: "Electronics Laboratory I", credits: 1.5 },
        { code: "EE209", name: "Electrical Machines Laboratory I", credits: 1.5 }
      ],
      4: [
        { code: "SH201", name: "Biology for Engineers", credits: 2 },
        { code: "EE210", name: "Analog Electronics", credits: 3 },
        { code: "EE211", name: "Pulse and Digital Circuits", credits: 3 },
        { code: "EE212", name: "Electrical Machines II", credits: 3 },
        { code: "CS234", name: "Data Structures and OOP", credits: 3 },
        { code: "EE213", name: "Electronics Laboratory II", credits: 1.5 },
        { code: "EE214", name: "Electrical Machines Laboratory II", credits: 1.5 },
        { code: "CS235", name: "Data Structures & OOP Lab", credits: 1.5 }
      ],
      5: [
        { code: "EE215", name: "Analog and Digital ICs", credits: 3 },
        { code: "EE216", name: "Power Electronics", credits: 3 },
        { code: "EE217", name: "Measurement and Instrumentation", credits: 3 },
        { code: "EE218", name: "Transmission and Distribution", credits: 3 },
        { code: "EE219", name: "Control Systems", credits: 4 },
        { code: "HS202", name: "Industrial Economics & Mgmt", credits: 3 },
        { code: "EE220", name: "Electronics Laboratory III", credits: 1.5 },
        { code: "EE221", name: "Measurement and Control Lab", credits: 1.5 }
      ],
      6: [
        { code: "EE222", name: "Power System Analysis", credits: 4 },
        { code: "EE223", name: "Microprocessors & Microcontrollers", credits: 3 },
        { code: "EEYXX", name: "Program Elective I", credits: 3 },
        { code: "EEYXX", name: "Program Elective II", credits: 3 },
        { code: "EP201", name: "Entrepreneurship", credits: 2 },
        { code: "EE224", name: "Microprocessors Laboratory", credits: 1.5 },
        { code: "EE225", name: "Power Electronics Laboratory", credits: 1.5 }
      ],
      7: [
        { code: "EE226", name: "Power System Operation & Control", credits: 3 },
        { code: "EE227", name: "Protection and Switchgear", credits: 3 },
        { code: "EE228", name: "Solid State Drives", credits: 3 },
        { code: "EEYXX", name: "Program Elective III", credits: 3 },
        { code: "EEYXX", name: "Program Elective IV", credits: 3 },
        { code: "EEYXX", name: "Program Elective V", credits: 3 },
        { code: "EE229", name: "Power Systems Laboratory", credits: 2 },
        { code: "EE230", name: "Seminar", credits: 1 }
      ],
      8: [
        { code: "SWXXX", name: "Open Elective (SWAYAM) 1", credits: 2 },
        { code: "SWXXX", name: "Open Elective (SWAYAM) 2", credits: 2 },
        { code: "EE232", name: "Comprehensive Test", credits: 1 },
        { code: "EE233", name: "Internship", credits: 2 },
        { code: "EE234", name: "Project Work", credits: 8 }
      ]
    },
    "MT": {
      1: [
        { code: "MA201", name: "Mathematics I", credits: 4 },
        { code: "EE201", name: "Basic Electrical Engineering", credits: 4 },
        { code: "CS201", name: "Programming for Problem Solving", credits: 3 },
        { code: "ME202", name: "Engg Graphics & CAD", credits: 3 },
        { code: "EE202", name: "Electrical Engg Lab", credits: 1.5 },
        { code: "CS202", name: "Programming Lab", credits: 1.5 }
      ],
      2: [
        { code: "MA202", name: "Mathematics II", credits: 4 },
        { code: "PH201", name: "Physics", credits: 4 },
        { code: "CY201", name: "Chemistry", credits: 4 },
        { code: "HS201", name: "English for Communication", credits: 3 },
        { code: "ME201", name: "Workshop Practice", credits: 1.5 },
        { code: "PH202", name: "Physics Lab", credits: 1.5 },
        { code: "CY202", name: "Chemistry Lab", credits: 1.5 }
      ],
      3: [
        { code: "MA204", name: "Transforms, PDE and Statistics", credits: 4 },
        { code: "MT201", name: "Manufacturing Processes", credits: 3 },
        { code: "MT202", name: "Hydraulic and Pneumatic Systems", credits: 3 },
        { code: "MT203", name: "Mechanics of Solids and Design", credits: 3 },
        { code: "EC237", name: "Analog and Digital Electronics", credits: 3 },
        { code: "MT204", name: "Manufacturing Processes Lab", credits: 1.5 },
        { code: "MT205", name: "Hydraulic and Pneumatic Lab", credits: 1.5 },
        { code: "EC238", name: "Analog and Digital Lab", credits: 1.5 }
      ],
      4: [
        { code: "SH201", name: "Biology for Engineers", credits: 2 },
        { code: "MT206", name: "Sensors and Measurements", credits: 3 },
        { code: "CS236", name: "Microprocessor & Microcontrollers", credits: 3 },
        { code: "EI203", name: "Electronic Design and Fabrication", credits: 4 },
        { code: "CS234", name: "Data Structures and OOP", credits: 3 },
        { code: "MT207", name: "Sensors and Measurements Lab", credits: 1.5 },
        { code: "CS237", name: "Microprocessor Lab", credits: 1.5 },
        { code: "CS235", name: "Data Structures Lab", credits: 1.5 },
        { code: "MT221", name: "Innovative Design Thinking", credits: 1.5 }
      ],
      5: [
        { code: "MT208", name: "Control System", credits: 4 },
        { code: "MT209", name: "Industrial Automation", credits: 3 },
        { code: "EE235", name: "Power Electronics and Drives", credits: 3 },
        { code: "MTYXX", name: "Professional Elective I", credits: 3 },
        { code: "MTYXX", name: "Professional Elective II", credits: 3 },
        { code: "MT210", name: "Industrial Automation Lab", credits: 1.5 },
        { code: "MT211", name: "Dynamics and Control Lab", credits: 1.5 },
        { code: "CS238", name: "Python Programming Lab", credits: 1.5 }
      ],
      6: [
        { code: "HS202", name: "Industrial Economics & Mgmt", credits: 3 },
        { code: "MT212", name: "CAD/CAM Technology", credits: 4 },
        { code: "MT213", name: "Industrial Robotics", credits: 3 },
        { code: "MT214", name: "Embedded System Design", credits: 3 },
        { code: "MTYXX", name: "Professional Elective III", credits: 3 },
        { code: "MT222", name: "Engineering Design Project", credits: 2 },
        { code: "MT215", name: "CAD/CAM/Robotics Lab", credits: 1.5 },
        { code: "MT216", name: "Embedded System Lab", credits: 1.5 },
        { code: "CS239", name: "Java Programming Lab", credits: 1.5 }
      ],
      7: [
        { code: "MT217", name: "Mechatronics System Design", credits: 4 },
        { code: "MT218", name: "Modeling and Simulation", credits: 3 },
        { code: "MTYXX", name: "Professional Elective IV", credits: 3 },
        { code: "MTYXX", name: "Professional Elective V", credits: 3 },
        { code: "MT219", name: "System Integration Laboratory", credits: 1.5 },
        { code: "MT220", name: "Modeling and Simulation Lab", credits: 1.5 },
        { code: "MT223", name: "Mini Project", credits: 2 }
      ],
      8: [
        { code: "SWOXX", name: "Open Elective (SWAYAM) 1", credits: 2 },
        { code: "SWOXX", name: "Open Elective (SWAYAM) 2", credits: 2 },
        { code: "MT225", name: "Comprehensive Test", credits: 1 },
        { code: "MT226", name: "Internship", credits: 2 },
        { code: "MT227", name: "Project Work", credits: 8 }
      ]
    },
    "CHEM": {
      1: [
        { code: "MA201", name: "Mathematics I", credits: 4 },
        { code: "PH201", name: "Physics", credits: 4 },
        { code: "CY201", name: "Chemistry", credits: 4 },
        { code: "HS201", name: "English for Communication", credits: 3 },
        { code: "ME201", name: "Workshop Practice", credits: 1.5 },
        { code: "PH202", name: "Physics Lab", credits: 1.5 },
        { code: "CY202", name: "Chemistry Lab", credits: 1.5 }
      ],
      2: [
        { code: "MA202", name: "Mathematics II", credits: 4 },
        { code: "EE201", name: "Basic Electrical Engineering", credits: 4 },
        { code: "CS201", name: "Programming for Problem Solving", credits: 3 },
        { code: "ME202", name: "Engg Graphics & CAD", credits: 3 },
        { code: "EE202", name: "Electrical Lab", credits: 1.5 },
        { code: "CS202", name: "Programming Lab", credits: 1.5 }
      ],
      3: [
        { code: "CY203", name: "Chemistry for Chemical Engg", credits: 4 },
        { code: "CE233", name: "Engg Mechanics & Solids", credits: 4 },
        { code: "CH201", name: "Momentum Transfer", credits: 4 },
        { code: "CH202", name: "Process Calculations", credits: 4 },
        { code: "SH201", name: "Biology for Engineers", credits: 2 },
        { code: "CY204", name: "Chemistry Lab for Chemical Engg", credits: 1.5 }
      ],
      4: [
        { code: "MA204", name: "Transforms, PDE and Statistics", credits: 4 },
        { code: "CH203", name: "Process Heat Transfer", credits: 4 },
        { code: "CH204", name: "Mechanical Operations", credits: 3 },
        { code: "CH205", name: "Chemical Engg Thermodynamics", credits: 4 },
        { code: "CH206", name: "Mass Transfer I", credits: 4 },
        { code: "EC234", name: "Elements of Electronics", credits: 3 },
        { code: "CH207", name: "Chemical Engineering Lab I", credits: 1.5 }
      ],
      5: [
        { code: "CH208", name: "Mass Transfer II", credits: 4 },
        { code: "CH209", name: "Chemical Reaction Engineering I", credits: 4 },
        { code: "CH210", name: "Chemical Process Industries", credits: 3 },
        { code: "CHYXX", name: "Program Elective I", credits: 3 },
        { code: "CHYXX", name: "Program Elective II", credits: 3 },
        { code: "CH211", name: "Chemical Engineering Lab II", credits: 1.5 },
        { code: "EP201", name: "Entrepreneurship", credits: 2 }
      ],
      6: [
        { code: "CH212", name: "Chemical Reaction Engineering II", credits: 4 },
        { code: "CH213", name: "Computational Methods", credits: 4 },
        { code: "CHYXX", name: "Program Elective III", credits: 3 },
        { code: "CHYXX", name: "Program Elective IV", credits: 3 },
        { code: "HS202", name: "Industrial Economics & Mgmt", credits: 3 },
        { code: "CH214", name: "Chemical Engineering Lab III", credits: 1.5 }
      ],
      7: [
        { code: "CH215", name: "Transport Phenomena", credits: 4 },
        { code: "CH216", name: "Process Dynamics & Control", credits: 4 },
        { code: "CH217", name: "Process Equipment Design", credits: 4 },
        { code: "CH218", name: "Process Engineering Economics", credits: 3 },
        { code: "CHYXX", name: "Program Elective V", credits: 3 },
        { code: "CH219", name: "Chemical Engineering Lab IV", credits: 1.5 },
        { code: "CH220", name: "Seminar", credits: 1 }
      ],
      8: [
        { code: "SWOXX", name: "Open Elective (SWAYAM) 1", credits: 2 },
        { code: "SWOXX", name: "Open Elective (SWAYAM) 2", credits: 2 },
        { code: "CH222", name: "Comprehensive Test", credits: 1 },
        { code: "CH223", name: "Internship", credits: 2 },
        { code: "CH224", name: "Project Work", credits: 8 }
      ]
    },
    "EIE": {
      1: [
        { code: "MA201", name: "Mathematics I", credits: 4 },
        { code: "PH201", name: "Physics", credits: 4 },
        { code: "CY201", name: "Chemistry", credits: 4 },
        { code: "HS201", name: "English for Communication", credits: 3 },
        { code: "ME201", name: "Workshop Practice", credits: 1.5 },
        { code: "PH202", name: "Physics Lab", credits: 1.5 },
        { code: "CY202", name: "Chemistry Lab", credits: 1.5 }
      ],
      2: [
        { code: "MA202", name: "Mathematics II", credits: 4 },
        { code: "EE201", name: "Basic Electrical Engineering", credits: 4 },
        { code: "CS201", name: "Programming for Problem Solving", credits: 3 },
        { code: "ME202", name: "Engg Graphics & CAD", credits: 3 },
        { code: "EE202", name: "Electrical Lab", credits: 1.5 },
        { code: "CS202", name: "Programming Lab", credits: 1.5 }
      ],
      3: [
        { code: "MA204", name: "Transforms, PDE and Statistics", credits: 4 },
        { code: "SH201", name: "Biology for Engineers", credits: 2 },
        { code: "EI201", name: "Circuit Theory", credits: 4 },
        { code: "EI202", name: "Electronic Circuits", credits: 3 },
        { code: "EI203", name: "Electronic Design and Fabrication", credits: 4 },
        { code: "EI204", name: "Digital Logic Theory and Design", credits: 3 },
        { code: "EI205", name: "Electronic Circuits Lab", credits: 1.5 },
        { code: "EI206", name: "Electronic Design and Fab Lab", credits: 1 }
      ],
      4: [
        { code: "EI207", name: "Linear Integrated Circuits", credits: 3 },
        { code: "EI208", name: "Electrical and Electronics Instruments", credits: 3 },
        { code: "EI209", name: "Transducers and Measurements", credits: 3 },
        { code: "CS234", name: "Data Structures and OOPS", credits: 3 },
        { code: "EIYXX", name: "Professional Elective I", credits: 3 },
        { code: "EI210", name: "Linear Integrated Circuits Lab", credits: 1.5 },
        { code: "CS235", name: "Data Structures Lab", credits: 1.5 },
        { code: "EI211", name: "Transducers and Measurements Lab", credits: 1.5 }
      ],
      5: [
        { code: "EI213", name: "Industrial Instrumentation", credits: 4 },
        { code: "EI214", name: "Microprocessors and Applications", credits: 3 },
        { code: "EI215", name: "Control Systems", credits: 4 },
        { code: "EP201", name: "Entrepreneurship", credits: 2 },
        { code: "EIYXX", name: "Professional Elective II", credits: 3 },
        { code: "EI216", name: "Instrumentation System Design Lab", credits: 1.5 },
        { code: "EI217", name: "VLSI Lab", credits: 1.5 },
        { code: "EI218", name: "Microprocessors Lab", credits: 1.5 }
      ],
      6: [
        { code: "EI219", name: "Process Control", credits: 4 },
        { code: "EI220", name: "Embedded System Design", credits: 4 },
        { code: "EI221", name: "Robotics and Automation", credits: 3 },
        { code: "HS202", name: "Industrial Economics & Mgmt", credits: 3 },
        { code: "EIYXX", name: "Professional Elective III", credits: 3 },
        { code: "EI222", name: "Process Control Lab", credits: 1.5 },
        { code: "EI223", name: "Virtual Instrumentation Lab", credits: 1.5 },
        { code: "EI224", name: "Embedded System Design Lab", credits: 1.5 }
      ],
      7: [
        { code: "EI225", name: "PLC and DCS", credits: 4 },
        { code: "EI226", name: "Analytical Instruments", credits: 4 },
        { code: "EIYXX", name: "Professional Elective IV", credits: 3 },
        { code: "EIYXX", name: "Professional Elective V", credits: 3 },
        { code: "EI227", name: "Industrial Measurements Lab", credits: 1.5 },
        { code: "EI228", name: "Seminar", credits: 1 },
        { code: "EI229", name: "Mini Project", credits: 2 }
      ],
      8: [
        { code: "SW001", name: "Open Elective (SWAYAM) 1", credits: 2 },
        { code: "SW002", name: "Open Elective (SWAYAM) 2", credits: 2 },
        { code: "EI231", name: "Comprehensive Test", credits: 1 },
        { code: "EI232", name: "Internship", credits: 2 },
        { code: "EI233", name: "Project Work", credits: 8 }
      ]
    },
    "ISE": {
      1: [
        { code: "MAA101", name: "Mathematics - I", credits: 4 },
        { code: "PHA101", name: "Physics", credits: 4 },
        { code: "CYA101", name: "Chemistry", credits: 4 },
        { code: "HSA101", name: "English for Communication", credits: 3 },
        { code: "MEA101", name: "Workshop", credits: 1.5 },
        { code: "PHA102", name: "Physics Lab", credits: 1.5 },
        { code: "CYA102", name: "Chemistry Lab", credits: 1.5 }
      ],
      2: [
        { code: "MAA102", name: "Mathematics - II", credits: 4 },
        { code: "EEA101", name: "Basic Electrical Engineering", credits: 4 },
        { code: "CSA101", name: "Programming for Problem Solving", credits: 3 },
        { code: "MEA102", name: "Engg Graphics", credits: 3 },
        { code: "EEA102", name: "Electrical Lab", credits: 1.5 },
        { code: "CSA102", name: "Programming Lab", credits: 1.5 }
      ],
      3: [
        { code: "ECA133", name: "Digital System Design", credits: 3 },
        { code: "ISA101", name: "Python Programming", credits: 3 },
        { code: "ISA102", name: "Data Structures", credits: 3 },
        { code: "ISA103", name: "Introduction to Information Science", credits: 3 },
        { code: "SHA101", name: "Biology for Engineers", credits: 2 },
        { code: "ISA104", name: "Python Programming Laboratory", credits: 1.5 },
        { code: "ISA105", name: "Data Structures Laboratory", credits: 1.5 },
        { code: "ISA106", name: "Statistics with R Laboratory", credits: 1.5 }
      ],
      4: [
        { code: "MAA106", name: "Mathematics for Computing", credits: 4 },
        { code: "ISA107", name: "Operating Systems", credits: 3 },
        { code: "ISA108", name: "Object Oriented Programming with Java", credits: 3 },
        { code: "ISA109", name: "Foundations of Data Science", credits: 3 },
        { code: "ISA110", name: "Design and Analysis of Algorithms", credits: 3 },
        { code: "ISA111", name: "OS Laboratory", credits: 1.5 },
        { code: "ISA112", name: "Java Laboratory", credits: 1.5 },
        { code: "ISA113", name: "Algorithms Laboratory", credits: 1.5 }
      ],
      5: [
        { code: "ISA114", name: "Database Management System", credits: 3 },
        { code: "ISA115", name: "Information Theory and Coding Techniques", credits: 4 },
        { code: "ISA116", name: "Computer Networks", credits: 3 },
        { code: "ISA117", name: "Machine Learning", credits: 3 },
        { code: "ISA2XX", name: "Program Elective - I", credits: 3 },
        { code: "ISA118", name: "DBMS Laboratory", credits: 1.5 },
        { code: "ISA119", name: "Computer Networks Laboratory", credits: 1.5 },
        { code: "ISA120", name: "Machine Learning Laboratory", credits: 1.5 },
        { code: "ZZA3XX", name: "Open Elective", credits: 3 }
      ],
      6: [
        { code: "ISA121", name: "Information Security", credits: 3 },
        { code: "ISA122", name: "Information Storage and Retrieval", credits: 3 },
        { code: "ISA123", name: "Cloud Computing", credits: 3 },
        { code: "ISA124", name: "Data Mining and Warehousing", credits: 4 },
        { code: "ISA2XX", name: "Program Elective - II", credits: 3 },
        { code: "ISA2XX", name: "Program Elective - III", credits: 3 },
        { code: "ISA125", name: "Women and Employability", credits: 2 },
        { code: "ISA126", name: "Information Retrieval Laboratory", credits: 1.5 },
        { code: "ISA127", name: "Cloud Computing Laboratory", credits: 1.5 },
        { code: "ZZA3XX", name: "Open Elective", credits: 3 }
      ],
      7: [
        { code: "ISA128", name: "Artificial Intelligence", credits: 3 },
        { code: "ISA129", name: "Full Stack Development", credits: 3 },
        { code: "HSA102", name: "Industrial Economics and Management", credits: 3 },
        { code: "ISA2XX", name: "Program Elective - IV", credits: 3 },
        { code: "ISA2XX", name: "Program Elective - V", credits: 3 },
        { code: "ISA130", name: "Artificial Intelligence Laboratory", credits: 1.5 },
        { code: "ISA131", name: "Full Stack Development Laboratory", credits: 1.5 },
        { code: "ISA132", name: "Seminar", credits: 1 },
        { code: "ZZA3XX", name: "Open Elective", credits: 3 }
      ],
      8: [
        { code: "SWA3XX", name: "Open Elective (SWAYAM)", credits: 2 },
        { code: "SWA3XX", name: "Open Elective (SWAYAM)", credits: 2 },
        { code: "ISA134", name: "Comprehensive Test", credits: 1 },
        { code: "ISA135", name: "Internship", credits: 2 },
        { code: "ISA136", name: "Project Work", credits: 8 }
      ]
    },
    "BME": {
      1: [
        { code: "MAA01", name: "Mathematics I", credits: 4 },
        { code: "PHA01", name: "Physics", credits: 4 },
        { code: "CYA01", name: "Chemistry", credits: 4 },
        { code: "HSA01", name: "English for Communication", credits: 3 },
        { code: "MEA01", name: "Workshop", credits: 1.5 },
        { code: "PHA02", name: "Physics Laboratory", credits: 1.5 },
        { code: "CYA02", name: "Chemistry Laboratory", credits: 1.5 }
      ],
      2: [
        { code: "MAA02", name: "Mathematics II", credits: 4 },
        { code: "EEA01", name: "Basic Electrical Engineering", credits: 4 },
        { code: "CSA01", name: "Programming for Problem Solving", credits: 3 },
        { code: "MEA02", name: "Engg Graphics", credits: 3 },
        { code: "EEA02", name: "Electrical Laboratory", credits: 1.5 },
        { code: "CSA02", name: "Programming Laboratory", credits: 1.5 }
      ],
      3: [
        { code: "MAA07", name: "Biomathematics", credits: 4 },
        { code: "BMA01", name: "Circuits and Devices", credits: 4 },
        { code: "CSA34", name: "Data Structures & OOPs", credits: 3 },
        { code: "BMA02", name: "Human Physiology& Biochemistry", credits: 3 },
        { code: "SHA01", name: "Biology for Engineers", credits: 2 },
        { code: "BMA03", name: "Circuits and Devices Lab", credits: 1.5 },
        { code: "BMA04", name: "Human Physiology and Biochemistry Lab", credits: 1.5 },
        { code: "CSA35", name: "DS & OOPs Lab", credits: 1.5 },
        { code: "BMOXX", name: "Open Elective", credits: 3 }
      ],
      4: [
        { code: "BMA05", name: "Medical Physics", credits: 3 },
        { code: "BMA06", name: "Analog and Digital Circuits", credits: 4 },
        { code: "BMA07", name: "Transducers and Biosensors", credits: 3 },
        { code: "BMA08", name: "Pathology and Microbiology", credits: 3 },
        { code: "BMA09", name: "Signals and Systems in Biomedical Engg", credits: 4 },
        { code: "BMA10", name: "Analog and Digital Circuits Lab", credits: 1.5 },
        { code: "BMA11", name: "Transducers and Biosensors lab", credits: 1.5 },
        { code: "BMA12", name: "Pathology and Microbiology Lab", credits: 1.5 },
        { code: "BMOXX", name: "Open Elective", credits: 3 }
      ],
      5: [
        { code: "BMA13", name: "Biomedical Instrumentation", credits: 3 },
        { code: "BMA14", name: "Analog and Digital Instrumentation", credits: 3 },
        { code: "BMA15", name: "Biocontrol Systems", credits: 4 },
        { code: "BMA16", name: "Microprocessor and Microcontrollers", credits: 3 },
        { code: "BMYXX", name: "Professional Elective Course -I", credits: 3 },
        { code: "BMA17", name: "Biomedical Instrumentation Lab", credits: 1.5 },
        { code: "BMA18", name: "Analog and Digital Instrumentation Lab", credits: 1.5 },
        { code: "BMA19", name: "Microprocessor and Microcontrollers Lab", credits: 1.5 },
        { code: "EPA01", name: "Entrepreneurship", credits: 2 },
        { code: "BMOXX", name: "Open Elective", credits: 3 }
      ],
      6: [
        { code: "BMA20", name: "Diagnostic and therapeutic Equipment", credits: 3 },
        { code: "BMA21", name: "Biomaterials and Tissue Engineering", credits: 3 },
        { code: "BMA22", name: "Biomedical Signal processing", credits: 4 },
        { code: "BMA23", name: "Biomechanics & Finite Element Analysis", credits: 3 },
        { code: "BMYXX", name: "Professional Elective Course -II", credits: 3 },
        { code: "BMA24", name: "Diagnostic and therapeutic Equipment Lab", credits: 1.5 },
        { code: "BMA25", name: "Biomedical Signal processing Lab", credits: 1.5 },
        { code: "BMA26", name: "Biomechanics and FEA Lab", credits: 1.5 },
        { code: "BMOXX", name: "Open Elective", credits: 3 }
      ],
      7: [
        { code: "BMA27", name: "Medical Image Processing", credits: 3 },
        { code: "HSA02", name: "Industrial Economics and Management", credits: 3 },
        { code: "BMYXX", name: "Professional Elective Course -III", credits: 3 },
        { code: "BMYXX", name: "Professional Elective Course -IV", credits: 3 },
        { code: "BMYXX", name: "Professional Elective Course -V", credits: 3 },
        { code: "BMA28", name: "Medical Image Processing Lab", credits: 1.5 },
        { code: "BMA29", name: "Seminar", credits: 1 },
        { code: "BMOXX", name: "Open Elective", credits: 3 }
      ],
      8: [
        { code: "SWO01", name: "Open Elective (SWAYAM)", credits: 2 },
        { code: "SWO02", name: "Open Elective (SWAYAM)", credits: 2 },
        { code: "BMA31", name: "Comprehensive Test", credits: 1 },
        { code: "BMA32", name: "Hospital / Industrial Internship", credits: 2 },
        { code: "BMA33", name: "Project Work", credits: 8 }
      ]
    },
    "AGRI": {
      1: [
        { code: "MAA01", name: "Mathematics I", credits: 4 },
        { code: "PHA01", name: "Physics", credits: 4 },
        { code: "CYA01", name: "Chemistry", credits: 4 },
        { code: "HSA01", name: "English for Communication", credits: 3 },
        { code: "MEA01", name: "Workshop", credits: 1.5 },
        { code: "PHA02", name: "Physics Laboratory", credits: 1.5 },
        { code: "CYA02", name: "Chemistry Laboratory", credits: 1.5 }
      ],
      2: [
        { code: "MAA02", name: "Mathematics II", credits: 4 },
        { code: "EEA01", name: "Basic Electrical Engineering", credits: 4 },
        { code: "CSA01", name: "Programming for Problem Solving", credits: 3 },
        { code: "MEA02", name: "Engg Graphics", credits: 3 },
        { code: "EEA02", name: "Electrical Laboratory", credits: 1.5 },
        { code: "CSA02", name: "Programming Laboratory", credits: 1.5 }
      ],
      3: [
        { code: "CEA02", name: "Engineering Mechanics", credits: 4 },
        { code: "AEA01", name: "Fluid mechanics and Hydraulics", credits: 3 },
        { code: "AEA02", name: "Surveying and Geomatics", credits: 3 },
        { code: "AEA03", name: "Principles of Crop Production", credits: 3 },
        { code: "AEA04", name: "Soil Science and Engineering", credits: 4 },
        { code: "AEA05", name: "Surveying and Fluid Mech Lab", credits: 1.5 }
      ],
      4: [
        { code: "SHA02", name: "Biology for Engineers", credits: 2 },
        { code: "MAA03", name: "Transforms, PDE and Statistics", credits: 4 },
        { code: "MEA03", name: "Engineering Thermodynamics", credits: 4 },
        { code: "AEA06", name: "Strength of Materials", credits: 4 },
        { code: "AEA07", name: "Hydrology and Water Resources Engg", credits: 3 },
        { code: "AEA08", name: "Design Drawings of Farm Structures", credits: 4 },
        { code: "AEA09", name: "Soil Science Laboratory", credits: 1.5 },
        { code: "ZZOXX", name: "Open Elective", credits: 3 }
      ],
      5: [
        { code: "AEA10", name: "Farm Tractors and Power Units", credits: 4 },
        { code: "AEA11", name: "Theory of Machines", credits: 4 },
        { code: "AEA12", name: "Irrigation and Drainage Engineering", credits: 4 },
        { code: "AEYXX", name: "Professional Elective -I", credits: 3 },
        { code: "AEYXX", name: "Professional Elective -II", credits: 3 },
        { code: "AEA13", name: "Irrigation Field Laboratory", credits: 1.5 },
        { code: "ZZOXX", name: "Open Elective", credits: 3 }
      ],
      6: [
        { code: "HSA02", name: "Industrial Economics and Management", credits: 3 },
        { code: "AEA14", name: "Post-Harvest Engineering", credits: 4 },
        { code: "AEA15", name: "Farm Machinery and Equipment", credits: 4 },
        { code: "AEA16", name: "Soil and Water Conservation Engg", credits: 3 },
        { code: "AEYXX", name: "Professional Elective -III", credits: 3 },
        { code: "AEA17", name: "Post-Harvest and Farm Machinery Lab", credits: 1.5 },
        { code: "AEA18", name: "Seminar", credits: 1 },
        { code: "ZZOXX", name: "Open Elective", credits: 3 }
      ],
      7: [
        { code: "AEA19", name: "Ground Water and Well Engineering", credits: 4 },
        { code: "AEA20", name: "Dairy and Food Processing Engineering", credits: 4 },
        { code: "AEA21", name: "Machine Elements Design", credits: 4 },
        { code: "AEYXX", name: "Professional Elective -IV", credits: 3 },
        { code: "AEYXX", name: "Professional Elective -V", credits: 3 },
        { code: "AEA22", name: "Food Process Engineering laboratory", credits: 1.5 },
        { code: "AEA23", name: "Field visit", credits: 1 },
        { code: "EPA01", name: "Entrepreneurship (EDP)", credits: 2 },
        { code: "ZZOXX", name: "Open Elective", credits: 3 }
      ],
      8: [
        { code: "SWOXX", name: "Open Elective (SWAYAM)", credits: 2 },
        { code: "SWOXX", name: "Open Elective (SWAYAM)", credits: 2 },
        { code: "AEA25", name: "Comprehensive Test", credits: 1 },
        { code: "AEA26", name: "Internship", credits: 2 },
        { code: "AEA27", name: "Project Work", credits: 8 }
      ]
    },
    "PETRO": {
      1: [
        { code: "MAA01", name: "Mathematics I", credits: 4 },
        { code: "PHA01", name: "Physics", credits: 4 },
        { code: "CYA01", name: "Chemistry", credits: 4 },
        { code: "HSA01", name: "English for Communication", credits: 3 },
        { code: "MEA01", name: "Workshop", credits: 1.5 },
        { code: "PHA02", name: "Physics Laboratory", credits: 1.5 },
        { code: "CYA02", name: "Chemistry Laboratory", credits: 1.5 }
      ],
      2: [
        { code: "MAA02", name: "Mathematics II", credits: 4 },
        { code: "EEA01", name: "Basic Electrical Engineering", credits: 4 },
        { code: "CSA01", name: "Programming for Problem Solving", credits: 3 },
        { code: "MEA02", name: "Engg Graphics", credits: 3 },
        { code: "EEA02", name: "Electrical Laboratory", credits: 1.5 },
        { code: "CSA02", name: "Programming Laboratory", credits: 1.5 }
      ],
      3: [
        { code: "MAA03", name: "Probability & Statistics", credits: 4 },
        { code: "CEA02", name: "Engineering Mechanics", credits: 3 },
        { code: "PTA01", name: "Fluid Mechanics", credits: 4 },
        { code: "PTA02", name: "Process Calculation", credits: 4 },
        { code: "SHA01", name: "Biology for Engineers", credits: 2 },
        { code: "EEA03", name: "Principles of Electrical & Electronics Engg", credits: 3 },
        { code: "EEA04", name: "Electrical Engineering Laboratory", credits: 1.5 }
      ],
      4: [
        { code: "PTA03", name: "Chemical Engineering Thermodynamics", credits: 4 },
        { code: "PTA04", name: "Petroleum Exploration and Exploitation", credits: 3 },
        { code: "PTA05", name: "Petrochemical Unit Process", credits: 3 },
        { code: "PTA06", name: "Natural Gas Engineering", credits: 3 },
        { code: "PTA07", name: "Mechanical operations", credits: 3 },
        { code: "PTA08", name: "Petroleum Primary Processing Technology", credits: 3 },
        { code: "PTA09", name: "Fluids & Solid operations Lab", credits: 1.5 },
        { code: "PTA10", name: "Petrochemical Technology Lab I", credits: 1.5 },
        { code: "ZZOXX", name: "Open Elective", credits: 3 }
      ],
      5: [
        { code: "PTA11", name: "Heat Transfer", credits: 4 },
        { code: "PTA12", name: "Mass Transfer I", credits: 3 },
        { code: "PTA13", name: "Chemical Reaction Engineering", credits: 4 },
        { code: "PTA14", name: "Petroleum Secondary Processing Tech", credits: 3 },
        { code: "PTYXX", name: "Program Elective - I", credits: 3 },
        { code: "PTYXX", name: "Program Elective - II", credits: 3 },
        { code: "PTA15", name: "Petrochemical Technology Lab II", credits: 1.5 },
        { code: "EPA01", name: "Entrepreneurship", credits: 2 },
        { code: "ZZOXX", name: "Open Elective", credits: 3 }
      ],
      6: [
        { code: "PTA16", name: "Process Instrumentation Dynamics & Control", credits: 3 },
        { code: "PTA17", name: "Mass Transfer II", credits: 3 },
        { code: "PTYXX", name: "Program Elective -III", credits: 3 },
        { code: "PTYXX", name: "Program Elective - IV", credits: 3 },
        { code: "PTA18", name: "Catalytic Reaction Engineering", credits: 3 },
        { code: "PTA19", name: "Mass & Heat Transfer Lab", credits: 1.5 },
        { code: "PTA20", name: "Petrochemical Analysis Lab", credits: 1.5 },
        { code: "ZZOXX", name: "Open Elective", credits: 3 }
      ],
      7: [
        { code: "PTA21", name: "Petrochemical Derivatives", credits: 3 },
        { code: "PTA22", name: "Risk and Safety Management", credits: 3 },
        { code: "PTA23", name: "Process Equipment Design", credits: 3 },
        { code: "HSA02", name: "Industrial Economics and Management", credits: 3 },
        { code: "PTYXX", name: "Program Elective - V", credits: 3 },
        { code: "PTA24", name: "Reaction Engineering & Process control Lab", credits: 1.5 },
        { code: "PTA25", name: "Seminar", credits: 1 },
        { code: "ZZOXX", name: "Open Elective", credits: 3 }
      ],
      8: [
        { code: "SWOXX", name: "Open Elective (SWAYAM)", credits: 2 },
        { code: "SWOXX", name: "Open Elective (SWAYAM)", credits: 2 },
        { code: "PTA27", name: "Comprehensive Test", credits: 1 },
        { code: "PTA28", name: "Internship", credits: 2 },
        { code: "PTA29", name: "Project Work", credits: 8 }
      ]
    },
    "ARCH": {
      1: [
        { code: "MAA101", name: "Mathematics-l", credits: 4 },
        { code: "PHA101", name: "Physics", credits: 4 },
        { code: "CYA101", name: "Chemistry", credits: 4 },
        { code: "HSA101", name: "English for Communication", credits: 3 },
        { code: "MEA101", name: "Workshop", credits: 1.5 },
        { code: "PHA102", name: "Physics Laboratory", credits: 1.5 },
        { code: "CYA102", name: "Chemistry Laboratory", credits: 1.5 }
      ],
      2: [
        { code: "MAA102", name: "Mathematics-II", credits: 4 },
        { code: "EEA101", name: "Basic Electrical Engineering", credits: 4 },
        { code: "CSA101", name: "Programming for Problem Solving", credits: 3 },
        { code: "MEA102", name: "Engg Graphics", credits: 3 },
        { code: "EEA102", name: "Electrical Laboratory", credits: 1.5 },
        { code: "CSA102", name: "Programming Laboratory", credits: 1.5 }
      ],
      3: [
        { code: "SHA101", name: "Biology for Engineers", credits: 2 },
        { code: "AAA101", name: "Fundamentals of Architecture", credits: 3 },
        { code: "AAA102", name: "History of World Architecture", credits: 3 },
        { code: "AAA103", name: "Solid Mechanics", credits: 4 },
        { code: "AAA104", name: "Building Services -I", credits: 3 },
        { code: "AAA105", name: "Basic Design", credits: 3 },
        { code: "AAA106", name: "Architectural Graphics", credits: 1.5 },
        { code: "AAA107", name: "Building Construction and Detailing-I", credits: 2 },
        { code: "ZZA3XX", name: "Open Elective", credits: 3 }
      ],
      4: [
        { code: "AAA108", name: "Theory of Structures", credits: 4 },
        { code: "AAA109", name: "History of Indian Architecture", credits: 3 },
        { code: "AAA110", name: "Eco Friendly Building Materials", credits: 3 },
        { code: "AAA111", name: "Site Survey and Planning", credits: 3 },
        { code: "AAA112", name: "Building Services-II", credits: 3 },
        { code: "AAA113", name: "Architectural Design-I", credits: 3 },
        { code: "AAA114", name: "Building Construction and Detailing-II", credits: 2 },
        { code: "AAA115", name: "Computer Applications in Architecture-l", credits: 1.5 },
        { code: "ZZA3XX", name: "Open Elective", credits: 3 }
      ],
      5: [
        { code: "AAA116", name: "History of Modern Architecture", credits: 3 },
        { code: "HSA102", name: "Industrial Economics and Management", credits: 3 },
        { code: "AAA117", name: "Design of Structure-l", credits: 4 },
        { code: "AAA2XX", name: "Professional Elective-I", credits: 3 },
        { code: "AAA118", name: "Architectural Design-II", credits: 3 },
        { code: "AAA119", name: "Building Construction and Detailing-III", credits: 2 },
        { code: "AAA120", name: "Computer Applications in Architecture-ll", credits: 1.5 },
        { code: "EPA101", name: "Entrepreneurship", credits: 2 },
        { code: "ZZA3XX", name: "Open Elective", credits: 3 }
      ],
      6: [
        { code: "AAA121", name: "Urban Design", credits: 3 },
        { code: "AAA122", name: "Project Management", credits: 3 },
        { code: "AAA123", name: "Design of Structure-II", credits: 4 },
        { code: "AAA2XX", name: "Professional Elective-II", credits: 3 },
        { code: "AAA124", name: "GIS Application in Town Planning", credits: 1.5 },
        { code: "AAA125", name: "Architectural Design -III", credits: 3 },
        { code: "AAA126", name: "Computer Application in Architecture - III", credits: 1.5 },
        { code: "ZZA3XX", name: "Open Elective", credits: 3 }
      ],
      7: [
        { code: "AAA127", name: "Estimation and Specifications", credits: 3 },
        { code: "AAA128", name: "Environmental Engineering", credits: 2 },
        { code: "AAA2XX", name: "Professional Elective-III", credits: 3 },
        { code: "AAA2XX", name: "Professional Elective-IV", credits: 3 },
        { code: "AAA2XX", name: "Professional Elective-V", credits: 3 },
        { code: "AAA1290", name: "Architectural Design -IV", credits: 3 },
        { code: "AAA130", name: "Seminar", credits: 1 },
        { code: "ZZA3XX", name: "Open Elective", credits: 3 }
      ],
      8: [
        { code: "SWA3XX", name: "Open elective (SWAYAM)", credits: 2 },
        { code: "SWA3XX", name: "Open elective (SWAYAM)", credits: 2 },
        { code: "AAA132", name: "Comprehensive test", credits: 1 },
        { code: "AAA133", name: "Internship", credits: 2 },
        { code: "AAA134", name: "Project Work", credits: 8 }
      ]
    }
  },

  // ------------------------------------------------------
  // 3. M.TECH SYLLABUS (PG)
  // ------------------------------------------------------
  "MTECH_R2024": {
    "MTECH_CSE_DS": {
      1: [{ code: "CS251", name: "Prob & Stats for DS", credits: 3 }, { code: "CS252", name: "DS Essentials", credits: 3 }, { code: "CS253", name: "Machine Learning", credits: 3 }, { code: "CSZNN", name: "Elective 1", credits: 3 }, { code: "CSZNN", name: "Elective 2", credits: 3 }, { code: "CS254", name: "ML Lab", credits: 2 }, { code: "CS255", name: "Research Methodology", credits: 2 }],
      2: [{ code: "CS256", name: "Next Gen DB", credits: 3 }, { code: "CS257", name: "Big Data Analytics", credits: 3 }, { code: "CS258", name: "Deep Learning", credits: 3 }, { code: "CSZNN", name: "Elective 3", credits: 3 }, { code: "CSZNN", name: "Elective 4", credits: 3 }, { code: "CS259", name: "Deep Learning Lab", credits: 2 }, { code: "CS260", name: "Mini Project", credits: 2 }],
      3: [{ code: "CSZNN", name: "Elective 5", credits: 3 }, { code: "OE2NN", name: "Open Elective", credits: 3 }, { code: "CS261", name: "Dissertation I", credits: 10 }],
      4: [{ code: "CS262", name: "Dissertation II", credits: 16 }]
    },
    "MTECH_CSE_IS": {
      1: [{ code: "CS263", name: "Math Foundations of IS", credits: 3 }, { code: "CS264", name: "Adv DS & Algo", credits: 3 }, { code: "CS265", name: "Principles of IS", credits: 3 }, { code: "CSZNN", name: "Elective 1", credits: 3 }, { code: "CSZNN", name: "Elective 2", credits: 3 }, { code: "CS266", name: "IS Lab 1", credits: 2 }, { code: "CS255", name: "Research Methodology", credits: 2 }],
      2: [{ code: "CS267", name: "Network Security", credits: 3 }, { code: "CS268", name: "IS Standards", credits: 3 }, { code: "CS269", name: "Ethical Hacking", credits: 3 }, { code: "CSZNN", name: "Elective 3", credits: 3 }, { code: "CSZNN", name: "Elective 4", credits: 3 }, { code: "CS270", name: "IS Lab 2", credits: 2 }, { code: "CS271", name: "Mini Project", credits: 2 }],
      3: [{ code: "CSZNN", name: "Elective 5", credits: 3 }, { code: "OE2NN", name: "Open Elective", credits: 3 }, { code: "CS272", name: "Dissertation I", credits: 10 }],
      4: [{ code: "CS273", name: "Dissertation II", credits: 16 }]
    },
    "MTECH_IT_IOT": {
      1: [{ code: "MA252", name: "Math Foundation of IT", credits: 3 }, { code: "IT251", name: "Adv Data Structures", credits: 3 }, { code: "IT252", name: "IoT Architecture", credits: 3 }, { code: "ITZNN", name: "Elective 1", credits: 3 }, { code: "ITZNN", name: "Elective 2", credits: 3 }, { code: "IT253", name: "Adv Software Lab I", credits: 2 }, { code: "IT254", name: "Research Methodology", credits: 2 }],
      2: [{ code: "IT255", name: "Adv Algorithms", credits: 3 }, { code: "IT256", name: "Soft Computing", credits: 3 }, { code: "IT257", name: "Sensor Networks", credits: 3 }, { code: "ITZNN", name: "Elective 3", credits: 3 }, { code: "ITZNN", name: "Elective 4", credits: 3 }, { code: "IT258", name: "Adv Software Lab II", credits: 2 }, { code: "IT259", name: "Mini Project", credits: 2 }],
      3: [{ code: "ITZNN", name: "Elective 5", credits: 3 }, { code: "OE2NN", name: "Open Elective", credits: 3 }, { code: "IT260", name: "Dissertation I", credits: 10 }],
      4: [{ code: "IT261", name: "Dissertation II", credits: 16 }]
    },
    "MTECH_ECE_WC": {
      1: [{ code: "MA251", name: "Prob & Stochastic Process", credits: 3 }, { code: "EC251", name: "Adv Digital Comm", credits: 3 }, { code: "EC252", name: "Adv DSP", credits: 3 }, { code: "ECZNN", name: "Elective 1", credits: 3 }, { code: "ECZNN", name: "Elective 2", credits: 3 }, { code: "EC262", name: "Adv Signal Lab", credits: 2 }, { code: "EC254", name: "Research Methodology", credits: 2 }],
      2: [{ code: "EC263", name: "Wireless Comm Systems", credits: 3 }, { code: "EC256", name: "Adv Radiating Systems", credits: 3 }, { code: "EC264", name: "CDMA & OFDM", credits: 3 }, { code: "ECZNN", name: "Elective 3", credits: 3 }, { code: "ECZNN", name: "Elective 4", credits: 3 }, { code: "EC265", name: "Wireless Lab", credits: 2 }, { code: "EC266", name: "Mini Project", credits: 2 }],
      3: [{ code: "ECZNN", name: "Elective 5", credits: 3 }, { code: "OE2NN", name: "Open Elective", credits: 3 }, { code: "EC267", name: "Dissertation I", credits: 10 }],
      4: [{ code: "EC268", name: "Dissertation II", credits: 16 }]
    },
    "MTECH_ECE_GEN": {
      1: [{ code: "MA251", name: "Prob & Stochastic", credits: 3 }, { code: "EC251", name: "Adv Digital Comm", credits: 3 }, { code: "EC252", name: "Adv DSP", credits: 3 }, { code: "ECZNN", name: "Elective 1", credits: 3 }, { code: "ECZNN", name: "Elective 2", credits: 3 }, { code: "EC253", name: "Adv Comm Lab", credits: 2 }, { code: "EC254", name: "Research Methodology", credits: 2 }],
      2: [{ code: "EC255", name: "RF System Design", credits: 3 }, { code: "EC256", name: "Adv Radiating Systems", credits: 3 }, { code: "EC257", name: "Low Power VLSI", credits: 3 }, { code: "ECZNN", name: "Elective 3", credits: 3 }, { code: "ECZNN", name: "Elective 4", credits: 3 }, { code: "EC258", name: "VLSI Lab", credits: 2 }, { code: "EC259", name: "Mini Project", credits: 2 }],
      3: [{ code: "ECZNN", name: "Elective 5", credits: 3 }, { code: "OE2NN", name: "Open Elective", credits: 3 }, { code: "EC260", name: "Dissertation I", credits: 10 }],
      4: [{ code: "EC261", name: "Dissertation II", credits: 16 }]
    },
    "MTECH_EEE_EDC": {
      1: [{ code: "EE251", name: "Analysis of Power Converters", credits: 3 }, { code: "EE252", name: "Modern Control Theory", credits: 3 }, { code: "EE253", name: "Solid State Drives", credits: 3 }, { code: "EEZNN", name: "Elective 1", credits: 3 }, { code: "EEZNN", name: "Elective 2", credits: 3 }, { code: "EE254", name: "Solid State Lab", credits: 2 }, { code: "EE255", name: "Research Methodology", credits: 2 }],
      2: [{ code: "EE256", name: "Digital Control Systems", credits: 3 }, { code: "EE257", name: "Special Machines", credits: 3 }, { code: "EE258", name: "Vector AC Drives", credits: 3 }, { code: "EEZNN", name: "Elective 3", credits: 3 }, { code: "EEZNN", name: "Elective 4", credits: 3 }, { code: "EE259", name: "Drives Lab", credits: 2 }, { code: "EE260", name: "Mini Project", credits: 2 }],
      3: [{ code: "EEZNN", name: "Elective 5", credits: 3 }, { code: "OE2NN", name: "Open Elective", credits: 3 }, { code: "EE261", name: "Dissertation I", credits: 10 }],
      4: [{ code: "EE262", name: "Dissertation II", credits: 16 }]
    },
    "MTECH_MECH_PDM": {
      1: [{ code: "ME263", name: "Computational Methods", credits: 3 }, { code: "ME264", name: "Product Design", credits: 3 }, { code: "ME265", name: "Newer Materials", credits: 3 }, { code: "MEZNN", name: "Elective 1", credits: 3 }, { code: "MEZNN", name: "Elective 2", credits: 3 }, { code: "ME266", name: "CAD Lab", credits: 2 }, { code: "ME255", name: "Research Methodology", credits: 2 }],
      2: [{ code: "ME267", name: "Design Optimization", credits: 3 }, { code: "ME268", name: "Modern Mfg Tech", credits: 3 }, { code: "ME269", name: "Design of Experiments", credits: 3 }, { code: "MEZNN", name: "Elective 3", credits: 3 }, { code: "MEZNN", name: "Elective 4", credits: 3 }, { code: "ME270", name: "CIM Lab", credits: 2 }, { code: "ME271", name: "Mini Project", credits: 2 }],
      3: [{ code: "MEZNN", name: "Elective 5", credits: 3 }, { code: "OE2NN", name: "Open Elective", credits: 3 }, { code: "ME272", name: "Dissertation I", credits: 10 }],
      4: [{ code: "ME273", name: "Dissertation II", credits: 16 }]
    },
    "MTECH_MECH_ET": {
      1: [{ code: "ME251", name: "Thermodynamic Analysis", credits: 3 }, { code: "ME252", name: "Heat and Mass Transfer", credits: 3 }, { code: "ME253", name: "Design of Thermal Equip", credits: 3 }, { code: "MEZ01", name: "Elective 1", credits: 3 }, { code: "MEZ02", name: "Elective 2", credits: 3 }, { code: "ME254", name: "Energy Lab", credits: 2 }, { code: "ME255", name: "Research Methodology", credits: 2 }],
      2: [{ code: "ME256", name: "CFD", credits: 3 }, { code: "ME257", name: "Simulation of Energy Sys", credits: 3 }, { code: "ME258", name: "Optimization Techniques", credits: 3 }, { code: "MEZ03", name: "Elective 3", credits: 3 }, { code: "MEZ04", name: "Elective 4", credits: 3 }, { code: "ME259", name: "Computation Lab", credits: 2 }, { code: "ME260", name: "Mini Project", credits: 2 }],
      3: [{ code: "MEZ05", name: "Elective 5", credits: 3 }, { code: "OE2NN", name: "Open Elective", credits: 3 }, { code: "ME261", name: "Dissertation I", credits: 10 }],
      4: [{ code: "ME262", name: "Dissertation II", credits: 16 }]
    },
    "MTECH_CIVIL_SE": {
      1: [{ code: "CE251", name: "Adv Structural Analysis", credits: 3 }, { code: "CE252", name: "Adv Solid Mechanics", credits: 3 }, { code: "CEZNN", name: "Elective 1", credits: 3 }, { code: "CEZNN", name: "Elective 2", credits: 3 }, { code: "CE253", name: "Structural Design Lab", credits: 2 }, { code: "CE254", name: "Adv Concrete Lab", credits: 2 }, { code: "CE255", name: "Research Methodology", credits: 2 }],
      2: [{ code: "CE256", name: "FEM in Struct Engg", credits: 3 }, { code: "CE257", name: "Structural Dynamics", credits: 3 }, { code: "CEZNN", name: "Elective 3", credits: 3 }, { code: "CEZNN", name: "Elective 4", credits: 3 }, { code: "CE258", name: "Model Testing Lab", credits: 2 }, { code: "CE259", name: "Numerical Analysis Lab", credits: 2 }, { code: "CE260", name: "Mini Project", credits: 2 }],
      3: [{ code: "CEZNN", name: "Elective 5", credits: 3 }, { code: "OE2NN", name: "Open Elective", credits: 3 }, { code: "CE261", name: "Dissertation I", credits: 10 }],
      4: [{ code: "CE262", name: "Dissertation II", credits: 16 }]
    },
    "MTECH_CIVIL_EE": {
      1: [{ code: "CE263", name: "Env Systems Analysis", credits: 3 }, { code: "CY251", name: "Env Chem & Microbio", credits: 3 }, { code: "CE264", name: "Physio-Chem Treatment", credits: 3 }, { code: "CEZNN", name: "Elective 1", credits: 3 }, { code: "CEZNN", name: "Elective 2", credits: 3 }, { code: "CE265", name: "Env Chem Lab", credits: 2 }, { code: "CE255", name: "Research Methodology", credits: 2 }],
      2: [{ code: "CE266", name: "Transport of Water", credits: 3 }, { code: "CE267", name: "Design of Treatment Sys", credits: 3 }, { code: "CE268", name: "Env Impact Assessment", credits: 3 }, { code: "CEZNN", name: "Elective 3", credits: 3 }, { code: "CEZNN", name: "Elective 4", credits: 3 }, { code: "CE269", name: "Monitoring Lab", credits: 2 }, { code: "CE270", name: "Mini Project", credits: 2 }],
      3: [{ code: "CEZNN", name: "Elective 5", credits: 3 }, { code: "OE2NN", name: "Open Elective", credits: 3 }, { code: "CE271", name: "Dissertation I", credits: 10 }],
      4: [{ code: "CE272", name: "Dissertation II", credits: 16 }]
    },
    "MTECH_CHEM_CE": {
      1: [{ code: "CH251", name: "Comp Methods in Chem", credits: 3 }, { code: "CH252", name: "Adv Reaction Engg", credits: 3 }, { code: "CH253", name: "Adv Thermodynamics", credits: 3 }, { code: "CHZNN", name: "Elective 1", credits: 3 }, { code: "CHZNN", name: "Elective 2", credits: 3 }, { code: "CH254", name: "Simulation Lab", credits: 2 }, { code: "CH255", name: "Research Methodology", credits: 2 }],
      2: [{ code: "CH256", name: "Adv Transport Phenom", credits: 3 }, { code: "CH257", name: "Adv Separation", credits: 3 }, { code: "CH258", name: "Adv Process Control", credits: 3 }, { code: "CHZNN", name: "Elective 3", credits: 3 }, { code: "CHZNN", name: "Elective 4", credits: 3 }, { code: "CH259", name: "Adv Chem Lab", credits: 2 }, { code: "CH260", name: "Mini Project", credits: 2 }],
      3: [{ code: "CHZNN", name: "Elective 5", credits: 3 }, { code: "OE2NN", name: "Open Elective", credits: 3 }, { code: "CH261", name: "Dissertation I", credits: 10 }],
      4: [{ code: "CH262", name: "Dissertation II", credits: 16 }]
    },
    "MTECH_EIE_IE": {
      1: [{ code: "E1251", name: "Adv Process Control", credits: 3 }, { code: "E1252", name: "Transducers", credits: 3 }, { code: "E1253", name: "Applied Ind Inst", credits: 3 }, { code: "EIZNN", name: "Elective 1", credits: 3 }, { code: "EIZNN", name: "Elective 2", credits: 3 }, { code: "E1254", name: "Process Control Lab", credits: 2 }, { code: "E1255", name: "Research Methodology", credits: 2 }],
      2: [{ code: "E1256", name: "Inst System Design", credits: 3 }, { code: "E1257", name: "PLC & DCS", credits: 3 }, { code: "E1258", name: "Real Time Embedded", credits: 3 }, { code: "EIZNN", name: "Elective 3", credits: 3 }, { code: "EIZNN", name: "Elective 4", credits: 3 }, { code: "E1259", name: "Automation Lab", credits: 2 }, { code: "E1260", name: "Mini Project", credits: 2 }],
      3: [{ code: "EIZ05", name: "Elective 5", credits: 3 }, { code: "OE2NN", name: "Open Elective", credits: 3 }, { code: "E1261", name: "Dissertation I", credits: 10 }],
      4: [{ code: "E1262", name: "Dissertation II", credits: 16 }]
    }
  },

  // ------------------------------------------------------
  // 4. OTHER PG COURSES (MBA, MCA, MSc)
  // ------------------------------------------------------
  "PG_R2020": {
    "MCA_GEN": {
      1: [{ code: "MA253", name: "Maths for Comp Sci", credits: 4 }, { code: "CA201", name: "DS & Algo", credits: 3 }, { code: "CA202", name: "OOPS", credits: 3 }, { code: "CA203", name: "Comp Org & Arch", credits: 3 }, { code: "CA204", name: "Software Engg", credits: 3 }, { code: "CA205", name: "DS Lab", credits: 2 }, { code: "CA206", name: "OOPS Lab", credits: 2 }],
      2: [{ code: "CA207", name: "DBMS", credits: 3 }, { code: "CA208", name: "Networks", credits: 3 }, { code: "CA209", name: "OS", credits: 3 }, { code: "CAZXX", name: "Elective 1", credits: 3 }, { code: "CAZXX", name: "Elective 2", credits: 3 }, { code: "HS203", name: "Comm Skills", credits: 3 }, { code: "CA210", name: "DBMS Lab", credits: 2 }, { code: "CA211", name: "OS Lab", credits: 2 }],
      3: [{ code: "CA212", name: "Web Prog", credits: 3 }, { code: "CA213", name: "Mobile App Dev", credits: 3 }, { code: "CAZXX", name: "Elective 3", credits: 3 }, { code: "CAZXX", name: "Elective 4", credits: 3 }, { code: "CAZXX", name: "Elective 5", credits: 3 }, { code: "CA214", name: "Web Lab", credits: 2 }, { code: "CA215", name: "Mobile Lab", credits: 2 }, { code: "CA216", name: "Mini Project", credits: 1 }],
      4: [{ code: "CA217", name: "Viva Voce", credits: 2 }, { code: "CA218", name: "Project Work", credits: 12 }]
    },
    "MBA_IEVD": {
      1: [{ code: "MB251", name: "Entrepreneurship", credits: 4 }, { code: "MB252", name: "Design Thinking", credits: 4 }, { code: "MB253", name: "Thinking Lab", credits: 2 }, { code: "MB254", name: "Digital Tools", credits: 2 }, { code: "MB255", name: "Product Dev", credits: 4 }, { code: "MB256", name: "Finance", credits: 4 }, { code: "MB257", name: "Biz Model", credits: 4 }, { code: "MB258", name: "Acct Tools", credits: 2 }],
      2: [{ code: "MB259", name: "Marketing", credits: 4 }, { code: "MBZNN", name: "Elective 1", credits: 4 }, { code: "MB260", name: "Business Plan", credits: 4 }, { code: "MB261", name: "Marketing Tools", credits: 2 }, { code: "MB262", name: "Incubation", credits: 14 }],
      3: [{ code: "MB263", name: "Legal", credits: 4 }, { code: "MBZNN", name: "Elective 2", credits: 4 }, { code: "MBZNN", name: "Elective 3", credits: 4 }, { code: "MBZNN", name: "Elective 4", credits: 4 }, { code: "MB264", name: "Contracts Lab", credits: 2 }, { code: "MB265", name: "HR", credits: 4 }, { code: "MB266", name: "E-Comm Lab", credits: 2 }],
      4: [{ code: "MB267", name: "Venture Creation", credits: 20 }, { code: "MB268", name: "Strategic Mgmt", credits: 4 }]
    },
    "MBA_IB": {
      1: [{ code: "MB269", name: "Intl Mgmt", credits: 4 }, { code: "MB270", name: "Biz Reg Framework", credits: 4 }, { code: "MB271", name: "Economics", credits: 4 }, { code: "MB272", name: "Accounts", credits: 4 }, { code: "MB273", name: "Global Biz Env", credits: 4 }, { code: "MB274", name: "Comm", credits: 2 }, { code: "MB275", name: "Digital Tech", credits: 2 }],
      2: [{ code: "MB276", name: "Global Marketing", credits: 4 }, { code: "MB277", name: "Intl Finance", credits: 4 }, { code: "MB278", name: "Intl HR", credits: 4 }, { code: "MB279", name: "Logistics", credits: 4 }, { code: "MB280", name: "Trade Laws", credits: 4 }, { code: "MB281", name: "Research Methods", credits: 2 }, { code: "MB282", name: "Internship", credits: 2 }],
      3: [{ code: "MB283", name: "Biz Strategy", credits: 4 }, { code: "MB284", name: "FOREX", credits: 4 }, { code: "MB285", name: "Tax Planning", credits: 4 }, { code: "MB286", name: "Risk Mgmt", credits: 4 }, { code: "MBZNN", name: "Elective 1", credits: 3 }, { code: "MBZNN", name: "Elective 2", credits: 3 }, { code: "MBZNN", name: "Elective 3", credits: 3 }, { code: "MB287", name: "Port Visit", credits: 2 }],
      4: [{ code: "MB288", name: "Governance", credits: 4 }, { code: "MB289", name: "Intl Economics", credits: 4 }, { code: "MBZNN", name: "Elective 4", credits: 3 }, { code: "MBZNN", name: "Elective 5", credits: 3 }, { code: "MBZNN", name: "Elective 6", credits: 3 }, { code: "MB290", name: "Project", credits: 8 }, { code: "MB291", name: "Viva", credits: 2 }]
    },
    "MSC_MAT": {
      1: [{ code: "PH251", name: "Math Methods", credits: 4 }, { code: "PH252", name: "Mechanics", credits: 4 }, { code: "PH253", name: "Materials I", credits: 4 }, { code: "CE278", name: "Strength of Materials", credits: 4 }, { code: "ELE1", name: "Elective I", credits: 3 }, { code: "ELE2", name: "Elective II", credits: 3 }, { code: "CE279", name: "SoM Lab", credits: 2 }, { code: "E1296", name: "Inst Lab", credits: 2 }],
      2: [{ code: "PH254", name: "Materials II", credits: 4 }, { code: "PH255", name: "Quantum Mech", credits: 4 }, { code: "CS296", name: "C Programming", credits: 4 }, { code: "ELE3", name: "Elective III", credits: 3 }, { code: "ELE4", name: "Elective IV", credits: 3 }, { code: "ELE5", name: "Elective V", credits: 3 }, { code: "PH256", name: "Materials Lab I", credits: 2 }, { code: "CS297", name: "Comp Lab", credits: 2 }],
      3: [{ code: "PH257", name: "Nuclear Physics", credits: 4 }, { code: "PH258", name: "Smart Materials", credits: 4 }, { code: "PH259", name: "EM Theory", credits: 4 }, { code: "ELE6", name: "Elective VI", credits: 3 }, { code: "ELE7", name: "Elective VII", credits: 3 }, { code: "PH260", name: "Materials Lab II", credits: 2 }, { code: "ME296", name: "Workshop", credits: 2 }, { code: "PH261", name: "Seminar", credits: 2 }],
      4: [{ code: "PH262", name: "Project", credits: 12 }]
    }
  }
};