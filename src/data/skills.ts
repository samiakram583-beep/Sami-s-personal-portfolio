export interface SkillItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Tools';
  description: string;
  featured?: boolean;
}

export const skillCategories = ['All', 'Backend', 'Frontend', 'Database', 'Tools'] as const;

export const skills: SkillItem[] = [
  // Backend
  {
    name: "Python",
    category: "Backend",
    description: "Core language for backend automation, asynchronous services, and data pipelines.",
    featured: true
  },
  {
    name: "FastAPI",
    category: "Backend",
    description: "High-performance asynchronous REST API design, Pydantic validation, and OpenAPI documentation.",
    featured: true
  },
  {
    name: "Django",
    category: "Backend",
    description: "Robust enterprise web framework, ORM modeling, admin interfaces, and authentication systems.",
    featured: true
  },
  {
    name: "REST APIs",
    category: "Backend",
    description: "Predictable resource modeling, JSON contracts, rate limiting, and webhook dispatching.",
    featured: true
  },

  // Frontend
  {
    name: "TypeScript",
    category: "Frontend",
    description: "Type-safe interface modeling, strict null-checking, and resilient component contracts.",
    featured: true
  },
  {
    name: "React",
    category: "Frontend",
    description: "Modern component architectures, custom hooks, state management, and optimized render cycles.",
    featured: true
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    description: "Utility-first design systems, responsive layouts, accessibility-focused utility composition.",
    featured: true
  },
  {
    name: "JavaScript (ES6+)",
    category: "Frontend",
    description: "Modern asynchronous workflows, DOM interactions, Promises, and browser APIs.",
    featured: false
  },
  {
    name: "HTML5 & CSS3",
    category: "Frontend",
    description: "Semantic markup, WCAG accessibility, CSS grid/flexbox, and responsive design fundamentals.",
    featured: false
  },

  // Database
  {
    name: "PostgreSQL",
    category: "Database",
    description: "Relational schema design, ACID transactions, indexed queries, and migration management.",
    featured: true
  },
  {
    name: "SQL",
    category: "Database",
    description: "Complex relational queries, indexing strategies, data normalization, and performance tuning.",
    featured: true
  },
  {
    name: "Supabase",
    category: "Database",
    description: "Managed Postgres, Row-Level Security (RLS) policies, real-time events, and auth integration.",
    featured: true
  },

  // Tools
  {
    name: "Git",
    category: "Tools",
    description: "Version control branching strategies, atomic commits, merge resolutions, and history tracking.",
    featured: true
  },
  {
    name: "GitHub",
    category: "Tools",
    description: "Code reviews, CI/CD automated test workflows, release management, and issue tracking.",
    featured: true
  },
  {
    name: "VS Code",
    category: "Tools",
    description: "Tailored debugging configurations, linting tooling, and productive workspace workflows.",
    featured: false
  },
  {
    name: "Vercel",
    category: "Tools",
    description: "Edge network deployments, preview environments, and production continuous delivery.",
    featured: false
  },
  {
    name: "Docker",
    category: "Tools",
    description: "Containerization for local development parity, microservices, and reproducible builds.",
    featured: false
  },
  {
    name: "Postman",
    category: "Tools",
    description: "API testing, automated collection runners, environment variables, and endpoint verification.",
    featured: false
  }
];

export const heroTechStack = [
  "Python",
  "FastAPI",
  "Django",
  "JavaScript",
  "React",
  "TypeScript",
  "HTML5",
  "CSS3",
  "SQL",
  "PostgreSQL",
  "Git",
  "GitHub"
];
