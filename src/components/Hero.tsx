import React, { useState } from 'react';
import { siteConfig } from '../data/siteConfig';
import { heroTechStack } from '../data/skills';
import { 
  ArrowRight, 
  FileText, 
  Github, 
  Mail, 
  Copy, 
  Check, 
  Terminal, 
  Layers
} from 'lucide-react';

interface HeroProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume, onOpenContact }) => {
  const [activeCodeTab, setActiveCodeTab] = useState<'api' | 'architecture'>('api');
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const apiSnippet = `@app.post("/api/v1/projects/inquire", response_model=InquiryResult)
async def submit_project_inquiry(
    request: ProjectInquiryRequest,
    db: AsyncSession = Depends(get_database_session),
    rate_limiter: RateLimiter = Depends(get_rate_limiter)
) -> InquiryResult:
    """Validates and processes incoming client project inquiries asynchronously."""
    async with db.begin():
        await rate_limiter.check_rate_limit(request.email)
        record = await create_inquiry_record(db, request)
        await dispatch_notification_worker.delay(record.id)
    return InquiryResult(success=True, inquiry_id=record.id, status="received")`;

  const architectureSnippet = `+-------------------------------------------------------+
| Client Viewport: React 19 + TypeScript + Tailwind     |
+-------------------------------------------------------+
                           |
                     (HTTPS / JSON)
                           v
+-------------------------------------------------------+
| API Gateway: FastAPI ASGI Workers (Uvicorn)           |
| -> Pydantic Schema Validation & Token Auth (JWT)      |
+-------------------------------------------------------+
               |                           |
        (Async Engine)              (Atomic Writes)
               v                           v
+-----------------------------+ +-----------------------+
| Redis Cache Layer           | | PostgreSQL 16 (ACID)  |
| - Session tokens            | | - Slot lock constraints|
| - Fast catalog read cache   | | - Row Level Security  |
+-----------------------------+ +-----------------------+`;

