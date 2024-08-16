"use client"

import { useState, useEffect } from 'react';
import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { columns } from "@/components/tables/lost-items/columns";
import { DataTable } from "@/components/DataTable";
import { LostItem, lostItemService } from '@/services';

export default function LostItemsPage() {
  const [data, setData] = useState<LostItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await lostItemService.list();
        console.log("Fetched items:", items); // Debug log
        if (Array.isArray(items)) {
          setData(items);
        } else {
          throw new Error("Fetched data is not an array");
        }
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err); // Debug log
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ContentLayout title="Lost Items">
      <div className="space-y-6">
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

        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Lost Items {data && `(${data.length})`}</h2>
          <Button asChild>
            <Link href="/lost-items/report">
              <Plus className="w-4 h-4 mr-2" />
              Report Lost Item
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-2">Loading lost items...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">
            <p>Failed to load lost items: {error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Retry
            </Button>
          </div>
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </div>
    </ContentLayout>
  );
}