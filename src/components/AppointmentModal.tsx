import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Database, 
  Copy, 
  Check, 
  ExternalLink,
  Scissors,
  Sparkles
} from 'lucide-react';
import { 
  saveAppointmentBooking, 
  AppointmentBookingPayload, 
  SUPABASE_PROJECT_ID, 
  APPOINTMENTS_SQL_SCHEMA 
} from '../lib/supabase';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  defaultBarber?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'Haircut & Styling',
  defaultBarber = 'Master Barber (Alex)',
}) => {
  const [formData, setFormData] = useState<AppointmentBookingPayload>({
    name: '',
    email: '',
    phone: '',
    service: defaultService,
    barber_name: defaultBarber,
    appointment_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    appointment_time: '02:00 PM',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'table-missing' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedSql, setCopiedSql] = useState(false);
  const [savedTable, setSavedTable] = useState('appointments');

  useEffect(() => {
    if (defaultService) {
      setFormData(prev => ({ ...prev, service: defaultService }));
    }
    if (defaultBarber) {
      setFormData(prev => ({ ...prev, barber_name: defaultBarber }));
    }
  }, [defaultService, defaultBarber]);

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

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      errs.email = 'Please provide an email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.appointment_date) errs.appointment_date = 'Please pick a date.';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      const result = await saveAppointmentBooking(formData);

      if (result.success) {
        setSavedTable(result.table);
        setStatus('success');
      } else if (result.isTableMissing) {
        setStatus('table-missing');
      } else {
        setErrorMessage(result.error || 'Failed to save appointment to Supabase.');
        setStatus('error');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Unexpected connection error.');
      setStatus('error');
    }
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(APPOINTMENTS_SQL_SCHEMA);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const servicesList = [
    'Haircut & Styling',
    'Beard Trim & Hot Towel Shave',
    'Executive Grooming Package',
    'Full-Stack Project Consultation',
    'Backend API Architecture Review',
    'Business Website Consultation',
  ];

  const timeSlots = [
    '09:00 AM',
    '10:30 AM',
    '12:00 PM',
    '02:00 PM',
    '03:30 PM',
    '05:00 PM',
    '06:30 PM',
  ];

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div
        className="relative w-full max-w-xl bg-[#161719] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#18191b] border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h2 id="booking-modal-title" className="text-base font-bold text-white tracking-tight">
                Book an Appointment
              </h2>
              <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 font-mono">
                <Database className="w-3 h-3 text-emerald-400" />
                <span>Connected to Supabase ({SUPABASE_PROJECT_ID})</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
          
          {/* SUCCESS STATE */}
          {status === 'success' && (
            <div className="py-8 text-center space-y-4 animate-in fade-in duration-200">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Appointment Successfully Saved!
              </h3>
              <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-white">{formData.name}</span>. Your appointment for <span className="text-emerald-400">{formData.service}</span> on <span className="text-white font-mono">{formData.appointment_date} at {formData.appointment_time}</span> has been inserted directly into your Supabase database table (<code className="text-emerald-300 font-mono">{savedTable}</code>).
              </p>
              
              <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-neutral-400 max-w-sm mx-auto flex items-center justify-between">
                <span>Database: <strong className="text-white">{SUPABASE_PROJECT_ID}</strong></span>
                <span className="text-emerald-400 font-mono">✓ Verified</span>
              </div>

              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors border border-neutral-700"
                >
                  Book Another Appointment
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}

          {/* TABLE MISSING STATE (Helps user setup their Supabase table in 5 seconds) */}
          {status === 'table-missing' && (
            <div className="p-5 bg-neutral-900/90 border border-amber-500/40 rounded-2xl space-y-4 animate-in fade-in duration-200">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight">
                    Supabase Connected — Table 'appointments' Needed
                  </h3>
                  <p className="mt-1 text-xs text-neutral-300 leading-relaxed">
                    Your Supabase project (<code className="text-emerald-400 font-mono">{SUPABASE_PROJECT_ID}</code>) is connected via the API key. To store appointments, run this SQL script in your Supabase SQL Editor:
                  </p>
                </div>
              </div>

              <div className="relative bg-[#121314] border border-neutral-800 rounded-xl p-3 text-[11px] font-mono text-neutral-300 overflow-x-auto">
                <button
                  type="button"
                  onClick={handleCopySql}
                  className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-md transition-colors"
                >
                  {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSql ? 'Copied!' : 'Copy SQL'}</span>
                </button>
                <pre>{APPOINTMENTS_SQL_SCHEMA}</pre>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <a
                  href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
                >
                  <span>Open Supabase SQL Editor</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors"
                >
                  Retry Saving
                </button>
              </div>
            </div>
          )}

          {/* BOOKING FORM */}
          {status !== 'success' && status !== 'table-missing' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Select Service
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  {servicesList.map((svc) => (
                    <option key={svc} value={svc}>{svc}</option>
                  ))}
                </select>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Appointment Date <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.appointment_date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, appointment_date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  />
                  {errors.appointment_date && (
                    <p className="mt-1 text-xs text-red-400">{errors.appointment_date}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Preferred Time Slot
                  </label>
                  <select
                    value={formData.appointment_time}
                    onChange={(e) => setFormData({ ...formData, appointment_time: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Full Name <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Email Address <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Phone / WhatsApp <span className="text-neutral-500 text-[11px]">(Optional)</span>
                </label>
                <input
                  type="tel"
                  placeholder="+92 311 1629335"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Special Notes / Preferences <span className="text-neutral-500 text-[11px]">(Optional)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Any specific requests or requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 resize-none"
                />
              </div>

              {/* Error message display */}
              {status === 'error' && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 disabled:opacity-60 transition-colors rounded-xl shadow-md cursor-pointer"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving to Supabase Database...</span>
                    </>
                  ) : (
                    <>
                      <Database className="w-4 h-4" />
                      <span>Confirm & Save to Supabase</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1">
                <span>Backend: Supabase PostgreSQL</span>
                <span className="font-mono text-emerald-400">{SUPABASE_PROJECT_ID}</span>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
