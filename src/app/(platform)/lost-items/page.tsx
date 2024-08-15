'use client';

import { useState } from 'react';
import Link from "next/link";
import useSWR from 'swr';
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { lostItemService, LostItem } from '@/services';
import { RefreshCcw } from 'lucide-react';

const fetcher = async () => {
  const response = await lostItemService.list();
  return response.items;
};

export default function LostItemsPage() {
  const { data: lostItems, error, isLoading, mutate } = useSWR<LostItem[]>('lostItems', fetcher);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await mutate();
    setIsRefreshing(false);
  };

  return (
    <ContentLayout title="Lost Items">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Lost Items</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Lost Items</h2>
        <div className="space-x-2">
          <Button onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCcw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button asChild>
            <Link href="/lost-items/report">Report Lost Item</Link>
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="mt-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2">Loading lost items...</p>
        </div>
      ) : error ? (
        <div className="mt-6 text-center text-red-500">
          <p>Failed to load lost items. Please try again later.</p>
          <Button onClick={() => mutate()} className="mt-2">
            Retry
          </Button>
        </div>
      ) : (
        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date Lost</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lostItems && lostItems.length > 0 ? (
              lostItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{new Date(item.date_lost).toLocaleDateString()}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No lost items found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </ContentLayout>
  );
}