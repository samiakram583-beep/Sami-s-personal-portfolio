import React from 'react';
import { useRouter } from '../../lib/router';
import { AdminLoginPage } from './AdminLoginPage';
import { AdminLayout } from './AdminLayout';
import { DashboardView } from './DashboardView';
import { MessagesListView } from './MessagesListView';
import { MessageDetailView } from './MessageDetailView';

export const AdminApp: React.FC = () => {
  const { path, params } = useRouter();

  if (path === '/admin/login' || path === '/admin/login/') {
    return <AdminLoginPage />;
  }

  if (path === '/admin/messages' || path === '/admin/messages/') {
    return (
      <AdminLayout activeTab="messages">
        <MessagesListView />
      </AdminLayout>
    );
  }

  if (path.startsWith('/admin/messages/') && params.id) {
    return (
      <AdminLayout activeTab="messages">
        <MessageDetailView id={params.id} />
      </AdminLayout>
    );
  }

  // Default to Dashboard for /admin or any nested admin route
  return (
    <AdminLayout activeTab="dashboard">
      <DashboardView />
    </AdminLayout>
  );
};
