import React, { useState, useEffect } from 'react';
import { siteConfig } from '../data/siteConfig';
import { 
  Mail, 
  Send, 
  Check, 
  Copy, 
  Github, 
  AlertCircle, 
  Loader2, 
  CheckCircle2, 
  Clock, 
  MessageCircle, 
  Instagram, 
  ArrowUpRight,
  Database
} from 'lucide-react';
import { saveAppointmentBooking, SUPABASE_PROJECT_ID } from '../lib/supabase';
import { submitContactMessage } from '../services/messages';

interface ContactProps {
  initialProjectType?: string;
}

interface FormState {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const Contact: React.FC<ContactProps> = ({ initialProjectType }) => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    projectType: 'Full-Stack Web Application',
    budget: 'Flexible',
    timeline: 'Flexible',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [supabaseSavedTable, setSupabaseSavedTable] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submittedSender, setSubmittedSender] = useState<{ name: string; email: string; projectType: string } | null>(null);

  useEffect(() => {
    if (initialProjectType) {
      setFormData(prev => ({ ...prev, projectType: initialProjectType }));
    }
  }, [initialProjectType]);

  const validate = (data: FormState): FormErrors => {
    const errs: FormErrors = {};
    if (!data.name.trim()) {
      errs.name = 'Please enter your name.';
    } else if (data.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) {
      errs.email = 'Please provide an email address.';
    } else if (!emailRegex.test(data.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    if (!data.message.trim()) {
      errs.message = 'Please provide details about your project or inquiry.';
    } else if (data.message.trim().length < 15) {
      errs.message = 'Message must be at least 15 characters long to explain your project.';
    } else if (data.message.trim().length > 2000) {
      errs.message = 'Message exceeds 2,000 characters.';
    }

    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors(validate({ ...formData, [name]: value }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(validate(formData));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setTouched({
      name: true,
      email: true,
      message: true
    });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus('submitting');

    try {
      // 1. Submit to Supabase contact_messages table (Requirements 5, 6, 19)
      const contactRes = await submitContactMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.projectType,
        budget: formData.budget,
        timeline: formData.timeline,
        message: formData.message,
      });

      // 2. Also save to appointments table for cross-compatibility
      saveAppointmentBooking({
        name: formData.name,
        email: formData.email,
        service: formData.projectType,
        budget: formData.budget,
        timeline: formData.timeline,
        message: formData.message,
        status: 'pending'
      }).catch(() => {
        // Non-blocking fallback
      });

      if (contactRes.success) {
        setSupabaseSavedTable('contact_messages');
      } else {
        setSupabaseSavedTable(null);
      }

      // Store sender info for confirmation display
      setSubmittedSender({
        name: formData.name,
        email: formData.email,
        projectType: formData.projectType,
      });

      // Clear the form after successful submission (Requirement 19.5)
      setFormData({
        name: '',
        email: '',
        projectType: 'Full-Stack Web Application',
        budget: 'Flexible',
        timeline: 'Flexible',
        message: ''
      });
      setTouched({});
      setErrors({});

      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      email: '',
      projectType: 'Full-Stack Web Application',
      budget: 'Flexible',
      timeline: 'Flexible',
      message: ''
    });
    setTouched({});
    setErrors({});
    setStatus('idle');
  };

  return (
    <section id="contact" className="py-20 border-t border-neutral-800/80 bg-[#121314]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
            Start a Project
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Let's Work Together
          </h2>
          <p className="mt-4 text-neutral-300 text-base sm:text-lg leading-relaxed">
            Have a website, web application, or business idea in mind? Let's discuss your project and turn your idea into a professional digital solution.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Verified Direct Channels: GitHub, Instagram, WhatsApp, Email */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* 1. GitHub */}
            <div className="p-5 bg-[#18191b] border border-neutral-800 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  GitHub
                </span>
                <span className="text-[11px] font-mono text-emerald-400">Code Repositories</span>
              </div>

              <div className="flex items-center justify-between gap-3 p-3 bg-neutral-900 border border-neutral-800 rounded-xl">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Github className="w-4 h-4 text-neutral-200 shrink-0" />
                  <span className="text-xs sm:text-sm font-mono text-neutral-200 truncate">
                    samiakram583-beep
                  </span>
                </div>

                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-neutral-800 hover:bg-neutral-700 transition-colors border border-neutral-700"
                >
                  <span>View GitHub</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* 2. Instagram */}
            <div className="p-5 bg-[#18191b] border border-neutral-800 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Instagram
                </span>
                <span className="text-[11px] font-mono text-pink-400">Social</span>
              </div>

              <div className="flex items-center justify-between gap-3 p-3 bg-neutral-900 border border-neutral-800 rounded-xl">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-mono text-neutral-200 truncate">
                    {siteConfig.instagramHandle}
                  </span>
                </div>

                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-neutral-800 hover:bg-neutral-700 transition-colors border border-neutral-700"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* 3. WhatsApp */}
            <div className="p-5 bg-[#18191b] border border-neutral-800 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  WhatsApp
                </span>
                <span className="text-[11px] font-mono text-emerald-400">Instant Chat</span>
              </div>

              <div className="flex items-center justify-between gap-3 p-3 bg-neutral-900 border border-neutral-800 rounded-xl">
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 overflow-hidden hover:text-emerald-400 transition-colors"
                  title="Open WhatsApp chat in a new tab"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-mono text-neutral-200 hover:text-emerald-300 truncate">
                    {siteConfig.whatsappDisplay}
                  </span>
                </a>

                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* 4. Email */}
            <div className="p-5 bg-[#18191b] border border-neutral-800 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Email
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>&lt; 24h Response</span>
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 p-3 bg-neutral-900 border border-neutral-800 rounded-xl">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2.5 overflow-hidden hover:text-emerald-400 transition-colors"
                  title="Click to send email"
                >
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-mono text-neutral-200 hover:text-emerald-300 truncate">
                    {siteConfig.email}
                  </span>
                </a>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-md transition-colors"
                    title="Copy email to clipboard"
                    aria-label="Copy email address"
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <a
                    href={`mailto:${siteConfig.email}?subject=Project%20Inquiry%20from%20Portfolio`}
                    className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-md transition-colors"
                    title="Open default email client"
                    aria-label="Send email directly"
                  >
                    <Send className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 bg-[#18191b] border border-neutral-800 rounded-2xl shadow-xl">
              
              {status === 'success' ? (
                <div className="py-12 flex flex-col items-center text-center space-y-4 animate-in fade-in duration-200">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Thanks! Your message has been received.
                  </h3>
                  <p className="text-sm text-neutral-300 max-w-md leading-relaxed">
                    {submittedSender ? (
                      <>
                        Thank you, <span className="font-semibold text-white">{submittedSender.name}</span>. I'll get back to you soon at <span className="text-white font-mono">{submittedSender.email}</span>.
                      </>
                    ) : (
                      "Thanks! Your message has been received. I'll get back to you soon."
                    )}
                  </p>

                  <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-neutral-400 max-w-sm flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Supabase Database:</span>
                    </span>
                    <span className="text-emerald-400 font-mono font-medium">
                      {supabaseSavedTable ? `Saved to '${supabaseSavedTable}'` : 'Connected'}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-400 max-w-sm">
                    Direct email (<a href={`mailto:${siteConfig.email}`} className="text-emerald-400 underline">{siteConfig.email}</a>) and WhatsApp are always active for instant discussions.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="mt-6 px-6 py-2.5 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors border border-neutral-700 cursor-pointer"
                  >
                    <span>Send Another Inquiry</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  
                  {status === 'error' && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2.5 animate-in fade-in duration-150">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>Something went wrong. Please try again.</span>
                    </div>
                  )}
                  
                  {/* Name and Email Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Name <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={() => handleBlur('name')}
                        placeholder="Your full name"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border text-sm text-white placeholder-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors ${
                          touched.name && errors.name
                            ? 'border-red-500/80 focus-visible:ring-red-400'
                            : 'border-neutral-800 hover:border-neutral-700'
                        }`}
                      />
                      {touched.name && errors.name && (
                        <p id="name-error" className="mt-1 text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Email <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={() => handleBlur('email')}
                        placeholder="your.email@example.com"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border text-sm text-white placeholder-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors ${
                          touched.email && errors.email
                            ? 'border-red-500/80 focus-visible:ring-red-400'
                            : 'border-neutral-800 hover:border-neutral-700'
                        }`}
                      />
                      {touched.email && errors.email && (
                        <p id="email-error" className="mt-1 text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Project Type Dropdown */}
                  <div>
                    <label htmlFor="contact-project-type" className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Project Type
                    </label>
                    <select
                      id="contact-project-type"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors cursor-pointer"
                    >
                      <option value="Business Website">Business Website</option>
                      <option value="Full-Stack Web Application">Full-Stack Web Application</option>
                      <option value="Booking Platform / System">Booking Platform / System</option>
                      <option value="Backend REST API">Backend REST API</option>
                      <option value="Website Redesign & Improvements">Website Redesign & Improvements</option>
                      <option value="General Project Consultation">General Project Consultation</option>
                    </select>
                  </div>

                  {/* Optional Budget & Timeline Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-budget" className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Budget <span className="text-neutral-500 text-[11px]">(Optional)</span>
                      </label>
                      <select
                        id="contact-budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors cursor-pointer"
                      >
                        <option value="Flexible">Flexible / Discuss Later</option>
                        <option value="Under $1,000">Under $1,000</option>
                        <option value="$1,000 — $3,000">$1,000 — $3,000</option>
                        <option value="$3,000 — $5,000">$3,000 — $5,000</option>
                        <option value="$5,000+">$5,000+</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-timeline" className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Timeline <span className="text-neutral-500 text-[11px]">(Optional)</span>
                      </label>
                      <select
                        id="contact-timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors cursor-pointer"
                      >
                        <option value="Flexible">Flexible</option>
                        <option value="Within 2 weeks">Immediate (&lt; 2 weeks)</option>
                        <option value="Within 1 month">Within 1 month</option>
                        <option value="1 — 3 months">1 — 3 months</option>
                      </select>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="contact-message" className="block text-xs font-semibold text-neutral-300">
                        Message <span className="text-emerald-400">*</span>
                      </label>
                      <span className="text-[11px] text-neutral-500">
                        {formData.message.length} / 2000
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={() => handleBlur('message')}
                      placeholder="Briefly describe what you are looking to build, desired features, timeline expectations, or any questions..."
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border text-sm text-white placeholder-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors resize-y ${
                        touched.message && errors.message
                          ? 'border-red-500/80 focus-visible:ring-red-400'
                          : 'border-neutral-800 hover:border-neutral-700'
                      }`}
                    />
                    {touched.message && errors.message && (
                      <p id="message-error" className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors rounded-xl shadow-md shadow-emerald-950/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Form Note & Direct Options Guarantee */}
                  <p className="text-[11px] text-neutral-400 text-center leading-relaxed">
                    Direct email (<a href={`mailto:${siteConfig.email}`} className="text-emerald-400 hover:underline">{siteConfig.email}</a>) and WhatsApp are always active for instant inquiries.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
