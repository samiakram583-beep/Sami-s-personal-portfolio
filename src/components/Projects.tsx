import React, { useState, useEffect } from 'react';
import { 
  projects, 
  projectFilterCategories, 
  ProjectItem, 
  FilterCategory 
} from '../data/projects';
import { ProjectModal } from './ProjectModal';
import { 
  ArrowRight, 
  ExternalLink, 
  Github, 
  Sparkles, 
  Layers,
  MessageSquare
} from 'lucide-react';

interface ProjectsProps {
  onDiscussProject: (projectTitle: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ 
  onDiscussProject
}) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>('All');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  // Check URL hash on initial load (e.g. #project-us-barber)
  useEffect(() => {
    const handleHashCheck = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#project-')) {
        const slug = hash.replace('#project-', '');
        const matched = projects.find((p) => p.slug === slug);
        if (matched) {
          setActiveModalProject(matched);
        }
      }
    };

    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    return () => window.removeEventListener('hashchange', handleHashCheck);
  }, []);

  const filteredProjects = selectedFilter === 'All'
    ? projects
    : projects.filter((p) => p.filterCategories.includes(selectedFilter));

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const secondaryProjects = filteredProjects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20 border-t border-neutral-800/80 bg-[#121314]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
              Featured Work & Case Studies
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Selected Projects
            </h2>
            <p className="mt-4 text-neutral-300 text-base sm:text-lg leading-relaxed">
              Showcasing business websites, full-stack applications, interactive web tools, and backend REST APIs.
              Click any project to explore its architecture and technical breakdown.
            </p>
          </div>

          {/* Project Filters (Section 16: All, Websites, Frontend, Backend, Full Stack, Business) */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-xl overflow-x-auto max-w-full">
            {projectFilterCategories.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setSelectedFilter(filter)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer ${
                  selectedFilter === filter
                    ? 'bg-neutral-800 text-emerald-400 shadow-sm font-semibold'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/40'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* 1. FEATURED PROJECTS: Prominent showcases (U.S. Barber & AbaidUllah Group of Colleges) */}
        {featuredProjects.length > 0 && (
          <div className="mb-16 space-y-10">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Primary Featured Projects</span>
            </div>

            <div className="space-y-8">
              {featuredProjects.map((project) => (
                <div
                  key={project.id}
                  className="p-6 sm:p-8 lg:p-10 bg-[#18191b] border border-neutral-800 rounded-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl hover:border-neutral-700 transition-all duration-200 group"
                >
                  {/* Left Column: Project Image (Clickable with zoom effect) */}
                  <div 
                    onClick={() => setActiveModalProject(project)}
                    className="lg:col-span-6 relative aspect-video rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 cursor-pointer"
                  >
                    <img
                      src={project.image}
                      alt={`${project.title} Preview`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-neutral-700/80 text-[11px] font-mono text-emerald-400">
                      {project.status}
                    </div>
                  </div>

                  {/* Right Column: Project Details & Case Study CTA */}
                  <div className="lg:col-span-6 flex flex-col justify-between">
                    <div>
                      {/* Zero-pill metadata line */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400 mb-2">
                        <span className="text-emerald-400 font-semibold">{project.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-neutral-400 font-mono text-[11px]">{project.status}</span>
                      </div>

                      <h3 
                        onClick={() => setActiveModalProject(project)}
                        className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-emerald-400 transition-colors cursor-pointer"
                      >
                        {project.title}
                      </h3>

                      <p className="mt-2 text-sm text-emerald-400/90 font-medium">
                        {project.tagline}
                      </p>

                      <p className="mt-4 text-sm text-neutral-300 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Key features bullets */}
                      <div className="mt-5 space-y-1.5">
                        {project.features.slice(0, 3).map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-300">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Technologies (Clean badges) */}
                      <div className="mt-6 pt-4 border-t border-neutral-800 flex flex-wrap items-center gap-1.5 text-xs">
                        <span className="text-neutral-400 font-medium mr-1">Stack:</span>
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="bg-neutral-900 border border-neutral-800 text-neutral-300 font-mono px-2 py-0.5 rounded text-[11px]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action CTAs */}
                    <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveModalProject(project)}
                        className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors border border-neutral-700 cursor-pointer"
                      >
                        <Layers className="w-4 h-4" />
                        <span>View Case Study</span>
                      </button>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-3 text-xs sm:text-sm font-semibold text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-xl border border-neutral-700 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Live Demo</span>
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-3 text-xs sm:text-sm font-semibold text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-xl border border-neutral-700 transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          <span>GitHub</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. MORE PROJECTS GRID: Secondary projects */}
        {secondaryProjects.length > 0 && (
          <div className="space-y-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              {featuredProjects.length > 0 ? 'More Projects & Applications' : 'Projects'}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {secondaryProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex flex-col justify-between bg-[#18191b] border border-neutral-800/90 rounded-2xl overflow-hidden hover:border-neutral-700 transition-all duration-200 group"
                >
                  <div>
                    {/* Project Image Container */}
                    <div 
                      className="relative aspect-video w-full bg-neutral-900 overflow-hidden cursor-pointer"
                      onClick={() => setActiveModalProject(project)}
                    >
                      <img
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#18191b] via-transparent to-transparent opacity-80" />
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
                        <span className="font-mono text-emerald-400 text-[11px] bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded">
                          {project.status}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
                        <span className="text-emerald-400 font-semibold">{project.category}</span>
                      </div>

                      <h3 
                        onClick={() => setActiveModalProject(project)}
                        className="text-lg font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors cursor-pointer"
                      >
                        {project.title}
                      </h3>

                      <p className="mt-1.5 text-xs font-medium text-emerald-400/90">
                        {project.tagline}
                      </p>

                      <p className="mt-3 text-xs sm:text-sm text-neutral-300 line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Technologies Badges */}
                      <div className="mt-5 pt-4 border-t border-neutral-800/80 flex flex-wrap items-center gap-1.5 text-xs text-neutral-400">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="bg-neutral-900 border border-neutral-800 text-neutral-300 font-mono px-2 py-0.5 rounded text-[11px]"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="text-neutral-500 text-[11px]">+{project.technologies.length - 4}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action: View Case Study button */}
                  <div className="p-6 pt-0">
                    <button
                      type="button"
                      onClick={() => setActiveModalProject(project)}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-semibold text-white bg-neutral-900 hover:bg-emerald-600 border border-neutral-700/80 hover:border-emerald-500 rounded-xl transition-all cursor-pointer"
                    >
                      <span>View Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 20: Subtle Contact CTA after Projects */}
        <div className="mt-16 p-8 rounded-2xl bg-[#18191b] border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Have a project in mind? Let's talk.
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-neutral-400">
              Whether you need a business website, full-stack application, or backend API, I'm ready to help.
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors shrink-0 shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Start a Project</span>
          </a>
        </div>

      </div>

      {/* Case Study Modal with Deep Linking */}
      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
          onDiscussProject={onDiscussProject}
        />
      )}
    </section>
  );
};
