export interface SiteConfig {
  name: string;
  role: string;
  secondaryRole: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  bio: string[];
  email: string;
  whatsapp: string;
  whatsappUrl: string;
  whatsappDisplay: string;
  instagram: string;
  instagramHandle: string;
  github: string;
  resumeUrl: string;
  location: string;
  availability: string;
}

export const siteConfig: SiteConfig = {
  name: "Sami-Ullah-Akram",
  role: "Backend & Web Developer",
  secondaryRole: "Freelance Web Developer",
  tagline: "I build modern, responsive websites, web applications, and backend APIs that solve real business problems.",
  heroHeadline: "Hi, I'm Sami-Ullah-Akram.",
  heroSubheadline: "Backend & Web Developer",
  bio: [
    "Sami-Ullah-Akram is a developer focused on building modern web experiences and backend systems. He enjoys turning ideas into functional, responsive, and practical software.",
    "Specializing in Python (FastAPI, Django), modern JavaScript/TypeScript (React, Node), and relational databases (PostgreSQL, SQL), Sami bridges resilient server-side architecture with intuitive user-facing interfaces.",
    "Whether architecting high-throughput REST APIs, developing full-stack web applications from scratch, or refining client business websites for speed and conversion, his focus is always on clean code and reliable business outcomes."
  ],
  email: "samiakram583@gmail.com",
  whatsapp: "+923111629335",
  whatsappUrl: "https://wa.me/923111629335",
  whatsappDisplay: "+92 311 1629335",
  instagram: "https://www.instagram.com/sua.digital.26/",
  instagramHandle: "@sua.digital.26",
  github: "https://github.com/samiakram583-beep",
  resumeUrl: "#resume-modal",
  location: "Available Worldwide · Remote",
  availability: "Available for freelance projects & full-time roles"
};
