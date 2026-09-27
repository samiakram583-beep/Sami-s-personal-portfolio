import React from 'react';
import { siteConfig } from '../data/siteConfig';
import { useRouter } from '../lib/router';
import { 
  Github, 
  Mail, 
  ArrowUp, 
  MessageCircle, 
  Instagram 
} from 'lucide-react';

interface FooterProps {
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume }) => {
  const { navigate } = useRouter();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-[#0e0f10] border-t border-neutral-800/80 text-neutral-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-800/80">
          
          {/* Brand & Positioning */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-lg font-bold text-white tracking-tight">{siteConfig.name}</span>
            </div>
            
            <p className="text-sm font-semibold text-emerald-400">
              {siteConfig.role}
            </p>

            <p className="text-xs sm:text-sm text-neutral-400 max-w-md leading-relaxed">
              Building modern websites, web applications, and backend APIs that solve real business problems.
            </p>

            {/* Contact & Social Links (Order: GitHub, Instagram, WhatsApp, Email) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
                title="GitHub Profile"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4 text-neutral-300" />
              </a>

              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
                title="Follow on Instagram"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
              </a>

              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
                title="Chat on WhatsApp"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
                className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
                title="Send an Email"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
              </a>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Navigation
            </div>
            <ul className="space-y-2 text-xs sm:text-sm">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources & Contact Actions */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Contact & Resume
            </div>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  type="button"
                  onClick={onOpenResume}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Curriculum Vitae / Resume
                </button>
              </li>
              <li>
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  WhatsApp ({siteConfig.whatsappDisplay})
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Email ({siteConfig.email})
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Instagram ({siteConfig.instagramHandle})
                </a>
              </li>
            </ul>

            <div className="pt-4">
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-neutral-300 bg-neutral-900 hover:bg-neutral-800 rounded-lg border border-neutral-800 transition-colors"
              >
                <ArrowUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>Back to top</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Legal / Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © 2026 {siteConfig.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono text-neutral-500">
            <span>Built with React 19 · TypeScript · Tailwind CSS</span>
            <span className="text-neutral-700">•</span>
            {/* Subtle Admin Entry for Desktop & Mobile Footer (Requirement 1) */}
            <button
              type="button"
              onClick={() => navigate('/admin/login')}
              className="text-neutral-500 hover:text-neutral-300 transition-colors text-xs font-sans cursor-pointer underline-offset-4 hover:underline"
              title="Website Owner Admin Portal"
            >
              Admin
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
