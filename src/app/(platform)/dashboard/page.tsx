'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authService, lostItemService, foundItemService, matchService } from '@/services';
import { RecentActivities } from '@/components/dashboard/RecentActivities';
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [stats, setStats] = useState({
    totalLostItems: 0,
    totalFoundItems: 0,
    totalMatches: 0,
    pendingItems: 0,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          setUser({ name: currentUser.name, role: currentUser.role });
        }

        const [lostItems, foundItems, matches, pendingLostItems, pendingFoundItems] = await Promise.all([
          lostItemService.list(),
          foundItemService.list(),
          matchService.list(),
          lostItemService.list(),
          foundItemService.list()
        ]);

        setStats({
          totalLostItems: lostItems.length,
          totalFoundItems: foundItems.length,
          totalMatches: matches.length,
          pendingItems: pendingLostItems.length + pendingFoundItems.length,
        });
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      }
    };

    fetchData();
  }, []);

  return (
    <ContentLayout title="Dashboard">
      <div className="space-y-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {user && (
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-bold">Welcome, {user.name}!</h2>
            <Badge variant="outline" className="text-sm capitalize">{user.role}</Badge>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Lost Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalLostItems}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Found Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalFoundItems}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Matched Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalMatches}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingItems}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <RecentActivities />
          {/* You can add another component here for the second column if needed */}
        </div>
      </div>
    </ContentLayout>
  );
}