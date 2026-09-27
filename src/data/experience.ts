export interface TimelineItem {
  id: string;
  period: string;
  role: string;
  organization: string;
  type: 'Work & Freelance' | 'Education & Training' | 'Open Source & Projects';
  description: string;
  highlights: string[];
  skills: string[];
}

export const timelineData: TimelineItem[] = [
  {
    id: "freelance-developer",
    period: "2024 — Present",
    role: "Freelance Web & Backend Developer",
    organization: "Independent Practice",
    type: "Work & Freelance",
    description: "Designing, building, and deploying modern web applications, responsive business websites, and performant REST APIs for clients and small businesses.",
    highlights: [
      "Engineered full-stack solutions with React, TypeScript, and Python (FastAPI/Django).",
      "Delivered client-tailored projects including booking platforms, internal dashboards, and landing pages.",
      "Implemented relational schemas with PostgreSQL and Supabase, prioritizing security and reliability.",
      "Optimized legacy websites for mobile responsiveness, page speed, and search visibility."
    ],
    skills: ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "Tailwind CSS"]
  },
  {
    id: "software-development-immersion",
    period: "2023 — 2024",
    role: "Full-Stack & Backend Systems Engineering",
    organization: "Practical Software Engineering & Applied Projects",
    type: "Education & Training",
    description: "Intensive focus on modern backend architecture, API design principles, database modeling, and front-end user experience engineering.",
    highlights: [
      "Built multiple production-style full-stack applications with asynchronous Python backends.",
      "Mastered relational database design, query optimization, indexing, and transactional integrity in PostgreSQL.",
      "Implemented security best practices: JWT authentication, OAuth flows, and input sanitization.",
      "Adopted Git version control workflows, automated testing with Pytest, and CI/CD basics."
    ],
    skills: ["FastAPI", "Django", "SQL", "Git", "REST APIs", "Docker"]
  },
  {
    id: "computer-science-foundations",
    period: "Foundation & Continuing Education",
    role: "Computer Science & Web Technologies Studies",
    organization: "Higher Education / Technical Studies",
    type: "Education & Training",
    description: "Academic coursework and foundational study in computer science principles, algorithms, data structures, and software engineering methodologies.",
    highlights: [
      "Studied core algorithmic complexity, object-oriented programming, and relational database management systems.",
      "Gained hands-on experience in web protocols, HTTP/HTTPS lifecycle, and networked computing.",
      "Applied computer science theory to practical web and server-side software construction."
    ],
    skills: ["Data Structures", "Algorithms", "Object-Oriented Programming", "Database Systems"]
  }
];
