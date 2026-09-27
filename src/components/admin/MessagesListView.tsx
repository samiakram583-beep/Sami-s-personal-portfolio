import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from '../../lib/router';
import { 
  fetchContactMessages, 
  ContactMessage 
} from '../../services/messages';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Inbox, 
  Loader2, 
  Mail, 
  Phone, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

export const MessagesListView: React.FC = () => {
  const { navigate } = useRouter();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const loadMessages = async () => {
    setLoading(true);
    const res = await fetchContactMessages();
    setMessages(res.messages);
    setLoading(false);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    const res = await fetchContactMessages();
    setMessages(res.messages);
    setRefreshing(false);
  };

  // Filter & Search logic
  const filteredMessages = useMemo(() => {
    return messages
      .filter((msg) => {
        // Status filter
        if (statusFilter === 'unread' && msg.is_read) return false;
        if (statusFilter === 'read' && !msg.is_read) return false;

        // Search query
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        const nameMatch = msg.name?.toLowerCase().includes(q);
        const emailMatch = msg.email?.toLowerCase().includes(q);
        const subjectMatch = msg.subject?.toLowerCase().includes(q);
        const messageMatch = msg.message?.toLowerCase().includes(q);
        const phoneMatch = msg.phone?.toLowerCase().includes(q);

        return nameMatch || emailMatch || subjectMatch || messageMatch || phoneMatch;
      })
      .sort((a, b) => {
        const timeA = new Date(a.created_at).getTime();
        const timeB = new Date(b.created_at).getTime();
        return sortOrder === 'newest' ? timeB - timeA : timeA - timeB;
      });
  }, [messages, searchQuery, statusFilter, sortOrder]);

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

  const unreadCount = messages.filter((m) => !m.is_read).length;
  const readCount = messages.filter((m) => m.is_read).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Client Messages
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Browse, search, and manage all portfolio inquiries and project requests.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={refreshing || loading}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Control Bar: Search & Filters */}
      <div className="bg-[#18191b] border border-neutral-800 rounded-2xl p-4 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          
          {/* Requirement 10: Search field */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search messages by name, email, subject, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs sm:text-sm text-white placeholder-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Requirement 11: Filters & Sort */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Filter Buttons */}
            <div className="inline-flex rounded-xl bg-neutral-900 p-1 border border-neutral-800 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  statusFilter === 'all'
                    ? 'bg-neutral-800 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                All ({messages.length})
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter('unread')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  statusFilter === 'unread'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Unread ({unreadCount})
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter('read')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  statusFilter === 'read'
                    ? 'bg-neutral-800 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Read ({readCount})
              </button>
            </div>

            {/* Sort Order Toggle */}
            <button
              type="button"
              onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer"
              title="Toggle sorting order"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
              <span>{sortOrder === 'newest' ? 'Newest' : 'Oldest'}</span>
            </button>

          </div>

        </div>

        {/* Active filtering feedback */}
        {(searchQuery || statusFilter !== 'all') && (
          <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-neutral-800/80">
            <span>
              Showing {filteredMessages.length} of {messages.length} messages
            </span>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
              }}
              className="text-emerald-400 hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Messages List Container */}
      <div className="bg-[#18191b] border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-16 text-center text-neutral-500 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
            <span className="text-xs font-mono">Loading messages from Supabase...</span>
          </div>
        ) : filteredMessages.length === 0 ? (
          /* Empty State */
          <div className="p-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-neutral-800/80 border border-neutral-700/80 text-neutral-400 flex items-center justify-center mx-auto">
              <Inbox className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white">
              {searchQuery || statusFilter !== 'all'
                ? 'No messages match your criteria.'
                : 'No client messages yet.'}
            </h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              {searchQuery || statusFilter !== 'all'
                ? 'Try broadening your search keywords or switching the status filter.'
                : 'Messages submitted through your portfolio contact form will appear here.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-800/80">
            {filteredMessages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => navigate(`/admin/messages/${msg.id}`)}
                className={`p-5 hover:bg-neutral-800/40 transition-colors cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 group ${
                  !msg.is_read ? 'bg-emerald-500/[0.02]' : ''
                }`}
              >
                {/* Left: Sender details & message preview */}
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    {/* Read / Unread Status Badge */}
                    {!msg.is_read ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Unread
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono text-neutral-400 bg-neutral-800">
                        Read
                      </span>
                    )}

                    {/* Sender Name */}
                    <span className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {msg.name}
                    </span>

                    {/* Email */}
                    <span className="text-xs text-neutral-400 font-mono">
                      &lt;{msg.email}&gt;
                    </span>

                    {/* Phone/WhatsApp tag if provided */}
                    {msg.phone && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-300 font-mono">
                        <Phone className="w-3 h-3 text-emerald-400" />
                        <span>{msg.phone}</span>
                      </span>
                    )}
                  </div>

                  {/* Subject */}
                  <div className="text-xs font-semibold text-neutral-200">
                    {msg.subject || 'General Inquiry'}
                  </div>

                  {/* Message Preview */}
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {msg.message}
                  </p>
                </div>

                {/* Right: Timestamp & Action indicator */}
                <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2 text-xs text-neutral-500 shrink-0 font-mono">
                  <span>{formatDate(msg.created_at)}</span>
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-neutral-800 group-hover:bg-emerald-600 transition-colors">
                    <span>View</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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
