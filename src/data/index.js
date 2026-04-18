// ═══════════════════════════════════════════════════
// WSU RAIDER PORTAL — DATA LAYER
// Real Wright State University data as of April 2026
// ═══════════════════════════════════════════════════

// ─── UNIVERSITY FACTS ───────────────────────────────
export const WSU_FACTS = {
  name: "Wright State University",
  location: "3640 Colonel Glenn Hwy, Fairborn (Dayton), Ohio 45435",
  founded: 1967,
  president: "Sue Edwards, Ph.D.",
  provost: "Amy Thompson, Ph.D.",
  students: "12,000+",
  alumni: "125,000+",
  acceptance: "95.2%",
  endowment: "$159M (FY2024)",
  budget: "$277.1M (FY2026)",
  phone: "(937) 775-4400",
  email: "askucie@wright.edu",
  website: "https://www.wright.edu",
  newsroom: "https://webapp2.wright.edu/web1/newsroom/",
  colors: { primary: "#2B5234", secondary: "#E8A020" },
  mascot: "The Raider",
  athletics: "NCAA Division I – Horizon League",
  nickname: "Raiders",
  campus: "Dayton Campus + Lake Campus (Celina, OH)",
  classification: "R2: Doctoral Universities – High Research Activity",
  wsj_rank: "#1 Public University in Ohio for Student Experience (WSJ/College Pulse 2026)"
};

// ─── COLLEGES & SCHOOLS ─────────────────────────────
export const COLLEGES = [
  {
    id: "cecs",
    name: "College of Engineering & Computer Science",
    shortName: "CECS",
    color: "#2B5234",
    icon: "⚙️",
    dean: "Travis Doom, Ph.D.",
    building: "Russ Engineering Center",
    phone: "937-775-5001",
    email: "cecs@wright.edu",
    programs: 40,
    highlights: [
      "4+1 BS/MS in 5 years",
      "DoD SMART Scholarship Recipients",
      "U.S. Space Command Partner",
      "#2 in Ohio for Industrial & Human Factors Engineering (US News 2026)"
    ],
    degrees: ["CS", "ECE", "Mechanical Eng", "Biomedical Eng", "Industrial Eng", "Human Factors", "Cybersecurity", "Data Science", "Robotics"]
  },
  {
    id: "rscob",
    name: "Raj Soin College of Business",
    shortName: "RSCOB",
    color: "#E8A020",
    icon: "💼",
    dean: "Ned Kock, Ph.D.",
    building: "Rike Hall",
    phone: "937-775-2437",
    email: "rscob-admin@wright.edu",
    programs: 28,
    highlights: [
      "AACSB Accredited (Top 5% worldwide)",
      "Intel AI Education Partnership (2025)",
      "Scene75 Entrepreneurship Hub",
      "Student-run $1M Trading Lab",
      "Princeton Review Best Business School"
    ],
    degrees: ["Accountancy", "Finance", "MBA", "Marketing", "Management", "Supply Chain", "MIS", "Economics"]
  },
  {
    id: "medicine",
    name: "Boonshoft School of Medicine",
    shortName: "BSOM",
    color: "#e53935",
    icon: "🩺",
    building: "White Hall",
    phone: "937-775-2934",
    email: "medicine@wright.edu",
    programs: 15,
    highlights: [
      "LCME Accredited",
      "Founded 1973",
      "New Health Professions Center (2024)",
      "Medical Scholars Program",
      "College Age IOP Mental Health Program"
    ],
    degrees: ["MD", "Anatomy", "Pharmacology", "Public Health", "Biomedical Sciences Ph.D.", "Neuroscience"]
  },
  {
    id: "chehs",
    name: "College of Health, Education & Human Services",
    shortName: "CHEHS",
    color: "#5c6bc0",
    icon: "❤️",
    building: "Health Sciences Building",
    phone: "937-775-2772",
    email: "chehs@wright.edu",
    programs: 38,
    highlights: [
      "$6M Nursing Facilities Expansion (2026)",
      "CCNE Accredited Nursing",
      "Nationally ranked nursing program",
      "Transfer-friendly IU East partnership"
    ],
    degrees: ["Nursing", "Education", "Social Work", "Rehabilitation Counseling", "Athletic Training", "Public Health"]
  },
  {
    id: "cola",
    name: "College of Liberal Arts",
    shortName: "COLA",
    color: "#7b5ea7",
    icon: "🎭",
    building: "Millett Hall",
    phone: "937-775-2140",
    email: "cola@wright.edu",
    programs: 42,
    highlights: [
      "CELIA Arts Program",
      "Dayton Philharmonic Collaboration",
      "Motion Picture Production",
      "Psychology Ph.D."
    ],
    degrees: ["Psychology", "Communication", "English", "History", "Music", "Theatre", "Film Production", "Philosophy", "Urban Affairs"]
  },
  {
    id: "cosm",
    name: "College of Science & Mathematics",
    shortName: "COSM",
    color: "#00897b",
    icon: "🔬",
    building: "Oelman Hall",
    phone: "937-775-2611",
    email: "cosm@wright.edu",
    programs: 30,
    highlights: [
      "Kno.e.sis AI/ML Research Center",
      "NSF Research Grants",
      "Neuroscience Engineering Collaboration Building",
      "Human Factors Ph.D. Program"
    ],
    degrees: ["Biology", "Chemistry", "Physics", "Mathematics", "Statistics", "Geology", "Microbiology Ph.D.", "Environmental Science Ph.D."]
  }
];

