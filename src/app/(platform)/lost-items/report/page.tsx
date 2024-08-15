'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { LostItemForm } from "@/components/lost-items/LostItemForm";
import { authService, reportLostItem } from '@/services';
import toast, { Toaster } from 'react-hot-toast';

export default function ReportLostItemPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await authService.isAuthenticated();
      setIsAuthenticated(auth);
      if (!auth) {
        toast.error('You must be logged in to report a lost item.');
        router.push('/login');
      } else {
        const user = await authService.getCurrentUser();
        if (user) {
          setUserId(user.id);
        }
      }
    };

    checkAuth();
  }, [router]);

  const handleSubmit = async (formData: any) => {
    if (!isAuthenticated || !userId) {
      toast.error('You must be logged in to report a lost item.');
      return;
    }

    const toastId = toast.loading('Reporting lost item...');
    try {
      console.log('Submitting form data:', formData);
      const { 
        is_official_document, 
        document_type, 
        document_number, 
        issuing_authority,
        issue_date,
        expiry_date,
        ...lostItemData 
      } = formData;
      
      const result = await reportLostItem(
        lostItemData, 
        userId, 
        is_official_document,
        is_official_document ? { document_type, document_number, issuing_authority, issue_date, expiry_date } : undefined
      );
      
      console.log('Created lost item:', result);
      toast.success('Lost item reported successfully!', { id: toastId, duration: 3000 });
      
      // Delay redirection to allow toast to be seen
      setTimeout(() => {
        router.push('/lost-items');
      }, 3000);
    } catch (error) {
      console.error('Error reporting lost item:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      toast.error(`Failed to report lost item: ${error instanceof Error ? error.message : 'Unknown error'}`, { id: toastId, duration: 5000 });
    }
  };

  if (!isAuthenticated) {
    return <div>Checking authentication...</div>;
  }

  return (
    <ContentLayout title="Report Lost Item">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/lost-items">Lost Items</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Report</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-6">
        <LostItemForm onSubmit={handleSubmit} />
      </div>

      <Toaster 
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
        }}
      />
    </ContentLayout>
  );
}