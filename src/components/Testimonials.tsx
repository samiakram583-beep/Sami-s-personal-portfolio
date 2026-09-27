import React from 'react';
import { ShieldCheck, MessageSquare, Clock, Code } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const collaborationPillars = [
    {
      icon: MessageSquare,
      title: "Direct & Transparent Communication",
      description: "Regular updates throughout every sprint. You work directly with the engineer building your product, not an account manager."
    },
    {
      icon: Code,
      title: "Clean, Documented Architecture",
      description: "Code written with strict TypeScript types, modular patterns, and comprehensive schema documentation so your team can maintain it easily."
    },
    {
      icon: Clock,
      title: "Agreed Timelines & Predictable Milestones",
      description: "Scope definitions with clear delivery checkpoints. Realistic estimation and reliable completion without scope creep."
    }
  ];

  return (
    <section className="py-20 border-t border-neutral-800/80 bg-[#121314]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
            Professional Standards
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Client Collaboration Standards
          </h2>
          <p className="mt-4 text-neutral-300 text-base sm:text-lg leading-relaxed">
            I believe in building credibility through real software, transparent commitments, and verified project outcomes.
          </p>
        </div>

        {/* 3 Collaboration Commitments */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {collaborationPillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className="p-6 bg-[#18191b] border border-neutral-800/90 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-emerald-400 w-fit mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Verified Reference Policy Notice (Section 21 Compliance) */}
        <div className="p-6 sm:p-7 rounded-2xl bg-neutral-900/50 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-tight">
                References & Case Study Walkthroughs
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
                To respect client NDAs and avoid fabricated marketing quotes, specific client references, code samples, and architecture walkthroughs are provided directly upon inquiry.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="px-4 py-2.5 text-xs font-semibold text-white bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors border border-neutral-700 shrink-0 whitespace-nowrap"
          >
            <span>Request References</span>
          </a>
        </div>

      </div>
    </section>
  );
};
