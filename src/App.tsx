/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RouterProvider, useRouter } from './lib/router';
import { AuthProvider } from './lib/auth';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminApp } from './components/admin/AdminApp';
import { ServiceItem } from './data/services';

const AppContent: React.FC = () => {
  const { path } = useRouter();

  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedContactProjectType, setSelectedContactProjectType] = useState<string | undefined>(undefined);

  // If path starts with /admin, render the secure Admin Portal
  if (path.startsWith('/admin')) {
    return <AdminApp />;
  }

  const handleOpenContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (service: ServiceItem) => {
    setSelectedContactProjectType(service.title);
    handleOpenContact();
  };

  const handleDiscussProject = (projectTitle: string) => {
    setSelectedContactProjectType(`Inquiry regarding ${projectTitle}`);
    handleOpenContact();
  };

  return (
    <div className="min-h-screen bg-[#121314] text-neutral-100 flex flex-col font-sans selection:bg-emerald-500/25 selection:text-emerald-300">
      
      {/* Fixed Sticky Navigation */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero 
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenContact={handleOpenContact}
        />

        <About 
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenContact={handleOpenContact}
        />

        <Services onSelectService={handleSelectService} />

        <Skills />

        <Projects 
          onDiscussProject={handleDiscussProject}
        />

        <Experience />

        <Testimonials />

        <Contact initialProjectType={selectedContactProjectType} />
      </main>

      {/* Footer with subtle Admin link */}
      <Footer onOpenResume={() => setIsResumeOpen(true)} />

      {/* Interactive Resume / CV Modal */}
      <ResumeModal 
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Floating WhatsApp Quick Action */}
      <FloatingWhatsApp />

    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </RouterProvider>
  );
}
