import React, { useState } from 'react';
import { skills, skillCategories, SkillItem } from '../data/skills';
import { 
  Code2, 
  Server, 
  Database, 
  Wrench, 
  TerminalSquare
} from 'lucide-react';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === selectedCategory);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Backend':
        return Server;
      case 'Frontend':
        return Code2;
      case 'Database':
        return Database;
      case 'Tools':
        return Wrench;
      default:
        return TerminalSquare;
    }
  };

  return (
    <section id="skills" className="py-20 border-t border-neutral-800/80 bg-[#121314]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
              Proficiencies & Stack
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Technical Skills
            </h2>
            <p className="mt-4 text-neutral-300 text-base sm:text-lg leading-relaxed">
              Organized by layer and domain. Practical development tools and frameworks
              applied to real production systems without vanity percentage scores.
            </p>
          </div>

          {/* Interactive Category Filter Tabs (Single-line controls) */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-xl overflow-x-auto max-w-full">
            {skillCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-neutral-800 text-emerald-400 shadow-sm font-semibold'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/40'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredSkills.map((skill: SkillItem) => {
            const Icon = getCategoryIcon(skill.category);
            return (
              <div
                key={skill.name}
                className="p-5 bg-[#18191b] border border-neutral-800/90 rounded-xl hover:border-neutral-700 hover:bg-[#1a1b1e] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-md bg-neutral-900 border border-neutral-800 text-emerald-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-bold text-white tracking-tight">
                        {skill.name}
                      </h3>
                    </div>

                    <span className="text-[11px] font-medium text-neutral-400">
                      {skill.category}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800/60 flex items-center justify-between text-[11px] text-neutral-400">
                  <span className="font-mono text-neutral-400">production-ready</span>
                  {skill.featured && (
                    <span className="text-emerald-400/90 font-medium">Core Stack</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Note for Recruiters & Clients */}
        <div className="mt-12 p-5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            <span className="text-neutral-200 font-semibold">Need a specific library or framework?</span>
            <span className="ml-2">I adapt quickly to team conventions, cloud environments, and existing codebases.</span>
          </div>
          <a
            href="#contact"
            className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1 whitespace-nowrap"
          >
            <span>Inquire about custom stacks &rarr;</span>
          </a>
        </div>

      </div>
    </section>
  );
};
