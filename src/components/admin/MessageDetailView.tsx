import React, { useState, useEffect } from 'react';
import { useRouter } from '../../lib/router';
import { 
  fetchContactMessageById, 
  updateMessageReadStatus, 
  deleteContactMessage, 
  ContactMessage 
} from '../../services/messages';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Calendar, 
  Clock, 
  Trash2, 
  CheckCircle2, 
  MessageCircle, 
  Loader2, 
  AlertCircle,
  ExternalLink,
  DollarSign,
  Send
} from 'lucide-react';

interface MessageDetailViewProps {
  id: string;
}

export const MessageDetailView: React.FC<MessageDetailViewProps> = ({ id }) => {
  const { navigate } = useRouter();
  const [message, setMessage] = useState<ContactMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadMessage = async () => {
      setLoading(true);
      setError(null);
      const res = await fetchContactMessageById(id);
      
      if (!isMounted) return;

      if (res.message) {
        setMessage(res.message);

        // Automatically mark as read if currently unread (Requirement 13)
        if (!res.message.is_read) {
          updateMessageReadStatus(id, true).then((statusRes) => {
            if (statusRes.success && isMounted) {
              setMessage(prev => prev ? { ...prev, is_read: true } : null);
            }
          });
        }
      } else {
        setError(res.error || 'Message not found or may have been deleted.');
      }
      setLoading(false);
    };

    loadMessage();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleToggleReadStatus = async () => {
    if (!message) return;
    setUpdatingStatus(true);
    const newStatus = !message.is_read;
    const res = await updateMessageReadStatus(message.id, newStatus);
    setUpdatingStatus(false);

    if (res.success) {
      setMessage(prev => prev ? { ...prev, is_read: newStatus } : null);
    }
  };

  const handleDelete = async () => {
    if (!message) return;
    setDeleting(true);
    const res = await deleteContactMessage(message.id);
    setDeleting(false);

    if (res.success) {
      setDeleteModalOpen(false);
      navigate('/admin/messages');
    } else {
      setError(res.error || 'Failed to delete message.');
    }
  };

  const formatDate = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      });
    } catch {
      return isoStr;
    }
  };

  // Generate clean WhatsApp link if phone is provided
  const getWhatsAppLink = (rawPhone: string) => {
    const cleaned = rawPhone.replace(/[^\d]/g, '');
    return `https://wa.me/${cleaned}`;
  };

  if (loading) {
    return (
      <div className="p-16 text-center text-neutral-500 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
        <span className="text-xs font-mono">Loading message details...</span>
      </div>
    );
  }

  if (error || !message) {
    return (
      <div className="bg-[#18191b] border border-neutral-800 rounded-2xl p-8 text-center space-y-4 max-w-lg mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-white">Message Unavailable</h2>
        <p className="text-xs text-neutral-400 leading-relaxed">
          {error || 'The requested message could not be loaded.'}
        </p>
        <button
          type="button"
          onClick={() => navigate('/admin/messages')}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Messages</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-150">
      
      {/* Top Navigation & Action Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => navigate('/admin/messages')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Messages</span>
        </button>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Mark Read/Unread Button */}
          <button
            type="button"
            onClick={handleToggleReadStatus}
            disabled={updatingStatus}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer border ${
              message.is_read
                ? 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800'
                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
            }`}
          >
            {updatingStatus ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <CheckCircle2 className="w-3.5 h-3.5" />
            )}
            <span>{message.is_read ? 'Mark as Unread' : 'Mark as Read'}</span>
          </button>

          {/* Delete Button */}
          <button
            type="button"
            onClick={() => setDeleteModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Message Header Card */}
      <div className="bg-[#18191b] border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        
        {/* Subject & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Subject
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                message.is_read ? 'bg-neutral-800 text-neutral-400' : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                {message.is_read ? 'Read' : 'Unread'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {message.subject || 'General Inquiry'}
            </h1>
          </div>

          <div className="text-xs text-neutral-400 font-mono flex items-center gap-1.5 shrink-0">
            <Clock className="w-3.5 h-3.5 text-neutral-500" />
            <span>{formatDate(message.created_at)}</span>
          </div>
        </div>

        {/* Sender Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5 bg-neutral-900/80 rounded-xl border border-neutral-800 text-xs">
          
          {/* Sender Name */}
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
              Client Name
            </span>
            <div className="text-sm font-bold text-white">
              {message.name}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
              Email Address
            </span>
            <div>
              <a
                href={`mailto:${message.email}`}
                className="text-emerald-400 hover:underline font-mono truncate block"
              >
                {message.email}
              </a>
            </div>
          </div>

          {/* Phone / WhatsApp */}
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
              Phone / WhatsApp
            </span>
            <div className="font-mono text-neutral-200">
              {message.phone || 'Not provided'}
            </div>
          </div>

          {/* Optional Budget */}
          {message.budget && (
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                Budget
              </span>
              <div className="text-neutral-200 font-mono">
                {message.budget}
              </div>
            </div>
          )}

          {/* Optional Timeline */}
          {message.timeline && (
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                Timeline
              </span>
              <div className="text-neutral-200 font-mono">
                {message.timeline}
              </div>
            </div>
          )}

        </div>

        {/* Message Body */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            Message
          </h3>
          <div className="p-6 rounded-xl bg-neutral-900/50 border border-neutral-800 text-sm sm:text-base text-neutral-200 leading-relaxed whitespace-pre-wrap selection:bg-emerald-500/25 selection:text-emerald-300">
            {message.message}
          </div>
        </div>

        {/* Quick Reply Actions */}
        <div className="pt-6 border-t border-neutral-800 flex flex-wrap items-center gap-3">
          
          {/* Reply via Email */}
          <a
            href={`mailto:${message.email}?subject=Re:%20${encodeURIComponent(message.subject || 'Portfolio Inquiry')}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 transition-colors shadow-sm"
          >
            <Mail className="w-4 h-4" />
            <span>Reply by Email</span>
          </a>

          {/* Reply on WhatsApp (if phone provided) */}
          {message.phone ? (
            <a
              href={getWhatsAppLink(message.phone)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 transition-colors border border-emerald-600/60"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Reply on WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : null}

        </div>

      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        loading={deleting}
        messageSender={message.name}
      />

    </div>
  );
};