// ─── COURSE DATA ─────────────────────────────────────
export const COURSES_BY_CATEGORY = {
  "CS Foundation": [
    { code: "CS 1150", name: "Intro to Computer Science", credits: 3, prereqs: [] },
    { code: "CS 1160", name: "Introduction to C++ I", credits: 3, prereqs: ["CS 1150"] },
    { code: "CS 2160", name: "C++ II: Object Oriented", credits: 3, prereqs: ["CS 1160"] },
    { code: "CS 2200", name: "Discrete Mathematics", credits: 3, prereqs: ["MTH 2280"] },
    { code: "CS 3100", name: "Data Structures", credits: 3, prereqs: ["CS 2160"] },
    { code: "CS 3130", name: "Algorithms", credits: 3, prereqs: ["CS 3100"] },
    { code: "CS 4150", name: "Software Engineering", credits: 3, prereqs: ["CS 3100"] },
    { code: "CS 4900", name: "Senior Capstone Project", credits: 3, prereqs: ["CS 4150"] },
  ],
  "Mathematics": [
    { code: "MTH 2280", name: "Calculus I", credits: 4, prereqs: [] },
    { code: "MTH 2290", name: "Calculus II", credits: 4, prereqs: ["MTH 2280"] },
    { code: "MTH 2300", name: "Linear Algebra", credits: 3, prereqs: ["MTH 2280"] },
    { code: "MTH 2320", name: "Differential Equations", credits: 3, prereqs: ["MTH 2290"] },
    { code: "MTH 2570", name: "Probability & Statistics", credits: 3, prereqs: ["MTH 2280"] },
    { code: "MTH 3250", name: "Discrete Mathematics II", credits: 3, prereqs: ["MTH 2200"] },
  ],
  "CS Advanced": [
    { code: "CS 4350", name: "Artificial Intelligence", credits: 3, prereqs: ["CS 3130"] },
    { code: "CS 4380", name: "Computer Networks", credits: 3, prereqs: ["CS 3100"] },
    { code: "CS 4430", name: "Database Systems", credits: 3, prereqs: ["CS 3100"] },
    { code: "CS 4500", name: "Operating Systems", credits: 3, prereqs: ["CS 3100"] },
    { code: "CS 4820", name: "Machine Learning", credits: 3, prereqs: ["CS 4350"] },
    { code: "CS 4870", name: "Cybersecurity", credits: 3, prereqs: ["CS 4380"] },
    { code: "CS 4990", name: "Cloud Computing", credits: 3, prereqs: ["CS 4380"] },
  ],
  "Electrical Engineering": [
    { code: "EE 2010", name: "Circuits I", credits: 3, prereqs: ["MTH 2290"] },
    { code: "EE 2030", name: "Circuits II", credits: 3, prereqs: ["EE 2010"] },
    { code: "EE 3030", name: "Signals & Systems", credits: 3, prereqs: ["EE 2030"] },
    { code: "EE 3050", name: "Electronics I", credits: 3, prereqs: ["EE 2030"] },
    { code: "EE 4010", name: "Digital Systems", credits: 3, prereqs: ["EE 3030"] },
    { code: "EE 4800", name: "Senior Design", credits: 3, prereqs: ["EE 4010"] },
  ],
  "General Education": [
    { code: "ENG 1100", name: "English Composition", credits: 3, prereqs: [] },
    { code: "COM 2010", name: "Public Speaking", credits: 3, prereqs: [] },
    { code: "FYS 1000", name: "First Year Seminar", credits: 3, prereqs: [] },
    { code: "UVC 1010", name: "University Experience", credits: 1, prereqs: [] },
    { code: "SOC 2500", name: "Sociology of Technology", credits: 3, prereqs: [] },
  ]
};

export const SEMESTERS = [
  "Fall Y1", "Spring Y1", "Fall Y2", "Spring Y2",
  "Fall Y3", "Spring Y3", "Fall Y4", "Spring Y4"
];

export const DEFAULT_PLAN = {
  "Fall Y1": ["CS 1150", "MTH 2280", "ENG 1100", "FYS 1000"],
  "Spring Y1": ["CS 1160", "MTH 2290", "COM 2010"],
  "Fall Y2": ["CS 2160", "CS 2200", "MTH 2300", "EE 2010"],
  "Spring Y2": ["CS 3100", "MTH 2570", "EE 2030"],
  "Fall Y3": ["CS 3130", "CS 4150", "EE 3030"],
  "Spring Y3": ["CS 4350", "CS 4430", "EE 4010"],
  "Fall Y4": ["CS 4500", "CS 4380", "CS 4820"],
  "Spring Y4": ["CS 4900", "CS 4870"],
};

