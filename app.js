const ICONS = {
  activity:
    '<path d="M22 12h-4l-3 7L9 5l-3 7H2"/><path d="M22 12h-4l-3 7L9 5l-3 7H2"/>',
  alert:
    '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  appointment:
    '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M8 2v4"/><path d="M16 2v4"/><path d="M3 10h18"/><path d="m9 15 2 2 4-4"/>',
  book:
    '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H22"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H22v20H6.5A2.5 2.5 0 0 1 4 19.5z"/><path d="M8 7h8"/><path d="M8 11h6"/>',
  calendar:
    '<path d="M8 2v4"/><path d="M16 2v4"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/>',
  check:
    '<path d="M20 6 9 17l-5-5"/>',
  clock:
    '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  cloud:
    '<path d="M17.5 19H7a5 5 0 1 1 1.2-9.9 7 7 0 0 1 13.6 2.2A4 4 0 0 1 17.5 19Z"/>',
  command:
    '<path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0 0-6Z"/>',
  database:
    '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5"/><path d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3"/>',
  drive:
    '<path d="m7 3 10 18"/><path d="M17 3 7 21"/><path d="M3 14h18"/><path d="m7 3-4 7 4 11h10l4-7-4-11Z"/>',
  edit:
    '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  filter:
    '<path d="M22 3H2l8 9.5V19l4 2v-8.5Z"/>',
  graduation:
    '<path d="m22 10-10-5-10 5 10 5 10-5Z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/><path d="M22 10v6"/>',
  group:
    '<circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><circle cx="12" cy="17" r="3"/><path d="M10.4 10.5 11.3 14"/><path d="m13.6 10.5-.9 3.5"/><path d="M9.3 16.2H7a4 4 0 0 0-4 4"/><path d="M14.7 16.2H17a4 4 0 0 1 4 4"/>',
  mail:
    '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  menu:
    '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
  moon:
    '<path d="M12 3a6 6 0 0 0 9 7.4A9 9 0 1 1 12 3Z"/>',
  planner:
    '<path d="M4 5a2 2 0 0 1 2-2h9l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><path d="M14 3v6h6"/><path d="M8 13h7"/><path d="M8 17h5"/>',
  phone:
    '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.7 2.6a2 2 0 0 1-.5 2.1L8.1 9.6a16 16 0 0 0 6.3 6.3l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.6 2.6.7a2 2 0 0 1 1.7 2Z"/>',
  plus:
    '<path d="M12 5v14"/><path d="M5 12h14"/>',
  search:
    '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  shield:
    '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
  sheet:
    '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h8"/><path d="M8 9h2"/>',
  spark:
    '<path d="M12 2v5"/><path d="M12 17v5"/><path d="m4.9 4.9 3.5 3.5"/><path d="m15.6 15.6 3.5 3.5"/><path d="M2 12h5"/><path d="M17 12h5"/><path d="m4.9 19.1 3.5-3.5"/><path d="m15.6 8.4 3.5-3.5"/>',
  sun:
    '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  support:
    '<path d="M12 21s-7-4.3-9.2-9A5.2 5.2 0 0 1 12 6.2 5.2 5.2 0 0 1 21.2 12C19 16.7 12 21 12 21Z"/><path d="M12 9v5"/><path d="M9.5 11.5h5"/>',
  todo:
    '<path d="M9 11 11 13 15 9"/><path d="M9 17h6"/><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 3h6v4H9z"/>',
  users:
    '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/>',
  wrench:
    '<path d="M14.7 6.3a4 4 0 0 0-5 5L3 18v3h3l6.7-6.7a4 4 0 0 0 5-5l-2.4 2.4-2-2.1 2.4-2.3Z"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
};

const COURSE_TYPES = {
  skills: { label: "Core Skills", color: "blue" },
  specialization: { label: "Specialization", color: "maroon" },
  elective: { label: "Elective", color: "teal" },
  professional: { label: "Professional", color: "gold" },
  practical: { label: "Practical", color: "green" },
};

const DEFAULT_COURSES = [
  {
    code: "MES01",
    title: "Mathematical Problem Solving",
    type: "skills",
    units: 6,
    hours: 60,
    block: "Block 1",
    lecturerId: "lec-01",
    tutorIds: ["tut-01"],
    software: "Mathematical computing software",
    prerequisites: "Bachelor's degree with a mathematics component",
    outcomes:
      "Apply mathematical principles, build proof strategies, and conduct advanced problem solving.",
  },
  {
    code: "MES02",
    title: "Differential Equations and Modelling",
    type: "skills",
    units: 6,
    hours: 60,
    block: "Block 2",
    lecturerId: "lec-02",
    tutorIds: ["tut-02"],
    software: "Python, R",
    prerequisites: "MES01",
    outcomes:
      "Solve ODEs/PDEs and connect analytical methods to epidemic modelling.",
  },
  {
    code: "MES03",
    title: "Physical Problem Solving",
    type: "skills",
    units: 6,
    hours: 60,
    block: "Block 3",
    lecturerId: "lec-03",
    tutorIds: ["tut-03"],
    software: "Computational physics tools",
    prerequisites: "MES01",
    outcomes:
      "Translate physical systems into mathematical and computational formulations.",
  },
  {
    code: "MES04",
    title: "Introduction to Probability and Statistics",
    type: "skills",
    units: 6,
    hours: 60,
    block: "Block 2",
    lecturerId: "lec-04",
    tutorIds: ["tut-04"],
    software: "R, Python",
    prerequisites: "Probability, statistics, and algebra foundation",
    outcomes:
      "Use probability laws, estimation, testing, regression, and epidemiological measures.",
  },
  {
    code: "MES05",
    title: "Introduction to R and Python",
    type: "skills",
    units: 6,
    hours: 60,
    block: "Block 1",
    lecturerId: "lec-05",
    tutorIds: ["tut-01", "tut-05"],
    software: "R, Python, Quarto",
    prerequisites: "Basic programming recommended",
    outcomes:
      "Manage data, visualize results, run basic analyses, and create reproducible reports.",
  },
  {
    code: "MES06",
    title: "Scientific Computing and LaTeX",
    type: "skills",
    units: 6,
    hours: 60,
    block: "Block 3",
    lecturerId: "lec-06",
    tutorIds: ["tut-02"],
    software: "SageMath, LaTeX, R, Python",
    prerequisites: "MES05",
    outcomes:
      "Implement numerical algorithms and prepare scientific work with LaTeX.",
  },
  {
    code: "MEC01",
    title: "Introduction to Epidemiology",
    type: "specialization",
    units: 6,
    hours: 60,
    block: "Block 4",
    lecturerId: "lec-07",
    tutorIds: ["tut-06"],
    software: "N/A",
    prerequisites: "MES04",
    outcomes:
      "Explain epidemiological concepts, calculate measures, and appraise study designs.",
  },
  {
    code: "MEC02",
    title: "Epidemiology for Disease Modelling",
    type: "specialization",
    units: 6,
    hours: 60,
    block: "Block 5",
    lecturerId: "lec-08",
    tutorIds: ["tut-06"],
    software: "R, Python",
    prerequisites: "MEC01",
    outcomes:
      "Use disease parameters and research designs to support infectious disease modelling.",
  },
  {
    code: "MEC03",
    title: "Introduction to Mathematical Modelling",
    type: "specialization",
    units: 6,
    hours: 60,
    block: "Block 4",
    lecturerId: "lec-09",
    tutorIds: ["tut-07"],
    software: "R, Python",
    prerequisites: "MES02, MES04",
    outcomes:
      "Build and interpret foundational models for population health systems.",
  },
  {
    code: "MEC04",
    title: "Developing Mathematical Models in Public Health",
    type: "specialization",
    units: 6,
    hours: 60,
    block: "Block 5",
    lecturerId: "lec-10",
    tutorIds: ["tut-07"],
    software: "R, Python",
    prerequisites: "MEC03",
    outcomes:
      "Translate public health questions into model structures and scenarios.",
  },
  {
    code: "MEC05",
    title: "Model Fitting and Validation",
    type: "specialization",
    units: 6,
    hours: 60,
    block: "Block 6",
    lecturerId: "lec-11",
    tutorIds: ["tut-08"],
    software: "R, Python",
    prerequisites: "MEC03, MES04",
    outcomes:
      "Fit, validate, and communicate mathematical epidemiology models.",
  },
  {
    code: "MEC06",
    title: "Numerical Methods",
    type: "specialization",
    units: 6,
    hours: 60,
    block: "Block 6",
    lecturerId: "lec-12",
    tutorIds: [],
    software: "Python, R",
    prerequisites: "MES02, MES06",
    outcomes:
      "Use numerical methods for differential equations, integration, and simulation.",
  },
  {
    code: "MEC07",
    title: "Introduction to Data Analysis",
    type: "specialization",
    units: 6,
    hours: 60,
    block: "Block 7",
    lecturerId: "lec-13",
    tutorIds: ["tut-05"],
    software: "R, Python",
    prerequisites: "MES05, MES04",
    outcomes:
      "Clean, analyse, visualize, and interpret epidemiological datasets.",
  },
  {
    code: "MEC08",
    title: "Advanced Data Analysis",
    type: "specialization",
    units: 6,
    hours: 60,
    block: "Block 7",
    lecturerId: "lec-14",
    tutorIds: ["tut-08"],
    software: "R, Python",
    prerequisites: "MEC07",
    outcomes:
      "Apply advanced statistical and computational analysis in epidemiology.",
  },
  {
    code: "MEC09",
    title: "Professional, Project, and Entrepreneurship Development",
    type: "professional",
    units: 6,
    hours: 60,
    block: "Block 8",
    lecturerId: "lec-15",
    tutorIds: [],
    software: "Portfolio and project tools",
    prerequisites: "None",
    outcomes:
      "Prepare students for internships, projects, entrepreneurship, and career readiness.",
  },
  {
    code: "MEC10",
    title: "AI-Driven Epidemiology and Digital Health Surveillance",
    type: "specialization",
    units: 6,
    hours: 60,
    block: "Block 8",
    lecturerId: null,
    tutorIds: [],
    software: "Python, digital health tooling",
    prerequisites: "MEC07, MEC08",
    outcomes:
      "Use AI-enabled workflows and digital surveillance tools for public health intelligence.",
  },
  {
    code: "MEE01",
    title: "Survival Analysis",
    type: "elective",
    units: 6,
    hours: 60,
    block: "Block 9",
    lecturerId: "lec-16",
    tutorIds: ["tut-04"],
    software: "R",
    prerequisites: "MES04",
    outcomes:
      "Model time-to-event data and interpret hazard, survival, and censoring patterns.",
  },
  {
    code: "MEE02",
    title: "Time Series Analysis",
    type: "elective",
    units: 6,
    hours: 60,
    block: "Block 9",
    lecturerId: null,
    tutorIds: [],
    software: "R, Python",
    prerequisites: "MEC07",
    outcomes:
      "Analyse temporal epidemiological data and forecasting signals.",
  },
  {
    code: "MEE03",
    title: "Bayesian Statistics",
    type: "elective",
    units: 6,
    hours: 60,
    block: "Block 9",
    lecturerId: "lec-17",
    tutorIds: ["tut-08"],
    software: "Stan, R, Python",
    prerequisites: "MES04",
    outcomes:
      "Use Bayesian reasoning for uncertainty, inference, and epidemiological decisions.",
  },
  {
    code: "MEE04",
    title: "Stochastic Models",
    type: "elective",
    units: 6,
    hours: 60,
    block: "Block 9",
    lecturerId: null,
    tutorIds: [],
    software: "R, Python",
    prerequisites: "MEC03",
    outcomes:
      "Model random processes and stochastic epidemic systems.",
  },
  {
    code: "MEI01",
    title: "Internship and Thesis",
    type: "practical",
    units: 36,
    hours: 720,
    block: "Internship + Thesis",
    lecturerId: "lec-18",
    tutorIds: [],
    software: "Research/project tools",
    prerequisites: "Academic phase completion",
    outcomes:
      "Complete a six-month research or industry internship and translate the work into thesis/project output.",
  },
];

const DEFAULT_PEOPLE = [
  {
    id: "lec-01",
    kind: "Lecturer",
    name: "Dr. Amina Njoroge",
    affiliation: "AIMS RIC",
    email: "amina.njoroge@example.org",
    phone: "+250 780 000 101",
    expertise: "Problem solving, proof strategies",
    availability: "Block 1 confirmed",
    status: "Confirmed",
    lastContact: "2026-05-12",
    nextFollowUp: "2026-08-17",
    workload: 1,
    notes: "Send final teaching template before onboarding.",
  },
  {
    id: "lec-02",
    kind: "Lecturer",
    name: "Prof. Daniel Mwangi",
    affiliation: "University partner",
    email: "daniel.mwangi@example.org",
    phone: "+254 700 000 202",
    expertise: "Differential equations, epidemic dynamics",
    availability: "Awaiting travel confirmation",
    status: "Awaiting response",
    lastContact: "2026-05-16",
    nextFollowUp: "2026-05-24",
    workload: 1,
    notes: "Needs block dates and honorarium confirmation.",
  },
  {
    id: "lec-03",
    kind: "Lecturer",
    name: "Dr. Salma Bekele",
    affiliation: "Regional collaborator",
    email: "salma.bekele@example.org",
    phone: "+251 900 000 303",
    expertise: "Physical systems and modelling",
    availability: "Needs follow-up",
    status: "Needs follow-up",
    lastContact: "2026-05-08",
    nextFollowUp: "2026-05-22",
    workload: 1,
    notes: "Check whether practical lab format is possible.",
  },
  {
    id: "lec-04",
    kind: "Lecturer",
    name: "Dr. Yves Mugisha",
    affiliation: "AIMS Rwanda",
    email: "yves.mugisha@example.org",
    phone: "+250 780 000 404",
    expertise: "Probability and statistics",
    availability: "Confirmed",
    status: "Confirmed",
    lastContact: "2026-05-11",
    nextFollowUp: "2026-08-31",
    workload: 1,
    notes: "Prefers morning sessions.",
  },
  {
    id: "lec-05",
    kind: "Lecturer",
    name: "Dr. Grace Wanjiru",
    affiliation: "KEMRI",
    email: "grace.wanjiru@example.org",
    phone: "+254 700 000 505",
    expertise: "R, Python, reproducible research",
    availability: "Confirmed",
    status: "Confirmed",
    lastContact: "2026-05-14",
    nextFollowUp: "2026-08-20",
    workload: 1,
    notes: "Share software setup checklist with students.",
  },
  {
    id: "lec-06",
    kind: "Lecturer",
    name: "Dr. Jean Hakizimana",
    affiliation: "AIMS RIC",
    email: "jean.hakizimana@example.org",
    phone: "+250 780 000 606",
    expertise: "Scientific computing, LaTeX",
    availability: "Contacted",
    status: "Contacted",
    lastContact: "2026-05-18",
    nextFollowUp: "2026-05-27",
    workload: 1,
    notes: "Waiting for preferred software stack.",
  },
  {
    id: "lec-07",
    kind: "Lecturer",
    name: "Dr. Miriam Otieno",
    affiliation: "KEMRI",
    email: "miriam.otieno@example.org",
    phone: "+254 700 000 707",
    expertise: "Epidemiology, study design",
    availability: "Confirmed",
    status: "Confirmed",
    lastContact: "2026-05-10",
    nextFollowUp: "2026-10-30",
    workload: 1,
    notes: "Coordinate reading list with library access.",
  },
  {
    id: "lec-08",
    kind: "Lecturer",
    name: "Dr. Pascaline Umuhoza",
    affiliation: "Public health partner",
    email: "pascaline.umuhoza@example.org",
    phone: "+250 780 000 808",
    expertise: "Disease modelling epidemiology",
    availability: "Awaiting response",
    status: "Awaiting response",
    lastContact: "2026-05-13",
    nextFollowUp: "2026-05-23",
    workload: 1,
    notes: "Needs confirmation for Block 5 travel dates.",
  },
  {
    id: "lec-09",
    kind: "Lecturer",
    name: "Prof. Samuel Okello",
    affiliation: "AIMS collaborator",
    email: "samuel.okello@example.org",
    phone: "+256 700 000 909",
    expertise: "Mathematical modelling",
    availability: "Confirmed",
    status: "Confirmed",
    lastContact: "2026-05-15",
    nextFollowUp: "2026-10-26",
    workload: 1,
    notes: "Requested sample outbreak datasets.",
  },
  {
    id: "lec-10",
    kind: "Lecturer",
    name: "Dr. Lydia Kamau",
    affiliation: "KEMRI",
    email: "lydia.kamau@example.org",
    phone: "+254 700 001 010",
    expertise: "Public health modelling",
    availability: "Confirmed",
    status: "Confirmed",
    lastContact: "2026-05-09",
    nextFollowUp: "2026-11-16",
    workload: 1,
    notes: "Can support project briefs.",
  },
  {
    id: "lec-11",
    kind: "Lecturer",
    name: "Dr. Nadia El-Sayed",
    affiliation: "External expert",
    email: "nadia.elsayed@example.org",
    phone: "+20 100 000 111",
    expertise: "Model fitting and validation",
    availability: "Needs follow-up",
    status: "Needs follow-up",
    lastContact: "2026-05-03",
    nextFollowUp: "2026-05-21",
    workload: 1,
    notes: "Overdue response on remote teaching option.",
  },
  {
    id: "lec-12",
    kind: "Lecturer",
    name: "Dr. Kwame Mensah",
    affiliation: "AIMS network",
    email: "kwame.mensah@example.org",
    phone: "+233 500 000 121",
    expertise: "Numerical methods",
    availability: "Contacted",
    status: "Contacted",
    lastContact: "2026-05-17",
    nextFollowUp: "2026-05-29",
    workload: 1,
    notes: "Tutor is still missing.",
  },
  {
    id: "lec-13",
    kind: "Lecturer",
    name: "Dr. Irene Habimana",
    affiliation: "AIMS Rwanda",
    email: "irene.habimana@example.org",
    phone: "+250 780 001 313",
    expertise: "Data analysis",
    availability: "Confirmed",
    status: "Confirmed",
    lastContact: "2026-05-14",
    nextFollowUp: "2027-01-04",
    workload: 1,
    notes: "Drive folder should include dataset governance note.",
  },
  {
    id: "lec-14",
    kind: "Lecturer",
    name: "Dr. Kojo Boateng",
    affiliation: "AIMS RIC",
    email: "kojo.boateng@example.org",
    phone: "+233 500 000 141",
    expertise: "Advanced data analysis",
    availability: "Confirmed",
    status: "Confirmed",
    lastContact: "2026-05-12",
    nextFollowUp: "2027-01-11",
    workload: 1,
    notes: "Can co-supervise capstone datasets.",
  },
  {
    id: "lec-15",
    kind: "Lecturer",
    name: "Ms. Nelly Mutesi",
    affiliation: "Innovation partner",
    email: "nelly.mutesi@example.org",
    phone: "+250 780 001 515",
    expertise: "Entrepreneurship and project readiness",
    availability: "Confirmed",
    status: "Confirmed",
    lastContact: "2026-05-07",
    nextFollowUp: "2027-02-01",
    workload: 1,
    notes: "Prepare internship pitch clinic.",
  },
  {
    id: "lec-16",
    kind: "Lecturer",
    name: "Dr. Peter Onyango",
    affiliation: "KEMRI",
    email: "peter.onyango@example.org",
    phone: "+254 700 001 616",
    expertise: "Survival analysis",
    availability: "Confirmed",
    status: "Confirmed",
    lastContact: "2026-05-19",
    nextFollowUp: "2027-02-22",
    workload: 1,
    notes: "Elective enrollment cap should be confirmed.",
  },
  {
    id: "lec-17",
    kind: "Lecturer",
    name: "Dr. Fatima Hassan",
    affiliation: "External expert",
    email: "fatima.hassan@example.org",
    phone: "+255 700 001 717",
    expertise: "Bayesian statistics",
    availability: "Awaiting response",
    status: "Awaiting response",
    lastContact: "2026-05-20",
    nextFollowUp: "2026-05-25",
    workload: 1,
    notes: "Ask if remote guest lectures are acceptable.",
  },
  {
    id: "lec-18",
    kind: "Lecturer",
    name: "Programme Supervision Panel",
    affiliation: "AIMS RIC and KEMRI",
    email: "mathepi.supervision@example.org",
    phone: "+250 780 001 818",
    expertise: "Internship, thesis supervision",
    availability: "Standing panel",
    status: "Confirmed",
    lastContact: "2026-05-18",
    nextFollowUp: "2027-03-15",
    workload: 1,
    notes: "Coordinate partner placements and thesis review workflow.",
  },
  {
    id: "tut-01",
    kind: "Tutor",
    name: "Alice Ishimwe",
    affiliation: "AIMS RIC",
    email: "alice.ishimwe@example.org",
    phone: "+250 780 002 001",
    expertise: "R/Python and problem solving",
    availability: "Blocks 1-2",
    status: "Confirmed",
    lastContact: "2026-05-15",
    nextFollowUp: "2026-08-24",
    workload: 2,
    notes: "Can run evening clinic.",
  },
  {
    id: "tut-02",
    kind: "Tutor",
    name: "Eric Ndayisaba",
    affiliation: "AIMS Rwanda",
    email: "eric.ndayisaba@example.org",
    phone: "+250 780 002 002",
    expertise: "Numerical methods and LaTeX",
    availability: "Blocks 2-3",
    status: "Confirmed",
    lastContact: "2026-05-16",
    nextFollowUp: "2026-09-07",
    workload: 2,
    notes: "Useful for coding clinics.",
  },
  {
    id: "tut-03",
    kind: "Tutor",
    name: "Brian Kato",
    affiliation: "AIMS RIC",
    email: "brian.kato@example.org",
    phone: "+256 700 002 003",
    expertise: "Physics and modelling",
    availability: "Block 3",
    status: "Contacted",
    lastContact: "2026-05-14",
    nextFollowUp: "2026-05-26",
    workload: 1,
    notes: "Needs travel check.",
  },
  {
    id: "tut-04",
    kind: "Tutor",
    name: "Chantal Uwase",
    affiliation: "KEMRI partner",
    email: "chantal.uwase@example.org",
    phone: "+250 780 002 004",
    expertise: "Statistics and survival analysis",
    availability: "Blocks 2 and 9",
    status: "Confirmed",
    lastContact: "2026-05-18",
    nextFollowUp: "2026-09-01",
    workload: 2,
    notes: "Good fit for applied tutorials.",
  },
  {
    id: "tut-05",
    kind: "Tutor",
    name: "David Mutua",
    affiliation: "AIMS RIC",
    email: "david.mutua@example.org",
    phone: "+254 700 002 005",
    expertise: "Data analysis",
    availability: "Blocks 1 and 7",
    status: "Confirmed",
    lastContact: "2026-05-18",
    nextFollowUp: "2027-01-01",
    workload: 2,
    notes: "Can help with data governance labs.",
  },
  {
    id: "tut-06",
    kind: "Tutor",
    name: "Esther Akello",
    affiliation: "KEMRI",
    email: "esther.akello@example.org",
    phone: "+254 700 002 006",
    expertise: "Epidemiology",
    availability: "Blocks 4-5",
    status: "Awaiting response",
    lastContact: "2026-05-12",
    nextFollowUp: "2026-05-22",
    workload: 2,
    notes: "Follow up on availability letter.",
  },
  {
    id: "tut-07",
    kind: "Tutor",
    name: "Jean Paul Sibomana",
    affiliation: "AIMS Rwanda",
    email: "jeanpaul.sibomana@example.org",
    phone: "+250 780 002 007",
    expertise: "Mathematical modelling",
    availability: "Blocks 4-5",
    status: "Confirmed",
    lastContact: "2026-05-19",
    nextFollowUp: "2026-10-05",
    workload: 2,
    notes: "Can lead model-building labs.",
  },
  {
    id: "tut-08",
    kind: "Tutor",
    name: "Martha Namugisha",
    affiliation: "AIMS network",
    email: "martha.namugisha@example.org",
    phone: "+256 700 002 008",
    expertise: "Model fitting, Bayesian statistics",
    availability: "Blocks 6-9",
    status: "Confirmed",
    lastContact: "2026-05-20",
    nextFollowUp: "2026-12-08",
    workload: 3,
    notes: "Watch workload; assigned across several advanced courses.",
  },
];

