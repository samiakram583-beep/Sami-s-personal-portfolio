import React, { useEffect } from 'react';
import { ProjectItem } from '../data/projects';
import { 
  X, 
  ExternalLink, 
  Github, 
  Check, 
  Layers, 
  AlertCircle, 
  Terminal, 
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Info
} from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onDiscussProject: (projectTitle: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onDiscussProject,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      window.location.hash = `project-${project.slug}`;
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      if (window.location.hash.startsWith('#project-')) {
        history.replaceState(null, '', ' ');
      }
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-4 sm:p-6 lg:p-10 flex items-center justify-center animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="relative w-full max-w-4xl bg-[#161719] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Title, Category, Status, Back Button and Close */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#18191b]/95 backdrop-blur-md border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-800/80 hover:bg-neutral-800 rounded-lg transition-colors border border-neutral-700/80"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Projects</span>
            </button>

            <span className="hidden sm:inline-block text-neutral-600" aria-hidden="true">·</span>

            <span className="text-xs font-mono text-emerald-400 font-medium">
              {project.status}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="max-h-[80vh] overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Project Hero: Title, Category & Tagline */}
          <div>
            <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
              <span className="text-emerald-400 font-semibold">{project.category}</span>
              <span aria-hidden="true">·</span>
              <span className="text-neutral-300 font-mono text-[11px]">{project.status}</span>
            </div>

            <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {project.title}
            </h2>

            <p className="mt-2 text-sm sm:text-base text-emerald-400/95 font-medium leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Project Screenshot / Media Container */}
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800">
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-black/75 backdrop-blur-md border border-neutral-700 text-xs font-mono text-white">
              {project.title} Interface Preview
            </div>
          </div>

          {/* Overview */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
              Overview
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {project.caseStudy.overview}
            </p>
          </div>

          {/* Problem & Solution Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-[#141517] border border-neutral-800">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                <AlertCircle className="w-4 h-4" />
                <span>The Problem</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {project.caseStudy.problem}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#141517] border border-neutral-800">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
                <Sparkles className="w-4 h-4" />
                <span>The Solution</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {project.caseStudy.solution}
              </p>
            </div>
          </div>

          {/* Features List */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-3">
              Key Features
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies Used (Clean badges / unboxed metadata) */}
          <div className="p-5 rounded-xl bg-neutral-900/80 border border-neutral-800/80">
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2.5">
              Technologies & Frameworks
            </div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs sm:text-sm text-neutral-200 font-medium">
              {project.technologies.map((tech, index) => (
                <React.Fragment key={tech}>
                  <span className="text-white bg-neutral-800 px-2.5 py-1 rounded-md border border-neutral-700/60 font-mono text-xs">
                    {tech}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Development Focus & Technical Highlights */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-2">
                Development Focus
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {project.caseStudy.developmentFocus}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-2.5">
                Technical Highlights
              </h3>
              <ul className="space-y-2">
                {project.caseStudy.technicalHighlights.map((highlight, hIdx) => (
                  <li key={hIdx} className="text-xs sm:text-sm text-neutral-300 pl-4 border-l-2 border-emerald-500/60 leading-relaxed">
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sample Code or Schema if available */}
          {project.caseStudy.sampleCodeOrSchema && (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-2.5 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Code Sample / Technical Logic</span>
              </h3>
              <div className="bg-[#121314] border border-neutral-800 rounded-xl p-4 overflow-x-auto text-[12px] font-mono text-neutral-300 leading-relaxed">
                <pre>{project.caseStudy.sampleCodeOrSchema}</pre>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-[#18191b] border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4">
          
          {/* Project Links: Only display Live / Source buttons if actual URLs exist */}
          <div className="flex items-center gap-3">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors border border-neutral-700"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Live Project</span>
              </a>
            ) : null}

            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-800/60 hover:bg-neutral-800 rounded-lg transition-colors border border-neutral-700"
              >
                <Github className="w-3.5 h-3.5" />
                <span>View Source Code</span>
              </a>
            ) : null}

            {!project.liveUrl && !project.githubUrl && (
              <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                <Info className="w-3.5 h-3.5 text-neutral-400" />
                <span>Source repository / demo link configurable upon project deployment</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors border border-neutral-700"
            >
              Back to Projects
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onDiscussProject(project.title);
              }}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors shadow-sm"
            >
              <span>Discuss Similar Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