// ─── PROJECTS ────────────────────────────────────────
export const PROJECTS = [
  {
    id: 1,
    title: "eVTOL Systems Architecture Model",
    student: "Vinay Kumar",
    year: 2024,
    college: "CECS",
    major: "Systems Engineering",
    tags: ["SysML", "CATIA Magic", "Systems Eng", "Aerospace"],
    description: "A complete SysML/BDD model of a hybrid eVTOL aircraft covering propulsion subsystems (FixedLiftRotor, TiltingRotor, TiltActuator), fault tolerance requirements HFT-003 through HFT-006, use case diagrams, and requirements traceability.",
    stars: 78,
    forks: 12,
    advisorNote: "Exceptional systems thinking applied to cutting-edge aerospace domain.",
    github: "#",
    demo: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Autonomous F-16 Navigation AI",
    student: "Aiden Park",
    year: 2025,
    college: "CECS",
    major: "CS / AI",
    tags: ["Reinforcement Learning", "Python", "Defense AI", "Robotics"],
    description: "AI algorithms that autonomously navigate F-16 fighter jets in simulated dogfight scenarios, a Wright State project in partnership with the Air Force Research Lab at WPAFB.",
    stars: 142,
    forks: 28,
    advisorNote: "Selected for DoD SMART Scholarship finalist review.",
    github: "#",
    demo: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Healthcare Data Anonymization Pipeline",
    student: "Maya Torres",
    year: 2024,
    college: "CECS",
    major: "Data Science",
    tags: ["Big Data", "Hadoop", "HIPAA", "ML", "Healthcare"],
    description: "HIPAA-compliant pipeline ingesting 10M+ patient records per day from Kettering Health and Premier Health networks, enabling Boonshoft clinical research without privacy exposure.",
    stars: 53,
    forks: 9,
    github: "#",
    demo: "#",
  },
  {
    id: 4,
    title: "Kno.e.sis Semantic Web Knowledge Graph",
    student: "Research Team",
    year: 2025,
    college: "COSM",
    major: "CS / Bioinformatics",
    tags: ["Semantic Web", "Graph DB", "NLP", "Web 3.0"],
    description: "Expanding the Kno.e.sis center's knowledge graph to link 2M+ biomedical entities, supporting COVID variant tracking and drug interaction research.",
    stars: 231,
    forks: 44,
    github: "#",
    demo: "#",
  },
  {
    id: 5,
    title: "AR Campus Tour Application",
    student: "Sophie Wen",
    year: 2024,
    college: "CECS",
    major: "CS",
    tags: ["AR", "React Native", "Maps API", "Mobile"],
    description: "Augmented reality mobile app overlaying historical WSU facts, building info, and wayfinding arrows on live camera view. Used at Explore Wright State Day.",
    stars: 67,
    forks: 11,
    github: "#",
    demo: "#",
  },
  {
    id: 6,
    title: "Raider Mental Health Crisis Detector",
    student: "Dev Patel & Marcus Lee",
    year: 2025,
    college: "CECS",
    major: "CS / Psychology",
    tags: ["NLP", "Mental Health", "Ethics AI", "WSU"],
    description: "Anonymous NLP model analyzing deidentified student support ticket language to detect early crisis indicators and route to the College Age IOP program.",
    stars: 88,
    forks: 15,
    github: "#",
    demo: "#",
  },
  {
    id: 7,
    title: "WINGS Portal Accessibility Overhaul",
    student: "Lisa Fontaine",
    year: 2024,
    college: "CECS",
    major: "CS / HCI",
    tags: ["Accessibility", "WCAG", "React", "UX"],
    description: "Redesigned key WINGS portal flows for WCAG 2.1 AA compliance, improving usability for students with disabilities working with the WSU Disability Services office.",
    stars: 44,
    forks: 7,
    github: "#",
    demo: "#",
  },
  {
    id: 8,
    title: "Energy Optimization for Nutter Center IoT",
    student: "Ben Okafor",
    year: 2025,
    college: "CECS",
    major: "ECE",
    tags: ["IoT", "Edge Computing", "Energy", "Embedded"],
    description: "Zero-trust IoT sensor network across WSU's Nutter Center arena reducing HVAC energy use by 23% via predictive occupancy modeling.",
    stars: 39,
    forks: 6,
    github: "#",
    demo: "#",
  },
];