const DEFAULT_BLOCKS = [
  {
    id: "onboarding",
    title: "Introduction and Onboarding Week",
    start: "2026-08-31",
    end: "2026-09-04",
    kind: "onboarding",
    note: "Orientation, software setup, student onboarding, programme briefing",
    courses: [],
  },
  {
    id: "block-1",
    title: "Block 1",
    start: "2026-09-07",
    end: "2026-09-25",
    kind: "teaching",
    note: "Core skills launch",
    courses: ["MES01", "MES05"],
  },
  {
    id: "block-2",
    title: "Block 2",
    start: "2026-09-28",
    end: "2026-10-16",
    kind: "teaching",
    note: "Quantitative foundations",
    courses: ["MES02", "MES04"],
  },
  {
    id: "reading-1",
    title: "Reading Week and AHC Convening",
    start: "2026-10-19",
    end: "2026-10-23",
    kind: "reading",
    note: "AHC Convening Week in Nairobi",
    courses: [],
  },
  {
    id: "block-3",
    title: "Block 3",
    start: "2026-10-26",
    end: "2026-11-13",
    kind: "teaching",
    note: "Scientific and physical computation",
    courses: ["MES03", "MES06"],
  },
  {
    id: "block-4",
    title: "Block 4",
    start: "2026-11-16",
    end: "2026-12-04",
    kind: "teaching",
    note: "Epidemiology and modelling begin",
    courses: ["MEC01", "MEC03"],
  },
  {
    id: "block-5",
    title: "Block 5",
    start: "2026-12-07",
    end: "2026-12-24",
    kind: "teaching",
    note: "Public health model development",
    courses: ["MEC02", "MEC04"],
  },
  {
    id: "vacation",
    title: "Vacation and December Holiday",
    start: "2026-12-25",
    end: "2027-01-03",
    kind: "holiday",
    note: "Break",
    courses: [],
  },
  {
    id: "block-6",
    title: "Block 6",
    start: "2027-01-04",
    end: "2027-01-22",
    kind: "teaching",
    note: "Fitting, validation, and numerical methods",
    courses: ["MEC05", "MEC06"],
  },
  {
    id: "block-7",
    title: "Block 7",
    start: "2027-01-25",
    end: "2027-02-12",
    kind: "teaching",
    note: "Data analysis sequence",
    courses: ["MEC07", "MEC08"],
  },
  {
    id: "reading-2",
    title: "Reading Week",
    start: "2027-02-15",
    end: "2027-02-19",
    kind: "reading",
    note: "Reflection, catch-up, elective selection",
    courses: [],
  },
  {
    id: "block-8",
    title: "Block 8",
    start: "2027-02-22",
    end: "2027-03-12",
    kind: "teaching",
    note: "Professional development and digital surveillance",
    courses: ["MEC09", "MEC10"],
  },
  {
    id: "block-9",
    title: "Block 9",
    start: "2027-03-15",
    end: "2027-04-02",
    kind: "teaching",
    note: "Elective pathways",
    courses: ["MEE01", "MEE02", "MEE03", "MEE04"],
  },
  {
    id: "internship",
    title: "Internship",
    start: "2027-04-05",
    end: "2027-10-04",
    kind: "practical",
    note: "Six-month mandatory placement with research or industry partners",
    courses: ["MEI01"],
  },
  {
    id: "thesis",
    title: "Thesis Writing, Review, and Vivas",
    start: "2027-10-05",
    end: "2027-11-05",
    kind: "thesis",
    note: "Thesis/project write-up and examination cycle",
    courses: ["MEI01"],
  },
  {
    id: "graduation",
    title: "Graduation",
    start: "2027-11-23",
    end: "2027-11-24",
    kind: "graduation",
    note: "Graduation window",
    courses: [],
  },
];

const DEFAULT_SESSIONS = [
  {
    id: "s-001",
    courseCode: "MES01",
    day: "Monday",
    time: "09:00",
    duration: 2,
    type: "Lecture",
    room: "KEMRI Seminar Room",
    blockId: "block-1",
    personId: "lec-01",
  },
  {
    id: "s-002",
    courseCode: "MES05",
    day: "Monday",
    time: "14:00",
    duration: 2,
    type: "Practical",
    room: "Computing Lab",
    blockId: "block-1",
    personId: "lec-05",
  },
  {
    id: "s-003",
    courseCode: "MES01",
    day: "Wednesday",
    time: "11:00",
    duration: 2,
    type: "Tutorial",
    room: "Tutorial Studio A",
    blockId: "block-1",
    personId: "tut-01",
  },
  {
    id: "s-004",
    courseCode: "MES05",
    day: "Thursday",
    time: "14:00",
    duration: 2,
    type: "Coding Clinic",
    room: "Computing Lab",
    blockId: "block-1",
    personId: "tut-05",
  },
  {
    id: "s-005",
    courseCode: "MEC03",
    day: "Tuesday",
    time: "09:00",
    duration: 2,
    type: "Lecture",
    room: "KEMRI Seminar Room",
    blockId: "block-4",
    personId: "lec-09",
  },
  {
    id: "s-006",
    courseCode: "MEC01",
    day: "Tuesday",
    time: "14:00",
    duration: 2,
    type: "Lecture",
    room: "Public Health Lab",
    blockId: "block-4",
    personId: "lec-07",
  },
  {
    id: "s-007",
    courseCode: "MEC03",
    day: "Thursday",
    time: "11:00",
    duration: 2,
    type: "Model Lab",
    room: "Computing Lab",
    blockId: "block-4",
    personId: "tut-07",
  },
  {
    id: "s-008",
    courseCode: "MEC10",
    day: "Wednesday",
    time: "09:00",
    duration: 2,
    type: "Seminar",
    room: "Digital Surveillance Studio",
    blockId: "block-8",
    personId: null,
  },
  {
    id: "s-009",
    courseCode: "MEE03",
    day: "Friday",
    time: "11:00",
    duration: 2,
    type: "Elective Lab",
    room: "Computing Lab",
    blockId: "block-9",
    personId: "tut-08",
  },
];

const COURSE_DETAILS = {
  MES01: {
    aim: "To provide students with comprehensive problem-solving strategies using analytical and computational tools, fostering mathematical thinking and creativity across diverse mathematical fields.",
    content:
      "Logical reasoning and proof techniques; combinatorics and graph theory applications; number theory and abstract algebra problems; calculus, differential equations, real analysis, matrix theory, and linear algebra problem-solving.",
  },
  MES02: {
    aim: "To teach students how to solve and analyze ordinary and partial differential equations using rigorous analytical methods and numerical computations, with applications in epidemic modelling.",
    content:
      "First-order and second-order ODEs; systems of linear equations and stability analysis; PDEs; finite difference methods; error analysis; applications to epidemiological models.",
  },
  MES03: {
    aim: "To provide students with basic physics knowledge and problem-solving strategies that exploit physical laws, mathematical methods, and computational tools for analyzing physical systems.",
    content:
      "Fundamental physics concepts; group problem-solving with measurements; analytical techniques; computer-aided physics calculations; interdisciplinary applications in biological systems.",
  },
  MES04: {
    aim: "To provide fundamental knowledge in probability and statistical theory essential for epidemiological applications, focusing on data collection, parameter estimation, and statistical modelling.",
    content:
      "Descriptive statistics; probability laws; Bayes theorem; random variables; discrete and continuous distributions; parameter estimation; hypothesis testing; regression and epidemiological applications.",
  },
  MES05: {
    aim: "To equip students with foundational programming skills in both R and Python for data management, analysis, and visualization, with applications in epidemiological research.",
    content:
      "Data types, structures, and functions in R and Python; data-frame manipulation; descriptive statistics; visualization; measures of association; linear regression; reproducible reporting.",
  },
  MES06: {
    aim: "To equip students with computational mathematics skills, enabling them to bridge mathematical theory and computational practice through programming and algorithm implementation.",
    content:
      "Scientific computing fundamentals; SageMath; matrix operations; linear systems; nonlinear equation solving; numerical ODE solutions; numerical integration and optimization.",
  },
  MEC01: {
    aim: "To equip learners with fundamental epidemiological knowledge, concepts, and skills for describing disease patterns, calculating key measures, and critiquing epidemiological studies.",
    content:
      "Definition, history, and scope of epidemiology; disease frequency and association measures; ecological, case-control, cohort, and randomized study designs; causal inference and critical appraisal.",
  },
  MEC02: {
    aim: "To provide advanced knowledge of disease epidemiology and equip students with skills to calculate disease parameters, apply epidemiological concepts to modelling, and design infectious disease studies.",
    content:
      "Communicable and non-communicable disease epidemiology; transmission mechanisms; parameter estimation; DHS, DHIS2, and surveillance data; disease ecology, One Health, vaccines, resistance, and behavior.",
  },
  MEC03: {
    aim: "To equip students with mathematical concepts for modelling biological systems using ODEs, enabling translation of complex biological phenomena into predictive mathematical frameworks.",
    content:
      "Research question development; population growth; logistic equations; SIR and SEIR models; equilibrium and stability analysis; R0 calculations; age-structured population models.",
  },
  MEC04: {
    aim: "To advance students' modelling skills through specialized compartmental models, within-host dynamics, intervention modelling, and optimal control theory applications in public health.",
    content:
      "Advanced SIS and SEIR models; vector-borne disease modelling; within-host dynamics of HIV, TB, and other diseases; intervention scenario modelling; optimal control and Pontryagin's Maximum Principle.",
  },
  MEC05: {
    aim: "To connect mechanistic models with real data through parameter estimation, model validation, calibration, and statistical inference techniques, ensuring model reliability and practical usefulness.",
    content:
      "Least squares and maximum likelihood estimation; Bayesian parameter estimation; model validation and goodness-of-fit; sensitivity analysis; uncertainty quantification; bootstrapping and out-of-sample validation.",
  },
  MEC06: {
    aim: "To provide computational methods required to solve mathematical models used in epidemiology, enabling effective simulation, analysis, and interpretation of complex disease dynamics.",
    content:
      "Numerical solutions of ODEs, PDEs, and delay differential equations; stability and error propagation; Runge-Kutta and finite element methods; SIR/SEIR simulation and health intervention scenarios.",
  },
  MEC07: {
    aim: "To equip students with comprehensive skills in data collation, cleaning, exploratory analysis, and statistical methods to answer health-related questions using epidemiological data.",
    content:
      "Data collection and sampling; data wrangling and error checking; univariate and bivariate descriptive statistics; linear regression and diagnostics; systematic reviews and meta-analysis interpretation.",
  },
  MEC08: {
    aim: "To introduce advanced data analysis methods for complex epidemiological data, including generalized linear models, spatial analysis, and machine learning applications in public health.",
    content:
      "Generalized linear models; complex survey and hierarchical data; spatial data analysis and disease mapping; machine learning techniques for prediction and public health decision support.",
  },
  MEC09: {
    aim: "To prepare students for successful transitions to employment, entrepreneurship, or further studies through professional development, project management, and career readiness skills.",
    content:
      "Resume and cover-letter writing; interview preparation; grant and proposal development; time and stress management; team collaboration; workplace diversity; innovation and entrepreneurial thinking.",
  },
  MEC10: {
    aim: "To equip students with AI and machine learning techniques for modern epidemiological surveillance, outbreak prediction, and digital health innovation, with attention to African contexts and data challenges.",
    content:
      "AI for syndromic surveillance; social media, search, and news signals; deep learning for disease diagnostics; federated learning; chatbots and mobile health; bias detection in African health AI systems.",
  },
  MEE01: {
    aim: "To equip students with skills to analyze time-to-event data using non-parametric and regression methods, with applications in public health decision-making and policy.",
    content:
      "Censoring mechanisms and survival functions; Kaplan-Meier and Nelson-Aalen estimators; Cox regression; proportional hazards assumptions; competing risks; graphical interpretation.",
  },
  MEE02: {
    aim: "To provide students with skills to analyze, model, and forecast time series data for public health surveillance and research applications.",
    content:
      "Time series decomposition and smoothing; stationarity testing; autocorrelation functions; ARIMA and seasonal ARIMA modelling; volatility modelling; machine learning approaches for time series.",
  },
  MEE03: {
    aim: "To introduce a Bayesian statistical framework for data analysis and inference, allowing incorporation of prior knowledge and uncertainty in epidemiological applications.",
    content:
      "Bayesian versus frequentist inference; prior and posterior distributions; conjugate and non-informative priors; Markov Chain Monte Carlo; Bayesian modelling for health science problems.",
  },
  MEE04: {
    aim: "To introduce stochastic modelling concepts, including stochastic differential equations and agent-based simulations, for more realistic representation of biological systems.",
    content:
      "Stochasticity in biological systems; stochastic differential equations; agent-based model design; simulation coding; interpretation of stochastic simulations in disease dynamics and public health.",
  },
  MEI01: {
    aim: "To provide students with six months of practical experience in mathematical epidemiology through research or industry placement, culminating in a substantial thesis or project report.",
    content:
      "Six-month internship planning and implementation; data collection, analysis, and interpretation; scientific writing and presentation; professional collaboration; project management; reflection on methods and findings.",
  },
};

const DEFAULT_TIMESHEETS = [
  {
    id: "ts-001",
    tutorId: "tut-01",
    courseCode: "MES05",
    date: "2026-09-08",
    category: "Coding clinic",
    hours: 2.5,
    activity: "Prepared R/Python setup clinic and supported reproducible reporting exercises.",
    status: "Approved",
  },
  {
    id: "ts-002",
    tutorId: "tut-07",
    courseCode: "MEC03",
    date: "2026-11-19",
    category: "Model lab",
    hours: 3,
    activity: "Guided students through SIR model implementation and interpretation.",
    status: "Submitted",
  },
  {
    id: "ts-003",
    tutorId: "tut-08",
    courseCode: "MEC05",
    date: "2027-01-08",
    category: "Assignment support",
    hours: 4,
    activity: "Held model-fitting office hours and reviewed validation questions.",
    status: "Review",
  },
  {
    id: "ts-004",
    tutorId: "tut-04",
    courseCode: "MEE01",
    date: "2027-03-18",
    category: "Elective tutorial",
    hours: 2,
    activity: "Kaplan-Meier tutorial preparation and student support.",
    status: "Draft",
  },
];

const DEFAULT_TASKS = [
  {
    id: "task-001",
    title: "Collect travel documentation",
    area: "Student reporting",
    owner: "Centre Coordinators",
    due: "2026-07-31",
    status: "In progress",
    priority: "High",
    details: "Passport, visa, invitation letters, emergency contact, and arrival forms for incoming students.",
  },
  {
    id: "task-002",
    title: "Confirm flight tickets and arrival schedule",
    area: "Travel logistics",
    owner: "Academic & Research Manager",
    due: "2026-08-07",
    status: "Planned",
    priority: "High",
    details: "Track booking status, airport pickups, arrival windows, and exceptional travel needs.",
  },
  {
    id: "task-003",
    title: "Secure accommodation allocation",
    area: "Accommodation",
    owner: "Centre Coordinators",
    due: "2026-08-14",
    status: "Planned",
    priority: "High",
    details: "Room list, check-in instructions, gender-sensitive allocation, accessibility needs, and welcome packs.",
  },
  {
    id: "task-004",
    title: "Prepare classroom and lecture hall",
    area: "Facilities",
    owner: "Centre Operations",
    due: "2026-08-21",
    status: "Planned",
    priority: "Medium",
    details: "Projector, internet, whiteboards, power, seating, hybrid-teaching backup, signage, and safety check.",
  },
  {
    id: "task-005",
    title: "Arrange meals and daily logistics",
    area: "Student welfare",
    owner: "Centre Coordinators",
    due: "2026-08-24",
    status: "Planned",
    priority: "Medium",
    details: "Meal plans, dietary restrictions, campus access, transport shuttles, orientation day logistics.",
  },
  {
    id: "task-006",
    title: "Hire and onboard tutors",
    area: "Teaching support",
    owner: "Head Tutor",
    due: "2026-08-10",
    status: "In progress",
    priority: "High",
    details: "Tutor contracts, availability, workload expectations, timesheet protocol, and course assignments.",
  },
  {
    id: "task-007",
    title: "Appoint and confirm lecturers",
    area: "Teaching appointments",
    owner: "Academic & Research Manager",
    due: "2026-08-15",
    status: "In progress",
    priority: "High",
    details: "Lecturer invitation, availability confirmation, appointment letter, course outline, and Drive folder access.",
  },
];

const PLANNER_TYPES = {
  Study: { label: "Study block", color: "blue" },
  Revision: { label: "Revision", color: "green" },
  Assignment: { label: "Assignment", color: "gold" },
  Reading: { label: "Reading", color: "teal" },
  Wellness: { label: "Wellness", color: "maroon" },
  Research: { label: "Research", color: "danger" },
};

const DEFAULT_PLANNER_TASKS = [
  {
    id: "plan-001",
    ownerId: "student-01",
    title: "Set up R and Python workflow",
    type: "Study",
    courseCode: "MES05",
    date: "2026-09-07",
    time: "16:00",
    duration: 90,
    priority: "High",
    status: "Planned",
    notes: "Install packages, test notebooks, and prepare a reproducible project folder.",
  },
  {
    id: "plan-002",
    ownerId: "student-01",
    title: "Mathematical problem-solving clinic prep",
    type: "Revision",
    courseCode: "MES01",
    date: "2026-09-08",
    time: "07:30",
    duration: 60,
    priority: "Medium",
    status: "In progress",
    notes: "Review proof strategies and collect questions for the tutor clinic.",
  },
  {
    id: "plan-003",
    ownerId: "student-01",
    title: "Probability flash review",
    type: "Reading",
    courseCode: "MES04",
    date: "2026-09-10",
    time: "19:00",
    duration: 45,
    priority: "Medium",
    status: "Planned",
    notes: "Read conditional probability examples before the statistics block begins.",
  },
  {
    id: "plan-004",
    ownerId: "student-01",
    title: "Weekly recovery window",
    type: "Wellness",
    courseCode: "MES01",
    date: "2026-09-12",
    time: "10:00",
    duration: 120,
    priority: "High",
    status: "Planned",
    notes: "Protected rest window to keep study load sustainable.",
  },
  {
    id: "plan-005",
    ownerId: "student-01",
    title: "Internship topic scan",
    type: "Research",
    courseCode: "MEI01",
    date: "2026-09-30",
    time: "15:00",
    duration: 75,
    priority: "Low",
    status: "Planned",
    notes: "Start a shortlist of mathematical epidemiology project themes and possible host groups.",
  },
];

const TODO_CATEGORIES = {
  Study: { label: "Study", color: "blue" },
  Assignment: { label: "Assignment", color: "gold" },
  Revision: { label: "Revision", color: "green" },
  Reading: { label: "Reading", color: "teal" },
  Admin: { label: "Admin", color: "gray" },
  Internship: { label: "Internship", color: "maroon" },
  "Thesis/Project": { label: "Thesis/Project", color: "danger" },
  Wellness: { label: "Wellness", color: "green" },
  Logistics: { label: "Logistics", color: "teal" },
};

const DEFAULT_STUDENT_TODOS = [
  {
    id: "todo-001",
    ownerId: "student-01",
    title: "Complete R/Python setup checklist",
    courseCode: "MES05",
    category: "Study",
    due: "2026-09-06",
    priority: "High",
    status: "Open",
    notes: "Install R, Python, Quarto, and test the reproducible report template.",
  },
  {
    id: "todo-002",
    ownerId: "student-01",
    title: "Prepare questions for MES01 clinic",
    courseCode: "MES01",
    category: "Revision",
    due: "2026-09-08",
    priority: "Medium",
    status: "In progress",
    notes: "List two proof techniques and one problem that needs tutor support.",
  },
  {
    id: "todo-003",
    ownerId: "student-01",
    title: "Submit accommodation confirmation",
    courseCode: "MEI01",
    category: "Logistics",
    due: "2026-08-26",
    priority: "High",
    status: "Open",
    notes: "Confirm arrival time, room allocation, and emergency contact details.",
  },
  {
    id: "todo-004",
    ownerId: "student-01",
    title: "Block protected rest time",
    courseCode: "MES01",
    category: "Wellness",
    due: "2026-09-12",
    priority: "Medium",
    status: "Open",
    notes: "Keep one recovery block in the planner before the next teaching week.",
  },
];

const DEFAULT_STUDENTS = [
  {
    id: "student-01",
    name: "MathEpi Student",
    cohort: "2026/27",
    email: "student@mathepi.local",
    interests: "Mathematical modelling, reproducible analysis",
    contactOptIn: false,
  },
  {
    id: "student-02",
    name: "Amina Niyonsenga",
    cohort: "2026/27",
    email: "amina.n@example.org",
    interests: "R programming, epidemiology, survival analysis",
    contactOptIn: true,
  },
  {
    id: "student-03",
    name: "Brian Otieno",
    cohort: "2026/27",
    email: "brian.o@example.org",
    interests: "Disease modelling, Python, stochastic simulation",
    contactOptIn: false,
  },
  {
    id: "student-04",
    name: "Chipo Moyo",
    cohort: "2026/27",
    email: "chipo.m@example.org",
    interests: "Statistics, clinical trial design, Bayesian methods",
    contactOptIn: true,
  },
  {
    id: "student-05",
    name: "Daniel Kato",
    cohort: "2026/27",
    email: "daniel.k@example.org",
    interests: "Scientific computing, LaTeX, data visualization",
    contactOptIn: false,
  },
  {
    id: "student-06",
    name: "Esther Wanjiru",
    cohort: "2026/27",
    email: "esther.w@example.org",
    interests: "Public health surveillance, time series, field data",
    contactOptIn: true,
  },
];

const STUDY_GROUP_PURPOSES = [
  "Revision",
  "Assignment support",
  "Coding practice",
  "Reading group",
  "Exam prep",
  "Internship/thesis preparation",
  "Course clinic",
];

const INVITATION_STATUS_COLOR = {
  Draft: "gray",
  Invited: "blue",
  Accepted: "green",
  Declined: "danger",
  "Maybe / Request different time": "gold",
  Removed: "gray",
};

const DEFAULT_STUDY_GROUPS = [
  {
    id: "grp-001",
    name: "R/Python Reproducibility Circle",
    organizerId: "student-01",
    courseCode: "MES05",
    purpose: "Coding practice",
    meetingDate: "2026-09-09",
    meetingTime: "17:00",
    mode: "Hybrid",
    location: "KEMRI Computer Lab / Google Meet",
    capacity: 6,
    status: "Forming",
    notes: "Work through setup issues, Quarto structure, and one reproducible mini-report.",
    advisorIds: ["tut-01"],
  },
  {
    id: "grp-002",
    name: "Epidemiology Concepts Reading Group",
    organizerId: "student-04",
    courseCode: "MEC01",
    purpose: "Reading group",
    meetingDate: "2026-11-03",
    meetingTime: "18:30",
    mode: "Online",
    location: "Google Meet",
    capacity: 5,
    status: "Confirmed",
    notes: "Compare incidence, prevalence, study designs, and surveillance examples before MEC01 starts.",
    advisorIds: [],
  },
];

const DEFAULT_STUDY_GROUP_INVITATIONS = [
  {
    id: "sgi-001",
    groupId: "grp-001",
    invitedStudentId: "student-02",
    invitedBy: "student-01",
    status: "Accepted",
    responseNote: "Can join after the coding clinic.",
    createdAt: "2026-09-03",
    respondedAt: "2026-09-04",
  },
  {
    id: "sgi-002",
    groupId: "grp-001",
    invitedStudentId: "student-03",
    invitedBy: "student-01",
    status: "Invited",
    responseNote: "",
    createdAt: "2026-09-03",
    respondedAt: "",
  },
  {
    id: "sgi-003",
    groupId: "grp-002",
    invitedStudentId: "student-01",
    invitedBy: "student-04",
    status: "Invited",
    responseNote: "Proposed for the week before MEC01.",
    createdAt: "2026-10-28",
    respondedAt: "",
  },
  {
    id: "sgi-004",
    groupId: "grp-002",
    invitedStudentId: "student-06",
    invitedBy: "student-04",
    status: "Accepted",
    responseNote: "",
    createdAt: "2026-10-28",
    respondedAt: "2026-10-29",
  },
];

const DEFAULT_STUDY_GROUP_ACTIVITIES = [
  {
    id: "sga-001",
    groupId: "grp-001",
    title: "Each member runs the R/Python install check",
    type: "To-do",
    assignedTo: "student-02",
    due: "2026-09-08",
    status: "Open",
    notes: "Bring screenshots of setup errors and package versions.",
  },
  {
    id: "sga-002",
    groupId: "grp-001",
    title: "Build one shared Quarto template",
    type: "Coding task",
    assignedTo: "student-01",
    due: "2026-09-09",
    status: "In progress",
    notes: "Use a simple epidemic curve example for the template.",
  },
  {
    id: "sga-003",
    groupId: "grp-002",
    title: "Summarize incidence vs prevalence",
    type: "Reading note",
    assignedTo: "student-06",
    due: "2026-11-02",
    status: "Open",
    notes: "Prepare one example from public health surveillance.",
  },
];

const INTERNAL_RECIPIENTS = [
  {
    id: "manager-01",
    name: "Academic & Research Manager",
    kind: "Academic Manager",
    email: "academic.manager@aimsric.org",
  },
  {
    id: "coord-01",
    name: "Centre Coordinator - Student Logistics",
    kind: "Centre Coordinator",
    email: "coordinator.logistics@aimsric.org",
  },
  {
    id: "coord-02",
    name: "Centre Coordinator - Facilities",
    kind: "Centre Coordinator",
    email: "coordinator.facilities@aimsric.org",
  },
  {
    id: "head-tutor-01",
    name: "Head Tutor",
    kind: "Head Tutor",
    email: "head.tutor@aimsric.org",
  },
  {
    id: "support-01",
    name: "Confidential Support Desk",
    kind: "Support / Counsellor",
    email: "support@aimsric.org",
  },
  {
    id: "it-01",
    name: "IT & Learning Systems Support",
    kind: "IT Support",
    email: "it.support@aimsric.org",
  },
];

