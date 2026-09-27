import React, { useState, useEffect } from 'react';
import { useRouter } from '../../lib/router';
import { 
  fetchDashboardStats, 
  fetchContactMessages, 
  ContactMessage, 
  DashboardStats 
} from '../../services/messages';
import { 
  Inbox, 
  Mail, 
  Calendar, 
  ArrowRight, 
  Loader2, 
  CheckCircle2, 
  Clock, 
  Database, 
  Copy, 
  Check, 
  ExternalLink,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { SUPABASE_PROJECT_ID } from '../../lib/supabase';

const CONTACT_MESSAGES_SQL = `-- Run in Supabase SQL Editor (https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql)
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    budget TEXT,
    timeline TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    is_read BOOLEAN DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON public.contact_messages (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_is_read ON public.contact_messages (is_read);

-- Enable Row Level Security (RLS)
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 1. Public visitors can INSERT messages
CREATE POLICY "Allow public insert" ON public.contact_messages
    FOR INSERT WITH CHECK (true);

-- 2. Authenticated admin users can SELECT, UPDATE, DELETE messages
CREATE POLICY "Allow authenticated read" ON public.contact_messages
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated update" ON public.contact_messages
    FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete" ON public.contact_messages
    FOR DELETE TO authenticated USING (true);`;

export const DashboardView: React.FC = () => {
  const { navigate } = useRouter();
  const [stats, setStats] = useState<DashboardStats>({ total: 0, unread: 0, thisMonth: 0 });
  const [recentMessages, setRecentMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [tableMissing, setTableMissing] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const [statsRes, messagesRes] = await Promise.all([
      fetchDashboardStats(),
      fetchContactMessages(),
    ]);

    setStats(statsRes.stats);
    setRecentMessages(messagesRes.messages.slice(0, 5));
    if (messagesRes.isTableMissing) {
      setTableMissing(true);
    } else {
      setTableMissing(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(CONTACT_MESSAGES_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  const formatDate = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      });
    } catch {
      return isoStr;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      
      {/* Top Banner & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Overview & Statistics
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Real-time client inquiries and messages received through your portfolio contact form.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing || loading}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/admin/messages')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-colors shadow-sm cursor-pointer"
          >
            <span>All Messages</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Supabase SQL Setup Banner (if table is not yet created in Supabase) */}
      {tableMissing && (
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-neutral-200 space-y-3">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-white">
                Supabase 'contact_messages' Table Needed
              </h3>
              <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                Your database is connected to project <code className="text-emerald-400 font-mono">{SUPABASE_PROJECT_ID}</code>. To store messages securely, run this SQL script in your Supabase SQL Editor:
              </p>
            </div>
          </div>

          <div className="relative bg-[#101112] border border-neutral-800 rounded-xl p-3 text-[11px] font-mono text-neutral-300 overflow-x-auto">
            <button
              type="button"
              onClick={handleCopySql}
              className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-md transition-colors"
            >
              {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSql ? 'Copied' : 'Copy SQL'}</span>
            </button>
            <pre>{CONTACT_MESSAGES_SQL}</pre>
          </div>

          <div className="flex items-center justify-between pt-1">
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
              onClick={handleRefresh}
              className="text-xs font-semibold px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors"
            >
              Check Again
            </button>
          </div>
        </div>
      )}

      {/* Requirement 14: Top Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        
        {/* Card 1: Total Messages */}
        <div className="p-6 bg-[#18191b] border border-neutral-800 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Total Messages
            </span>
            <div className="w-9 h-9 rounded-xl bg-neutral-800/80 border border-neutral-700/80 text-neutral-300 flex items-center justify-center">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            {loading ? (
              <Loader2 className="w-6 h-6 text-neutral-500 animate-spin" />
            ) : (
              <div className="text-3xl font-extrabold text-white tracking-tight">
                {stats.total}
              </div>
            )}
            <p className="mt-1 text-xs text-neutral-500">
              Lifetime contact submissions
            </p>
          </div>
        </div>

        {/* Card 2: Unread Messages */}
        <div className="p-6 bg-[#18191b] border border-neutral-800 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Unread
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            {loading ? (
              <Loader2 className="w-6 h-6 text-neutral-500 animate-spin" />
            ) : (
              <div className="text-3xl font-extrabold text-emerald-400 tracking-tight">
                {stats.unread}
              </div>
            )}
            <p className="mt-1 text-xs text-neutral-500">
              Awaiting your response
            </p>
          </div>
        </div>

        {/* Card 3: This Month */}
        <div className="p-6 bg-[#18191b] border border-neutral-800 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              This Month
            </span>
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            {loading ? (
              <Loader2 className="w-6 h-6 text-neutral-500 animate-spin" />
            ) : (
              <div className="text-3xl font-extrabold text-cyan-400 tracking-tight">
                {stats.thisMonth}
              </div>
            )}
            <p className="mt-1 text-xs text-neutral-500">
              Received in current month
            </p>
          </div>
        </div>

      </div>

      {/* Main Content: Recent Messages */}
      <div className="bg-[#18191b] border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Recent Messages
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Latest inquiries submitted through the portfolio contact form
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/admin/messages')}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1 cursor-pointer"
          >
            <span>View All ({stats.total})</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {loading ? (
          <div className="p-12 text-center text-neutral-500 flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
            <span className="text-xs font-mono">Loading recent messages...</span>
          </div>
        ) : recentMessages.length === 0 ? (
          /* Requirement 15: Empty State */
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-neutral-800/80 border border-neutral-700/80 text-neutral-400 flex items-center justify-center mx-auto">
              <Inbox className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white">
              No client messages yet.
            </h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              Messages submitted through your contact form will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-800/80">
            {recentMessages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => navigate(`/admin/messages/${msg.id}`)}
                className="p-5 hover:bg-neutral-800/40 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2.5">
                    {!msg.is_read ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Unread
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono text-neutral-400 bg-neutral-800">
                        Read
                      </span>
                    )}

                    <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
                      {msg.name}
                    </h4>

                    <span className="text-xs text-neutral-400 truncate">
                      &lt;{msg.email}&gt;
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-neutral-300 truncate">
                    {msg.subject || 'General Inquiry'}
                  </div>

                  <p className="text-xs text-neutral-400 line-clamp-1">
                    {msg.message}
                  </p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1 text-[11px] text-neutral-500 shrink-0 font-mono">
                  <span>{formatDate(msg.created_at)}</span>
                  <span className="text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