// ─── RESOURCES ───────────────────────────────────────
export const RESOURCES = [
  {
    category: "Academic Support",
    emoji: "📚",
    color: "#2B5234",
    items: [
      { name: "Academic Success Center (ASC)", desc: "Walk-in tutoring, supplemental instruction (SI), and study groups for 100+ courses. 54% increase in engagement (Fall 2023→2024).", hours: "Mon–Thu 8am–8pm, Fri 8am–5pm, Sat 10am–4pm", location: "130 Student Union", phone: "937-775-5745", url: "https://www.wright.edu/student-success/academic-support" },
      { name: "University Libraries", desc: "Dunbar Library and Science-Engineering Library with Research Toolkit Workshops and 24/7 online access.", hours: "Mon–Thu 7:30am–midnight, Fri–Sat 7:30am–8pm, Sun noon–midnight", location: "Dunbar Library", phone: "937-775-2525", url: "https://libraries.wright.edu" },
      { name: "Writing Center", desc: "Free one-on-one writing consultations for any stage of the writing process.", hours: "Mon–Fri 9am–6pm", location: "049 Library Annex", phone: "937-775-4186", url: "#" },
      { name: "Math Learning Center", desc: "Free drop-in math tutoring for calculus, statistics, and beyond.", hours: "Mon–Fri 9am–5pm", location: "138 MM", phone: "937-775-4182", url: "#" },
    ]
  },
  {
    category: "Mental Health & Wellness",
    emoji: "🧠",
    color: "#5c6bc0",
    items: [
      { name: "Counseling & Wellness Services", desc: "Confidential therapy, group therapy, crisis support. College Age Intensive Outpatient Program (IOP) for students 18–24.", hours: "Mon–Fri 8am–5pm | Crisis: 24/7", location: "053 Student Union", phone: "937-775-3407", url: "https://www.wright.edu/counseling-wellness" },
      { name: "Student Health Services", desc: "Primary care, immunizations, STI testing, prescriptions, and telehealth options.", hours: "Mon–Fri 8am–5pm", location: "E190 Student Union", phone: "937-775-2552", url: "#" },
      { name: "Outdoor Resource Center", desc: "Wellness programs, outdoor adventure sports, gear rentals, and recreational programs.", hours: "Mon–Fri 10am–6pm", location: "Fitness Center", phone: "937-775-5816", url: "#" },
      { name: "CARE Team", desc: "Behavioral intervention team connecting at-risk students with support resources before crises escalate.", hours: "Business hours | Emergencies: 911", location: "E338 Student Union", phone: "937-775-3407", url: "#" },
    ]
  },
  {
    category: "Financial & Emergency",
    emoji: "💰",
    color: "#E8A020",
    items: [
      { name: "Financial Aid Office", desc: "FAFSA assistance, scholarship application help (priority deadline Feb 1, 2026), and Wright State Need-Based Grant.", hours: "Mon–Fri 8am–5pm", location: "245 Student Union", phone: "937-775-5721", url: "https://www.wright.edu/enrollment-services/financial-aid" },
      { name: "Raider Food Pantry", desc: "Free groceries, personal hygiene items, and household supplies. No documentation required.", hours: "Tue & Thu 11am–2pm, Wed 3pm–5pm", location: "123 Student Union", phone: "937-775-5745", url: "#" },
      { name: "Emergency Assistance Fund", desc: "Emergency financial assistance for unexpected hardship (medical emergency, housing crisis, etc.).", hours: "By appointment", location: "E338 Student Union", phone: "937-775-5745", url: "#" },
      { name: "Bursar's Office", desc: "Tuition bills, payment plans (Wright Guarantee Tuition locked for 4 years), and refund processing.", hours: "Mon–Fri 8am–5pm", location: "245 Student Union", phone: "937-775-5888", url: "#" },
    ]
  },
  {
    category: "Tech & Campus Services",
    emoji: "💻",
    color: "#00897b",
    items: [
      { name: "CaTS Help Desk", desc: "WINGS portal support, campus Wi-Fi, Microsoft 365, software licenses, and IT security. WSO Accessibility resources available.", hours: "Mon–Fri 7:30am–5:30pm | Self-service 24/7", location: "025 Library Annex", phone: "937-775-4827", url: "https://www.wright.edu/information-technology" },
      { name: "WINGS Express Portal", desc: "Course registration, grades, financial aid, W-2s, and personal information management hub.", hours: "24/7 online access", location: "wings.wright.edu", phone: "888-775-4827", url: "https://wings.wright.edu" },
      { name: "Disability Services", desc: "Academic accommodations, assistive technology, testing services, and advocacy.", hours: "Mon–Fri 8am–5pm", location: "E145 Student Union", phone: "937-775-5680", url: "#" },
      { name: "Career Services", desc: "Resume reviews, mock interviews, career fairs (Spring 2026 Apr 22), and Handshake job platform.", hours: "Mon–Fri 9am–5pm", location: "010 Student Union", phone: "937-775-2556", url: "#" },
    ]
  },
  {
    category: "Housing & Dining",
    emoji: "🏠",
    color: "#8d6e63",
    items: [
      { name: "Residence Services", desc: "Hamilton Hall, Huffman Hall (traditional), The Woods (apartment-style). Wright Guarantee locks in housing cost for 4 years.", hours: "24/7 RA on-call", location: "100 Hamilton Hall", phone: "937-775-4172", url: "#" },
      { name: "Dining Services", desc: "The Hangar (main dining), ReyRey Café (student-run business school café), Village Inn, and campus convenience stores.", hours: "Varies by location", location: "Multiple campus locations", phone: "937-775-5660", url: "#" },
      { name: "Commuter Services", desc: "Parking permits, Dayton RTA transit passes, carpooling, and Safe Ride program.", hours: "Mon–Fri 8am–5pm", location: "E034 Student Union", phone: "937-775-5690", url: "#" },
    ]
  },
  {
    category: "International Students",
    emoji: "🌍",
    color: "#4caf50",
    items: [
      { name: "International Student Services", desc: "F-1/J-1 visa support, CPT/OPT work authorization, cultural programs, and re-enrollment guidance.", hours: "Mon–Fri 8:30am–4:30pm", location: "E053 Student Union", phone: "937-775-5745", url: "#" },
      { name: "English Language Program", desc: "ESL courses, academic English writing workshops, and conversation partners.", hours: "Mon–Fri 8am–5pm", location: "Millett Hall 361", phone: "937-775-2907", url: "#" },
    ]
  }
];

