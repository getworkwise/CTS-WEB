'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { LostItem, lostItemService } from '@/services';
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function ItemDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isEditing, setIsEditing] = useState(false);
  const [item, setItem] = useState<LostItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchItem = useCallback(async () => {
    if (params.id) {
      try {
        setIsLoading(true);
        const fetchedItem = await lostItemService.read(params.id as string);
        setItem(fetchedItem);
      } catch (error) {
        console.error('Failed to fetch item:', error);
        toast.error('Failed to load item details');
      } finally {
        setIsLoading(false);
      }
    }
  }, [params.id]);

  useEffect(() => {
    fetchItem();
  }, [fetchItem]);

  useEffect(() => {
    const editMode = searchParams.get('edit') === 'true';
    setIsEditing(editMode);
  }, [searchParams]);

  const handleEditClick = () => {
    router.push(`/lost-items/${params.id}?edit=true`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setItem(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleSwitchChange = (checked: boolean) => {
    setItem(prev => prev ? { ...prev, is_official_document: checked } : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (item) {
      try {
        await lostItemService.update(item.id, item);
        toast.success('Item updated successfully');
        setIsEditing(false);
        router.push(`/lost-items/${item.id}`);
        await fetchItem();
      } catch (error) {
        console.error('Failed to update item:', error);
        toast.error('Failed to update item');
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <ContentLayout title={isEditing ? "Edit Lost Item" : "Lost Item Details"}>
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
            <BreadcrumbPage>{item.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-6">
        <Tabs defaultValue="details">
          <TabsList>
            <TabsTrigger value="details">General Details</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="title"
                value={item.title}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Title"
              />
              <Textarea
                name="description"
                value={item.description}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Description"
              />
              <Input
                name="date_lost"
                type="date"
                value={item.date_lost.split('T')[0]}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <Input
                name="location"
                value={item.location}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Location"
              />
              <div className="flex items-center space-x-2">
                <Switch
                  checked={item.is_official_document}
                  onCheckedChange={handleSwitchChange}
                  disabled={!isEditing}
                />
                <label>Is Official Document</label>
              </div>
              {isEditing ? (
                <Button type="submit">Save Changes</Button>
              ) : (
                <Button onClick={handleEditClick}>Edit</Button>
              )}
            </form>
          </TabsContent>
          <TabsContent value="documents">
            {item.is_official_document ? (
              <div className="space-y-4">
                <Input
                  name="document_type"
                  value={item.document_type || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Document Type"
                />
                <Input
                  name="document_number"
                  value={item.document_number || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Document Number"
                />
                <Input
                  name="issuing_authority"
                  value={item.issuing_authority || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Issuing Authority"
                />
                <Input
                  name="issue_date"
                  type="date"
                  value={item.issue_date ? item.issue_date.split('T')[0] : ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                <Input
                  name="expiry_date"
                  type="date"
                  value={item.expiry_date ? item.expiry_date.split('T')[0] : ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                {isEditing ? (
                  <Button type="submit" onClick={handleSubmit}>Save Changes</Button>
                ) : (
                  <Button onClick={handleEditClick}>Edit</Button>
                )}
              </div>
            ) : (
              <p>This item is not an official document.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </ContentLayout>
  );
}