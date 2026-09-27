import React from 'react';
import { siteConfig } from '../data/siteConfig';
import { Server, Layout, Lightbulb, BookOpen, FileText, CheckCircle2 } from 'lucide-react';

interface AboutProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenResume, onOpenContact }) => {
  const highlights = [
    {
      icon: Server,
      title: "Backend Development",
      description: "Building APIs, data models, and server-side logic using modern Python, FastAPI, and PostgreSQL with a focus on data integrity."
    },
    {
      icon: Layout,
      title: "Web Development",
      description: "Creating responsive, accessible, and intuitive front-end user experiences with React, TypeScript, and clean CSS architectures."
    },
    {
      icon: Lightbulb,
      title: "Problem Solving",
      description: "Translating business and product requirements into clean, practical, and maintainable software implementations."
    },
    {
      icon: BookOpen,
      title: "Continuous Learning",
      description: "Constantly expanding backend systems knowledge, staying up to date with modern tooling, and mastering production engineering patterns."
    }
  ];

  const coreFocusAreas = [
    "Clean REST API contracts and schema validation",
    "Relational database design and ACID compliance",
    "Modern, component-driven frontend architecture",
    "Responsive, accessible user interfaces",
    "Security best practices and authentication workflows",
    "Practical freelance solutions tailored to client needs"
  ];

  return (
    <section id="about" className="py-20 border-t border-neutral-800/80 bg-[#121314]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
            Background & Mindset
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            About Me
          </h2>
          <p className="mt-4 text-neutral-300 text-base sm:text-lg leading-relaxed">
            I am a developer focused on building modern web experiences and backend systems,
            turning complex ideas into functional, responsive, and practical software.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Biography & Focus */}
          <div className="lg:col-span-7 space-y-6 text-neutral-300 leading-relaxed text-sm sm:text-base">
            {siteConfig.bio.map((paragraph, idx) => (
              <p key={idx} className="text-neutral-300">
                {paragraph}
              </p>
            ))}

            <div className="pt-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-200 mb-3">
                Core Development Principles
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {coreFocusAreas.map((item, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div className="pt-6 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 transition-colors rounded-xl shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <FileText className="w-4 h-4" />
                <span>View Resume</span>
              </button>

              <button
                type="button"
                onClick={onOpenContact}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-neutral-300 hover:text-white hover:bg-neutral-800/80 transition-colors rounded-xl border border-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <span>Discuss a Collaboration</span>
              </button>
            </div>
          </div>

          {/* Right Column: Highlights Cards (Section 13) */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="p-5 bg-[#18191b] border border-neutral-800/90 rounded-xl hover:border-neutral-700 transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-emerald-400 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-white tracking-tight">
                        {item.title}
                      </h4>
                      <p className="mt-1.5 text-xs sm:text-sm text-neutral-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