// ─── MENTORS (Alumni) ────────────────────────────────
export const MENTORS = [
  { id: 1, name: "Dr. Sarah Chen", initials: "SC", grad: 2016, major: "Computer Science", role: "Senior Software Engineer", company: "Google DeepMind", location: "Mountain View, CA", skills: ["Machine Learning", "Python", "System Design", "Distributed Systems"], avail: "Saturdays 10am–12pm EST", area: "Technology", bio: "Led development of TensorFlow distributed training pipeline. Passionate about giving back to WSU CECS students entering tech." },
  { id: 2, name: "James Okonkwo", initials: "JO", grad: 2018, major: "Mechanical Engineering", role: "Aerospace Systems Engineer", company: "NASA Glenn Research Center", location: "Cleveland, OH", skills: ["SysML", "CAD/CATIA", "Propulsion", "DoD SMART"], avail: "Evenings 7–9pm EST", area: "Engineering", bio: "DoD SMART Scholar recipient. Works on next-generation propulsion systems. Advises on aerospace career pathways." },
  { id: 3, name: "Priya Sharma", initials: "PS", grad: 2014, major: "Business + CS", role: "Vice President, Product", company: "Stripe", location: "San Francisco, CA", skills: ["Product Management", "Startups", "Fintech", "Leadership"], avail: "Sunday afternoons", area: "Business", bio: "Built Stripe's fraud detection product from 0→$1B revenue. Mentors students interested in product management and entrepreneurship." },
  { id: 4, name: "Marcus Webb, M.D.", initials: "MW", grad: 2012, major: "Pre-Medicine / Biology", role: "Attending Physician, Neurology", company: "Cleveland Clinic", location: "Cleveland, OH", skills: ["MCAT Prep", "Medical School Applications", "Research", "Neuroscience"], avail: "Sunday mornings", area: "Medicine", bio: "Completed residency at Johns Hopkins. Advises pre-med students on medical school applications and research opportunities." },
  { id: 5, name: "Lisa Fontaine", initials: "LF", grad: 2019, major: "Electrical Engineering", role: "Chief Technology Officer", company: "Dayton Robotics Inc.", location: "Dayton, OH", skills: ["IoT", "Embedded Systems", "C/C++", "Startup Building"], avail: "Weekday lunches", area: "Engineering", bio: "Built a robotics startup in Dayton's tech ecosystem right after WSU. Mentors on technical co-founding and hardware startups." },
  { id: 6, name: "Dev Patel", initials: "DP", grad: 2020, major: "Statistics / CS", role: "Senior Data Scientist", company: "Meta AI", location: "Remote (Dayton area)", skills: ["Data Science", "SQL", "A/B Testing", "NLP", "ML"], avail: "Friday evenings", area: "Technology", bio: "Builds recommendation systems used by 3B+ people. WSU alumni mentor champion — connects students to Meta internship pipeline." },
  { id: 7, name: "Amy Wamsley", initials: "AW", grad: 2011, major: "Business (MBA)", role: "Director of Operations", company: "Premier Health", location: "Dayton, OH", skills: ["Healthcare Admin", "Operations", "MBA Prep", "Leadership"], avail: "Wednesdays 6–8pm", area: "Business", bio: "WSU MBA graduate who swam the English Channel. Specializes in healthcare operations and mentors MBA and CHEHS students." },
  { id: 8, name: "Sayed Nowroz", initials: "SN", grad: 2022, major: "Computer Science", role: "Hardware Security Engineer", company: "Amazon AWS", location: "Seattle, WA", skills: ["Hardware Security", "FPGA", "Cloud Infrastructure", "AI Silicon"], avail: "Bi-weekly Saturdays", area: "Technology", bio: "Developing next-generation AI computing infrastructure at Amazon. Mentors on CS grad school applications and hardware roles." },
];

// ─── EVENTS ──────────────────────────────────────────
export const EVENTS = [
  { id: 1, title: "CECS Senior Capstone Expo 2026", date: "2026-04-25", time: "10:00 AM – 4:00 PM", location: "Joshi Research Center Atrium", category: "Academic", description: "Annual showcase of senior capstone projects from all CECS disciplines. Industry recruiters and WPAFB representatives attend.", rsvp: true, color: "#2B5234" },
  { id: 2, title: "Spring Career Fair", date: "2026-04-22", time: "11:00 AM – 3:00 PM", location: "Nutter Center", category: "Career", description: "200+ employers including Northrop Grumman, L3Harris, CareSource, and Premier Health.", rsvp: true, color: "#E8A020" },
  { id: 3, title: "Hackathon WSU 2026", date: "2026-05-10", time: "All day (48 hours)", location: "Russ Engineering Center", category: "Academic", description: "$10,000 in prizes. Themes: AI for Good, Dayton Revitalization, Space Tech.", rsvp: true, color: "#2B5234" },
  { id: 4, title: "Kno.e.sis AI Research Symposium", date: "2026-05-05", time: "1:00 PM – 5:00 PM", location: "Oelman Hall 320", category: "Research", description: "Graduate and undergraduate researchers present work on ML, bioinformatics, and semantic web. Open to all.", rsvp: false, color: "#e53935" },
  { id: 5, title: "Mental Health Awareness Walk", date: "2026-05-01", time: "9:00 AM – 11:00 AM", location: "The Quad (starts at Student Union)", category: "Wellness", description: "Annual awareness walk organized by Counseling & Wellness. Free resources and mental health screenings provided.", rsvp: false, color: "#5c6bc0" },
  { id: 6, title: "Raiders Baseball vs. Milwaukee", date: "2026-04-26", time: "3:00 PM", location: "Nischwitz Stadium", category: "Athletics", description: "Horizon League regular season game. Free admission for WSU students with ID.", rsvp: false, color: "#1a6b3d" },
  { id: 7, title: "International Student Cultural Festival", date: "2026-05-08", time: "12:00 PM – 6:00 PM", location: "Student Union Atrium & Lawn", category: "Culture", description: "Food, performances, and cultural exhibitions from 50+ countries represented at WSU.", rsvp: false, color: "#00897b" },
  { id: 8, title: "Nursing Pinning Ceremony", date: "2026-05-12", time: "6:00 PM", location: "Nutter Center", category: "Academic", description: "Celebration of nursing students completing their degree, led by the newly expanded CHEHS nursing program.", rsvp: true, color: "#e91e63" },
  { id: 9, title: "ROTC Army Commissioning Ceremony", date: "2026-05-13", time: "10:00 AM", location: "Apollo Room, Student Union", category: "Military", description: "Commissioning of WSU Army ROTC Raider Battalion graduates as officers.", rsvp: false, color: "#3e5c2c" },
  { id: 10, title: "Spring Commencement", date: "2026-05-15", time: "10:00 AM (UG) / 3:00 PM (Grad)", location: "Nutter Center", category: "Academic", description: "Congratulations, Class of Spring 2026! Joining 125,000+ WSU alumni worldwide.", rsvp: true, color: "#E8A020" },
  { id: 11, title: "Soaring to Success Summer Bridge Info", date: "2026-04-28", time: "2:00 PM – 4:00 PM", location: "130 Student Union", category: "Academic", description: "Information session for the new summer bridge program for incoming Fall 2026 freshmen.", rsvp: true, color: "#2B5234" },
  { id: 12, title: "RSCOB Intel AI Workshop", date: "2026-05-03", time: "1:00 PM – 5:00 PM", location: "Rike Hall 110", category: "Academic", description: "Hands-on AI curriculum workshop as part of Raj Soin College of Business's Intel partnership.", rsvp: true, color: "#E8A020" },
];