  const handleCopyCode = () => {
    const textToCopy = activeCodeTab === 'api' ? apiSnippet : architectureSnippet;
    navigator.clipboard.writeText(textToCopy);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background subtle radial glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Who, What, Value & Primary Actions */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Status indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-neutral-300 font-medium">{siteConfig.availability}</span>
            </div>

            {/* Main Greeting and Name */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white text-balance leading-[1.15]">
              {siteConfig.heroHeadline}
            </h1>

            {/* Professional Position Badge */}
            <div className="mt-3 text-xl sm:text-2xl md:text-3xl font-semibold text-emerald-400 tracking-tight">
              {siteConfig.heroSubheadline}
            </div>

            {/* Core Value Statement */}
            <p className="mt-6 text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed text-balance">
              {siteConfig.tagline}
            </p>

            {/* Primary & Secondary Conversions */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => scrollToSection('projects')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 transition-colors rounded-xl shadow-md shadow-emerald-950/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenContact}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-neutral-200 bg-neutral-800/90 hover:bg-neutral-700 hover:text-white transition-colors rounded-xl border border-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer"
              >
                <span>Let's Work Together</span>
              </button>

              <button
                type="button"
                onClick={onOpenResume}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium text-neutral-300 hover:text-white hover:bg-neutral-800/50 transition-colors rounded-xl border border-neutral-800/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>View Resume</span>
              </button>
            </div>

            {/* Direct Channel Links: Order: GitHub, Instagram, WhatsApp, Email */}
            <div className="mt-8 pt-6 border-t border-neutral-800/80 flex flex-wrap items-center gap-5 text-xs text-neutral-400">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4 text-neutral-300" />
                <span>GitHub</span>
              </a>

              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400"
                aria-label="Instagram Profile"
              >
                <span>Instagram</span>
              </a>

              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400"
                aria-label="WhatsApp Chat"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
                <span>WhatsApp</span>
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400"
                aria-label="Email Sami-Ullah-Akram"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>{siteConfig.email}</span>
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Code & Architecture Terminal Card */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-[#18191b] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#141517] border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                  <span className="text-xs font-mono text-neutral-400 ml-2">sami_backend_service.py</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-md transition-colors"
                    title="Copy code snippet"
                    aria-label="Copy snippet"
                  >
                    {copiedSnippet ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Interactive Tabs */}
              <div className="flex items-center px-4 pt-2 border-b border-neutral-800/80 bg-[#161719] text-xs">
                <button
                  type="button"
                  onClick={() => setActiveCodeTab('api')}
                  className={`inline-flex items-center gap-1.5 py-2 px-3 border-b-2 font-medium transition-colors ${
                    activeCodeTab === 'api'
                      ? 'border-emerald-400 text-emerald-400'
                      : 'border-transparent text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>FastAPI Endpoint</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCodeTab('architecture')}
                  className={`inline-flex items-center gap-1.5 py-2 px-3 border-b-2 font-medium transition-colors ${
                    activeCodeTab === 'architecture'
                      ? 'border-emerald-400 text-emerald-400'
                      : 'border-transparent text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Architecture</span>
                </button>
              </div>

              {/* Code Pre Container */}
              <div className="p-4 sm:p-5 overflow-x-auto text-[12px] sm:text-[13px] leading-relaxed font-mono bg-[#141517] text-neutral-300">
                <pre className="text-left font-mono">
                  {activeCodeTab === 'api' ? (
                    <code>
                      <span className="text-emerald-400">@app.post</span>
                      <span className="text-neutral-400">(</span>
                      <span className="text-amber-300">"/api/v1/projects/inquire"</span>
                      <span className="text-neutral-400">)</span>
                      {'\n'}
                      <span className="text-cyan-400">async def</span>{' '}
                      <span className="text-yellow-200">submit_project_inquiry</span>
                      <span className="text-neutral-400">(</span>
                      {'\n  '}request: ProjectInquiryRequest,
                      {'\n  '}db: AsyncSession = Depends(get_database_session),
                      {'\n  '}rate_limiter: RateLimiter = Depends(get_rate_limiter)
                      {'\n'}
                      <span className="text-neutral-400">) -&gt; InquiryResult:</span>
                      {'\n  '}
                      <span className="text-neutral-500">"""Validates and processes client project inquiries."""</span>
                      {'\n  '}
                      <span className="text-cyan-400">async with</span> db.begin():
                      {'\n    '}
                      <span className="text-cyan-400">await</span> rate_limiter.check_rate_limit(request.email)
                      {'\n    '}record = <span className="text-cyan-400">await</span> create_inquiry_record(
                      {'\n      '}db, request
                      {'\n    '})
                      {'\n    '}
                      <span className="text-cyan-400">await</span> dispatch_notification_worker.delay(record.id)
                      {'\n  '}
                      <span className="text-cyan-400">return</span> InquiryResult(success=
                      <span className="text-emerald-400">True</span>, status=
                      <span className="text-amber-300">"received"</span>)
                    </code>
                  ) : (
                    <code className="text-neutral-400 text-xs sm:text-[12px] leading-tight">
                      {architectureSnippet}
                    </code>
                  )}
                </pre>
              </div>

              {/* Bottom footer status */}
              <div className="px-4 py-2.5 bg-[#161719] border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span className="font-mono text-[11px] text-neutral-400">FastAPI ASGI · PostgreSQL · React</span>
                </div>
                <span className="font-mono text-[11px] text-emerald-400/90 font-medium">Ready for production</span>
              </div>
            </div>
          </div>

        </div>

        {/* Section 11: Hero Tech Stack Row */}
        <div className="mt-16 pt-8 border-t border-neutral-800/80">
          <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4">
            Core Technologies & Stack
          </div>
          
          {/* Zero-pill metadata: rendered as clean unboxed text with typographic separators */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm sm:text-base font-medium text-neutral-300">
            {heroTechStack.map((tech, index) => (
              <React.Fragment key={tech}>
                <span className="hover:text-emerald-400 transition-colors cursor-default">
                  {tech}
                </span>
                {index < heroTechStack.length - 1 && (
                  <span className="text-neutral-600 select-none" aria-hidden="true">
                    ·
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
