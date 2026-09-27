export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  technologies: string[];
  contactSubject: string;
}

export const services: ServiceItem[] = [
  {
    id: "business-websites",
    number: "01",
    title: "Business Websites",
    tagline: "High-performance digital presence for modern businesses & brands",
    description: "Professional, responsive websites built to establish strong brand credibility, capture qualified client inquiries, and represent your services cleanly on every device.",
    features: [
      "Custom responsive design for desktop, tablet, and mobile",
      "High-converting landing pages & service showcases",
      "Validated contact & inquiry intake forms",
      "SEO-friendly semantic HTML & Schema structured data",
      "Fast page load speeds and accessibility compliance"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "HTML5", "SEO / JSON-LD"],
    contactSubject: "Business Website Project"
  },
  {
    id: "full-stack-apps",
    number: "02",
    title: "Full-Stack Web Applications",
    tagline: "Tailored web applications designed around specific business workflows",
    description: "End-to-end web applications featuring secure authentication, relational database architecture, reactive user interfaces, and administrative dashboards.",
    features: [
      "Secure user authentication & role-based access control (RBAC)",
      "Interactive administrative dashboards & operational workflows",
      "Complete CRUD functionality & complex business validation",
      "Robust database modeling with PostgreSQL or Supabase",
      "Automated transactional notifications & client integrations"
    ],
    technologies: ["React", "TypeScript", "FastAPI / Django", "PostgreSQL", "Supabase"],
    contactSubject: "Full-Stack Application Development"
  },
  {
    id: "backend-development",
    number: "03",
    title: "Backend Development",
    tagline: "Reliable, performant backend services & REST APIs using modern Python",
    description: "Clean server-side architecture, structured REST APIs, and database solutions built with Python, FastAPI, and Django to power applications with speed and integrity.",
    features: [
      "Asynchronous REST API engineering with FastAPI & Django",
      "Database schema design, normalization, & indexing in PostgreSQL",
      "Pydantic schema validation & automated OpenAPI documentation",
      "Third-party API integrations, payment webhooks, & background tasks",
      "Secure token handling (JWT) & fine-grained permission enforcement"
    ],
    technologies: ["Python", "FastAPI", "Django", "PostgreSQL", "REST APIs", "SQL"],
    contactSubject: "Backend API Engineering"
  },
  {
    id: "website-improvements",
    number: "04",
    title: "Website Improvements",
    tagline: "Modernization, performance audits, bug fixes, & responsive redesigns",
    description: "Upgrade your existing web application or company website. I resolve layout inconsistencies, fix responsive mobile bugs, accelerate load times, and implement new features.",
    features: [
      "Responsive redesigns fixing mobile and tablet layout issues",
      "Performance optimization, asset compression, & bundle reduction",
      "Codebase refactoring from legacy JavaScript to modern TypeScript",
      "Bug fixing, database query speedups, & UI polish",
      "Accessibility audits and SEO compliance updates"
    ],
    technologies: ["TypeScript", "React", "CSS / Tailwind", "Performance Auditing", "Git"],
    contactSubject: "Website Improvement / Audit"
  }
];
