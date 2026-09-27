import React from 'react';
import { services, ServiceItem } from '../data/services';
import { Globe, Database, Server, Wrench, ArrowRight, Check } from 'lucide-react';

interface ServicesProps {
  onSelectService: (service: ServiceItem) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'business-websites':
        return Globe;
      case 'full-stack-apps':
        return Database;
      case 'backend-development':
        return Server;
      case 'website-improvements':
        return Wrench;
      default:
        return Server;
    }
  };

  return (
    <section id="services" className="py-20 border-t border-neutral-800/80 bg-[#121314]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
            Client Solutions & Capabilities
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            What I Can Build
          </h2>
          <p className="mt-4 text-neutral-300 text-base sm:text-lg leading-relaxed">
            From modern responsive business websites to resilient backend systems,
            here are the primary services I provide for small businesses and freelance clients.
          </p>
        </div>

        {/* 4 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service) => {
            const Icon = getServiceIcon(service.id);
            return (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between p-6 sm:p-8 bg-[#18191b] border border-neutral-800/90 hover:border-neutral-700 rounded-2xl transition-all duration-200"
              >
                <div>
                  {/* Card Top: Number, Icon & Title */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-emerald-400 group-hover:text-emerald-300 group-hover:border-neutral-700 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs text-neutral-400 font-semibold tracking-wider">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-xs font-medium text-emerald-400/90">
                    {service.tagline}
                  </p>

                  <p className="mt-4 text-sm text-neutral-300 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="mt-6 pt-5 border-t border-neutral-800/80">
                    <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                      Included Capabilities
                    </div>
                    <ul className="space-y-2">
                      {service.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies (zero-pill text styling) */}
                  <div className="mt-6 pt-4 border-t border-neutral-800/80">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-400">
                      <span className="text-neutral-400 font-medium">Stack:</span>
                      {service.technologies.map((tech, tIdx) => (
                        <React.Fragment key={tech}>
                          <span className="text-neutral-300 font-medium">{tech}</span>
                          {tIdx < service.technologies.length - 1 && (
                            <span className="text-neutral-600" aria-hidden="true">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="mt-8 pt-4">
                  <button
                    type="button"
                    onClick={() => onSelectService(service)}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold text-white bg-neutral-900 hover:bg-emerald-600 border border-neutral-700/80 hover:border-emerald-500 rounded-xl transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                  >
                    <span>Discuss Your Project</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
