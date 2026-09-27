import React, { useEffect } from 'react';
import { siteConfig } from '../data/siteConfig';
import { skills } from '../data/skills';
import { projects } from '../data/projects';
import { timelineData } from '../data/experience';
import { 
  X, 
  Download, 
  Printer, 
  Mail, 
  Github, 
  MapPin, 
  Check 
} from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownloadMarkdown = () => {
    const markdownContent = `# ${siteConfig.name}
**${siteConfig.role}** | ${siteConfig.secondaryRole}
Email: ${siteConfig.email} | Location: ${siteConfig.location}
GitHub: ${siteConfig.github} | WhatsApp: ${siteConfig.whatsappDisplay}

---

## PROFESSIONAL SUMMARY
${siteConfig.bio.join('\n\n')}

---

## CORE TECHNICAL SKILLS
- **Backend:** Python, FastAPI, Django, REST APIs, Microservices architecture
- **Frontend:** TypeScript, JavaScript (ES6+), React, Tailwind CSS, HTML5, CSS3
- **Databases:** PostgreSQL, SQL, Supabase, Redis
- **Tooling & DevOps:** Git, GitHub Actions, Docker, VS Code, Postman, Vercel

---

## FEATURED SOFTWARE PROJECTS
${projects.map(p => `### ${p.title} (${p.category})
Technologies: ${p.technologies.join(', ')}
${p.description}
Key Highlights:
${p.features.map(f => `- ${f}`).join('\n')}
`).join('\n')}

---

## EXPERIENCE & EDUCATION
${timelineData.map(t => `### ${t.role} — ${t.organization}
Period: ${t.period} | Type: ${t.type}
${t.description}
${t.highlights.map(h => `- ${h}`).join('\n')}
`).join('\n')}
`;

    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Sami-Ullah-Akram-Resume.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm p-4 sm:p-6 lg:p-10 flex items-center justify-center animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Resume Document Viewer"
    >
      <div
        className="relative w-full max-w-4xl bg-[#141517] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto print:border-none print:shadow-none print:bg-white print:text-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar (Hidden when printing) */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#18191b] border-b border-neutral-800 print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="text-sm font-semibold text-white">Curriculum Vitae / Resume</span>
            <span className="text-neutral-500" aria-hidden="true">·</span>
            <span className="text-xs text-neutral-400 font-mono">2026 Edition</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-200 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors border border-neutral-700"
              title="Download text / markdown copy"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Download (.md)</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-200 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors border border-neutral-700"
              title="Print or save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
              aria-label="Close resume viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Resume Document */}
        <div className="max-h-[82vh] overflow-y-auto p-6 sm:p-10 space-y-8 bg-[#121314] text-neutral-200 print:max-h-none print:p-0 print:bg-white print:text-black">
          
          {/* Resume Header */}
          <div className="border-b border-neutral-800 pb-6 print:border-neutral-300">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight print:text-black">
              {siteConfig.name}
            </h1>
            <div className="mt-1 text-lg font-semibold text-emerald-400 print:text-neutral-700">
              {siteConfig.role}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-neutral-400 print:text-neutral-600">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-400 print:text-neutral-700" />
                <span>{siteConfig.email}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-400 font-semibold print:text-neutral-700">WhatsApp:</span>
                <span>{siteConfig.whatsappDisplay}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 print:text-neutral-700" />
                <span>{siteConfig.location}</span>
              </span>
              {siteConfig.github && (
                <span className="flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5 text-emerald-400 print:text-neutral-700" />
                  <span>{siteConfig.github}</span>
                </span>
              )}
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 print:text-neutral-900">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed print:text-neutral-800">
              {siteConfig.tagline} {siteConfig.bio.join(' ')}
            </p>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 print:text-neutral-900">
              Technical Competencies
            </h2>
            <div className="space-y-2 text-xs sm:text-sm">
              <div>
                <span className="font-semibold text-white print:text-neutral-900">Backend Systems: </span>
                <span className="text-neutral-300 print:text-neutral-700">Python, FastAPI, Django, RESTful APIs, Pydantic, SQLAlchemy, Docker, Redis</span>
              </div>
              <div>
                <span className="font-semibold text-white print:text-neutral-900">Frontend Engineering: </span>
                <span className="text-neutral-300 print:text-neutral-700">TypeScript, JavaScript (ES6+), React 19, Tailwind CSS, Responsive Web Design, WCAG 2.2 AA</span>
              </div>
              <div>
                <span className="font-semibold text-white print:text-neutral-900">Databases & Storage: </span>
                <span className="text-neutral-300 print:text-neutral-700">PostgreSQL, SQL (DDL/DML), Supabase, Relational Indexing, ACID Transactions</span>
              </div>
              <div>
                <span className="font-semibold text-white print:text-neutral-900">Developer Tools: </span>
                <span className="text-neutral-300 print:text-neutral-700">Git, GitHub Actions, VS Code, Postman, Vercel, Linux CLI</span>
              </div>
            </div>
          </div>

          {/* Key Projects */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 print:text-neutral-900">
              Featured Software Projects
            </h2>
            <div className="space-y-5">
              {projects.map(proj => (
                <div key={proj.id} className="space-y-1.5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-sm font-bold text-white print:text-neutral-900">
                      {proj.title}
                    </h3>
                    <span className="text-xs font-mono text-emerald-400 print:text-neutral-700">
                      {proj.technologies.slice(0, 4).join(' · ')}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 print:text-neutral-700 leading-relaxed">
                    {proj.description}
                  </p>
                  <ul className="space-y-1 pt-1">
                    {proj.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-neutral-400 print:text-neutral-600">
                        <Check className="w-3.5 h-3.5 text-emerald-400 print:text-neutral-800 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Experience & Education */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 print:text-neutral-900">
              Experience & Education
            </h2>
            <div className="space-y-4">
              {timelineData.map(item => (
                <div key={item.id} className="space-y-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-sm font-bold text-white print:text-neutral-900">
                      {item.role} <span className="font-normal text-neutral-400 print:text-neutral-600">| {item.organization}</span>
                    </h3>
                    <span className="text-xs font-mono text-neutral-400 print:text-neutral-600">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-300 print:text-neutral-700">
                    {item.description}
                  </p>
                  <ul className="space-y-1 pt-1">
                    {item.highlights.slice(0, 2).map((h, i) => (
                      <li key={i} className="text-xs text-neutral-400 print:text-neutral-600 pl-4 border-l border-neutral-700 print:border-neutral-300">
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