const DEFAULT_AVAILABILITY = [
  {
    id: "av-001",
    personId: "tut-01",
    day: "Tuesday",
    time: "15:00-17:00",
    mode: "Hybrid",
    location: "KEMRI tutorial room / Meet",
    focus: "Coding clinics and reproducible workflows",
  },
  {
    id: "av-002",
    personId: "lec-07",
    day: "Thursday",
    time: "11:00-12:30",
    mode: "Online",
    location: "Google Meet",
    focus: "Epidemiology concepts and reading guidance",
  },
  {
    id: "av-003",
    personId: "manager-01",
    day: "Monday",
    time: "14:00-16:00",
    mode: "In person",
    location: "Academic office",
    focus: "Academic planning, internship guidance, and wellbeing escalation",
  },
  {
    id: "av-004",
    personId: "coord-01",
    day: "Wednesday",
    time: "10:00-12:00",
    mode: "In person",
    location: "Student services desk",
    focus: "Travel, accommodation, and logistics support",
  },
  {
    id: "av-005",
    personId: "head-tutor-01",
    day: "Friday",
    time: "13:00-15:00",
    mode: "Hybrid",
    location: "Tutorial coordination room",
    focus: "Tutor load, student support routing, and course clinics",
  },
];

const DEFAULT_APPOINTMENTS = [
  {
    id: "apt-001",
    requesterId: "student-01",
    targetId: "tut-01",
    courseCode: "MES05",
    category: "Tutorial support",
    preferredDate: "2026-09-09",
    time: "15:30",
    duration: 30,
    mode: "Hybrid",
    status: "Confirmed",
    summary: "Clarify package installation and reproducible report structure.",
    privateNote: "Tutor should check whether the student has access to the lab machines.",
  },
  {
    id: "apt-002",
    requesterId: "student-01",
    targetId: "lec-07",
    courseCode: "MEC01",
    category: "Course clarification",
    preferredDate: "2026-11-05",
    time: "11:00",
    duration: 30,
    mode: "Online",
    status: "Requested",
    summary: "Ask how surveillance data examples connect to study designs.",
    privateNote: "No private note yet.",
  },
  {
    id: "apt-003",
    requesterId: "tut-01",
    targetId: "head-tutor-01",
    courseCode: "MES05",
    category: "Tutor workload",
    preferredDate: "2026-09-12",
    time: "13:30",
    duration: 45,
    mode: "In person",
    status: "Awaiting confirmation",
    summary: "Review student support demand and rebalance coding clinic coverage.",
    privateNote: "Watch tutor workload before the statistics block starts.",
  },
  {
    id: "apt-004",
    requesterId: "student-01",
    targetId: "manager-01",
    courseCode: "MEI01",
    category: "Internship guidance",
    preferredDate: "2026-10-01",
    time: "14:30",
    duration: 30,
    mode: "In person",
    status: "Draft",
    summary: "Discuss early internship interests and expected preparation path.",
    privateNote: "Good candidate for early project scoping.",
  },
];

const SUPPORT_CATEGORIES = [
  "Academic support",
  "Teaching support",
  "Tutor workload",
  "Staff wellbeing",
  "Counselling referral",
  "Logistics support",
  "Accommodation/travel support",
  "IT/technical support",
  "Facilities/classroom support",
  "Conflict or escalation",
];

const SUPPORT_STATUS_COLOR = {
  Draft: "gray",
  Submitted: "blue",
  Triage: "gold",
  Assigned: "blue",
  "In progress": "gold",
  "Waiting on requester": "gray",
  Resolved: "green",
  Closed: "green",
  Escalated: "danger",
};

const URGENCY_COLOR = {
  Normal: "green",
  Soon: "gold",
  Urgent: "danger",
  Critical: "danger",
};

const DEFAULT_SUPPORT_REQUESTS = [
  {
    id: "sup-001",
    requesterId: "student-01",
    title: "Confidential wellbeing check-in",
    category: "Counselling referral",
    urgency: "Soon",
    status: "Submitted",
    visibility: "confidential",
    assignedTo: "support-01",
    date: "2026-09-09",
    summary: "Student requested a private check-in without sharing details in the app.",
    privateNote: "Student prefers a confidential appointment after class; no clinical notes stored here.",
  },
  {
    id: "sup-002",
    requesterId: "tut-01",
    title: "Coding clinic workload is rising",
    category: "Tutor workload",
    urgency: "Soon",
    status: "Triage",
    visibility: "academic",
    assignedTo: "head-tutor-01",
    date: "2026-09-10",
    summary: "Tutor needs load review before more student support sessions are added.",
    privateNote: "Head Tutor can rebalance clinic coverage with a second tutor.",
  },
  {
    id: "sup-003",
    requesterId: "lec-07",
    title: "Projector and hybrid teaching setup",
    category: "Facilities/classroom support",
    urgency: "Normal",
    status: "Assigned",
    visibility: "coordination",
    assignedTo: "coord-02",
    date: "2026-11-02",
    summary: "Lecturer needs room AV and Google Meet backup confirmed before MEC01 starts.",
    privateNote: "Facilities check requested.",
  },
  {
    id: "sup-004",
    requesterId: "coord-01",
    title: "Student Drive access issue",
    category: "IT/technical support",
    urgency: "Urgent",
    status: "In progress",
    visibility: "technical",
    assignedTo: "it-01",
    date: "2026-08-28",
    summary: "Several students need access to shared folders before orientation.",
    privateNote: "Check invite domain and sharing policy.",
  },
];

const ROLES = {
  "super-admin": {
    label: "Super Admin",
    hint: "Full system, integration, and user management",
    canEdit: true,
    canSensitive: true,
    views: [
      "dashboard",
      "calendar",
      "planner",
      "groups",
      "courses",
      "people",
      "appointments",
      "support",
      "contact",
      "timesheets",
      "tasks",
      "google",
      "access",
    ],
  },
  manager: {
    label: "Academic & Research Manager",
    hint: "Calendar, courses, lecturers, tutors, and follow-up control",
    canEdit: true,
    canSensitive: true,
    views: ["dashboard", "calendar", "courses", "people", "appointments", "groups", "support", "contact", "timesheets", "tasks", "google"],
  },
  "centre-coordinator": {
    label: "Centre Coordinator",
    hint: "Manager-level visibility for coordination, without write access",
    canEdit: false,
    canSensitive: true,
    views: ["dashboard", "calendar", "courses", "people", "appointments", "groups", "support", "contact", "timesheets", "tasks", "google"],
  },
  "head-tutor": {
    label: "Head Tutor",
    hint: "Tutor workload, tutor profiles, assigned work, and lecturer-course tracking",
    canEdit: false,
    canSensitive: true,
    views: ["dashboard", "calendar", "courses", "people", "appointments", "groups", "support", "contact", "timesheets", "tasks"],
  },
  lecturer: {
    label: "Lecturer",
    hint: "Assigned courses, timetable, materials, and confirmation",
    canEdit: false,
    canSensitive: false,
    views: ["dashboard", "calendar", "courses", "appointments", "groups", "support", "contact"],
  },
  tutor: {
    label: "Tutor",
    hint: "Assigned tutorials, course materials, timesheet logging, and workload balance",
    canEdit: false,
    canSensitive: false,
    views: ["dashboard", "calendar", "courses", "appointments", "groups", "support", "timesheets", "tasks"],
  },
  student: {
    label: "Student",
    hint: "Calendar, courses, teaching teams, planner, and appointment requests",
    canEdit: false,
    canSensitive: false,
    views: ["dashboard", "calendar", "planner", "groups", "courses", "appointments", "support"],
  },
  "support-counsellor": {
    label: "Support / Counsellor",
    hint: "Confidential support triage, counselling referrals, and wellbeing requests",
    canEdit: false,
    canSensitive: true,
    views: ["dashboard", "appointments", "support"],
  },
  "it-support": {
    label: "IT Support",
    hint: "Learning systems, Drive access, classroom technology, and technical tickets",
    canEdit: false,
    canSensitive: false,
    views: ["dashboard", "appointments", "support", "tasks"],
  },
  viewer: {
    label: "Viewer / Partner",
    hint: "Read-only approved programme information",
    canEdit: false,
    canSensitive: false,
    views: ["dashboard", "calendar", "courses"],
  },
};

const NAV = [
  { id: "dashboard", label: "Command", icon: "command" },
  { id: "calendar", label: "Calendar", icon: "calendar" },
  { id: "planner", label: "Student Planner", short: "Planner", icon: "planner" },
  { id: "groups", label: "Study Groups", short: "Groups", icon: "group" },
  { id: "courses", label: "Courses", icon: "book" },
  { id: "people", label: "Lecturers & Tutors", short: "People", icon: "users" },
  { id: "appointments", label: "Appointments", icon: "appointment" },
  { id: "support", label: "Support & Wellness", short: "Support", icon: "support" },
  { id: "contact", label: "Contact Hub", icon: "mail" },
  { id: "timesheets", label: "Timesheets", icon: "clock" },
  { id: "tasks", label: "Tasks & Activities", icon: "activity" },
  { id: "google", label: "Sheets & Drive", short: "Sheets", icon: "cloud" },
  { id: "access", label: "Access Control", short: "Access", icon: "shield" },
];

const STATUS_COLOR = {
  Confirmed: "green",
  Contacted: "blue",
  "Awaiting response": "gold",
  "Needs follow-up": "danger",
  "Not contacted": "gray",
  Declined: "danger",
  "Replacement needed": "danger",
};

const PLANNER_STATUS_COLOR = {
  Planned: "blue",
  "In progress": "gold",
  Done: "green",
  Deferred: "gray",
};

const APPOINTMENT_STATUS_COLOR = {
  Draft: "gray",
  Requested: "blue",
  "Awaiting confirmation": "gold",
  Confirmed: "green",
  "Reschedule proposed": "gold",
  Completed: "green",
  Cancelled: "danger",
  "No-show": "danger",
};

const state = {
  view: "dashboard",
  role: "manager",
  query: "",
  calendarMode: "timeline",
  plannerMode: "week",
  appointmentMode: "mine",
  blockId: "block-4",
  selected: null,
  drawer: null,
  toast: null,
  theme: localStorage.getItem("mathepi-theme") || "light",
  googleConnected: false,
  studentCalendarConnected: localStorage.getItem("mathepi-student-calendar") === "true",
  courses: load("mathepi-courses", DEFAULT_COURSES),
  people: load("mathepi-people", DEFAULT_PEOPLE),
  blocks: load("mathepi-blocks", DEFAULT_BLOCKS),
  sessions: load("mathepi-sessions", DEFAULT_SESSIONS),
  timesheets: load("mathepi-timesheets", DEFAULT_TIMESHEETS),
  tasks: load("mathepi-tasks", DEFAULT_TASKS),
  plannerTasks: load("mathepi-planner-tasks", DEFAULT_PLANNER_TASKS),
  studentTodos: load("mathepi-student-todos", DEFAULT_STUDENT_TODOS),
  students: load("mathepi-students", DEFAULT_STUDENTS),
  studyGroups: load("mathepi-study-groups", DEFAULT_STUDY_GROUPS),
  studyGroupInvitations: load("mathepi-study-group-invitations", DEFAULT_STUDY_GROUP_INVITATIONS),
  studyGroupActivities: load("mathepi-study-group-activities", DEFAULT_STUDY_GROUP_ACTIVITIES),
  appointments: load("mathepi-appointments", DEFAULT_APPOINTMENTS),
  availability: load("mathepi-availability", DEFAULT_AVAILABILITY),
  supportRequests: load("mathepi-support-requests", DEFAULT_SUPPORT_REQUESTS),
};

function migrateProgrammeData() {
  const internship = state.blocks.find((item) => item.id === "internship");
  if (internship) {
    Object.assign(internship, {
      title: "Internship",
      start: "2027-04-05",
      end: "2027-10-04",
      kind: "practical",
      note: "Six-month mandatory placement with research or industry partners",
      courses: ["MEI01"],
    });
  }

  const thesis = state.blocks.find((item) => item.id === "thesis");
  if (thesis) {
    Object.assign(thesis, {
      title: "Thesis Writing, Review, and Vivas",
      start: "2027-10-05",
      end: "2027-11-05",
      kind: "thesis",
      note: "Thesis/project write-up and examination cycle",
      courses: ["MEI01"],
    });
  }

  const graduation = state.blocks.find((item) => item.id === "graduation");
  if (graduation) {
    Object.assign(graduation, {
      title: "Graduation",
      start: "2027-11-23",
      end: "2027-11-24",
      kind: "graduation",
      note: "Graduation window",
      courses: [],
    });
  }

  const practical = state.courses.find((item) => item.code === "MEI01");
  if (practical) {
    practical.outcomes =
      "Complete a six-month research or industry internship and translate the work into thesis/project output.";
  }
}

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : structuredClone(fallback);
  } catch {
    return structuredClone(fallback);
  }
}

function save() {
  localStorage.setItem("mathepi-courses", JSON.stringify(state.courses));
  localStorage.setItem("mathepi-people", JSON.stringify(state.people));
  localStorage.setItem("mathepi-blocks", JSON.stringify(state.blocks));
  localStorage.setItem("mathepi-sessions", JSON.stringify(state.sessions));
  localStorage.setItem("mathepi-timesheets", JSON.stringify(state.timesheets));
  localStorage.setItem("mathepi-tasks", JSON.stringify(state.tasks));
  localStorage.setItem("mathepi-planner-tasks", JSON.stringify(state.plannerTasks));
  localStorage.setItem("mathepi-student-todos", JSON.stringify(state.studentTodos));
  localStorage.setItem("mathepi-students", JSON.stringify(state.students));
  localStorage.setItem("mathepi-study-groups", JSON.stringify(state.studyGroups));
  localStorage.setItem("mathepi-study-group-invitations", JSON.stringify(state.studyGroupInvitations));
  localStorage.setItem("mathepi-study-group-activities", JSON.stringify(state.studyGroupActivities));
  localStorage.setItem("mathepi-appointments", JSON.stringify(state.appointments));
  localStorage.setItem("mathepi-availability", JSON.stringify(state.availability));
  localStorage.setItem("mathepi-support-requests", JSON.stringify(state.supportRequests));
  localStorage.setItem("mathepi-student-calendar", String(state.studentCalendarConnected));
}

function icon(name, size = 20) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.spark}</svg>`;
}

function today() {
  return new Date("2026-05-21T09:00:00+02:00");
}

function dateLabel(iso) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${iso}T10:00:00`));
}

function shortDate(iso) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(new Date(`${iso}T10:00:00`));
}

function daysUntil(iso) {
  const target = new Date(`${iso}T10:00:00`);
  return Math.ceil((target - today()) / 86400000);
}

function roleDef() {
  return ROLES[state.role];
}

function applyTheme() {
  document.documentElement.dataset.theme = state.theme;
}

function toggleTheme() {
  state.theme = state.theme === "dark" ? "light" : "dark";
  localStorage.setItem("mathepi-theme", state.theme);
  applyTheme();
  render();
}

function canView(view) {
  return roleDef().views.includes(view);
}

function canEdit() {
  return roleDef().canEdit;
}

function canSeeSensitive() {
  return roleDef().canSensitive;
}

function course(code) {
  return state.courses.find((item) => item.code === code);
}

function person(id) {
  return state.people.find((item) => item.id === id);
}

function assignedCourses(personId) {
  return state.courses.filter(
    (item) => item.lecturerId === personId || item.tutorIds.includes(personId),
  );
}

function filteredCourses() {
  const query = state.query.trim().toLowerCase();
  if (!query) return state.courses;
  return state.courses.filter((item) =>
    [item.code, item.title, item.block, item.type, item.software]
      .join(" ")
      .toLowerCase()
      .includes(query),
  );
}

function filteredPeople(kind = null) {
  const query = state.query.trim().toLowerCase();
  return state.people.filter((item) => {
    const kindOk = kind ? item.kind === kind : true;
    const text = [
      item.name,
      item.kind,
      item.affiliation,
      item.email,
      item.expertise,
      item.status,
    ]
      .join(" ")
      .toLowerCase();
    return kindOk && (!query || text.includes(query));
  });
}

function currentTutorId() {
  return "tut-01";
}

function currentStudentId() {
  return "student-01";
}

function student(id) {
  return state.students.find((item) => item.id === id);
}

function studentName(id) {
  return student(id)?.name || "Unknown student";
}

function currentLecturerId() {
  return "lec-07";
}

function currentActorId() {
  const map = {
    student: currentStudentId(),
    tutor: currentTutorId(),
    lecturer: currentLecturerId(),
    "head-tutor": "head-tutor-01",
    manager: "manager-01",
    "centre-coordinator": "coord-01",
    "super-admin": "manager-01",
    "support-counsellor": "support-01",
    "it-support": "it-01",
  };
  return map[state.role] || "viewer";
}

function appointmentContacts() {
  return [
    ...state.students.map((item) => ({
      id: item.id,
      name: item.name,
      kind: "Student",
      email: item.email,
    })),
    ...INTERNAL_RECIPIENTS,
    ...state.people.map((item) => ({
      id: item.id,
      name: item.name,
      kind: item.kind,
      email: item.email,
    })),
  ];
}

function appointmentPerson(id) {
  return appointmentContacts().find((item) => item.id === id);
}

function participantName(id) {
  return appointmentPerson(id)?.name || "Unknown participant";
}

function participantKind(id) {
  return appointmentPerson(id)?.kind || "Unknown role";
}

function visiblePlannerTasks() {
  if (state.role === "student") {
    return state.plannerTasks.filter((item) => item.ownerId === currentStudentId());
  }
  return state.plannerTasks;
}

