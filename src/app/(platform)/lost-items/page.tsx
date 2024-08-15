'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { lostItemService } from '@/services';

interface LostItem {
  id: string;
  title: string;
  dateLost: string;
  location: string;
  status: string;
}

export default function LostItemsPage() {
  const [lostItems, setLostItems] = useState<LostItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        setIsLoading(true);
        const response = await lostItemService.list();
        setLostItems(response.items);
      } catch (err) {
        console.error('Error fetching lost items:', err);
        setError('Failed to load lost items. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLostItems();
  }, []);

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
        <Button asChild>
          <Link href="/lost-items/report">Report Lost Item</Link>
        </Button>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
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
            {lostItems.length > 0 ? (
              lostItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{new Date(item.dateLost).toLocaleDateString()}</TableCell>
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