// ─── HERITAGE TIMELINE ───────────────────────────────
export const HERITAGE = [
  { year: "1867", emoji: "✈️", title: "Wright Brothers Born", desc: "Wilbur Wright is born near Millville, Indiana on April 16. Orville Wright is born in Dayton on August 19. Both would grow up in Dayton, Ohio — the cradle of aviation.", highlight: false },
  { year: "1903", emoji: "🛩️", title: "First Flight at Kitty Hawk", desc: "On December 17, 1903, Orville piloted the first powered, sustained, controlled heavier-than-air aircraft at Kill Devil Hills, North Carolina. The first flight lasted 12 seconds and covered 120 feet.", highlight: true },
  { year: "1905", emoji: "🏅", title: "World's First Practical Airplane", desc: "The Wright Flyer III, flown near Dayton at Huffman Prairie, becomes the world's first practical airplane — capable of sustained, controlled circular flight for over 30 minutes.", highlight: false },
  { year: "1948", emoji: "🪂", title: "Wright-Patterson Air Force Base", desc: "Wright-Patterson AFB consolidates on land adjacent to Dayton, becoming one of the largest and most important military installations in the U.S., closely tied to the university's future.", highlight: false },
  { year: "1961", emoji: "🏗️", title: "Community Vision", desc: "A community-wide effort begins to establish a public university in the Dayton region. A fundraising campaign raises the required $3M in seed money from the public — a testament to Dayton's investment in education.", highlight: false },
  { year: "1964", emoji: "🎓", title: "Wright State Opens", desc: "Wright State opens as a joint branch campus of Miami University and Ohio State, occupying a single building on land donated by the U.S. Air Force from Wright-Patterson Air Force Base.", highlight: false },
  { year: "1967", emoji: "🦅", title: "Independence Day", desc: "On October 1, 1967, Wright State officially becomes an independent university, named in honor of Dayton's aviation pioneers Orville and Wilbur Wright. The 'Raiders' identity is born.", highlight: true },
  { year: "1973", emoji: "🏥", title: "Boonshoft School of Medicine", desc: "The Wright State School of Medicine is established, later named for the Oscar Boonshoft family. LCME-accredited, it trains physicians serving the greater Dayton region.", highlight: false },
  { year: "1987", emoji: "🏀", title: "NCAA Division I", desc: "The Wright State Raiders move up to NCAA Division I athletics, competing in the Horizon League. Known for basketball excellence and ranked 7th nationally in athlete graduation rates.", highlight: false },
  { year: "2007", emoji: "🤖", title: "Kno.e.sis Research Center", desc: "Ohio establishes the Ohio Center of Excellence in Knowledge-Enabled Computing at WSU. The center becomes a national leader in AI, Semantic Web, bioinformatics, and machine learning with 80–100 researchers.", highlight: false },
  { year: "2016", emoji: "🗳️", title: "Presidential Debate Site (Almost)", desc: "WSU was originally selected to host the first 2016 presidential debate before withdrawing due to security costs. John McCain chose WSU to announce Sarah Palin as VP pick in 2008.", highlight: false },
  { year: "2025", emoji: "🏆", title: "Top University in Ohio", desc: "Wall Street Journal/College Pulse ranks WSU #1 Public University in Ohio for Student Experience (2026 rankings). WSU records a perfect SB-6 financial composite score of 5.0 for the second consecutive year.", highlight: true },
  { year: "2026", emoji: "🚀", title: "WSU Raider Portal Launch", desc: "An integrated student portal — combining course planning, AI mentorship, live campus news, project showcase, and resource discovery — built to serve the next generation of Wright State Raiders.", highlight: true },
];