function plannerAnchorDate(tasks = visiblePlannerTasks()) {
  const first = tasks
    .slice()
    .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`))[0];
  return new Date(`${first?.date || "2026-09-07"}T10:00:00`);
}

function weekStart(date) {
  const d = new Date(date);
  const offset = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - offset);
  d.setHours(0, 0, 0, 0);
  return d;
}

function sameIsoDate(date, iso) {
  return date.toISOString().slice(0, 10) === iso;
}

function plannerTasksForMode() {
  const tasks = visiblePlannerTasks();
  const anchor = plannerAnchorDate(tasks);
  const start = weekStart(anchor);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return tasks.filter((item) => {
    const d = new Date(`${item.date}T10:00:00`);
    if (state.plannerMode === "day") return sameIsoDate(anchor, item.date);
    if (state.plannerMode === "month") {
      return d.getMonth() === anchor.getMonth() && d.getFullYear() === anchor.getFullYear();
    }
    return d >= start && d <= end;
  });
}

function plannerStatusBadge(status) {
  return `<span class="badge ${PLANNER_STATUS_COLOR[status] || "gray"}">${status}</span>`;
}

function appointmentStatusBadge(status) {
  return `<span class="badge ${APPOINTMENT_STATUS_COLOR[status] || "gray"}">${status}</span>`;
}

function visibleAppointments() {
  const actor = currentActorId();
  if (["super-admin", "manager", "centre-coordinator"].includes(state.role)) return state.appointments;
  if (state.role === "head-tutor") {
    return state.appointments.filter((item) => {
      const requesterKind = participantKind(item.requesterId);
      const targetKind = participantKind(item.targetId);
      return (
        item.requesterId === actor ||
        item.targetId === actor ||
        requesterKind === "Tutor" ||
        targetKind === "Tutor"
      );
    });
  }
  return state.appointments.filter((item) => item.requesterId === actor || item.targetId === actor);
}

function visibleAvailability() {
  const actor = currentActorId();
  if (["super-admin", "manager", "centre-coordinator", "student"].includes(state.role)) return state.availability;
  if (state.role === "head-tutor") {
    return state.availability.filter((item) => participantKind(item.personId) === "Tutor" || item.personId === actor);
  }
  return state.availability.filter((item) => item.personId === actor || item.personId === "manager-01");
}

function canCreateAppointment() {
  return state.role !== "viewer";
}

function canUpdateAppointment(item) {
  if (canEdit()) return true;
  if (state.role === "centre-coordinator" || state.role === "viewer") return false;
  const actor = currentActorId();
  return item.requesterId === actor || item.targetId === actor;
}

function visibleTodos() {
  if (state.role === "student") {
    return state.studentTodos.filter((item) => item.ownerId === currentStudentId());
  }
  return state.studentTodos;
}

function studyGroup(id) {
  return state.studyGroups.find((item) => item.id === id);
}

function groupInvitations(groupId) {
  return state.studyGroupInvitations.filter((item) => item.groupId === groupId);
}

function groupActivities(groupId) {
  return state.studyGroupActivities.filter((item) => item.groupId === groupId);
}

function acceptedGroupMembers(groupId) {
  const group = studyGroup(groupId);
  const accepted = groupInvitations(groupId)
    .filter((item) => item.status === "Accepted")
    .map((item) => item.invitedStudentId);
  return [...new Set([group?.organizerId, ...accepted].filter(Boolean))];
}

function pendingStudyGroupInvites() {
  if (state.role !== "student") return [];
  return state.studyGroupInvitations.filter(
    (item) =>
      item.invitedStudentId === currentStudentId() &&
      ["Invited", "Maybe / Request different time"].includes(item.status),
  );
}

function visibleStudyGroups() {
  const actor = currentActorId();
  if (["manager", "super-admin", "centre-coordinator"].includes(state.role)) return state.studyGroups;
  if (state.role === "student") {
    return state.studyGroups.filter((group) => {
      const invite = groupInvitations(group.id).find((item) => item.invitedStudentId === currentStudentId());
      return group.organizerId === currentStudentId() || invite?.status === "Accepted";
    });
  }
  if (state.role === "tutor" || state.role === "lecturer" || state.role === "head-tutor") {
    return state.studyGroups.filter((group) => group.advisorIds?.includes(actor));
  }
  return [];
}

function canManageStudyGroup(group) {
  return state.role === "student" && group.organizerId === currentStudentId();
}

function invitationStatusBadge(status) {
  return `<span class="badge ${INVITATION_STATUS_COLOR[status] || "gray"}">${status}</span>`;
}

function groupReadiness(group) {
  const accepted = acceptedGroupMembers(group.id).length;
  const pending = groupInvitations(group.id).filter((item) => item.status === "Invited").length;
  const activities = groupActivities(group.id);
  const hasAgenda = activities.length > 0;
  if (accepted >= 3 && hasAgenda && pending === 0) return { label: "Ready", color: "green" };
  if (accepted >= 2 && hasAgenda) return { label: "Almost ready", color: "gold" };
  return { label: "Needs setup", color: "danger" };
}

function groupConflictNote(group) {
  const plannerConflict = state.plannerTasks.find(
    (item) => item.ownerId === currentStudentId() && item.date === group.meetingDate && item.time === group.meetingTime,
  );
  if (plannerConflict && state.role === "student") {
    return `This overlaps with your planner block: ${plannerConflict.title}.`;
  }
  const courseSessions = state.sessions.filter((session) => session.courseCode === group.courseCode && session.time === group.meetingTime);
  if (courseSessions.length) {
    return `${group.courseCode} has teaching activity near ${group.meetingTime}; confirm the group time with members.`;
  }
  return "No obvious timetable or planner conflict detected in the prototype data.";
}

function todoStatusBadge(status) {
  const map = { Open: "blue", "In progress": "gold", Done: "green", Deferred: "gray" };
  return `<span class="badge ${map[status] || "gray"}">${status}</span>`;
}

function todoPriorityBadge(priority) {
  return `<span class="chip ${priority === "High" ? "danger" : priority === "Medium" ? "gold" : "gray"}">${priority}</span>`;
}

function supportStatusBadge(status) {
  return `<span class="badge ${SUPPORT_STATUS_COLOR[status] || "gray"}">${status}</span>`;
}

function urgencyBadge(urgency) {
  return `<span class="badge ${URGENCY_COLOR[urgency] || "gray"}">${urgency}</span>`;
}

function canCreateSupportRequest() {
  return state.role !== "viewer";
}

function supportScopeText() {
  const map = {
    student: "Student Support & Wellness",
    tutor: "Tutor Support & Workload",
    lecturer: "Lecturer Teaching Support",
    "head-tutor": "Head Tutor Support Desk",
    "centre-coordinator": "Coordination & Logistics Support",
    manager: "Programme Support Overview",
    "super-admin": "Support Governance",
    "support-counsellor": "Confidential Support Queue",
    "it-support": "IT & Learning Systems Support",
  };
  return map[state.role] || "Support";
}

function canSeeSupportPrivate(item) {
  const actor = currentActorId();
  if (item.requesterId === actor) return true;
  if (state.role === "support-counsellor" && item.visibility === "confidential") return true;
  if (state.role === "it-support" && item.visibility === "technical") return true;
  if (state.role === "super-admin") return false;
  return item.visibility !== "confidential" && (item.assignedTo === actor || state.role === "manager");
}

function canManageSupport(item) {
  const actor = currentActorId();
  if (canEdit() && item.visibility !== "confidential") return true;
  if (state.role === "support-counsellor" && item.visibility === "confidential") return true;
  if (state.role === "it-support" && item.visibility === "technical") return true;
  if (state.role === "head-tutor" && item.category === "Tutor workload") return true;
  return item.assignedTo === actor;
}

function visibleSupportRequests() {
  const actor = currentActorId();
  if (state.role === "student" || state.role === "tutor" || state.role === "lecturer") {
    return state.supportRequests.filter((item) => item.requesterId === actor || item.assignedTo === actor);
  }
  if (state.role === "support-counsellor") {
    return state.supportRequests.filter((item) => item.visibility === "confidential" || item.assignedTo === actor);
  }
  if (state.role === "it-support") {
    return state.supportRequests.filter((item) => item.visibility === "technical" || item.assignedTo === actor);
  }
  if (state.role === "head-tutor") {
    return state.supportRequests.filter(
      (item) =>
        item.assignedTo === actor ||
        item.category === "Tutor workload" ||
        (participantKind(item.requesterId) === "Tutor" && item.visibility !== "confidential"),
    );
  }
  if (state.role === "centre-coordinator") {
    return state.supportRequests.filter((item) =>
      ["coordination", "technical"].includes(item.visibility) || item.assignedTo === actor,
    );
  }
  if (state.role === "manager" || state.role === "super-admin") return state.supportRequests;
  return [];
}

function supportAssignmentFor(category) {
  if (category === "Counselling referral" || category === "Staff wellbeing") return "support-01";
  if (category === "IT/technical support") return "it-01";
  if (category === "Tutor workload") return "head-tutor-01";
  if (category === "Logistics support" || category === "Accommodation/travel support") return "coord-01";
  if (category === "Facilities/classroom support") return "coord-02";
  return "manager-01";
}

function supportVisibilityFor(category) {
  if (category === "Counselling referral" || category === "Staff wellbeing") return "confidential";
  if (category === "IT/technical support") return "technical";
  if (
    category === "Logistics support" ||
    category === "Accommodation/travel support" ||
    category === "Facilities/classroom support"
  ) {
    return "coordination";
  }
  return "academic";
}

function availabilityFor(personId) {
  return state.availability.filter((item) => item.personId === personId);
}

function appointmentLoadFor(personId) {
  return state.appointments.filter(
    (item) => item.targetId === personId && !["Completed", "Cancelled", "No-show"].includes(item.status),
  );
}

function appointmentConflictNote(personId, preferredDate, time) {
  const duplicate = state.appointments.find(
    (item) =>
      item.targetId === personId &&
      item.preferredDate === preferredDate &&
      item.time === time &&
      !["Cancelled", "No-show"].includes(item.status),
  );
  if (duplicate) return `${participantName(personId)} already has an appointment request at that time.`;
  const teachingConflict = state.sessions.find((session) => session.personId === personId && session.time === time);
  if (teachingConflict) {
    return `${participantName(personId)} may be teaching ${teachingConflict.courseCode} at ${time}; confirm before booking.`;
  }
  return "No obvious appointment conflict detected in the prototype data.";
}

function appointmentTargetOptions() {
  const contacts = appointmentContacts().filter((item) => item.id !== currentActorId());
  if (state.role === "student") {
    return contacts.filter((item) =>
      ["Tutor", "Lecturer", "Academic Manager", "Centre Coordinator", "Support / Counsellor", "IT Support"].includes(item.kind),
    );
  }
  if (state.role === "tutor") {
    return contacts.filter((item) =>
      ["Head Tutor", "Academic Manager", "Centre Coordinator", "Lecturer", "Support / Counsellor", "IT Support"].includes(item.kind),
    );
  }
  if (state.role === "lecturer") {
    return contacts.filter((item) =>
      ["Tutor", "Head Tutor", "Academic Manager", "Centre Coordinator", "IT Support", "Support / Counsellor"].includes(item.kind),
    );
  }
  if (state.role === "head-tutor") {
    return contacts.filter((item) => ["Tutor", "Lecturer", "Academic Manager"].includes(item.kind));
  }
  return contacts;
}

function visibleTimesheets() {
  if (state.role === "tutor") {
    return state.timesheets.filter((item) => item.tutorId === currentTutorId());
  }
  return state.timesheets;
}

function tutorHours(tutorId) {
  return state.timesheets
    .filter((item) => item.tutorId === tutorId)
    .reduce((total, item) => total + Number(item.hours || 0), 0);
}

function balanceLabel(hours) {
  if (hours >= 12) return { label: "Watch balance", color: "danger" };
  if (hours >= 8) return { label: "Busy week", color: "gold" };
  return { label: "Healthy load", color: "green" };
}

function visibleTasks() {
  if (!state.query.trim()) return state.tasks;
  const q = state.query.trim().toLowerCase();
  return state.tasks.filter((item) =>
    [item.title, item.area, item.owner, item.status, item.priority, item.details]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
}

function activeBlock() {
  return state.blocks.find((item) => item.id === state.blockId) || state.blocks[1];
}

function startBlock() {
  const firstTeaching = state.blocks.find((item) => item.id === "block-1");
  return firstTeaching || state.blocks[0];
}

function nextStartLabel() {
  const start = startBlock();
  const days = daysUntil(start.start);
  return `${days} days`;
}

function statusBadge(status) {
  return `<span class="badge ${STATUS_COLOR[status] || "gray"}">${status}</span>`;
}

function typeBadge(type) {
  const meta = COURSE_TYPES[type] || COURSE_TYPES.skills;
  return `<span class="badge ${meta.color}">${meta.label}</span>`;
}

function initials(name) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function overduePeople() {
  const now = today();
  return state.people
    .filter((item) => {
      const d = new Date(`${item.nextFollowUp}T10:00:00`);
      return d <= now && ["Needs follow-up", "Awaiting response", "Contacted"].includes(item.status);
    })
    .sort((a, b) => a.nextFollowUp.localeCompare(b.nextFollowUp));
}

function missingTutorCourses() {
  return state.courses.filter((item) => item.tutorIds.length === 0 && item.type !== "practical");
}

function unconfirmedLecturerCourses() {
  return state.courses.filter((item) => {
    const lead = person(item.lecturerId);
    return !lead || lead.status !== "Confirmed";
  });
}

function workloadWarnings() {
  return state.people.filter((item) => item.workload >= 3);
}

function conflicts() {
  const issues = [];
  const slots = {};
  state.sessions.forEach((session) => {
    const key = `${session.personId}-${session.blockId}-${session.day}-${session.time}`;
    if (session.personId) {
      if (slots[key]) {
        issues.push({
          title: "Double-booked session",
          detail: `${person(session.personId)?.name || "Unknown"} is assigned to overlapping sessions.`,
          icon: "alert",
          color: "danger",
        });
      }
      slots[key] = true;
    }
    if (!session.personId) {
      issues.push({
        title: "Session missing owner",
        detail: `${session.courseCode} ${course(session.courseCode)?.title || ""} needs lecturer or tutor assignment.`,
        icon: "users",
        color: "gold",
      });
    }
  });
  missingTutorCourses()
    .slice(0, 3)
    .forEach((item) =>
      issues.push({
        title: "Tutor missing",
        detail: `${item.code} ${item.title} has no tutor assigned.`,
        icon: "users",
        color: "danger",
      }),
    );
  unconfirmedLecturerCourses()
    .slice(0, 3)
    .forEach((item) =>
      issues.push({
        title: "Lecturer not confirmed",
        detail: `${item.code} ${item.title} needs lecturer confirmation.`,
        icon: "mail",
        color: "gold",
      }),
    );
  return issues;
}

function saveAndRender(message) {
  save();
  toast(message);
  render();
}

function toast(message) {
  state.toast = message;
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    state.toast = null;
    render();
  }, 2600);
}

function setView(view) {
  state.view = canView(view) ? view : "dashboard";
  state.drawer = null;
  render();
}

function openDrawer(type, payload = null) {
  state.drawer = { type, payload };
  render();
}

function closeDrawer() {
  state.drawer = null;
  render();
}

function setRole(role) {
  state.role = role;
  if (!canView(state.view)) state.view = "dashboard";
  render();
}

function topbarAction() {
  if (canEdit()) {
    return `<button class="button primary" onclick="openDrawer('quickAdd')">${icon("plus", 18)}Add</button>`;
  }
  if (state.view === "planner" && state.role === "student") {
    return `<button class="button primary" onclick="openDrawer('plannerForm')">${icon("plus", 18)}Plan</button>`;
  }
  if (state.view === "groups" && state.role === "student") {
    return `<button class="button primary" onclick="openDrawer('studyGroupForm')">${icon("group", 18)}Group</button>`;
  }
  if (state.view === "appointments" && canCreateAppointment()) {
    return `<button class="button primary" onclick="openDrawer('appointmentForm')">${icon("appointment", 18)}Request</button>`;
  }
  if (state.view === "support" && canCreateSupportRequest()) {
    return `<button class="button primary" onclick="openDrawer('supportForm')">${icon("support", 18)}Support</button>`;
  }
  if (state.view === "timesheets" && state.role === "tutor") {
    return `<button class="button primary" onclick="openDrawer('timesheetForm')">${icon("clock", 18)}Log time</button>`;
  }
  return `<button class="button ghost" disabled>${icon("shield", 18)}Read only</button>`;
}

function appLayout() {
  const nav = NAV.filter((item) => canView(item.id));
  const viewMeta = NAV.find((item) => item.id === state.view) || NAV[0];
  return `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="brand-panel">
          <div class="logo-lockup">
            <img src="assets/aims-ric-logo.png" alt="AIMS Research & Innovation Centre logo" />
            <div>
              <p class="brand-kicker">AIMS RIC x KEMRI</p>
              <h1 class="brand-title">MathEpi Assistant</h1>
            </div>
          </div>
          <div class="assistant-pulse">
            <div class="pulse-top"><span>Operations pulse</span><span class="pulse-dot"></span></div>
            <p class="pulse-copy">${overduePeople().length} follow-up${overduePeople().length === 1 ? "" : "s"} need attention. Block 1 begins in ${nextStartLabel()}.</p>
          </div>
        </div>
        <nav class="nav">
          ${nav
            .map(
              (item) => `
              <button class="nav-button ${state.view === item.id ? "active" : ""}" onclick="setView('${item.id}')">
                ${icon(item.icon)}
                <span>${item.label}</span>
                ${item.id === "contact" ? `<span class="count">${overduePeople().length}</span>` : ""}
              </button>
            `,
            )
            .join("")}
        </nav>
        <div class="role-card">
          <label for="roleSwitch">Role simulation</label>
          <select id="roleSwitch" onchange="setRole(this.value)">
            ${Object.entries(ROLES)
              .map(
                ([id, role]) =>
                  `<option value="${id}" ${state.role === id ? "selected" : ""}>${role.label}</option>`,
              )
              .join("")}
          </select>
        </div>
      </aside>
      <section class="content">
        <header class="topbar">
          <div class="page-title">
            <h1>${viewMeta.label}</h1>
            <p>${roleDef().hint}</p>
          </div>
          <div class="top-actions">
            <div class="search">
              ${icon("search", 18)}
              <input placeholder="Search courses, people, blocks..." value="${escapeHtml(state.query)}" oninput="state.query=this.value; render()" />
            </div>
            <button class="button ghost icon-only theme-toggle" onclick="toggleTheme()" aria-label="Switch to ${state.theme === "dark" ? "light" : "dark"} mode" title="Switch to ${state.theme === "dark" ? "light" : "dark"} mode">
              ${icon(state.theme === "dark" ? "sun" : "moon", 18)}
            </button>
            ${topbarAction()}
          </div>
        </header>
        <main class="main">${renderView()}</main>
      </section>
    </div>
    ${mobileNav(nav)}
    ${state.drawer ? renderDrawer() : ""}
    ${state.toast ? `<div class="toast">${icon("check", 18)}${escapeHtml(state.toast)}</div>` : ""}
  `;
}

function mobileNav(nav) {
  const priorityIds =
    state.role === "student"
      ? ["dashboard", "planner", "groups", "support", "appointments"]
      : ["dashboard", "calendar", "courses", "groups", "support"];
  const priority = priorityIds.map((id) => nav.find((item) => item.id === id)).filter(Boolean);
  const first = priority.length >= 5 ? priority.slice(0, 5) : nav.slice(0, 5);
  const active = nav.find((item) => item.id === state.view);
  const mobile = active && !first.some((item) => item.id === active.id) ? [...first.slice(0, 4), active] : first;
  return `
    <nav class="mobile-bottom-nav">
      ${mobile
        .map(
          (item) => `
          <button class="${state.view === item.id ? "active" : ""}" onclick="setView('${item.id}')">
            ${icon(item.icon, 21)}
            <span>${item.short || item.label.split(" ")[0]}</span>
          </button>
        `,
        )
        .join("")}
    </nav>
  `;
}

function renderView() {
  switch (state.view) {
    case "calendar":
      return renderCalendar();
    case "planner":
      return renderStudentPlanner();
    case "groups":
      return renderStudyGroups();
    case "courses":
      return renderCourses();
    case "people":
      return renderPeople();
    case "appointments":
      return renderAppointments();
    case "support":
      return renderSupport();
    case "contact":
      return renderContact();
    case "timesheets":
      return renderTimesheets();
    case "tasks":
      return renderTasks();
    case "google":
      return renderGoogle();
    case "access":
      return renderAccess();
    default:
      return renderDashboard();
  }
}

function renderDashboard() {
  const active = activeBlock();
  const risks = conflicts();
  const activeCourses = active.courses.map(course).filter(Boolean);
  return `
    <div class="view">
      <section class="hero-strip">
        <div class="card mission-card">
          <div class="card-body">
            <div>
              <span class="mission-eyebrow">${icon("spark", 16)} Personal academic operations assistant</span>
              <h2>Know what needs action before the programme feels it.</h2>
              <p>Coordinate blocks, lecturers, tutors, course data, contacts, Drive documents, and Google Sheets-backed operations from one responsive command centre.</p>
            </div>
            <div class="hero-actions">
              <button class="button primary" onclick="setView('contact')">${icon("mail", 18)}Review follow-ups</button>
              <button class="button ghost" onclick="setView('calendar')">${icon("calendar", 18)}Open timetable</button>
            </div>
          </div>
        </div>
        <div class="kpi-grid">
          ${kpi("Courses", state.courses.length, "Curriculum items loaded", "book", "blue")}
          ${kpi("Follow-ups", overduePeople().length, "Need attention today", "alert", "danger")}
          ${kpi("Tutor gaps", missingTutorCourses().length, "Courses without tutor", "users", "gold")}
          ${kpi("Starts in", nextStartLabel(), "Block 1 countdown", "clock", "green")}
        </div>
      </section>

      <section class="quick-grid">
        ${dashboardQuickActions().map((item) => quick(item.title, item.text, item.icon, item.color, item.action)).join("")}
      </section>

      <section class="section-grid">
        <div class="card">
          <div class="card-header">
            <div>
              <h2>Current Planning Block</h2>
              <p>${dateLabel(active.start)} to ${dateLabel(active.end)}</p>
            </div>
            <span class="badge maroon">${active.title}</span>
          </div>
          <div class="card-body">
            <div class="timeline">
              ${activeCourses
                .map(
                  (item) => `
                  <article class="course-row">
                    <div>
                      <h4>${item.code} ${item.title}</h4>
                      <p>${item.outcomes}</p>
                      <div class="row-tags">
                        ${typeBadge(item.type)}
                        <span class="chip gray">${item.hours} hours</span>
                        <span class="chip ${person(item.lecturerId)?.status === "Confirmed" ? "green" : "gold"}">
                          ${person(item.lecturerId)?.name || "Lecturer missing"}
                        </span>
                      </div>
                    </div>
                    <button class="button ghost icon-only" onclick="openDrawer('course', '${item.code}')" aria-label="Open ${item.code}">${icon("edit", 18)}</button>
                  </article>
                `,
                )
                .join("")}
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <div>
              <h2>Assistant Priorities</h2>
              <p>Highest-value actions for the manager.</p>
            </div>
            <span class="badge danger">${risks.length} signals</span>
          </div>
          <div class="card-body assistant-stack">
            ${assistantPriorities()
              .map(
                (item) => `
                <div class="priority">
                  <span class="icon-box ${item.color}">${icon(item.icon, 18)}</span>
                  <div><strong>${item.title}</strong><span>${item.detail}</span></div>
                </div>
              `,
              )
              .join("")}
          </div>
        </div>
      </section>
    </div>
  `;
}

function dashboardQuickActions() {
  if (state.role === "student") {
    return [
      {
        title: "Student planner",
        text: "Plan day, week, and month study blocks with balance signals.",
        icon: "planner",
        color: "blue",
        action: "setView('planner')",
      },
      {
        title: "Study groups",
        text: "Create groups, invite classmates, and plan agendas.",
        icon: "group",
        color: "teal",
        action: "setView('groups')",
      },
      {
        title: "Support hub",
        text: "Request academic, logistics, wellness, or technical support.",
        icon: "support",
        color: "gold",
        action: "setView('support')",
      },
      {
        title: "My timetable",
        text: "Review block sessions and course timing.",
        icon: "calendar",
        color: "green",
        action: "setView('calendar')",
      },
    ];
  }
  return [
    {
      title: canView("contact") ? "Contact lecturer" : "Course view",
      text: canView("contact")
        ? "Open the tracker and next follow-up actions."
        : "Review approved course information.",
      icon: canView("contact") ? "mail" : "book",
      color: "maroon",
      action: canView("contact") ? "setView('contact')" : "setView('courses')",
    },
    {
      title: canEdit() ? "Schedule session" : "My timetable",
      text: canEdit()
        ? "Add a lecture, practical, tutorial, or assessment."
        : "Review assigned courses and upcoming sessions.",
      icon: "calendar",
      color: "teal",
      action: canEdit() ? "openDrawer('sessionForm')" : "setView('calendar')",
    },
    {
      title: canView("support") ? "Support hub" : "Course view",
      text: canView("support")
        ? "Track academic support, wellbeing, workload, logistics, and technical requests."
        : "Review approved course information.",
      icon: canView("support") ? "support" : "book",
      color: "gold",
      action: canView("support") ? "setView('support')" : "setView('courses')",
    },
    {
      title: canView("tasks") ? "Task board" : "Course view",
      text: canView("tasks")
        ? "Pre-arrival documentation, travel, housing, facilities, and appointments."
        : "Review approved programme information.",
      icon: canView("tasks") ? "activity" : "book",
      color: "green",
      action: canView("tasks") ? "setView('tasks')" : "setView('courses')",
    },
  ];
}

function kpi(label, value, note, iconName, color) {
  return `
    <div class="kpi">
      <div class="kpi-top">
        <span class="kpi-label">${label}</span>
        <span class="icon-box ${color}">${icon(iconName, 17)}</span>
      </div>
      <p class="kpi-value">${value}</p>
      <p class="kpi-note">${note}</p>
    </div>
  `;
}

function quick(title, text, iconName, color, action) {
  const selfServiceAction =
    action.includes("supportForm") ||
    action.includes("appointmentForm") ||
    (state.role === "student" && action.includes("studyGroupForm")) ||
    (state.role === "student" && action.includes("todoForm")) ||
    (state.role === "student" && action.includes("plannerForm")) ||
    (state.role === "tutor" && action.includes("timesheetForm"));
  return `
    <button class="quick-action" onclick="${canEdit() || action.includes("setView") || selfServiceAction ? action : "toast('This role has read-only access.')" }">
      <span class="icon-box ${color}">${icon(iconName, 18)}</span>
      <span><strong>${title}</strong><span>${text}</span></span>
    </button>
  `;
}

function assistantPriorities() {
  const list = [
    ...overduePeople()
      .slice(0, 2)
      .map((item) => ({
        title: `Follow up with ${item.name}`,
        detail: `${item.status}; next follow-up was ${dateLabel(item.nextFollowUp)}.`,
        icon: "mail",
        color: "danger",
      })),
    ...missingTutorCourses()
      .slice(0, 2)
      .map((item) => ({
        title: `Assign tutor for ${item.code}`,
        detail: `${item.title} is scheduled in ${item.block}.`,
        icon: "users",
        color: "gold",
      })),
    {
      title: "Confirm Google Sheet ownership",
      detail: "Prepare Calendar, Courses, People, Sessions, Contacts, and Settings tabs before OAuth is enabled.",
      icon: "sheet",
      color: "green",
    },
  ];
  return list.slice(0, 5);
}

function renderCalendar() {
  const active = activeBlock();
  return `
    <div class="view">
      <div class="card">
        <div class="card-header">
          <div>
            <h2>Academic Calendar and Timetable</h2>
            <p>Course titles appear directly in block and timetable slots.</p>
          </div>
          <div class="toolbar">
            <div class="tabs">
              ${["timeline", "week", "agenda"].map((mode) => `<button class="tab ${state.calendarMode === mode ? "active" : ""}" onclick="state.calendarMode='${mode}'; render()">${mode}</button>`).join("")}
            </div>
            <select class="button ghost" onchange="state.blockId=this.value; render()">
              ${state.blocks
                .filter((item) => item.kind === "teaching" || item.kind === "practical" || item.kind === "thesis")
                .map((item) => `<option value="${item.id}" ${state.blockId === item.id ? "selected" : ""}>${item.title}</option>`)
                .join("")}
            </select>
          </div>
        </div>
        <div class="card-body">
          ${state.calendarMode === "timeline" ? renderTimeline() : ""}
          ${state.calendarMode === "week" ? renderWeek(active) : ""}
          ${state.calendarMode === "agenda" ? renderAgenda() : ""}
        </div>
      </div>
      <section class="calendar-layout">
        <div class="card">
          <div class="card-header">
            <div>
              <h2>${active.title} Focus</h2>
              <p>${shortDate(active.start)} to ${shortDate(active.end)} · ${active.note}</p>
            </div>
            ${canEdit() ? `<button class="button soft" onclick="openDrawer('sessionForm')">${icon("plus", 17)}Session</button>` : ""}
          </div>
          <div class="card-body">
            ${renderBlockCourses(active)}
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <div>
              <h2>Legend and Checks</h2>
              <p>Operational view for planning gaps.</p>
            </div>
          </div>
          <div class="card-body insight-list">
            ${Object.entries(COURSE_TYPES).map(([key, meta]) => `<span class="chip ${meta.color}">${meta.label}</span>`).join("")}
            ${conflicts()
              .slice(0, 4)
              .map(
                (item) => `
                <div class="insight">
                  <span class="icon-box ${item.color}">${icon(item.icon, 18)}</span>
                  <div><h4>${item.title}</h4><p>${item.detail}</p></div>
                </div>
              `,
              )
              .join("")}
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderTimeline() {
  return `
    <div class="timeline">
      ${state.blocks
        .map((block) => {
          const active = block.id === state.blockId;
          return `
            <article class="phase ${active ? "active" : ""}" onclick="state.blockId='${block.id}'; render()">
              <div class="phase-date">${shortDate(block.start)}<br />${shortDate(block.end)}</div>
              <div>
                <h3 class="phase-title">${block.title}</h3>
                <p class="phase-meta">${block.note}</p>
              </div>
              <div class="phase-courses">
                ${
                  block.courses.length
                    ? block.courses
                        .map((code) => {
                          const item = course(code);
                          return item ? `<span class="chip ${COURSE_TYPES[item.type].color}">${item.code} ${item.title}</span>` : "";
                        })
                        .join("")
                    : `<span class="chip gray">${block.kind}</span>`
                }
              </div>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderWeek(block) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const times = ["09:00", "11:00", "14:00", "16:00"];
  return `
    <div class="scroll-x">
      <div class="week-grid">
        <div class="week-head">Time</div>
        ${days.map((day) => `<div class="week-head">${day}</div>`).join("")}
        ${times
          .map(
            (time) => `
            <div class="time-cell">${time}</div>
            ${days
              .map((day) => {
                const sessions = state.sessions.filter((s) => s.blockId === block.id && s.day === day && s.time === time);
                return `<div class="week-cell">${sessions.map(renderSession).join("")}</div>`;
              })
              .join("")}
          `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderSession(session) {
  const item = course(session.courseCode);
  const owner = person(session.personId);
  return `
    <button class="session-card ${item?.type || "skills"}" onclick="openDrawer('session', '${session.id}')">
      <strong>${session.courseCode} ${item?.title || ""}</strong>
      <span>${session.type} · ${owner?.name || "Unassigned"}</span>
      <span>${session.room}</span>
    </button>
  `;
}

function renderAgenda() {
  const items = state.sessions
    .filter((session) => session.blockId === state.blockId)
    .sort((a, b) => `${a.day}${a.time}`.localeCompare(`${b.day}${b.time}`));
  return `
    <div class="agenda-list">
      ${
        items.length
          ? items
              .map((session) => {
                const item = course(session.courseCode);
                const owner = person(session.personId);
                return `
                  <article class="agenda-item">
                    <div>
                      <h4>${session.day} ${session.time} · ${session.courseCode} ${item?.title || ""}</h4>
                      <p>${session.type} in ${session.room} · ${owner?.name || "Unassigned"}</p>
                      <div class="row-tags">${item ? typeBadge(item.type) : ""}<span class="chip gray">${session.duration} hours</span></div>
                    </div>
                    <button class="button ghost icon-only" onclick="openDrawer('session', '${session.id}')">${icon("edit", 18)}</button>
                  </article>
                `;
              })
              .join("")
          : `<div class="empty">No sessions in this block yet.</div>`
      }
    </div>
  `;
}

function renderBlockCourses(block) {
  if (!block.courses.length) return `<div class="empty">No course assigned to this phase.</div>`;
  return `
    <div class="course-list">
      ${block.courses
        .map(course)
        .filter(Boolean)
        .map(renderCourseRow)
        .join("")}
    </div>
  `;
}

function renderCourses() {
  const subtitle =
    state.role === "student"
      ? "Open any course to see its schedule, lecturer, tutors, description, and learning expectations."
      : "Curriculum data, assignments, Google Drive documents, and operational notes.";
  return `
    <div class="view">
      <div class="card">
        <div class="card-header">
          <div>
            <h2>Course Management</h2>
            <p>${subtitle}</p>
          </div>
          ${canEdit() ? `<button class="button primary" onclick="openDrawer('courseForm')">${icon("plus", 17)}Course</button>` : ""}
        </div>
        <div class="card-body">
          <div class="course-list">
            ${filteredCourses().map(renderCourseRow).join("") || `<div class="empty">No course matches your search.</div>`}
          </div>
        </div>
      </div>
    </div>
  `;
}

function studentCourseTeamChips(lead, tutors) {
  const tutorText = tutors.length ? tutors.map((t) => t.name).join(", ") : "Tutor not assigned";
  return `
    <span class="chip ${lead ? "blue" : "danger"}">Lecturer: ${lead ? lead.name : "Not assigned"}</span>
    <span class="chip ${tutors.length ? "green" : "danger"}">Tutor: ${tutorText}</span>
  `;
}

function renderCourseRow(item) {
  const lead = person(item.lecturerId);
  const tutors = item.tutorIds.map(person).filter(Boolean);
  const staffing =
    state.role === "student"
      ? studentCourseTeamChips(lead, tutors)
      : `${lead ? statusBadge(lead.status) : `<span class="badge danger">Lecturer missing</span>`}
         <span class="chip ${item.tutorIds.length ? "green" : "danger"}">${item.tutorIds.length} tutor${item.tutorIds.length === 1 ? "" : "s"}</span>`;
  return `
    <article class="course-row">
      <div>
        <h4>${item.code} ${item.title}</h4>
        <p>${item.block} · ${item.hours} hours · ${lead ? lead.name : "Lecturer not assigned"}</p>
        <div class="row-tags">
          ${typeBadge(item.type)}
          ${staffing}
          <span class="chip gray">${item.software}</span>
        </div>
      </div>
      <button class="button ghost" onclick="openDrawer('course', '${item.code}')">${icon("edit", 17)}Open</button>
    </article>
  `;
}

function renderPeople() {
  return `
    <div class="view section-grid">
      <div class="card">
        <div class="card-header">
          <div>
            <h2>Lecturers</h2>
            <p>Confirmation, expertise, contact data, and workload.</p>
          </div>
          ${canEdit() ? `<button class="button primary" onclick="openDrawer('personForm', {kind:'Lecturer'})">${icon("plus", 17)}Lecturer</button>` : ""}
        </div>
        <div class="card-body people-list">
          ${filteredPeople("Lecturer").map(renderPersonRow).join("") || `<div class="empty">No lecturer matches your search.</div>`}
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <div>
            <h2>Tutors</h2>
            <p>Coverage and tutorial readiness.</p>
          </div>
          ${canEdit() ? `<button class="button soft" onclick="openDrawer('personForm', {kind:'Tutor'})">${icon("plus", 17)}Tutor</button>` : ""}
        </div>
        <div class="card-body people-list">
          ${filteredPeople("Tutor").map(renderPersonRow).join("") || `<div class="empty">No tutor matches your search.</div>`}
        </div>
      </div>
    </div>
  `;
}

function renderPersonRow(item) {
  const assigned = assignedCourses(item.id);
  const sensitive = canSeeSensitive();
  return `
    <article class="person-row">
      <div class="profile-head">
        <span class="avatar">${initials(item.name)}</span>
        <div>
          <h4>${item.name}</h4>
          <p>${item.affiliation} · ${item.expertise}</p>
          <div class="row-tags">
            ${statusBadge(item.status)}
            <span class="chip gray">${assigned.length} course${assigned.length === 1 ? "" : "s"}</span>
            ${sensitive ? `<span class="chip blue">${item.email}</span>` : `<span class="chip gray">contact hidden</span>`}
          </div>
        </div>
      </div>
      <button class="button ghost" onclick="openDrawer('person', '${item.id}')">${icon("edit", 17)}Open</button>
    </article>
  `;
}

function renderContact() {
  const lecturers = filteredPeople("Lecturer").sort((a, b) => {
    const priority = { "Needs follow-up": 0, "Awaiting response": 1, Contacted: 2, "Not contacted": 3, Confirmed: 4 };
    return (priority[a.status] ?? 9) - (priority[b.status] ?? 9) || a.nextFollowUp.localeCompare(b.nextFollowUp);
  });
  return `
    <div class="view section-grid">
      <div class="card">
        <div class="card-header">
          <div>
            <h2>Contact Lecturer Hub</h2>
            <p>Track outreach status, communication notes, and next follow-up dates.</p>
          </div>
          ${canEdit() ? `<button class="button primary" onclick="openDrawer('messageDraft')">${icon("mail", 17)}Draft reminder</button>` : ""}
        </div>
        <div class="card-body people-list">
          ${lecturers
            .map(
              (item) => `
              <article class="person-row">
                <div>
                  <h4>${item.name}</h4>
                  <p>${item.expertise} · ${assignedCourses(item.id).map((c) => c.code).join(", ") || "No course assigned"}</p>
                  <div class="row-tags">
                    ${statusBadge(item.status)}
                    <span class="chip gray">Last: ${dateLabel(item.lastContact)}</span>
                    <span class="chip ${new Date(`${item.nextFollowUp}T10:00:00`) <= today() ? "danger" : "blue"}">Next: ${dateLabel(item.nextFollowUp)}</span>
                  </div>
                </div>
                <button class="button ghost" onclick="openDrawer('person', '${item.id}')">${icon("phone", 17)}Contact</button>
              </article>
            `,
            )
            .join("")}
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <div>
            <h2>Tracker Summary</h2>
            <p>Communication pipeline by status.</p>
          </div>
        </div>
        <div class="card-body">
          <table class="mini-table">
            <thead><tr><th>Status</th><th>Count</th><th>Action</th></tr></thead>
            <tbody>
              ${["Not contacted", "Contacted", "Awaiting response", "Confirmed", "Needs follow-up", "Declined", "Replacement needed"]
                .map((status) => {
                  const count = state.people.filter((p) => p.kind === "Lecturer" && p.status === status).length;
                  return `<tr><td>${statusBadge(status)}</td><td>${count}</td><td>${status === "Confirmed" ? "Monitor" : "Follow up"}</td></tr>`;
                })
                .join("")}
            </tbody>
          </table>
          <div style="height: 14px"></div>
          <div class="assistant-stack">
            ${overduePeople()
              .slice(0, 3)
              .map(
                (item) => `
                <div class="priority">
                  <span class="icon-box danger">${icon("alert", 18)}</span>
                  <div><strong>${item.name}</strong><span>${item.notes}</span></div>
                </div>
              `,
              )
              .join("") || `<div class="empty">No overdue follow-ups.</div>`}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderTimesheets() {
  const rows = visibleTimesheets();
  const tutor = person(currentTutorId());
  const canLog = state.role === "tutor" || canEdit();
  const assignmentPanel =
    state.role === "tutor"
      ? renderTutorAssignments(tutor)
      : renderTutorBalanceBoard();
  return `
    <div class="view section-grid">
      <div class="card">
        <div class="card-header">
          <div>
            <h2>Tutor Timesheets and Balance</h2>
            <p>Log tutorial, marking, preparation, student support, and research-support time.</p>
          </div>
          ${canLog ? `<button class="button primary" onclick="openDrawer('timesheetForm')">${icon("plus", 17)}Log time</button>` : `<span class="badge gray">Read only</span>`}
        </div>
        <div class="card-body">
          <table class="mini-table">
            <thead><tr><th>Date</th><th>Tutor</th><th>Course</th><th>Activity</th><th>Hours</th><th>Status</th></tr></thead>
            <tbody>
              ${
                rows.length
                  ? rows
                      .map((entry) => {
                        const p = person(entry.tutorId);
                        return `
                          <tr>
                            <td>${dateLabel(entry.date)}</td>
                            <td>${p?.name || "Unknown"}</td>
                            <td>${entry.courseCode}</td>
                            <td><strong>${entry.category}</strong><br /><span style="color:var(--muted)">${entry.activity}</span></td>
                            <td>${entry.hours}</td>
                            <td><span class="badge ${entry.status === "Approved" ? "green" : entry.status === "Review" ? "gold" : "blue"}">${entry.status}</span></td>
                          </tr>
                        `;
                      })
                      .join("")
                  : `<tr><td colspan="6">No timesheet rows yet.</td></tr>`
              }
            </tbody>
          </table>
          <div style="height: 14px"></div>
          <div class="timeline-item">
            <h4>Centre Coordinator Pool</h4>
            <p>The Centre Coordinator role is designed for multiple people. Each coordinator can see the same operational picture as the Academic and Research Manager, but without write access to programme data.</p>
            <div class="row-tags">
              <span class="chip teal">Coordinator 1</span>
              <span class="chip teal">Coordinator 2</span>
              <span class="chip gray">More can be invited</span>
            </div>
          </div>
        </div>
      </div>
      ${assignmentPanel}
    </div>
  `;
}

function renderTutorAssignments(tutor) {
  const assigned = assignedCourses(tutor.id);
  const total = tutorHours(tutor.id);
  const balance = balanceLabel(total);
  return `
    <div class="card">
      <div class="card-header">
        <div>
          <h2>My Assigned Work</h2>
          <p>${tutor.name} · ${total} logged hours this cycle.</p>
        </div>
        <span class="badge ${balance.color}">${balance.label}</span>
      </div>
      <div class="card-body course-list">
        ${assigned
          .map(
            (item) => `
            <article class="course-row">
              <div>
                <h4>${item.code} ${item.title}</h4>
                <p>${item.block} · ${COURSE_TYPES[item.type]?.label || item.type}</p>
                <div class="row-tags">
                  ${typeBadge(item.type)}
                  <span class="chip gray">${item.hours} course hours</span>
                  <span class="chip blue">${item.software}</span>
                </div>
              </div>
              <button class="button ghost icon-only" onclick="openDrawer('course', '${item.code}')" aria-label="Open ${item.code}">${icon("book", 18)}</button>
            </article>
          `,
          )
          .join("")}
        <div class="timeline-item">
          <h4>Work/research/life balance signal</h4>
          <p>Logged hours are used by the Academic and Research Manager to spot overload, protect preparation time, and keep tutorial support sustainable.</p>
        </div>
      </div>
    </div>
  `;
}

function renderTutorBalanceBoard() {
  const tutors = state.people.filter((item) => item.kind === "Tutor");
  return `
    <div class="card">
      <div class="card-header">
        <div>
          <h2>Tutor Workload Radar</h2>
          <p>Head Tutor and manager view for sustainable support coverage.</p>
        </div>
      </div>
      <div class="card-body people-list">
        ${tutors
          .map((item) => {
            const hours = tutorHours(item.id);
            const balance = balanceLabel(hours);
            const assigned = assignedCourses(item.id);
            const percent = Math.min(100, Math.round((hours / 14) * 100));
            return `
              <article class="person-row">
                <div>
                  <h4>${item.name}</h4>
                  <p>${assigned.map((c) => c.code).join(", ") || "No assigned courses"} · ${hours} logged hours</p>
                  <div class="row-tags">
                    <span class="badge ${balance.color}">${balance.label}</span>
                    <span class="chip gray">${item.expertise}</span>
                  </div>
                  <div class="progress" style="margin-top:10px"><span style="width:${percent}%"></span></div>
                </div>
                <button class="button ghost" onclick="openDrawer('person', '${item.id}')">${icon("users", 17)}Profile</button>
              </article>
            `;
          })
          .join("")}
      </div>
    </div>
  `;
}

function renderTasks() {
  const tasks = visibleTasks();
  const areas = [...new Set(state.tasks.map((item) => item.area))];
  return `
    <div class="view">
      <div class="card">
        <div class="card-header">
          <div>
            <h2>Tasks and Pre-Arrival Activities</h2>
            <p>Operational readiness before students report: travel, housing, lecturers, tutors, facilities, meals, and documentation.</p>
          </div>
          ${canEdit() ? `<button class="button primary" onclick="openDrawer('taskForm')">${icon("plus", 17)}Task</button>` : `<span class="badge gray">Read only</span>`}
        </div>
        <div class="card-body">
          <div class="quick-grid">
            ${areas
              .slice(0, 4)
              .map((area) => {
                const count = state.tasks.filter((task) => task.area === area).length;
                return `
                  <div class="kpi">
                    <div class="kpi-top"><span class="kpi-label">${area}</span><span class="icon-box teal">${icon("check", 17)}</span></div>
                    <p class="kpi-value">${count}</p>
                    <p class="kpi-note">active readiness item${count === 1 ? "" : "s"}</p>
                  </div>
                `;
              })
              .join("")}
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <div>
            <h2>Readiness Board</h2>
            <p>Designed so Centre Coordinators can monitor, while manager/admin control updates.</p>
          </div>
        </div>
        <div class="card-body course-list">
          ${tasks
            .map(
              (task) => `
              <article class="course-row">
                <div>
                  <h4>${task.title}</h4>
                  <p>${task.details}</p>
                  <div class="row-tags">
                    <span class="badge ${task.priority === "High" ? "danger" : "gold"}">${task.priority}</span>
                    <span class="chip ${task.status === "Done" ? "green" : task.status === "In progress" ? "blue" : "gray"}">${task.status}</span>
                    <span class="chip gray">${task.owner}</span>
                    <span class="chip teal">${dateLabel(task.due)}</span>
                  </div>
                </div>
                ${
                  canEdit()
                    ? `<button class="button ghost" onclick="openDrawer('task', '${task.id}')">${icon("edit", 17)}Open</button>`
                    : `<span class="badge gray">${task.area}</span>`
                }
              </article>
            `,
            )
            .join("")}
        </div>
      </div>
    </div>
  `;
}

function renderStudentPlanner() {
  const tasks = visiblePlannerTasks();
  const todos = visibleTodos();
  const shown = plannerTasksForMode();
  const totalHours = Math.round(tasks.reduce((sum, item) => sum + Number(item.duration || 0) / 60, 0) * 10) / 10;
  const completed = tasks.filter((item) => item.status === "Done").length;
  const openTodos = todos.filter((item) => item.status !== "Done");
  const focus = shown.find((item) => item.priority === "High" && item.status !== "Done") || shown[0] || tasks[0];
  const dayLoads = tasks.reduce((acc, item) => {
    acc[item.date] = (acc[item.date] || 0) + Number(item.duration || 0) / 60;
    return acc;
  }, {});
  const busiest = Object.entries(dayLoads).sort((a, b) => b[1] - a[1])[0];
  const canPlan = state.role === "student" || canEdit();
  return `
    <div class="view planner-view">
      <section class="planner-hero">
        <div>
          <span class="mission-eyebrow">${icon("planner", 16)} Smart student planning system</span>
          <h2>Convert the academic calendar into a sustainable personal study rhythm.</h2>
          <p>Students can plan daily, weekly, and monthly study work, keep optional Google Calendar sync separate, and request support before overload becomes invisible.</p>
        </div>
        <div class="planner-metrics">
          ${kpi("Planned hours", totalHours, "across visible student plan", "clock", "blue")}
          ${kpi("Completed", completed, "planner items finished", "check", "green")}
          ${kpi("To-dos", openTodos.length, "open action items", "todo", openTodos.length > 4 ? "gold" : "teal")}
        </div>
      </section>

      <section class="section-grid">
        <div class="card">
          <div class="card-header">
            <div>
              <h2>Student Planner</h2>
              <p>Day, week, and month planning with course-linked tasks.</p>
            </div>
            <div class="toolbar">
              <div class="tabs">
                ${["day", "week", "month"]
                  .map(
                    (mode) =>
                      `<button class="tab ${state.plannerMode === mode ? "active" : ""}" onclick="state.plannerMode='${mode}'; render()">${mode}</button>`,
                  )
                  .join("")}
              </div>
              ${canPlan ? `<button class="button primary" onclick="openDrawer('plannerForm')">${icon("plus", 17)}Plan item</button>` : ""}
            </div>
          </div>
          <div class="card-body planner-board">
            ${
              shown.length
                ? shown.map(renderPlannerTaskCard).join("")
                : `<div class="empty">No planner items for this ${state.plannerMode}. Add a focused study block, revision session, or wellbeing window.</div>`
            }
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <div>
              <h2>Planning Intelligence</h2>
              <p>Lightweight nudges for workload, deadlines, and support.</p>
            </div>
            <span class="badge ${busiest && busiest[1] > 5 ? "danger" : "green"}">${busiest && busiest[1] > 5 ? "Heavy day" : "Balanced"}</span>
          </div>
          <div class="card-body assistant-stack">
            <div class="priority">
              <span class="icon-box blue">${icon("spark", 18)}</span>
              <div>
                <strong>Today&apos;s academic focus</strong>
                <span>${focus ? `${focus.title} for ${focus.courseCode} at ${focus.time}.` : "No immediate focus item yet."}</span>
              </div>
            </div>
            <div class="priority">
              <span class="icon-box ${busiest && busiest[1] > 5 ? "danger" : "green"}">${icon("activity", 18)}</span>
              <div>
                <strong>Balance signal</strong>
                <span>${
                  busiest
                    ? `${shortDate(busiest[0])} carries ${Math.round(busiest[1] * 10) / 10} planned hours. ${busiest[1] > 5 ? "Move one item or book support." : "The current spread looks manageable."}`
                    : "Add study blocks to activate balance signals."
                }</span>
              </div>
            </div>
            <div class="priority">
              <span class="icon-box gold">${icon("appointment", 18)}</span>
              <div>
                <strong>Support suggestion</strong>
                <span>${focus ? `If ${focus.courseCode} feels stuck, book a tutor, lecturer, or support appointment.` : "Use appointments or the support hub when an item remains unresolved."}</span>
              </div>
            </div>
            <div class="priority">
              <span class="icon-box ${openTodos.some((item) => item.priority === "High") ? "danger" : "teal"}">${icon("todo", 18)}</span>
              <div>
                <strong>To-do nudge</strong>
                <span>${openTodos.length ? `${openTodos.length} open item${openTodos.length === 1 ? "" : "s"} need attention; convert the hardest one into a planner block.` : "All visible to-dos are closed."}</span>
              </div>
            </div>
            <div class="sync-panel">
              <div>
                <h4>Optional Google Calendar</h4>
                <p>Planner works without Google. Students may sign in with their own Gmail later to sync selected items, avoid conflicts, and receive reminders.</p>
              </div>
              <button class="button ${state.studentCalendarConnected ? "soft" : "ghost"}" onclick="toggleStudentCalendarSync()">
                ${icon(state.studentCalendarConnected ? "check" : "cloud", 17)}
                ${state.studentCalendarConnected ? "Calendar linked" : "Connect optional"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="card">
        <div class="card-header">
          <div>
            <h2>Student To-Do List</h2>
            <p>Course-linked action list for study, assignments, logistics, wellness, internship, and thesis preparation.</p>
          </div>
          ${canPlan ? `<button class="button primary" onclick="openDrawer('todoForm')">${icon("todo", 17)}To-do</button>` : ""}
        </div>
        <div class="card-body todo-list">
          ${
            todos.length
              ? todos.map(renderTodoCard).join("")
              : `<div class="empty">No to-do items yet. Add one and convert it into a planner block when ready.</div>`
          }
        </div>
      </section>
    </div>
  `;
}

function renderTodoCard(item) {
  const meta = TODO_CATEGORIES[item.category] || TODO_CATEGORIES.Study;
  return `
    <article class="todo-card">
      <div>
        <h4>${item.title}</h4>
        <p>${item.courseCode} &middot; due ${dateLabel(item.due)} &middot; ${item.notes}</p>
        <div class="row-tags">
          <span class="chip ${meta.color}">${meta.label}</span>
          ${todoPriorityBadge(item.priority)}
          ${todoStatusBadge(item.status)}
        </div>
      </div>
      <div class="todo-actions">
        <button class="button ghost" onclick="openDrawer('todo', '${item.id}')">${icon("edit", 17)}Open</button>
        <button class="button ghost" onclick="convertTodoToPlan('${item.id}')">${icon("planner", 17)}Plan</button>
      </div>
    </article>
  `;
}

function renderPlannerTaskCard(item) {
  const meta = PLANNER_TYPES[item.type] || PLANNER_TYPES.Study;
  const linkedCourse = course(item.courseCode);
  return `
    <article class="planner-card">
      <div class="planner-card-top">
        <span class="icon-box ${meta.color}">${icon(item.type === "Wellness" ? "activity" : "planner", 18)}</span>
        <div>
          <h4>${item.title}</h4>
          <p>${dateLabel(item.date)} at ${item.time} &middot; ${item.duration} min</p>
        </div>
      </div>
      <p>${item.notes}</p>
      <div class="row-tags">
        <span class="chip ${meta.color}">${meta.label}</span>
        <span class="chip gray">${item.courseCode} ${linkedCourse?.title || ""}</span>
        <span class="chip ${item.priority === "High" ? "danger" : item.priority === "Medium" ? "gold" : "gray"}">${item.priority}</span>
        ${plannerStatusBadge(item.status)}
      </div>
      <div class="planner-card-actions">
        <button class="button ghost" onclick="openDrawer('plannerTask', '${item.id}')">${icon("edit", 17)}Open</button>
        <button class="button ghost" onclick="openDrawer('appointmentForm', {courseCode:'${item.courseCode}', summary:'Support requested from planner item.'})">${icon("appointment", 17)}Book help</button>
      </div>
    </article>
  `;
}

function toggleStudentCalendarSync() {
  state.studentCalendarConnected = !state.studentCalendarConnected;
  saveAndRender(
    state.studentCalendarConnected
      ? "Optional Google Calendar connection marked for this student."
      : "Optional Google Calendar connection removed.",
  );
}

function renderAppointments() {
  const appointments = visibleAppointments();
  const filtered =
    state.appointmentMode === "pending"
      ? appointments.filter((item) => ["Draft", "Requested", "Awaiting confirmation", "Reschedule proposed"].includes(item.status))
      : state.appointmentMode === "confirmed"
        ? appointments.filter((item) => item.status === "Confirmed")
        : appointments;
  const openCount = appointments.filter((item) => !["Completed", "Cancelled", "No-show"].includes(item.status)).length;
  return `
    <div class="view section-grid appointment-view">
      <div class="card">
        <div class="card-header">
          <div>
            <h2>Appointment and Booking Schedule</h2>
            <p>Request, confirm, and track support across tutors, lecturers, coordinators, and academic management.</p>
          </div>
          <div class="toolbar">
            <div class="tabs">
              ${[
                ["mine", "all"],
                ["pending", "pending"],
                ["confirmed", "confirmed"],
              ]
                .map(([mode, label]) => `<button class="tab ${state.appointmentMode === mode ? "active" : ""}" onclick="state.appointmentMode='${mode}'; render()">${label}</button>`)
                .join("")}
            </div>
            ${canCreateAppointment() ? `<button class="button primary" onclick="openDrawer('appointmentForm')">${icon("appointment", 17)}Request</button>` : ""}
          </div>
        </div>
        <div class="card-body appointment-list">
          ${
            filtered.length
              ? filtered.map(renderAppointmentCard).join("")
              : `<div class="empty">No appointments in this filter yet.</div>`
          }
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div>
            <h2>Availability and Load</h2>
            <p>Public office hours plus support-demand signals.</p>
          </div>
          <span class="badge ${openCount > 6 ? "danger" : openCount > 3 ? "gold" : "green"}">${openCount} open</span>
        </div>
        <div class="card-body assistant-stack">
          <div class="metric-strip">
            ${kpi("Requests", appointments.length, "visible to this role", "appointment", "blue")}
            ${kpi("Confirmed", appointments.filter((item) => item.status === "Confirmed").length, "ready bookings", "check", "green")}
          </div>
          <div class="availability-list">
            ${visibleAvailability().map(renderAvailabilitySlot).join("") || `<div class="empty">No availability slots visible.</div>`}
          </div>
          <div class="sync-panel">
            <div>
              <h4>Future calendar sync</h4>
              <p>Appointments can later write confirmed bookings to Google Calendar while storing requests and audit history in Google Sheets.</p>
            </div>
            <span class="badge gold">Sheets ready</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderAppointmentCard(item) {
  const linkedCourse = course(item.courseCode);
  return `
    <article class="appointment-card">
      <div class="appointment-main">
        <span class="icon-box ${APPOINTMENT_STATUS_COLOR[item.status] || "blue"}">${icon("appointment", 18)}</span>
        <div>
          <h4>${item.category}</h4>
          <p>${participantName(item.requesterId)} to ${participantName(item.targetId)} &middot; ${dateLabel(item.preferredDate)} at ${item.time}</p>
          <p>${item.summary}</p>
          <div class="row-tags">
            ${appointmentStatusBadge(item.status)}
            <span class="chip gray">${item.courseCode} ${linkedCourse?.title || ""}</span>
            <span class="chip teal">${item.mode}</span>
            <span class="chip gray">${item.duration} min</span>
          </div>
        </div>
      </div>
      <button class="button ghost" onclick="openDrawer('appointment', '${item.id}')">${icon("edit", 17)}Open</button>
    </article>
  `;
}

function renderAvailabilitySlot(item) {
  return `
    <div class="timeline-item">
      <h4>${participantName(item.personId)}</h4>
      <p>${participantKind(item.personId)} &middot; ${item.day} ${item.time} &middot; ${item.mode}</p>
      <div class="row-tags">
        <span class="chip blue">${item.location}</span>
        <span class="chip gray">${item.focus}</span>
      </div>
    </div>
  `;
}

function renderSupport() {
  const requests = visibleSupportRequests();
  const open = requests.filter((item) => !["Resolved", "Closed"].includes(item.status));
  const confidentialAll = state.supportRequests.filter((item) => item.visibility === "confidential");
  const critical = requests.filter((item) => ["Urgent", "Critical"].includes(item.urgency));
  return `
    <div class="view support-view">
      <section class="support-hero">
        <div>
          <span class="mission-eyebrow">${icon("support", 16)} ${supportScopeText()}</span>
          <h2>Route academic, wellbeing, workload, logistics, and technical support without exposing private details.</h2>
          <p>This hub is built as a care system, not a surveillance tool. Sensitive wellness details stay confidential while the programme can still see workload and escalation patterns.</p>
        </div>
        <div class="planner-metrics">
          ${kpi("Open", open.length, "visible support cases", "support", open.length > 5 ? "gold" : "blue")}
          ${kpi("Urgent", critical.length, "needs fast triage", "alert", critical.length ? "danger" : "green")}
          ${kpi("Private", state.role === "manager" ? confidentialAll.length : requests.filter((item) => item.visibility === "confidential").length, "confidential signal only", "shield", "maroon")}
        </div>
      </section>

      <section class="quick-grid">
        ${supportQuickActions().map((item) => quick(item.title, item.text, item.icon, item.color, item.action)).join("")}
      </section>

      <section class="section-grid">
        <div class="card">
          <div class="card-header">
            <div>
              <h2>Support Requests</h2>
              <p>Role-aware queue with private wellness notes hidden unless assigned to confidential support.</p>
            </div>
            ${canCreateSupportRequest() ? `<button class="button primary" onclick="openDrawer('supportForm')">${icon("support", 17)}Request</button>` : ""}
          </div>
          <div class="card-body support-list">
            ${requests.length ? requests.map(renderSupportCard).join("") : `<div class="empty">No support requests visible to this role.</div>`}
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <div>
              <h2>Support Intelligence</h2>
              <p>Useful signals without turning support into monitoring.</p>
            </div>
            <span class="badge ${critical.length ? "danger" : "green"}">${critical.length ? "Action" : "Stable"}</span>
          </div>
          <div class="card-body assistant-stack">
            ${supportInsights(requests).map(
              (item) => `
                <div class="priority">
                  <span class="icon-box ${item.color}">${icon(item.icon, 18)}</span>
                  <div><strong>${item.title}</strong><span>${item.detail}</span></div>
                </div>
              `,
            ).join("")}
            <div class="sync-panel">
              <div>
                <h4>Privacy-by-design rule</h4>
                <p>Wellness notes should remain visible only to the requester and assigned confidential support handler. Managers see aggregate signals and unresolved escalations.</p>
              </div>
              <span class="badge maroon">Private</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

function supportQuickActions() {
  if (state.role === "student") {
    return [
      { title: "Confidential check-in", text: "Request counselling or wellbeing support without clinical labels.", icon: "support", color: "maroon", action: "openDrawer('supportForm', {category:'Counselling referral'})" },
      { title: "Academic help", text: "Ask for study, assessment, or course support.", icon: "book", color: "blue", action: "openDrawer('supportForm', {category:'Academic support'})" },
      { title: "Logistics help", text: "Travel, accommodation, meals, and settling-in support.", icon: "cloud", color: "teal", action: "openDrawer('supportForm', {category:'Accommodation/travel support'})" },
      { title: "Book appointment", text: "Schedule time with the right support person.", icon: "appointment", color: "gold", action: "setView('appointments')" },
    ];
  }
  if (state.role === "it-support") {
    return [
      { title: "Technical queue", text: "Drive access, login, classroom AV, devices, and internet.", icon: "wrench", color: "blue", action: "openDrawer('supportForm', {category:'IT/technical support'})" },
      { title: "Urgent issues", text: "Review active urgent or critical technical cases.", icon: "alert", color: "danger", action: "setView('support')" },
      { title: "Availability", text: "Use appointment slots for support windows.", icon: "appointment", color: "teal", action: "setView('appointments')" },
      { title: "Tasks", text: "Coordinate setup work with operations.", icon: "activity", color: "green", action: "setView('tasks')" },
    ];
  }
  return [
    { title: "Request support", text: "Create an academic, workload, wellbeing, logistics, or IT request.", icon: "support", color: "maroon", action: "openDrawer('supportForm')" },
    { title: "Workload signal", text: "Use support requests with timesheets and appointments.", icon: "activity", color: "gold", action: canView("timesheets") ? "setView('timesheets')" : "setView('support')" },
    { title: "Book appointment", text: "Move support into a scheduled conversation.", icon: "appointment", color: "teal", action: "setView('appointments')" },
    { title: "Privacy routing", text: "Keep sensitive notes with assigned handlers only.", icon: "shield", color: "green", action: "setView('support')" },
  ];
}

function supportInsights(requests) {
  const urgent = requests.filter((item) => ["Urgent", "Critical"].includes(item.urgency));
  const confidential = requests.filter((item) => item.visibility === "confidential");
  const technical = requests.filter((item) => item.visibility === "technical");
  const workload = requests.filter((item) => item.category === "Tutor workload" || item.category === "Teaching support");
  return [
    {
      title: urgent.length ? "Urgent support exists" : "No urgent visible cases",
      detail: urgent.length
        ? `${urgent.length} case${urgent.length === 1 ? "" : "s"} should be triaged before routine planning.`
        : "Visible support requests are not currently marked urgent or critical.",
      icon: urgent.length ? "alert" : "check",
      color: urgent.length ? "danger" : "green",
    },
    {
      title: "Confidential support signal",
      detail:
        state.role === "support-counsellor"
          ? `${confidential.length} confidential request${confidential.length === 1 ? "" : "s"} visible to the support queue.`
          : `${confidential.length} confidential request${confidential.length === 1 ? "" : "s"} exist; private notes are hidden from this role.`,
      icon: "shield",
      color: "maroon",
    },
    {
      title: "Workload and technical pattern",
      detail: `${workload.length} workload/teaching case${workload.length === 1 ? "" : "s"} and ${technical.length} technical case${technical.length === 1 ? "" : "s"} are visible.`,
      icon: "activity",
      color: "blue",
    },
  ];
}

function renderSupportCard(item) {
  const privateVisible = canSeeSupportPrivate(item);
  return `
    <article class="support-card">
      <div class="support-main">
        <span class="icon-box ${item.visibility === "technical" ? "blue" : item.visibility === "confidential" ? "maroon" : "teal"}">${icon(item.visibility === "technical" ? "wrench" : "support", 18)}</span>
        <div>
          <h4>${item.title}</h4>
          <p>${participantName(item.requesterId)} &middot; ${item.category} &middot; assigned to ${participantName(item.assignedTo)}</p>
          <p>${item.summary}</p>
          <div class="row-tags">
            ${urgencyBadge(item.urgency)}
            ${supportStatusBadge(item.status)}
            <span class="chip ${item.visibility === "confidential" ? "maroon" : item.visibility === "technical" ? "blue" : "gray"}">${item.visibility}</span>
            <span class="chip gray">${privateVisible ? "notes visible" : "private notes hidden"}</span>
          </div>
        </div>
      </div>
      <button class="button ghost" onclick="openDrawer('supportRequest', '${item.id}')">${icon("edit", 17)}Open</button>
    </article>
  `;
}

function renderStudyGroups() {
  const groups = visibleStudyGroups();
  const pending = pendingStudyGroupInvites();
  const activeByCourse = state.studyGroups.reduce((acc, group) => {
    acc[group.courseCode] = (acc[group.courseCode] || 0) + 1;
    return acc;
  }, {});
  const topCourse = Object.entries(activeByCourse).sort((a, b) => b[1] - a[1])[0];
  return `
    <div class="view groups-view">
      <section class="support-hero groups-hero">
        <div>
          <span class="mission-eyebrow">${icon("group", 16)} Student-led study groups</span>
          <h2>Let students form focused study circles, invite classmates, and turn good intentions into agendas.</h2>
          <p>Invitations require approval before membership. Group plans stay visible to members, while managers see aggregate learning patterns rather than private group discussion.</p>
        </div>
        <div class="planner-metrics">
          ${kpi("My groups", groups.length, "visible to this role", "group", "blue")}
          ${kpi("Pending", pending.length, "invitations waiting", "mail", pending.length ? "gold" : "green")}
          ${kpi("Top course", topCourse ? topCourse[0] : "None", "study group demand", "book", "teal")}
        </div>
      </section>

      ${
        state.role === "student"
          ? `<section class="quick-grid">
              ${quick("Create group", "Invite classmates and propose an agenda.", "group", "maroon", "openDrawer('studyGroupForm')")}
              ${quick("My invitations", "Accept, decline, or request another time.", "mail", "gold", "setView('groups')")}
              ${quick("Planner links", "Use to-dos and planner blocks to suggest group topics.", "planner", "blue", "setView('planner')")}
              ${quick("Book advisor", "Invite tutor or lecturer help when needed.", "appointment", "teal", "setView('appointments')")}
            </section>`
          : ""
      }

      <section class="section-grid">
        <div class="card">
          <div class="card-header">
            <div>
              <h2>${state.role === "student" ? "My Study Groups" : "Study Group Overview"}</h2>
              <p>${state.role === "student" ? "Groups you organize or have accepted." : "Aggregate view of active course study groups without private student discussion details."}</p>
            </div>
            ${state.role === "student" ? `<button class="button primary" onclick="openDrawer('studyGroupForm')">${icon("plus", 17)}Group</button>` : `<span class="badge gray">Aggregate</span>`}
          </div>
          <div class="card-body group-list">
            ${groups.length ? groups.map(renderStudyGroupCard).join("") : `<div class="empty">No study groups visible yet.</div>`}
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <div>
              <h2>${state.role === "student" ? "Invitations and Directory" : "Group Intelligence"}</h2>
              <p>${state.role === "student" ? "Classmate invitations require consent before joining." : "Course demand and readiness signals."}</p>
            </div>
          </div>
          <div class="card-body assistant-stack">
            ${state.role === "student" ? renderStudentInvitationsAndDirectory(pending) : renderGroupAggregateInsights()}
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderStudyGroupCard(group) {
  const readiness = groupReadiness(group);
  const members = acceptedGroupMembers(group.id);
  const activities = groupActivities(group.id);
  const isMemberView = state.role === "student";
  return `
    <article class="group-card">
      <div class="group-main">
        <span class="icon-box ${readiness.color}">${icon("group", 18)}</span>
        <div>
          <h4>${group.name}</h4>
          <p>${group.courseCode} ${course(group.courseCode)?.title || ""} &middot; ${group.purpose} &middot; ${dateLabel(group.meetingDate)} ${group.meetingTime}</p>
          <p>${isMemberView ? group.notes : "Private discussion details hidden in aggregate view."}</p>
          <div class="row-tags">
            <span class="badge ${readiness.color}">${readiness.label}</span>
            <span class="chip blue">${members.length}/${group.capacity} accepted</span>
            <span class="chip teal">${group.mode}</span>
            <span class="chip gray">${activities.length} activities</span>
          </div>
        </div>
      </div>
      <button class="button ghost" onclick="openDrawer('studyGroup', '${group.id}')">${icon("edit", 17)}Open</button>
    </article>
  `;
}

function renderStudentInvitationsAndDirectory(pending) {
  return `
    <div class="invitation-list">
      <h3 class="mini-heading">Pending Invitations</h3>
      ${
        pending.length
          ? pending.map(renderGroupInvitationCard).join("")
          : `<div class="empty">No pending study-group invitations.</div>`
      }
    </div>
    <div class="student-directory">
      <h3 class="mini-heading">Classmate Directory</h3>
      ${state.students
        .filter((item) => item.id !== currentStudentId())
        .map(
          (item) => `
          <div class="student-mini">
            <span class="avatar">${initials(item.name)}</span>
            <div>
              <strong>${item.name}</strong>
              <span>${item.interests}</span>
              <span>${item.contactOptIn ? "Contact opt-in" : "Contact hidden until invited/accepted"}</span>
            </div>
          </div>
        `,
        )
        .join("")}
    </div>
    <div class="priority">
      <span class="icon-box green">${icon("shield", 18)}</span>
      <div>
        <strong>Consent rule</strong>
        <span>Invited students are not added automatically. They must accept, decline, or ask for another time.</span>
      </div>
    </div>
  `;
}

function renderGroupInvitationCard(invite) {
  const group = studyGroup(invite.groupId);
  if (!group) return "";
  return `
    <article class="invitation-card">
      <div>
        <h4>${group.name}</h4>
        <p>${studentName(invite.invitedBy)} invited you for ${group.courseCode} on ${dateLabel(group.meetingDate)} at ${group.meetingTime}.</p>
        <div class="row-tags">
          ${invitationStatusBadge(invite.status)}
          <span class="chip teal">${group.mode}</span>
          <span class="chip gray">${group.purpose}</span>
        </div>
      </div>
      <div class="invite-actions">
        <button class="button ghost" onclick="updateStudyGroupInvitation('${invite.id}', 'Accepted')">${icon("check", 17)}Accept</button>
        <button class="button ghost" onclick="updateStudyGroupInvitation('${invite.id}', 'Maybe / Request different time')">${icon("clock", 17)}Maybe</button>
        <button class="button ghost" onclick="updateStudyGroupInvitation('${invite.id}', 'Declined')">${icon("x", 17)}Decline</button>
      </div>
    </article>
  `;
}

function renderGroupAggregateInsights() {
  const byCourse = Object.entries(
    state.studyGroups.reduce((acc, group) => {
      acc[group.courseCode] = (acc[group.courseCode] || 0) + 1;
      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);
  return `
    ${byCourse
      .map(
        ([code, count]) => `
        <div class="priority">
          <span class="icon-box blue">${icon("book", 18)}</span>
          <div><strong>${code} ${course(code)?.title || ""}</strong><span>${count} active study group${count === 1 ? "" : "s"}.</span></div>
        </div>
      `,
      )
      .join("")}
    <div class="priority">
      <span class="icon-box maroon">${icon("shield", 18)}</span>
      <div><strong>Private by default</strong><span>Managers see group activity patterns, not member discussion notes unless policy allows moderation.</span></div>
    </div>
  `;
}

function renderGoogle() {
  const tabs = [
    "CalendarBlocks",
    "Courses",
    "People",
    "Sessions",
    "Contacts",
    "Timesheets",
    "Tasks",
    "StudentPlanner",
    "StudentTodos",
    "PlannerTasks",
    "Students",
    "StudyGroups",
    "StudyGroupMembers",
    "StudyGroupInvitations",
    "StudyGroupActivities",
    "StudyGroupMeetings",
    "StudyGroupTaskAssignments",
    "Appointments",
    "Availability",
    "AppointmentNotes",
    "SupportRequests",
    "WellnessRequests",
    "StaffSupportRequests",
    "TechnicalSupportTickets",
    "SupportAssignments",
    "SupportReferrals",
    "ConsentAudit",
    "EmergencyAccessAudit",
    "CalendarSyncSettings",
    "DriveDocuments",
    "AccessRoles",
  ];
  return `
    <div class="view section-grid">
      <div class="card">
        <div class="card-header">
          <div>
            <h2>Google Sheets and Drive Integration</h2>
            <p>Prepared for the programme database to live in Google Sheets and documents in Drive.</p>
          </div>
          <span class="badge ${state.googleConnected ? "green" : "gold"}">${state.googleConnected ? "Connected" : "Prototype mode"}</span>
        </div>
        <div class="card-body">
          <div class="form-grid">
            <div class="field">
              <label>Google Sheet ID</label>
              <input value="1-mathepi-academic-operations-sheet-id" />
            </div>
            <div class="field">
              <label>Drive Root Folder ID</label>
              <input value="drive-folder-mathepi-programme" />
            </div>
            <div class="field full">
              <label>OAuth Client Status</label>
              <input value="Use environment variables in GitHub-connected deployment" />
            </div>
          </div>
          <div style="height: 14px"></div>
          <div class="quick-grid">
            ${quick("Connect OAuth", "Swap prototype state to connected mode.", "shield", "green", "state.googleConnected=!state.googleConnected; toast(state.googleConnected?'Google workspace connected in prototype mode.':'Google workspace disconnected.'); render()")}
            ${quick("Sync courses", "Courses tab receives seeded curriculum fields.", "sheet", "blue", "toast('Courses sync simulated. Wire this to Google Sheets API.')")}
            ${quick("Open Drive map", "Course folders, CVs, outlines, and notes.", "drive", "gold", "openDrawer('driveMap')")}
            ${quick("Export JSON", "Download-ready structure for backend handoff.", "database", "teal", "openDrawer('export')")}
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <div>
            <h2>Recommended Sheet Tabs</h2>
            <p>Clean enough for Google Sheets now, backend later.</p>
          </div>
        </div>
        <div class="card-body timeline-list">
          ${tabs
            .map(
              (tab) => `
              <div class="timeline-item">
                <h4>${tab}</h4>
                <p>${sheetDescription(tab)}</p>
              </div>
            `,
            )
            .join("")}
        </div>
      </div>
    </div>
  `;
}

function sheetDescription(tab) {
  const map = {
    CalendarBlocks: "block_id, phase, start_date, end_date, kind, notes",
    Courses: "code, title, type, hours, units, lecturer_id, tutor_ids, outcomes",
    People: "person_id, role, affiliation, email, phone, expertise, status, workload",
    Sessions: "session_id, course_code, block_id, day, time, room, owner_id",
    Contacts: "person_id, status, last_contact, next_follow_up, notes, message_template",
    Timesheets: "timesheet_id, tutor_id, course_code, date, category, hours, activity, status",
    Tasks: "task_id, title, area, owner, due_date, priority, status, details",
    StudentPlanner: "student_id, preferred_study_windows, planning_mode, calendar_sync_opt_in",
    StudentTodos: "todo_id, student_id, course_code, title, category, due_date, priority, status, notes",
    PlannerTasks: "planner_id, student_id, course_code, date, time, duration, type, priority, status, notes",
    Students: "student_id, name, cohort, email, interests, contact_opt_in",
    StudyGroups: "group_id, name, organizer_id, course_code, purpose, mode, meeting_time, location, capacity, status, created_at",
    StudyGroupMembers: "group_id, student_id, member_role, joined_at, status",
    StudyGroupInvitations: "invitation_id, group_id, invited_student_id, invited_by, status, response_note, created_at, responded_at",
    StudyGroupActivities: "activity_id, group_id, title, type, assigned_to, due_date, status, notes",
    StudyGroupMeetings: "meeting_id, group_id, date, time, mode, location, agenda, objective, status",
    StudyGroupTaskAssignments: "assignment_id, activity_id, student_id, role, status, completed_at",
    Appointments: "appointment_id, requester_id, target_id, course_code, category, preferred_date, time, mode, status",
    Availability: "availability_id, person_id, day, time, mode, location, focus",
    AppointmentNotes: "appointment_id, visibility, note, created_by, created_at",
    SupportRequests: "support_id, requester_id, category, urgency, status, visibility, assigned_to, summary",
    WellnessRequests: "support_id, requester_id, urgency, status, confidential_handler, consent_scope",
    StaffSupportRequests: "support_id, staff_id, category, workload_signal, urgency, status, assigned_to",
    TechnicalSupportTickets: "ticket_id, requester_id, system_area, urgency, status, assigned_it_staff",
    SupportAssignments: "support_id, assigned_to, assigned_by, assigned_at, role_scope",
    SupportReferrals: "support_id, referral_type, referral_status, consent_record, follow_up_date",
    ConsentAudit: "consent_id, user_id, support_id, scope, granted_at, withdrawn_at",
    EmergencyAccessAudit: "access_id, support_id, accessor_id, reason, timestamp, review_status",
    CalendarSyncSettings: "user_id, provider, sync_enabled, selected_calendars, reminder_preferences",
    DriveDocuments: "document_id, course_code, folder_id, url, visibility, version",
    AccessRoles: "email, role, active, invited_by, last_login",
  };
  return map[tab] || "";
}

function renderAccess() {
  return `
    <div class="view section-grid">
      <div class="card">
        <div class="card-header">
          <div>
            <h2>Role-Based Access</h2>
            <p>Designed for a private GitHub repo and invited users.</p>
          </div>
          <span class="badge maroon">Private repo ready</span>
        </div>
        <div class="card-body">
          <table class="mini-table">
            <thead><tr><th>Role</th><th>Access</th><th>Sensitive Data</th></tr></thead>
            <tbody>
              ${Object.values(ROLES)
                .map(
                  (role) => `
                  <tr>
                    <td><strong>${role.label}</strong></td>
                    <td>${role.views.map((v) => NAV.find((n) => n.id === v)?.label).join(", ")}</td>
                    <td>${role.canSensitive ? "Visible" : "Hidden"}</td>
                  </tr>
                `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <div>
            <h2>Deployment Notes</h2>
            <p>Security rules to keep when moving from prototype to production.</p>
          </div>
        </div>
        <div class="card-body assistant-stack">
          ${[
            ["shield", "Do not store Google secrets in GitHub", "Use environment variables on Vercel/Netlify or a secure backend."],
            ["users", "Invite selected users", "Private repository access and app access should be managed separately."],
            ["database", "Enforce permissions server-side", "UI role gates are helpful for UX but not sufficient for sensitive production data."],
            ["cloud", "Audit Drive visibility", "Lecturer contacts, internal notes, and CVs should only be exposed to authorized roles."],
          ]
            .map(
              ([iconName, title, detail]) => `
              <div class="priority">
                <span class="icon-box maroon">${icon(iconName, 18)}</span>
                <div><strong>${title}</strong><span>${detail}</span></div>
              </div>
            `,
            )
            .join("")}
        </div>
      </div>
    </div>
  `;
}

function renderDrawer() {
  const { type, payload } = state.drawer;
  let content = "";
  if (type === "course") content = courseDrawer(payload);
  if (type === "person") content = personDrawer(payload);
  if (type === "session") content = sessionDrawer(payload);
  if (type === "quickAdd") content = quickAddDrawer();
  if (type === "courseForm") content = courseFormDrawer();
  if (type === "personForm") content = personFormDrawer(payload);
  if (type === "sessionForm") content = sessionFormDrawer();
  if (type === "messageDraft") content = messageDraftDrawer();
  if (type === "driveMap") content = driveMapDrawer();
  if (type === "export") content = exportDrawer();
  if (type === "timesheetForm") content = timesheetFormDrawer();
  if (type === "taskForm") content = taskFormDrawer();
  if (type === "task") content = taskDrawer(payload);
  if (type === "plannerForm") content = plannerFormDrawer(payload);
  if (type === "plannerTask") content = plannerTaskDrawer(payload);
  if (type === "todoForm") content = todoFormDrawer(payload);
  if (type === "todo") content = todoDrawer(payload);
  if (type === "studyGroupForm") content = studyGroupFormDrawer(payload);
  if (type === "studyGroup") content = studyGroupDrawer(payload);
  if (type === "appointmentForm") content = appointmentFormDrawer(payload);
  if (type === "appointment") content = appointmentDrawer(payload);
  if (type === "supportForm") content = supportFormDrawer(payload);
  if (type === "supportRequest") content = supportRequestDrawer(payload);
  return `<div class="drawer-backdrop" onclick="if(event.target.classList.contains('drawer-backdrop')) closeDrawer()">${content}</div>`;
}

function drawerShell(title, subtitle, body, footer = "") {
  return `
    <aside class="drawer">
      <div class="drawer-header">
        <div><h2>${title}</h2><p>${subtitle}</p></div>
        <button class="button ghost icon-only" onclick="closeDrawer()" aria-label="Close drawer">${icon("x", 18)}</button>
      </div>
      <div class="drawer-body">${body}</div>
      ${footer ? `<div class="drawer-footer">${footer}</div>` : ""}
    </aside>
  `;
}

function courseDrawer(code) {
  const item = course(code);
  if (!item) return drawerShell("Course not found", "The selected course is no longer available.", "");
  const lead = person(item.lecturerId);
  const tutors = item.tutorIds.map(person).filter(Boolean);
  const detail = COURSE_DETAILS[item.code];
  const lecturerText = lead
    ? state.role === "student"
      ? lead.name
      : `${lead.name} · ${lead.status}`
    : "Not assigned";
  const body = `
    <div class="meta-grid">
      <div class="meta-box"><span>Course code</span><strong>${item.code}</strong></div>
      <div class="meta-box"><span>Type</span><strong>${COURSE_TYPES[item.type]?.label || item.type}</strong></div>
      <div class="meta-box"><span>Block</span><strong>${item.block}</strong></div>
      <div class="meta-box"><span>Hours / units</span><strong>${item.hours} hrs · ${item.units} units</strong></div>
    </div>
    <div class="timeline-item"><h4>Lecturer</h4><p>${lecturerText}</p></div>
    <div class="timeline-item"><h4>Tutors</h4><p>${tutors.length ? tutors.map((t) => t.name).join(", ") : "No tutor assigned yet"}</p></div>
    <div class="timeline-item"><h4>Prerequisites</h4><p>${item.prerequisites}</p></div>
    <div class="timeline-item"><h4>Software and tools</h4><p>${item.software}</p></div>
    <div class="timeline-item"><h4>Learning outcomes</h4><p>${item.outcomes}</p></div>
    <div class="timeline-item"><h4>Google Drive folder</h4><p>Drive/${item.code}-${item.title.replaceAll(" ", "-")} · course outline, materials, assessments, notes</p></div>
    <div class="timeline-item">
      <h4>Course Description</h4>
      <p>${detail?.aim || "Course description to be synced from the curriculum PDF."}</p>
    </div>
    <div class="timeline-item">
      <h4>Course Content</h4>
      <p>${detail?.content || "Content outline to be added."}</p>
    </div>
  `;
  const footer = canEdit()
    ? `<button class="button ghost" onclick="openDrawer('sessionForm', {courseCode:'${item.code}'})">${icon("calendar", 17)}Schedule</button>
       <button class="button primary" onclick="toast('Course editing scaffold is ready for Google Sheets sync.')">${icon("edit", 17)}Edit in Sheet</button>`
    : `<button class="button ghost" onclick="closeDrawer()">Close</button>`;
  return drawerShell(`${item.code} ${item.title}`, `${COURSE_TYPES[item.type]?.label || "Course"} · ${item.block}`, body, footer);
}

function personDrawer(id) {
  const item = person(id);
  if (!item) return drawerShell("Person not found", "The selected profile is no longer available.", "");
  const assigned = assignedCourses(item.id);
  const body = `
    <div class="profile-head">
      <span class="avatar">${initials(item.name)}</span>
      <div>
        <h3 style="margin:0">${item.name}</h3>
        <p style="margin:5px 0 0;color:var(--muted)">${item.kind} · ${item.affiliation}</p>
      </div>
    </div>
    <div class="meta-grid">
      <div class="meta-box"><span>Status</span><strong>${item.status}</strong></div>
      <div class="meta-box"><span>Workload</span><strong>${item.workload} course${item.workload === 1 ? "" : "s"}</strong></div>
      <div class="meta-box"><span>Email</span><strong>${canSeeSensitive() ? item.email : "Hidden for this role"}</strong></div>
      <div class="meta-box"><span>Phone / WhatsApp</span><strong>${canSeeSensitive() ? item.phone : "Hidden for this role"}</strong></div>
    </div>
    <div class="timeline-item"><h4>Expertise</h4><p>${item.expertise}</p></div>
    <div class="timeline-item"><h4>Availability</h4><p>${item.availability}</p></div>
    <div class="timeline-item"><h4>Assigned courses</h4><p>${assigned.length ? assigned.map((c) => `${c.code} ${c.title}`).join("; ") : "No assignment yet"}</p></div>
    <div class="timeline-item"><h4>Communication history</h4><p>Last contact: ${dateLabel(item.lastContact)}. Next follow-up: ${dateLabel(item.nextFollowUp)}. ${item.notes}</p></div>
    ${
      canEdit()
        ? `<div class="field">
            <label>Update contact status</label>
            <select onchange="updatePersonStatus('${item.id}', this.value)">
              ${["Not contacted", "Contacted", "Awaiting response", "Confirmed", "Needs follow-up", "Declined", "Replacement needed"]
                .map((status) => `<option ${item.status === status ? "selected" : ""}>${status}</option>`)
                .join("")}
            </select>
          </div>`
        : ""
    }
  `;
  const footer = canEdit()
    ? `<button class="button ghost" onclick="openDrawer('messageDraft', '${item.id}')">${icon("mail", 17)}Draft message</button>
       <button class="button primary" onclick="closeDrawer()">${icon("check", 17)}Done</button>`
    : `<button class="button ghost" onclick="closeDrawer()">Close</button>`;
  return drawerShell(item.name, `${item.kind} contact and assignment profile`, body, footer);
}

function updatePersonStatus(id, status) {
  const item = person(id);
  if (!item) return;
  item.status = status;
  item.lastContact = "2026-05-21";
  if (status === "Confirmed") item.nextFollowUp = "2026-08-15";
  if (status === "Needs follow-up") item.nextFollowUp = "2026-05-22";
  saveAndRender(`${item.name} status updated to ${status}.`);
}

function sessionDrawer(id) {
  const session = state.sessions.find((item) => item.id === id);
  if (!session) return drawerShell("Session not found", "The selected session is no longer available.", "");
  const item = course(session.courseCode);
  const owner = person(session.personId);
  const body = `
    <div class="meta-grid">
      <div class="meta-box"><span>Course</span><strong>${session.courseCode}</strong></div>
      <div class="meta-box"><span>Type</span><strong>${session.type}</strong></div>
      <div class="meta-box"><span>Schedule</span><strong>${session.day} ${session.time}</strong></div>
      <div class="meta-box"><span>Room</span><strong>${session.room}</strong></div>
    </div>
    <div class="timeline-item"><h4>${item?.title || "Course title missing"}</h4><p>${item?.outcomes || ""}</p></div>
    <div class="timeline-item"><h4>Assigned person</h4><p>${owner ? `${owner.name} · ${owner.kind} · ${owner.status}` : "Unassigned"}</p></div>
  `;
  return drawerShell(`${session.courseCode} ${session.type}`, "Timetable session detail", body, `<button class="button ghost" onclick="closeDrawer()">Close</button>`);
}

function quickAddDrawer() {
  const body = `
    <div class="quick-grid">
      ${quick("New course", "Add curriculum item", "book", "blue", "openDrawer('courseForm')")}
      ${quick("New lecturer", "Add teaching lead", "users", "maroon", "openDrawer('personForm', {kind:'Lecturer'})")}
      ${quick("New tutor", "Add tutorial support", "users", "gold", "openDrawer('personForm', {kind:'Tutor'})")}
      ${quick("New session", "Add timetable slot", "calendar", "teal", "openDrawer('sessionForm')")}
      ${quick("New appointment", "Request or schedule support", "appointment", "green", "openDrawer('appointmentForm')")}
      ${quick("Support request", "Route care, workload, logistics, or IT support", "support", "maroon", "openDrawer('supportForm')")}
      ${quick("Study group", "Create a student-led learning group", "group", "blue", "openDrawer('studyGroupForm')")}
    </div>
  `;
  return drawerShell("Quick Add", "Choose the academic object to add.", body);
}

function courseFormDrawer() {
  const body = `
    <form id="courseForm" class="form-grid">
      <div class="field"><label>Code</label><input name="code" placeholder="MEC11" required /></div>
      <div class="field"><label>Type</label><select name="type">${Object.entries(COURSE_TYPES).map(([id, meta]) => `<option value="${id}">${meta.label}</option>`).join("")}</select></div>
      <div class="field full"><label>Title</label><input name="title" placeholder="Course title" required /></div>
      <div class="field"><label>Block</label><input name="block" placeholder="Block 8" /></div>
      <div class="field"><label>Hours</label><input name="hours" type="number" value="60" /></div>
      <div class="field full"><label>Learning outcomes</label><textarea name="outcomes" placeholder="What students should be able to do"></textarea></div>
    </form>
  `;
  const footer = `<button class="button ghost" onclick="closeDrawer()">Cancel</button><button class="button primary" onclick="addCourse()">${icon("plus", 17)}Add course</button>`;
  return drawerShell("Add Course", "Prototype save goes to local storage; production sync goes to Google Sheets.", body, footer);
}

function addCourse() {
  const form = document.querySelector("#courseForm");
  if (!form.reportValidity()) return;
  const data = Object.fromEntries(new FormData(form));
  state.courses.push({
    code: data.code.toUpperCase(),
    title: data.title,
    type: data.type,
    units: Math.round(Number(data.hours || 60) / 10),
    hours: Number(data.hours || 60),
    block: data.block || "Unassigned",
    lecturerId: null,
    tutorIds: [],
    software: "To be confirmed",
    prerequisites: "To be confirmed",
    outcomes: data.outcomes || "Learning outcomes to be added.",
  });
  closeDrawer();
  saveAndRender(`${data.code.toUpperCase()} added.`);
}

function personFormDrawer(payload = {}) {
  const kind = payload?.kind || "Lecturer";
  const body = `
    <form id="personForm" class="form-grid">
      <div class="field"><label>Role</label><select name="kind"><option ${kind === "Lecturer" ? "selected" : ""}>Lecturer</option><option ${kind === "Tutor" ? "selected" : ""}>Tutor</option></select></div>
      <div class="field"><label>Status</label><select name="status"><option>Not contacted</option><option>Contacted</option><option>Awaiting response</option><option>Confirmed</option><option>Needs follow-up</option></select></div>
      <div class="field full"><label>Name</label><input name="name" placeholder="Full name" required /></div>
      <div class="field"><label>Affiliation</label><input name="affiliation" placeholder="Institution" /></div>
      <div class="field"><label>Expertise</label><input name="expertise" placeholder="Epidemiology, modelling..." /></div>
      <div class="field"><label>Email</label><input name="email" type="email" placeholder="name@example.org" /></div>
      <div class="field"><label>Phone / WhatsApp</label><input name="phone" placeholder="+250..." /></div>
      <div class="field full"><label>Notes</label><textarea name="notes" placeholder="Communication notes"></textarea></div>
    </form>
  `;
  const footer = `<button class="button ghost" onclick="closeDrawer()">Cancel</button><button class="button primary" onclick="addPerson()">${icon("plus", 17)}Add person</button>`;
  return drawerShell(`Add ${kind}`, "Create a lecturer or tutor profile and sync later to Google Sheets.", body, footer);
}

function addPerson() {
  const form = document.querySelector("#personForm");
  if (!form.reportValidity()) return;
  const data = Object.fromEntries(new FormData(form));
  const id = `${data.kind === "Tutor" ? "tut" : "lec"}-${Date.now()}`;
  state.people.push({
    id,
    kind: data.kind,
    name: data.name,
    affiliation: data.affiliation || "To be confirmed",
    email: data.email || "to-be-confirmed@example.org",
    phone: data.phone || "To be confirmed",
    expertise: data.expertise || "To be confirmed",
    availability: "To be confirmed",
    status: data.status,
    lastContact: "2026-05-21",
    nextFollowUp: "2026-05-28",
    workload: 0,
    notes: data.notes || "New contact created.",
  });
  closeDrawer();
  saveAndRender(`${data.name} added.`);
}

function sessionFormDrawer() {
  const body = `
    <form id="sessionForm" class="form-grid">
      <div class="field"><label>Course</label><select name="courseCode">${state.courses.map((c) => `<option value="${c.code}">${c.code} ${c.title}</option>`).join("")}</select></div>
      <div class="field"><label>Block</label><select name="blockId">${state.blocks.filter((b) => b.kind === "teaching" || b.kind === "practical" || b.kind === "thesis").map((b) => `<option value="${b.id}" ${b.id === state.blockId ? "selected" : ""}>${b.title}</option>`).join("")}</select></div>
      <div class="field"><label>Day</label><select name="day">${["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((d) => `<option>${d}</option>`).join("")}</select></div>
      <div class="field"><label>Time</label><select name="time">${["09:00", "11:00", "14:00", "16:00"].map((t) => `<option>${t}</option>`).join("")}</select></div>
      <div class="field"><label>Session type</label><input name="type" value="Lecture" /></div>
      <div class="field"><label>Room</label><input name="room" value="KEMRI Seminar Room" /></div>
      <div class="field full"><label>Assigned lecturer/tutor</label><select name="personId"><option value="">Unassigned</option>${state.people.map((p) => `<option value="${p.id}">${p.name} · ${p.kind}</option>`).join("")}</select></div>
    </form>
  `;
  const footer = `<button class="button ghost" onclick="closeDrawer()">Cancel</button><button class="button primary" onclick="addSession()">${icon("plus", 17)}Add session</button>`;
  return drawerShell("Add Timetable Session", "Create a visible course slot in the timetable.", body, footer);
}

function addSession() {
  const form = document.querySelector("#sessionForm");
  if (!form.reportValidity()) return;
  const data = Object.fromEntries(new FormData(form));
  state.sessions.push({
    id: `s-${Date.now()}`,
    courseCode: data.courseCode,
    day: data.day,
    time: data.time,
    duration: 2,
    type: data.type || "Lecture",
    room: data.room || "To be confirmed",
    blockId: data.blockId,
    personId: data.personId || null,
  });
  state.blockId = data.blockId;
  state.calendarMode = "week";
  closeDrawer();
  saveAndRender(`${data.courseCode} session added.`);
}

function messageDraftDrawer(personId = null) {
  const recipient = personId ? person(personId) : overduePeople()[0] || state.people.find((p) => p.kind === "Lecturer");
  const body = `
    <div class="timeline-item">
      <h4>Recipient</h4>
      <p>${recipient ? `${recipient.name} · ${recipient.email}` : "No lecturer selected"}</p>
    </div>
    <div class="field">
      <label>Draft reminder</label>
      <textarea readonly>${recipient ? `Dear ${recipient.name.split(" ")[0]},\n\nI hope you are well. I am following up on your availability for the KEMRI MathEpi programme. We are updating the academic timetable and would appreciate your confirmation, preferred teaching format, and any materials you would like us to prepare.\n\nKind regards,\nAcademic and Research Manager` : ""}</textarea>
    </div>
    <div class="timeline-item"><h4>Assistant suggestion</h4><p>Use this when status is Contacted, Awaiting response, or Needs follow-up. Attach the relevant block date and course outline from Drive.</p></div>
  `;
  const footer = `<button class="button ghost" onclick="closeDrawer()">Close</button><button class="button primary" onclick="toast('Draft copied conceptually. Wire copy/email action in production.')">${icon("mail", 17)}Use draft</button>`;
  return drawerShell("Lecturer Reminder Draft", "Assistant-generated communication template.", body, footer);
}

function driveMapDrawer() {
  const body = `
    <div class="timeline-list">
      ${["Programme Curriculum", "Academic Calendar", "Lecturer CVs", "Course Outlines", "Teaching Materials", "Assessments", "Meeting Notes", "Internship & Thesis"].map((folder) => `<div class="timeline-item"><h4>${folder}</h4><p>Google Drive folder mapped for role-aware visibility and course linking.</p></div>`).join("")}
    </div>
  `;
  return drawerShell("Google Drive Map", "Suggested folder structure for programme documents.", body, `<button class="button ghost" onclick="closeDrawer()">Close</button>`);
}

function exportDrawer() {
  const payload = {
    courses: state.courses,
    people: state.people,
    blocks: state.blocks,
    sessions: state.sessions,
    timesheets: state.timesheets,
    tasks: state.tasks,
    plannerTasks: state.plannerTasks,
    studentTodos: state.studentTodos,
    students: state.students,
    studyGroups: state.studyGroups,
    studyGroupInvitations: state.studyGroupInvitations,
    studyGroupActivities: state.studyGroupActivities,
    appointments: state.appointments,
    availability: state.availability,
    supportRequests: state.supportRequests,
  };
  const body = `<div class="field"><label>Prototype data export</label><textarea readonly style="min-height:360px">${escapeHtml(JSON.stringify(payload, null, 2))}</textarea></div>`;
  return drawerShell("Data Export", "JSON structure ready for backend or Google Sheets sync.", body, `<button class="button ghost" onclick="closeDrawer()">Close</button>`);
}

function timesheetFormDrawer() {
  const tutorOptions =
    state.role === "tutor"
      ? [person(currentTutorId())]
      : state.people.filter((item) => item.kind === "Tutor");
  const body = `
    <form id="timesheetForm" class="form-grid">
      <div class="field">
        <label>Tutor</label>
        <select name="tutorId">${tutorOptions.map((p) => `<option value="${p.id}">${p.name}</option>`).join("")}</select>
      </div>
      <div class="field">
        <label>Date</label>
        <input name="date" type="date" value="2026-05-21" />
      </div>
      <div class="field">
        <label>Course</label>
        <select name="courseCode">${state.courses.map((c) => `<option value="${c.code}">${c.code} ${c.title}</option>`).join("")}</select>
      </div>
      <div class="field">
        <label>Hours</label>
        <input name="hours" type="number" step="0.25" min="0.25" value="2" />
      </div>
      <div class="field">
        <label>Activity category</label>
        <select name="category">
          <option>Tutorial</option>
          <option>Preparation</option>
          <option>Marking</option>
          <option>Student support</option>
          <option>Research support</option>
          <option>Admin coordination</option>
        </select>
      </div>
      <div class="field">
        <label>Status</label>
        <select name="status"><option>Submitted</option><option>Draft</option><option>Review</option><option>Approved</option></select>
      </div>
      <div class="field full">
        <label>Activity done</label>
        <textarea name="activity" placeholder="Describe the work completed, students supported, marking done, or research support provided."></textarea>
      </div>
    </form>
    <div class="timeline-item">
      <h4>Balance note</h4>
      <p>Tutors can submit their own timesheet entries; programme-level data edits remain limited to the Academic and Research Manager and Super Admin.</p>
    </div>
  `;
  const footer = `<button class="button ghost" onclick="closeDrawer()">Cancel</button><button class="button primary" onclick="addTimesheet()">${icon("clock", 17)}Submit time</button>`;
  return drawerShell("Log Tutor Time", "Timesheet row prepared for a future Google Sheets Timesheets tab.", body, footer);
}

function addTimesheet() {
  const form = document.querySelector("#timesheetForm");
  if (!form.reportValidity()) return;
  const data = Object.fromEntries(new FormData(form));
  state.timesheets.push({
    id: `ts-${Date.now()}`,
    tutorId: data.tutorId,
    courseCode: data.courseCode,
    date: data.date,
    category: data.category,
    hours: Number(data.hours || 0),
    activity: data.activity || "Timesheet activity submitted.",
    status: data.status,
  });
  closeDrawer();
  saveAndRender("Timesheet entry submitted.");
}

function taskFormDrawer() {
  const body = `
    <form id="taskForm" class="form-grid">
      <div class="field full"><label>Task title</label><input name="title" placeholder="Prepare arrival packs" required /></div>
      <div class="field"><label>Area</label><input name="area" placeholder="Student reporting" /></div>
      <div class="field"><label>Owner</label><input name="owner" placeholder="Centre Coordinators" /></div>
      <div class="field"><label>Due date</label><input name="due" type="date" value="2026-08-15" /></div>
      <div class="field"><label>Priority</label><select name="priority"><option>High</option><option>Medium</option><option>Low</option></select></div>
      <div class="field"><label>Status</label><select name="status"><option>Planned</option><option>In progress</option><option>Blocked</option><option>Done</option></select></div>
      <div class="field full"><label>Details</label><textarea name="details" placeholder="Documents, stakeholders, dependencies, and what done means."></textarea></div>
    </form>
  `;
  const footer = `<button class="button ghost" onclick="closeDrawer()">Cancel</button><button class="button primary" onclick="addTask()">${icon("plus", 17)}Add task</button>`;
  return drawerShell("Add Readiness Task", "Create a pre-arrival or operations activity.", body, footer);
}

function addTask() {
  const form = document.querySelector("#taskForm");
  if (!form.reportValidity()) return;
  const data = Object.fromEntries(new FormData(form));
  state.tasks.push({
    id: `task-${Date.now()}`,
    title: data.title,
    area: data.area || "Operations",
    owner: data.owner || "Academic & Research Manager",
    due: data.due || "2026-08-15",
    status: data.status || "Planned",
    priority: data.priority || "Medium",
    details: data.details || "Details to be added.",
  });
  closeDrawer();
  saveAndRender("Task added to readiness board.");
}

function taskDrawer(id) {
  const task = state.tasks.find((item) => item.id === id);
  if (!task) return drawerShell("Task not found", "The selected task is no longer available.", "");
  const body = `
    <div class="meta-grid">
      <div class="meta-box"><span>Area</span><strong>${task.area}</strong></div>
      <div class="meta-box"><span>Owner</span><strong>${task.owner}</strong></div>
      <div class="meta-box"><span>Due</span><strong>${dateLabel(task.due)}</strong></div>
      <div class="meta-box"><span>Priority</span><strong>${task.priority}</strong></div>
    </div>
    <div class="timeline-item"><h4>Details</h4><p>${task.details}</p></div>
    <div class="field">
      <label>Status</label>
      <select onchange="updateTaskStatus('${task.id}', this.value)">
        ${["Planned", "In progress", "Blocked", "Done"].map((status) => `<option ${task.status === status ? "selected" : ""}>${status}</option>`).join("")}
      </select>
    </div>
  `;
  return drawerShell(task.title, "Readiness task detail", body, `<button class="button primary" onclick="closeDrawer()">${icon("check", 17)}Done</button>`);
}

function updateTaskStatus(id, status) {
  const task = state.tasks.find((item) => item.id === id);
  if (!task) return;
  task.status = status;
  saveAndRender(`${task.title} moved to ${status}.`);
}

function plannerFormDrawer(payload = {}) {
  const selectedCourse = payload?.courseCode || state.courses[0]?.code || "";
  const body = `
    <form id="plannerForm" class="form-grid">
      <div class="field full"><label>Planner item</label><input name="title" placeholder="Prepare model notes" required /></div>
      <div class="field"><label>Type</label><select name="type">${Object.keys(PLANNER_TYPES).map((type) => `<option>${type}</option>`).join("")}</select></div>
      <div class="field"><label>Course</label><select name="courseCode">${state.courses.map((c) => `<option value="${c.code}" ${c.code === selectedCourse ? "selected" : ""}>${c.code} ${c.title}</option>`).join("")}</select></div>
      <div class="field"><label>Date</label><input name="date" type="date" value="2026-09-08" /></div>
      <div class="field"><label>Start time</label><input name="time" type="time" value="16:00" /></div>
      <div class="field"><label>Duration</label><select name="duration"><option value="30">30 min</option><option value="45">45 min</option><option value="60">60 min</option><option value="90" selected>90 min</option><option value="120">120 min</option></select></div>
      <div class="field"><label>Priority</label><select name="priority"><option>High</option><option selected>Medium</option><option>Low</option></select></div>
      <div class="field full"><label>Notes</label><textarea name="notes" placeholder="What will make this block successful?">${payload?.summary || ""}</textarea></div>
    </form>
    <div class="timeline-item">
      <h4>Planning rule</h4>
      <p>Keep planner blocks specific, time-bound, and course-linked. Optional Google Calendar sync should remain student-controlled.</p>
    </div>
  `;
  const footer = `<button class="button ghost" onclick="closeDrawer()">Cancel</button><button class="button primary" onclick="addPlannerTask()">${icon("plus", 17)}Add plan</button>`;
  return drawerShell("Add Planner Item", "Personal planning row for the StudentPlanner and PlannerTasks sheets.", body, footer);
}

function addPlannerTask() {
  const form = document.querySelector("#plannerForm");
  if (!form.reportValidity()) return;
  const data = Object.fromEntries(new FormData(form));
  state.plannerTasks.push({
    id: `plan-${Date.now()}`,
    ownerId: currentStudentId(),
    title: data.title,
    type: data.type,
    courseCode: data.courseCode,
    date: data.date,
    time: data.time,
    duration: Number(data.duration || 60),
    priority: data.priority,
    status: "Planned",
    notes: data.notes || "Planner item created.",
  });
  state.view = "planner";
  closeDrawer();
  saveAndRender("Planner item added.");
}

function plannerTaskDrawer(id) {
  const item = state.plannerTasks.find((task) => task.id === id);
  if (!item) return drawerShell("Planner item not found", "The selected item is no longer available.", "");
  const linkedCourse = course(item.courseCode);
  const canPlan = state.role === "student" || canEdit();
  const body = `
    <div class="meta-grid">
      <div class="meta-box"><span>Course</span><strong>${item.courseCode}</strong></div>
      <div class="meta-box"><span>When</span><strong>${dateLabel(item.date)} ${item.time}</strong></div>
      <div class="meta-box"><span>Duration</span><strong>${item.duration} min</strong></div>
      <div class="meta-box"><span>Priority</span><strong>${item.priority}</strong></div>
    </div>
    <div class="timeline-item"><h4>${linkedCourse?.title || "Course"}</h4><p>${linkedCourse?.outcomes || "Course-linked planning item."}</p></div>
    <div class="timeline-item"><h4>Notes</h4><p>${item.notes}</p></div>
    ${
      canPlan
        ? `<div class="field">
            <label>Status</label>
            <select onchange="updatePlannerTaskStatus('${item.id}', this.value)">
              ${["Planned", "In progress", "Done", "Deferred"].map((status) => `<option ${item.status === status ? "selected" : ""}>${status}</option>`).join("")}
            </select>
          </div>`
        : `<div class="timeline-item"><h4>Status</h4><p>${item.status}</p></div>`
    }
  `;
  const footer = `<button class="button ghost" onclick="openDrawer('appointmentForm', {courseCode:'${item.courseCode}', summary:'Support requested from planner item.'})">${icon("appointment", 17)}Book help</button><button class="button primary" onclick="closeDrawer()">${icon("check", 17)}Done</button>`;
  return drawerShell(item.title, "Student planner detail", body, footer);
}

function updatePlannerTaskStatus(id, status) {
  const item = state.plannerTasks.find((task) => task.id === id);
  if (!item) return;
  item.status = status;
  saveAndRender(`${item.title} marked ${status}.`);
}

function appointmentAvailabilityPanel(personId, preferredDate = "2026-09-09", time = "15:00") {
  if (!personId) return `<div class="timeline-item"><h4>Availability</h4><p>Select a person to see availability.</p></div>`;
  const slots = availabilityFor(personId);
  const load = appointmentLoadFor(personId);
  const conflict = appointmentConflictNote(personId, preferredDate, time);
  return `
    <div class="availability-preview">
      <div class="timeline-item">
        <h4>${participantName(personId)} availability</h4>
        <p>${participantKind(personId)} &middot; ${load.length} active appointment${load.length === 1 ? "" : "s"} in the prototype queue.</p>
        <div class="row-tags">
          ${
            slots.length
              ? slots.map((slot) => `<span class="chip teal">${slot.day} ${slot.time} &middot; ${slot.mode}</span>`).join("")
              : `<span class="chip gray">No public slot listed</span>`
          }
        </div>
      </div>
      <div class="timeline-item">
        <h4>Conflict check</h4>
        <p>${conflict}</p>
      </div>
    </div>
  `;
}

function refreshAppointmentAvailability() {
  const form = document.querySelector("#appointmentForm");
  const panel = document.querySelector("#appointmentAvailability");
  if (!form || !panel) return;
  const data = Object.fromEntries(new FormData(form));
  panel.innerHTML = appointmentAvailabilityPanel(data.targetId, data.preferredDate, data.time);
}

function appointmentFormDrawer(payload = {}) {
  const targets = appointmentTargetOptions();
  const selectedCourse = payload?.courseCode || state.courses[0]?.code || "";
  const selectedTarget = payload?.targetId || targets[0]?.id || "";
  const body = `
    <form id="appointmentForm" class="form-grid">
      <div class="field">
        <label>Request from</label>
        <input value="${participantName(currentActorId())}" readonly />
      </div>
      <div class="field">
        <label>Requestor role</label>
        <input value="${roleDef().label}" readonly />
      </div>
      <div class="field full">
        <label>Book with</label>
        <select name="targetId" required onchange="refreshAppointmentAvailability()">${targets.map((p) => `<option value="${p.id}" ${p.id === selectedTarget ? "selected" : ""}>${p.name} - ${p.kind}</option>`).join("")}</select>
      </div>
      <div class="field">
        <label>Course</label>
        <select name="courseCode">${state.courses.map((c) => `<option value="${c.code}" ${c.code === selectedCourse ? "selected" : ""}>${c.code} ${c.title}</option>`).join("")}</select>
      </div>
      <div class="field">
        <label>Category</label>
        <select name="category">
          ${[
            "Course clarification",
            "Tutorial support",
            "Assessment guidance",
            "Research discussion",
            "Internship guidance",
            "Thesis/project support",
            "Welfare/adjustment",
            "Admin support",
            "Tutor workload",
            "General advising",
          ]
            .map((category) => `<option>${category}</option>`)
            .join("")}
        </select>
      </div>
      <div class="field"><label>Preferred date</label><input name="preferredDate" type="date" value="2026-09-09" onchange="refreshAppointmentAvailability()" /></div>
      <div class="field"><label>Time</label><input name="time" type="time" value="15:00" onchange="refreshAppointmentAvailability()" /></div>
      <div class="field"><label>Duration</label><select name="duration"><option value="20">20 min</option><option value="30" selected>30 min</option><option value="45">45 min</option><option value="60">60 min</option></select></div>
      <div class="field"><label>Mode</label><select name="mode"><option>In person</option><option>Online</option><option>Hybrid</option></select></div>
      <div class="field full"><label>Reason / agenda</label><textarea name="summary" placeholder="What should the meeting solve?">${payload?.summary || ""}</textarea></div>
    </form>
    <div id="appointmentAvailability">${appointmentAvailabilityPanel(selectedTarget, "2026-09-09", "15:00")}</div>
    <div class="timeline-item">
      <h4>Booking workflow</h4>
      <p>Requests begin as Requested and can move through Awaiting confirmation, Confirmed, Reschedule proposed, Completed, Cancelled, or No-show.</p>
    </div>
  `;
  const footer = `<button class="button ghost" onclick="closeDrawer()">Cancel</button><button class="button primary" onclick="addAppointment()">${icon("appointment", 17)}Submit request</button>`;
  return drawerShell("Request Appointment", "Role-aware booking request for academic support and coordination.", body, footer);
}

function addAppointment() {
  const form = document.querySelector("#appointmentForm");
  if (!form.reportValidity()) return;
  const data = Object.fromEntries(new FormData(form));
  state.appointments.unshift({
    id: `apt-${Date.now()}`,
    requesterId: currentActorId(),
    targetId: data.targetId,
    courseCode: data.courseCode,
    category: data.category,
    preferredDate: data.preferredDate,
    time: data.time,
    duration: Number(data.duration || 30),
    mode: data.mode,
    status: "Requested",
    summary: data.summary || "Appointment request submitted.",
    privateNote: "No private note yet.",
  });
  state.view = "appointments";
  closeDrawer();
  saveAndRender("Appointment request submitted.");
}

function appointmentDrawer(id) {
  const item = state.appointments.find((appointment) => appointment.id === id);
  if (!item) return drawerShell("Appointment not found", "The selected booking is no longer available.", "");
  const linkedCourse = course(item.courseCode);
  const body = `
    <div class="meta-grid">
      <div class="meta-box"><span>Requester</span><strong>${participantName(item.requesterId)}</strong></div>
      <div class="meta-box"><span>With</span><strong>${participantName(item.targetId)}</strong></div>
      <div class="meta-box"><span>When</span><strong>${dateLabel(item.preferredDate)} ${item.time}</strong></div>
      <div class="meta-box"><span>Mode</span><strong>${item.mode}</strong></div>
    </div>
    <div class="timeline-item"><h4>${item.courseCode} ${linkedCourse?.title || ""}</h4><p>${item.summary}</p></div>
    <div class="timeline-item"><h4>Status</h4><p>${appointmentStatusBadge(item.status)}</p></div>
    ${
      canSeeSensitive()
        ? `<div class="timeline-item"><h4>Internal note</h4><p>${item.privateNote}</p></div>`
        : ""
    }
    ${
      canUpdateAppointment(item)
        ? `<div class="field">
            <label>Update booking status</label>
            <select onchange="updateAppointmentStatus('${item.id}', this.value)">
              ${["Draft", "Requested", "Awaiting confirmation", "Confirmed", "Reschedule proposed", "Completed", "Cancelled", "No-show"].map((status) => `<option ${item.status === status ? "selected" : ""}>${status}</option>`).join("")}
            </select>
          </div>`
        : ""
    }
  `;
  const footer = `<button class="button ghost" onclick="closeDrawer()">Close</button>${
    canCreateAppointment()
      ? `<button class="button primary" onclick="openDrawer('appointmentForm', {courseCode:'${item.courseCode}', summary:'Follow-up appointment request.'})">${icon("appointment", 17)}Follow up</button>`
      : ""
  }`;
  return drawerShell(item.category, "Appointment detail and booking trail", body, footer);
}

function updateAppointmentStatus(id, status) {
  const item = state.appointments.find((appointment) => appointment.id === id);
  if (!item) return;
  item.status = status;
  saveAndRender(`Appointment moved to ${status}.`);
}

function todoFormDrawer(payload = {}) {
  const selectedCourse = payload?.courseCode || state.courses[0]?.code || "";
  const body = `
    <form id="todoForm" class="form-grid">
      <div class="field full"><label>To-do title</label><input name="title" placeholder="Finish reading notes" required /></div>
      <div class="field"><label>Category</label><select name="category">${Object.keys(TODO_CATEGORIES).map((category) => `<option>${category}</option>`).join("")}</select></div>
      <div class="field"><label>Course</label><select name="courseCode">${state.courses.map((c) => `<option value="${c.code}" ${c.code === selectedCourse ? "selected" : ""}>${c.code} ${c.title}</option>`).join("")}</select></div>
      <div class="field"><label>Due date</label><input name="due" type="date" value="2026-09-08" /></div>
      <div class="field"><label>Priority</label><select name="priority"><option>High</option><option selected>Medium</option><option>Low</option></select></div>
      <div class="field full"><label>Notes</label><textarea name="notes" placeholder="What needs to be done?"></textarea></div>
    </form>
  `;
  const footer = `<button class="button ghost" onclick="closeDrawer()">Cancel</button><button class="button primary" onclick="addTodo()">${icon("todo", 17)}Add to-do</button>`;
  return drawerShell("Add Student To-Do", "Course-linked action item that can be converted into a planner block.", body, footer);
}

function addTodo() {
  const form = document.querySelector("#todoForm");
  if (!form.reportValidity()) return;
  const data = Object.fromEntries(new FormData(form));
  state.studentTodos.unshift({
    id: `todo-${Date.now()}`,
    ownerId: currentStudentId(),
    title: data.title,
    courseCode: data.courseCode,
    category: data.category,
    due: data.due,
    priority: data.priority,
    status: "Open",
    notes: data.notes || "To-do item created.",
  });
  state.view = "planner";
  closeDrawer();
  saveAndRender("Student to-do added.");
}

function todoDrawer(id) {
  const item = state.studentTodos.find((todo) => todo.id === id);
  if (!item) return drawerShell("To-do not found", "The selected item is no longer available.", "");
  const linkedCourse = course(item.courseCode);
  const body = `
    <div class="meta-grid">
      <div class="meta-box"><span>Course</span><strong>${item.courseCode}</strong></div>
      <div class="meta-box"><span>Due</span><strong>${dateLabel(item.due)}</strong></div>
      <div class="meta-box"><span>Category</span><strong>${item.category}</strong></div>
      <div class="meta-box"><span>Priority</span><strong>${item.priority}</strong></div>
    </div>
    <div class="timeline-item"><h4>${linkedCourse?.title || "Linked course"}</h4><p>${item.notes}</p></div>
    <div class="field">
      <label>Status</label>
      <select onchange="updateTodoStatus('${item.id}', this.value)">
        ${["Open", "In progress", "Done", "Deferred"].map((status) => `<option ${item.status === status ? "selected" : ""}>${status}</option>`).join("")}
      </select>
    </div>
  `;
  const footer = `<button class="button ghost" onclick="convertTodoToPlan('${item.id}')">${icon("planner", 17)}Convert to plan</button><button class="button primary" onclick="closeDrawer()">${icon("check", 17)}Done</button>`;
  return drawerShell(item.title, "Student to-do detail", body, footer);
}

function updateTodoStatus(id, status) {
  const item = state.studentTodos.find((todo) => todo.id === id);
  if (!item) return;
  item.status = status;
  saveAndRender(`${item.title} marked ${status}.`);
}

function convertTodoToPlan(id) {
  const item = state.studentTodos.find((todo) => todo.id === id);
  if (!item) return;
  state.plannerTasks.unshift({
    id: `plan-${Date.now()}`,
    ownerId: item.ownerId,
    title: item.title,
    type: item.category === "Wellness" ? "Wellness" : item.category === "Reading" ? "Reading" : "Study",
    courseCode: item.courseCode,
    date: item.due,
    time: "16:00",
    duration: item.priority === "High" ? 90 : 60,
    priority: item.priority,
    status: "Planned",
    notes: item.notes,
  });
  item.status = item.status === "Done" ? "Done" : "In progress";
  state.view = "planner";
  closeDrawer();
  saveAndRender("To-do converted into a planner block.");
}

function supportFormDrawer(payload = {}) {
  const category = payload?.category || (state.role === "it-support" ? "IT/technical support" : state.role === "student" ? "Academic support" : "Teaching support");
  const body = `
    <form id="supportForm" class="form-grid">
      <div class="field">
        <label>Request from</label>
        <input value="${participantName(currentActorId())}" readonly />
      </div>
      <div class="field">
        <label>Requestor role</label>
        <input value="${roleDef().label}" readonly />
      </div>
      <div class="field full"><label>Support title</label><input name="title" placeholder="What support do you need?" required /></div>
      <div class="field">
        <label>Category</label>
        <select name="category">${SUPPORT_CATEGORIES.map((item) => `<option ${item === category ? "selected" : ""}>${item}</option>`).join("")}</select>
      </div>
      <div class="field">
        <label>Urgency</label>
        <select name="urgency"><option>Normal</option><option>Soon</option><option>Urgent</option><option>Critical</option></select>
      </div>
      <div class="field full">
        <label>Optional notes</label>
        <textarea name="summary" placeholder="Share only what is necessary. You do not need to disclose sensitive wellness details here."></textarea>
      </div>
    </form>
    <div class="timeline-item">
      <h4>Confidentiality note</h4>
      <p>Wellness and counselling requests are routed to confidential support. Academic, logistics, and IT requests are routed only to the relevant support handlers.</p>
    </div>
  `;
  const footer = `<button class="button ghost" onclick="closeDrawer()">Cancel</button><button class="button primary" onclick="addSupportRequest()">${icon("support", 17)}Submit support request</button>`;
  return drawerShell("Request Support", "Academic, wellbeing, workload, logistics, facilities, or IT support.", body, footer);
}

function addSupportRequest() {
  const form = document.querySelector("#supportForm");
  if (!form.reportValidity()) return;
  const data = Object.fromEntries(new FormData(form));
  const assignedTo = supportAssignmentFor(data.category);
  const visibility = supportVisibilityFor(data.category);
  state.supportRequests.unshift({
    id: `sup-${Date.now()}`,
    requesterId: currentActorId(),
    title: data.title,
    category: data.category,
    urgency: data.urgency,
    status: "Submitted",
    visibility,
    assignedTo,
    date: "2026-05-21",
    summary: data.summary || "Support request submitted.",
    privateNote:
      visibility === "confidential"
        ? "Private details should be handled by the confidential support handler outside the broad academic view."
        : data.summary || "No additional private note.",
  });
  state.view = "support";
  closeDrawer();
  saveAndRender("Support request submitted.");
}

function supportRequestDrawer(id) {
  const item = state.supportRequests.find((request) => request.id === id);
  if (!item) return drawerShell("Support request not found", "The selected support case is no longer available.", "");
  const privateVisible = canSeeSupportPrivate(item);
  const body = `
    <div class="meta-grid">
      <div class="meta-box"><span>Requester</span><strong>${participantName(item.requesterId)}</strong></div>
      <div class="meta-box"><span>Assigned to</span><strong>${participantName(item.assignedTo)}</strong></div>
      <div class="meta-box"><span>Urgency</span><strong>${item.urgency}</strong></div>
      <div class="meta-box"><span>Visibility</span><strong>${item.visibility}</strong></div>
    </div>
    <div class="timeline-item"><h4>${item.category}</h4><p>${item.summary}</p></div>
    <div class="timeline-item"><h4>Private note</h4><p>${privateVisible ? item.privateNote : "Hidden for this role. Use authorized support routing for sensitive details."}</p></div>
    ${
      item.urgency === "Critical"
        ? `<div class="timeline-item"><h4>Critical escalation</h4><p>Escalate immediately through approved programme support channels. Do not expose confidential notes broadly.</p></div>`
        : ""
    }
    ${
      canManageSupport(item)
        ? `<div class="field">
            <label>Status</label>
            <select onchange="updateSupportStatus('${item.id}', this.value)">
              ${["Draft", "Submitted", "Triage", "Assigned", "In progress", "Waiting on requester", "Resolved", "Closed", "Escalated"].map((status) => `<option ${item.status === status ? "selected" : ""}>${status}</option>`).join("")}
            </select>
          </div>`
        : ""
    }
  `;
  const footer = `<button class="button ghost" onclick="openDrawer('appointmentForm', {targetId:'${item.assignedTo}', summary:'Follow-up for support request.'})">${icon("appointment", 17)}Book follow-up</button><button class="button primary" onclick="closeDrawer()">${icon("check", 17)}Done</button>`;
  return drawerShell(item.title, "Support request detail", body, footer);
}

function updateSupportStatus(id, status) {
  const item = state.supportRequests.find((request) => request.id === id);
  if (!item) return;
  item.status = status;
  saveAndRender(`Support request moved to ${status}.`);
}

function studyGroupFormDrawer() {
  const inviteOptions = state.students.filter((item) => item.id !== currentStudentId());
  const body = `
    <form id="studyGroupForm" class="form-grid">
      <div class="field full"><label>Group name</label><input name="name" placeholder="MES05 coding study circle" required /></div>
      <div class="field">
        <label>Linked course</label>
        <select name="courseCode">${state.courses.map((c) => `<option value="${c.code}">${c.code} ${c.title}</option>`).join("")}</select>
      </div>
      <div class="field">
        <label>Purpose</label>
        <select name="purpose">${STUDY_GROUP_PURPOSES.map((purpose) => `<option>${purpose}</option>`).join("")}</select>
      </div>
      <div class="field"><label>Meeting date</label><input name="meetingDate" type="date" value="2026-09-09" /></div>
      <div class="field"><label>Meeting time</label><input name="meetingTime" type="time" value="17:00" /></div>
      <div class="field"><label>Mode</label><select name="mode"><option>In person</option><option>Online</option><option selected>Hybrid</option></select></div>
      <div class="field"><label>Capacity</label><input name="capacity" type="number" min="2" max="12" value="6" /></div>
      <div class="field full"><label>Location or meeting link</label><input name="location" placeholder="KEMRI Computer Lab / Google Meet" /></div>
      <div class="field full"><label>Group plan / objective</label><textarea name="notes" placeholder="What should the group accomplish in the first meeting?"></textarea></div>
      <div class="field full">
        <label>Invite classmates</label>
        <div class="checkbox-grid">
          ${inviteOptions
            .map(
              (item) => `
              <label class="check-card">
                <input type="checkbox" name="inviteIds" value="${item.id}" />
                <span><strong>${item.name}</strong><small>${item.interests}</small></span>
              </label>
            `,
            )
            .join("")}
        </div>
      </div>
    </form>
    <div class="timeline-item">
      <h4>Approval workflow</h4>
      <p>Selected classmates receive invitations only. They join the group after they accept, decline, or request a different time.</p>
    </div>
  `;
  const footer = `<button class="button ghost" onclick="closeDrawer()">Cancel</button><button class="button primary" onclick="addStudyGroup()">${icon("group", 17)}Create group</button>`;
  return drawerShell("Create Study Group", "Student-led study group with opt-in invitations.", body, footer);
}

function addStudyGroup() {
  const form = document.querySelector("#studyGroupForm");
  if (!form.reportValidity()) return;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  const groupId = `grp-${Date.now()}`;
  state.studyGroups.unshift({
    id: groupId,
    name: data.name,
    organizerId: currentStudentId(),
    courseCode: data.courseCode,
    purpose: data.purpose,
    meetingDate: data.meetingDate,
    meetingTime: data.meetingTime,
    mode: data.mode,
    location: data.location || "To be confirmed",
    capacity: Number(data.capacity || 6),
    status: "Forming",
    notes: data.notes || "Group objective to be refined by members.",
    advisorIds: [],
  });
  formData.getAll("inviteIds").forEach((studentId) => {
    state.studyGroupInvitations.push({
      id: `sgi-${Date.now()}-${studentId}`,
      groupId,
      invitedStudentId: studentId,
      invitedBy: currentStudentId(),
      status: "Invited",
      responseNote: "",
      createdAt: "2026-05-21",
      respondedAt: "",
    });
  });
  if (data.notes) {
    state.studyGroupActivities.push({
      id: `sga-${Date.now()}`,
      groupId,
      title: "First meeting objective",
      type: "Agenda",
      assignedTo: currentStudentId(),
      due: data.meetingDate,
      status: "Open",
      notes: data.notes,
    });
  }
  state.view = "groups";
  closeDrawer();
  saveAndRender("Study group created and invitations sent.");
}

function studyGroupDrawer(id) {
  const group = studyGroup(id);
  if (!group) return drawerShell("Study group not found", "The selected group is no longer available.", "");
  const readiness = groupReadiness(group);
  const members = acceptedGroupMembers(group.id);
  const invitations = groupInvitations(group.id);
  const activities = groupActivities(group.id);
  const canManage = canManageStudyGroup(group);
  const body = `
    <div class="meta-grid">
      <div class="meta-box"><span>Organizer</span><strong>${studentName(group.organizerId)}</strong></div>
      <div class="meta-box"><span>Course</span><strong>${group.courseCode}</strong></div>
      <div class="meta-box"><span>Meeting</span><strong>${dateLabel(group.meetingDate)} ${group.meetingTime}</strong></div>
      <div class="meta-box"><span>Readiness</span><strong>${readiness.label}</strong></div>
    </div>
    <div class="timeline-item"><h4>Objective</h4><p>${state.role === "student" || group.advisorIds?.includes(currentActorId()) ? group.notes : "Private group plan hidden in aggregate view."}</p></div>
    <div class="timeline-item"><h4>Conflict check</h4><p>${groupConflictNote(group)}</p></div>
    <div class="timeline-item">
      <h4>Members</h4>
      <p>${members.map(studentName).join(", ")}</p>
      <div class="row-tags">
        <span class="chip blue">${members.length}/${group.capacity} accepted</span>
        ${invitations.map((invite) => `<span class="chip ${INVITATION_STATUS_COLOR[invite.status] || "gray"}">${studentName(invite.invitedStudentId)}: ${invite.status}</span>`).join("")}
      </div>
    </div>
    <div class="timeline-item">
      <h4>Activity Plan</h4>
      <div class="activity-list">
        ${
          activities.length
            ? activities.map((item) => `
                <div class="activity-row">
                  <div><strong>${item.title}</strong><span>${item.type} &middot; ${studentName(item.assignedTo)} &middot; due ${dateLabel(item.due)}</span></div>
                  <span class="badge ${item.status === "Done" ? "green" : item.status === "In progress" ? "gold" : "blue"}">${item.status}</span>
                </div>
              `).join("")
            : `<p>No activity plan yet.</p>`
        }
      </div>
    </div>
    ${
      canManage
        ? `<form id="groupActivityForm" class="form-grid">
            <div class="field full"><label>Add agenda/task</label><input name="title" placeholder="Prepare one worked example" required /></div>
            <div class="field"><label>Type</label><select name="type"><option>Agenda</option><option>To-do</option><option>Reading note</option><option>Coding task</option><option>Presentation</option></select></div>
            <div class="field"><label>Assign to</label><select name="assignedTo">${members.map((studentId) => `<option value="${studentId}">${studentName(studentId)}</option>`).join("")}</select></div>
            <div class="field"><label>Due date</label><input name="due" type="date" value="${group.meetingDate}" /></div>
            <div class="field full"><label>Notes</label><textarea name="notes" placeholder="What should this person prepare?"></textarea></div>
          </form>`
        : ""
    }
  `;
  const footer = canManage
    ? `<button class="button ghost" onclick="openDrawer('studyGroupForm')">${icon("group", 17)}New group</button><button class="button primary" onclick="addStudyGroupActivity('${group.id}')">${icon("todo", 17)}Add activity</button>`
    : `<button class="button ghost" onclick="closeDrawer()">Close</button>`;
  return drawerShell(group.name, `${group.courseCode} ${group.purpose} group`, body, footer);
}

function addStudyGroupActivity(groupId) {
  const form = document.querySelector("#groupActivityForm");
  if (!form || !form.reportValidity()) return;
  const data = Object.fromEntries(new FormData(form));
  state.studyGroupActivities.push({
    id: `sga-${Date.now()}`,
    groupId,
    title: data.title,
    type: data.type,
    assignedTo: data.assignedTo,
    due: data.due,
    status: "Open",
    notes: data.notes || "Group activity added.",
  });
  saveAndRender("Study group activity added.");
}

function updateStudyGroupInvitation(id, status) {
  const invite = state.studyGroupInvitations.find((item) => item.id === id);
  if (!invite) return;
  invite.status = status;
  invite.respondedAt = "2026-05-21";
  if (status === "Maybe / Request different time") {
    invite.responseNote = "Requested a different meeting time.";
  }
  saveAndRender(`Study group invitation marked ${status}.`);
}

function render() {
  document.querySelector("#app").innerHTML = appLayout();
}

window.setView = setView;
window.setRole = setRole;
window.toggleTheme = toggleTheme;
window.openDrawer = openDrawer;
window.closeDrawer = closeDrawer;
window.render = render;
window.toast = toast;
window.updatePersonStatus = updatePersonStatus;
window.addCourse = addCourse;
window.addPerson = addPerson;
window.addSession = addSession;
window.addTimesheet = addTimesheet;
window.addTask = addTask;
window.updateTaskStatus = updateTaskStatus;
window.addPlannerTask = addPlannerTask;
window.updatePlannerTaskStatus = updatePlannerTaskStatus;
window.toggleStudentCalendarSync = toggleStudentCalendarSync;
window.addTodo = addTodo;
window.updateTodoStatus = updateTodoStatus;
window.convertTodoToPlan = convertTodoToPlan;
window.refreshAppointmentAvailability = refreshAppointmentAvailability;
window.addAppointment = addAppointment;
window.updateAppointmentStatus = updateAppointmentStatus;
window.addSupportRequest = addSupportRequest;
window.updateSupportStatus = updateSupportStatus;
window.addStudyGroup = addStudyGroup;
window.addStudyGroupActivity = addStudyGroupActivity;
window.updateStudyGroupInvitation = updateStudyGroupInvitation;
window.state = state;

migrateProgrammeData();
save();
applyTheme();
render();
