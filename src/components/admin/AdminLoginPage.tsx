import React, { useState, useEffect } from 'react';
import { useAuth, ADMIN_EMAIL } from '../../lib/auth';
import { useRouter } from '../../lib/router';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  Loader2, 
  AlertCircle, 
  ShieldCheck, 
  ArrowLeft,
  Database
} from 'lucide-react';
import { SUPABASE_PROJECT_ID } from '../../lib/supabase';

export const AdminLoginPage: React.FC = () => {
  const { login, isAdmin, loading } = useAuth();
  const { navigate } = useRouter();

  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already authenticated as admin, redirect directly to /admin
  useEffect(() => {
    if (!loading && isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Please provide your admin email address.');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setSubmitting(true);
    const result = await login(email, password);
    setSubmitting(false);

    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.error || 'Failed to sign in. Please verify your credentials.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121314] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121314] flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-4 text-neutral-100 selection:bg-emerald-500/25 selection:text-emerald-300">
      
      {/* Top back navigation */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portfolio</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        
        {/* Brand Header */}
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Admin Login
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400">
            Sign in with your verified Supabase owner credentials to access the portfolio message inbox.
          </p>
        </div>

        {/* Login Card */}
        <div className="mt-8 bg-[#18191b] border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-start gap-2.5 animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="leading-relaxed">{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email Field */}
            <div>
              <label 
                htmlFor="admin-email" 
                className="block text-xs font-semibold text-neutral-300 mb-1.5"
              >
                Owner Email Address
              </label>
              <div className="relative">
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="samiakram583@gmail.com"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 text-sm text-white placeholder-neutral-500 transition-colors"
                />
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <p className="mt-1 text-[11px] text-neutral-500">
                Only the site owner account ({ADMIN_EMAIL}) is authorized.
              </p>
            </div>

            {/* Password Field */}
            <div>
              <label 
                htmlFor="admin-password" 
                className="block text-xs font-semibold text-neutral-300 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Supabase Auth password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 text-sm text-white placeholder-neutral-500 transition-colors"
                />
                <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 p-1 rounded transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 disabled:opacity-60 transition-colors shadow-md shadow-emerald-950/40 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Authenticating with Supabase...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Sign In to Admin Dashboard</span>
                  </>
                )}
              </button>
            </div>

          </form>

          {/* Secure Backend Footer Note */}
          <div className="mt-6 pt-5 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
            <span className="flex items-center gap-1.5">
              <Database className="w-3 h-3 text-emerald-400" />
              <span>Supabase Auth</span>
            </span>
            <span className="text-neutral-400">{SUPABASE_PROJECT_ID}</span>
          </div>

        </div>

      </div>

    </div>
  );
};
