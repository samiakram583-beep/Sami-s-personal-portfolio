import React from 'react';
import { timelineData } from '../data/experience';
import { Briefcase, GraduationCap, CheckCircle2 } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 border-t border-neutral-800/80 bg-[#121314]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
            Career & Development History
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Experience & Education
          </h2>
          <p className="mt-4 text-neutral-300 text-base sm:text-lg leading-relaxed">
            Practical development milestones, client project delivery, and computer science foundations.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-neutral-800/90 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-12">
          {timelineData.map((item) => {
            const isEducation = item.type.includes('Education');
            return (
              <div key={item.id} className="relative group">
                
                {/* Timeline Node Point */}
                <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 p-1.5 rounded-full bg-[#121314] border-2 border-emerald-500 text-emerald-400 group-hover:scale-110 transition-transform">
                  {isEducation ? (
                    <GraduationCap className="w-4 h-4" />
                  ) : (
                    <Briefcase className="w-4 h-4" />
                  )}
                </div>

                {/* Timeline Card */}
                <div className="p-6 sm:p-7 bg-[#18191b] border border-neutral-800/90 rounded-2xl hover:border-neutral-700 transition-colors">
                  {/* Zero-pill metadata line */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400 mb-2">
                    <span className="font-mono text-emerald-400 font-semibold">{item.period}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-neutral-400">{item.type}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {item.role}
                  </h3>

                  <div className="text-xs sm:text-sm font-medium text-emerald-400/90 mt-1">
                    {item.organization}
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Highlights checklist */}
                  <div className="mt-4 pt-4 border-t border-neutral-800/80">
                    <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2.5">
                      Key Highlights & Accomplishments
                    </div>
                    <ul className="space-y-2">
                      {item.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills tags */}
                  <div className="mt-4 pt-3 border-t border-neutral-800/60 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-400">
                    <span className="text-neutral-400 font-medium">Applied:</span>
                    {item.skills.map((skill, sIdx) => (
                      <React.Fragment key={skill}>
                        <span className="text-neutral-300 font-medium">{skill}</span>
                        {sIdx < item.skills.length - 1 && (
                          <span className="text-neutral-600" aria-hidden="true">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
