'use client';

import { withAuth } from '@/components/withAuth';
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";

function PlatformLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}

export default withAuth(PlatformLayout);