// ─── SYSML STEPS ─────────────────────────────────────
export const SYSML_STEPS = [
  {
    id: 1,
    title: "Package Diagram",
    icon: "📦",
    category: "Structure",
    badge: "Foundational",
    overview: "A Package Diagram organizes your entire SysML model into logical namespaces. Think of packages like folders — they prevent naming conflicts and create a clear hierarchy. In CATIA Magic, packages are the backbone of your Containment Tree.",
    whyItMatters: "Without proper packaging, large models become unmanageable. WSU aerospace capstone projects routinely involve 500+ model elements across 10+ diagrams — proper packaging is non-negotiable.",
    catiaSteps: [
      "Right-click on the Model root in the Containment Tree",
      "Select New → Package (or press Ctrl+Shift+P)",
      "Name your top-level package (e.g., HybridEVTOL_System)",
      "Create sub-packages: Structural, Behavioral, Requirements, Interfaces",
      "Drag diagram diagrams from palette onto the package diagram canvas",
    ],
    tip: "CATIA Magic Shortcut: Right-click a package → New Diagram → SysML Package Diagram. Always keep Requirements in a separate sub-package from Blocks.",
    code: `package HybridEVTOL_System {
  package Structural {
    block HybridEVTOL
    block PropulsionSystem
    block AvionicsSystem
  }
  package Behavioral {
    usecase TakeOff
    usecase VerticalFlight
  }
  package Requirements {
    requirement HFT-001
    requirement HFT-003
  }
  package Interfaces {
    interface PropulsionControl
  }
}`,
    commonErrors: ["Putting everything in one flat package (creates chaos)", "Forgetting to separate implementation from requirements"],
  },
  {
    id: 2,
    title: "Block Definition Diagram (BDD)",
    icon: "🧱",
    category: "Structure",
    badge: "Core",
    overview: "The BDD is SysML's answer to UML class diagrams — but richer. Blocks are the fundamental structural units representing physical or logical components. BDDs show block definitions, properties, operations, value types, and critically, composition/aggregation relationships.",
    whyItMatters: "Every WSU CECS capstone involving systems (robots, aircraft, medical devices) uses BDDs to define system decomposition. Your eVTOL project's FixedLiftRotor, TiltingRotor, and TiltActuator are all blocks.",
    catiaSteps: [
      "In Containment Tree, right-click Structural package → New Diagram → Block Definition Diagram",
      "Drag 'Block' from SysML toolbar onto canvas",
      "Double-click block name to rename (e.g., HybridEVTOL)",
      "Add parts: In block properties panel → add Part properties",
      "For composition with multiplicity: draw Composite Association, then right-click → Properties → set role name and multiplicity",
      "For Member Ends: select the relationship line → Specification → Member End properties",
    ],
    tip: "CATIA Magic: For named associations with multiplicity (e.g., rotors[4]), use the Member Ends section in the association's Specification window rather than the labeled fields in the UI — this is more reliable.",
    code: `block HybridEVTOL {
  parts:
    fixedRotors : FixedLiftRotor [4]
    tiltRotors  : TiltingRotor  [2]
    actuators   : TiltActuator  [2]
    avionics    : AvionicsSystem [1]
  
  values:
    maxPayload  : kg = 200
    maxAltitude : m  = 3000
    cruiseSpeed : kph = 180

  operations:
    takeOff()
    transition_to_cruise()
    land()
    emergency_stop()
}

block FixedLiftRotor {
  values:
    rpm : int
    thrust : N
  operations:
    setRPM(rpm: int)
    failSafe()
}`,
    commonErrors: ["Using Association instead of Composite Association for parts-whole", "Not setting multiplicity on Member Ends (leaves [1] implied)"],
  },
  {
    id: 3,
    title: "Use Case Diagram",
    icon: "👤",
    category: "Behavioral",
    badge: "Behavioral",
    overview: "Use Case Diagrams capture what a system does from the perspective of external actors. SysML enriches these with stereotypes like «extend», «include», and «use» relationships. Essential for early-stage requirements elicitation and stakeholder communication.",
    whyItMatters: "In your eVTOL project, actors like Pilot, ATC, MaintenanceCrew, and the FAA interact with the system differently. Use cases like TakeOff, EmergencyLanding, and PerformMaintenanceCheck define mission capabilities.",
    catiaSteps: [
      "Right-click Behavioral package → New Diagram → Use Case Diagram",
      "Drag Actor icon from palette onto canvas boundary",
      "Drag Use Case (ellipse) from palette",
      "Draw Association line from Actor to Use Case",
      "For «use»: draw Dependency arrow → right-click → Stereotype → apply 'use'",
      "For «extend»: draw Extend arrow from extending UC to base UC",
    ],
    tip: "CATIA Magic: Apply stereotypes via right-click → Stereotype → Add Stereotype. For «extend» and «include» — use the dedicated toolbar buttons, not generic dependency, to get the arrow direction correct automatically.",
    code: `// SysML Use Case Diagram notation

actor Pilot
actor MaintenanceCrew  
actor ATC <<system>>
actor FAA_Regulator

usecase TakeOff
usecase VerticalFlight
usecase CruiseFlight
usecase EmergencyLanding
usecase PerformMaintenanceCheck
usecase TransmitTelemetry

// Relationships
Pilot          ---->  TakeOff
Pilot          ---->  VerticalFlight
Pilot          ---->  EmergencyLanding
ATC            ---->  TransmitTelemetry
MaintenanceCrew --->  PerformMaintenanceCheck

TakeOff ..«include»..> VerticalFlight
EmergencyLanding ..«extend»..> TakeOff
TransmitTelemetry ..«use»..> AvionicsSubsystem`,
    commonErrors: ["Drawing «include» in the wrong direction (should go FROM including UC TO included UC)", "Confusing «extend» and «include» — extend is conditional, include is mandatory"],
  },
  {
    id: 4,
    title: "Requirements Diagram",
    icon: "📋",
    category: "Requirements",
    badge: "Traceability",
    overview: "SysML Requirements Diagrams connect textual requirements to blocks, operations, and test cases via «satisfy», «verify», «refine», and «deriveReqt» relationships. This creates a traceable, auditable requirements chain — critical for safety-critical systems like eVTOLs.",
    whyItMatters: "Your HFT-003 through HFT-006 series (Hybrid Fault Tolerance requirements) must be satisfied by specific blocks. Without traceability, you cannot demonstrate compliance to the FAA or DoD.",
    catiaSteps: [
      "Right-click Requirements package → New Diagram → Requirement Diagram",
      "Drag 'Requirement' element from palette",
      "Set ID (e.g., HFT-003) and Text in properties panel",
      "Drag relevant Block (e.g., FixedLiftRotor) onto the same diagram",
      "Draw «satisfy» arrow FROM block TO requirement",
      "For «deriveReqt»: use Dependency with «deriveReqt» stereotype between requirements",
      "For «refine»: use Dependency with «refine» stereotype FROM design element TO requirement",
    ],
    tip: "CATIA Magic: Member Ends for traceability — select relationship line → Specification → set client (block) and supplier (requirement) ends explicitly. This prevents CATIA from getting confused about relationship direction.",
    code: `// Requirements Traceability

requirement HFT-001 {
  id = "HFT-001"
  text = "The system shall tolerate 
          complete failure of any 
          single propulsion unit."
}

requirement HFT-003 {
  id = "HFT-003"  
  text = "System shall detect single 
          rotor failure in < 50 ms."
  // «deriveReqt» from HFT-001
}

requirement HFT-006 {
  id = "HFT-006"
  text = "TiltActuator shall maintain 
          ±1° precision under max load."
}

// Satisfaction links
FixedLiftRotor     --«satisfy»-->  HFT-001
FaultDetector      --«satisfy»-->  HFT-003
TiltActuator       --«satisfy»-->  HFT-006
HFT-003            --«deriveReqt»--> HFT-001
AvionicsSystem     --«refine»-->   HFT-003`,
    commonErrors: ["Drawing «satisfy» from requirement to block (reversed — block satisfies req)", "Not creating a parent requirement to derive children from"],
  },
  {
    id: 5,
    title: "Internal Block Diagram (IBD)",
    icon: "🔗",
    category: "Structure",
    badge: "Advanced",
    overview: "The IBD shows internal structure of a specific block — its parts, ports, and the connectors (interfaces) between them. Where BDD shows definitions, IBD shows instances and wiring. Essential for detailed interface control and signal flow modeling.",
    whyItMatters: "For your eVTOL, the IBD shows how the PropulsionController connects to each FixedLiftRotor via a CAN Bus interface, and how the AvionicsSystem receives telemetry from TiltActuators.",
    catiaSteps: [
      "Right-click on HybridEVTOL block → New Diagram → Internal Block Diagram",
      "Drag parts from Containment Tree onto the IBD canvas",
      "Add Port definitions on each block first (in BDD)",
      "In IBD: right-click part boundary → Add Port instance",
      "Draw Connector between matching ports",
      "Set Interface Block type on connectors for typed interfaces",
    ],
    tip: "CATIA Magic: Create the port types (flow ports, proxy ports) on the blocks in BDD first, THEN open the IBD — they'll appear automatically on the part boxes. Avoids manual port duplication.",
    code: `// IBD: HybridEVTOL internal wiring

part propControl : PropulsionController {
  port cmdOut[6] : «flowPort» MotorCommand
  port statusIn[6] : «flowPort» MotorStatus
}

part rotor1 : FixedLiftRotor {
  port cmdIn : «flowPort» MotorCommand
  port statusOut : «flowPort» MotorStatus
}

part avionics : AvionicsSystem {
  port telemetryIn : «flowPort» SystemTelemetry
  port failureAlert : «flowPort» FaultSignal
}

// Connectors (wiring)
propControl.cmdOut[1]    --> rotor1.cmdIn     : CAN_Bus
rotor1.statusOut         --> propControl.statusIn[1] : CAN_Bus
propControl.failureAlert --> avionics.failureAlert`,
    commonErrors: ["Adding ports directly in IBD without defining them in BDD first", "Forgetting to type connectors with Interface Blocks"],
  },
  {
    id: 6,
    title: "Activity & Sequence Diagrams",
    icon: "🔄",
    category: "Behavioral",
    badge: "Behavioral",
    overview: "Activity Diagrams model control/data flows (like flowcharts with concurrency). Sequence Diagrams show time-ordered message exchanges between lifelines. Together they define operational scenarios and dynamic behavior of your system.",
    whyItMatters: "To demonstrate that your eVTOL fault detection (HFT-003: <50ms) is achievable, you need a Sequence Diagram showing the exact message sequence from rotor sensor failure to avionics alert — timed precisely.",
    catiaSteps: [
      "For Sequence: New Diagram → Sequence Diagram under Behavioral package",
      "Add Lifelines from palette (one per component)",
      "Draw synchronous messages (solid arrow) and async messages (open arrow)",
      "Add combined fragments: alt (conditional), loop, par (parallel)",
      "For Activity: New Diagram → Activity Diagram",
      "Add Action nodes, Decision nodes, Fork/Join nodes, Object flows",
    ],
    tip: "CATIA Magic: For timed sequence diagrams (proving HFT-003), use Duration Constraints — right-click between messages → Add Duration Constraint → set value (e.g., {d < 50ms}).",
    code: `// Sequence: Fault Detection Scenario
// Proves compliance with HFT-003 (<50ms)

sd FaultDetection_HFT003 {
  lifeline RotorSensor : FixedLiftRotor
  lifeline Controller : PropulsionController
  lifeline Avionics : AvionicsSystem
  lifeline Pilot : PilotInterface

  RotorSensor -> Controller : rpmAnomaly(rotorId=2)
  {duration < 10ms}
  
  Controller -> Controller : runFaultDiagnosis()
  {duration < 25ms}
  
  Controller -> Avionics : faultAlert(ROTOR_2_FAIL)
  {duration < 5ms}
  
  Avionics -> Pilot : displayWarning("ROTOR 2 FAILURE")
  {duration < 10ms}
  
  // Total: < 50ms (satisfies HFT-003)
  
  alt [pilot acknowledges]
    Pilot -> Controller : redistributeLoad()
  else [no response in 2s]
    Controller -> Controller : autoFailSafe()
  end
}`,
    commonErrors: ["Not adding time constraints to prove performance requirements", "Missing alt/opt combined fragments for conditional scenarios"],
  },
];

// ─── QUICK STATS ─────────────────────────────────────
export const WSU_STATS = [
  { label: "Undergrad Programs", value: "160", icon: "📘" },
  { label: "Grad Programs", value: "155", icon: "🎓" },
  { label: "Alumni Network", value: "125K+", icon: "🌐" },
  { label: "Research Activity", value: "R2", icon: "🔬" },
  { label: "Acceptance Rate", value: "95.2%", icon: "✅" },
  { label: "Annual Budget", value: "$277M", icon: "💰" },
  { label: "Student Athletes GPA", value: "3.0", icon: "🏆" },
  { label: "Countries Represented", value: "80+", icon: "🌍" },
];
