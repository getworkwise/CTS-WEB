'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { LostItemForm } from "@/components/lost-items/LostItemForm";
import { lostItemService } from '@/services';
import toast, { Toaster } from 'react-hot-toast';

export default function ReportLostItemPage() {
  const router = useRouter();

  const handleSubmit = async (formData: any) => {
    try {
      await lostItemService.create(formData);
      toast.success('Lost item reported successfully!');
      router.push('/lost-items');
    } catch (error) {
      console.error('Error reporting lost item:', error);
      toast.error('Failed to report lost item. Please try again.');
    }
  };

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

      <Toaster />
    </ContentLayout>
  );
}