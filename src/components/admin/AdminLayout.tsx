import React, { useState, useEffect, ReactNode } from 'react';
import { useAuth, ADMIN_EMAIL } from '../../lib/auth';
import { useRouter } from '../../lib/router';
import { 
  LayoutDashboard, 
  MessageSquare, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X, 
  ShieldCheck, 
  Loader2,
  Database
} from 'lucide-react';
import { fetchDashboardStats } from '../../services/messages';
import { SUPABASE_PROJECT_ID } from '../../lib/supabase';

interface AdminLayoutProps {
  children: ReactNode;
  activeTab: 'dashboard' | 'messages';
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeTab }) => {
  const { isAdmin, loading, logout, user } = useAuth();
  const { navigate, path } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  // Protected route guard: Redirect unauthenticated visitors to /admin/login
  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, loading, navigate]);

  // Load unread count badge
  useEffect(() => {
    if (isAdmin) {
      fetchDashboardStats().then(({ stats }) => {
        setUnreadCount(stats.unread);
      });
    }
  }, [isAdmin, path]);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121314] flex flex-col items-center justify-center text-neutral-400 gap-3">
        <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
        <span className="text-xs font-mono">Verifying admin session...</span>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-[#121314] text-neutral-100 flex flex-col font-sans">
      
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#161719]/95 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Left brand & welcome */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="flex items-center gap-2.5 text-left cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:border-emerald-500/40 transition-colors">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold tracking-wider uppercase text-emerald-400">
                      ADMIN DASHBOARD
                    </span>
                    <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono bg-neutral-800 text-neutral-400">
                      Secure
                    </span>
                  </div>
                  <div className="text-xs text-neutral-300 font-medium">
                    Welcome back, <strong className="text-white">Sami</strong>
                  </div>
                </div>
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl transition-colors cursor-pointer ${
                  activeTab === 'dashboard'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/admin/messages')}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl transition-colors cursor-pointer ${
                  activeTab === 'messages'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Messages</span>
                {unreadCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500 text-black">
                    {unreadCount}
                  </span>
                )}
              </button>

              <div className="h-4 w-px bg-neutral-800 mx-2" />

              <button
                type="button"
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800/60 transition-colors cursor-pointer"
                title="View live public portfolio"
              >
                <span>Live Portfolio</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer"
                title="Sign out of admin"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </nav>

            {/* Mobile menu trigger */}
            <div className="md:hidden flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-800 bg-[#18191b] px-4 pt-3 pb-4 space-y-1.5 animate-in slide-in-from-top-2 duration-150">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/admin');
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                activeTab === 'dashboard'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'text-neutral-300 hover:bg-neutral-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/admin/messages');
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                activeTab === 'messages'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'text-neutral-300 hover:bg-neutral-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4" />
                <span>Messages</span>
              </div>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500 text-black">
                  {unreadCount} unread
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/');
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-neutral-300 hover:bg-neutral-800"
            >
              <div className="flex items-center gap-2.5">
                <ExternalLink className="w-4 h-4" />
                <span>View Live Site</span>
              </div>
            </button>

            <div className="pt-2 border-t border-neutral-800/80">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout ({user?.email})</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Admin Footer */}
      <footer className="border-t border-neutral-800/80 py-4 bg-[#141517] text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sami-Ullah-Akram Portfolio Administration</span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span className="flex items-center gap-1">
              <Database className="w-3 h-3 text-emerald-400" />
              <span>Supabase {SUPABASE_PROJECT_ID}</span>
            </span>
            <span>•</span>
            <span>RLS Protected</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
