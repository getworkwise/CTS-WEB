// src/services/index.ts

import pb from '@/lib/pocketbase';
import { CrudService } from './crudService';

// Base type for PocketBase records
interface BaseRecord {
  id: string;
  created: string;
  updated: string;
}

// Define interfaces for your collection types
interface User extends BaseRecord {
  name: string;
  email: string;
  role: 'admin' | 'agent';
  district: string;
  last_login: string | null;
}

export interface LostItem {
  id: string;
  title: string;
  description: string;
  dateLost: string;
  location: string;
  status: string;
  isOfficialDocument: boolean;
  documentType?: string;
  documentNumber?: string;
  issuingAuthority?: string;
}


interface FoundItem extends BaseRecord {
  title: string;
  description: string;
  date_found: string;
  location: string;
  status: 'unclaimed' | 'in_progress' | 'returned' | 'matched';
  finder_name: string;
  finder_contact: string;
}

interface Match extends BaseRecord {
  lost_item: string; // ID of the related lost item
  found_item: string; // ID of the related found item
  status: 'pending' | 'confirmed' | 'rejected';
  confidence_score: number;
}

interface DocumentType extends BaseRecord {
  name: string;
  description: string;
}


interface CTSDocument extends BaseRecord {
  document_type: string; // ID of the related document type
  document_number: string;
  issuing_authority: string;
  issue_date: string;
  expiry_date: string;
  status: 'reported' | 'found' | 'returned' | 'expired';
  related_lost_item: string; // ID of the related lost item
}

export interface AuditLog extends BaseRecord {
  user: string; // ID of the related user
  action: string;
  collection_name: string;
  record_id: string;
  details: Record<string, any>; // JSON object
}

// Create services for each collection
export const userService = new CrudService<User>('users');
export const lostItemService = new CrudService<LostItem>('lost_items');
export const foundItemService = new CrudService<FoundItem>('found_items');
export const matchService = new CrudService<Match>('matches');
export const documentTypeService = new CrudService<DocumentType>('document_types');
export const ctsDocumentService = new CrudService<CTSDocument>('cts_documents');
export const auditLogService = new CrudService<AuditLog>('audit_logs');


// Add any custom methods for specific collections here
export const authService = {
  async login(email: string, password: string) {
    const authData = await pb.collection('users').authWithPassword(email, password);
    // Update last_login
    if (authData.record) {
      await userService.update(authData.record.id, { last_login: new Date().toISOString() });
    }
    return authData;
  },

  async register(data: { email: string; password: string; passwordConfirm: string; name: string; role: User['role']; district: string }) {
    const user = await pb.collection('users').create(data);
    // Create an audit log entry for the new user registration
    await auditLogService.create({
      user: user.id,
      action: 'user_registered',
      collection_name: 'users',
      record_id: user.id,
      details: { role: data.role, district: data.district }
    });
    return user;
  },

  async logout() {
    pb.authStore.clear();
  },

  async getCurrentUser(): Promise<User | null> {
    return pb.authStore.model as User | null;
  },

  async isAuthenticated(): Promise<boolean> {
    return pb.authStore.isValid;
  },
};

// Helper function to create audit logs
export async function createAuditLog(userId: string, action: string, collectionName: string, recordId: string, details: Record<string, any>) {
  return auditLogService.create({
    user: userId,
    action,
    collection_name: collectionName,
    record_id: recordId,
    details
  });
}

// Helper function to create a CTS document
export async function createCTSDocument(data: Omit<CTSDocument, 'id' | 'created' | 'updated'>, userId: string) {
  const ctsDocument = await ctsDocumentService.create(data);
  await createAuditLog(userId, 'create_cts_document', 'cts_documents', ctsDocument.id, data);
  return ctsDocument;
}

// Helper function to report a lost item with a CTS document
export async function reportLostItemWithCTSDocument(
  lostItemData: Omit<LostItem, 'id' | 'created' | 'updated'>,
  ctsDocumentData: Omit<CTSDocument, 'id' | 'created' | 'updated' | 'related_lost_item'>,
  userId: string
) {
  const lostItem = await lostItemService.create(lostItemData);
  const ctsDocument = await createCTSDocument({
    ...ctsDocumentData,
    related_lost_item: lostItem.id
  }, userId);
  
  await createAuditLog(userId, 'report_lost_item_with_cts_document', 'lost_items', lostItem.id, {
    lost_item: lostItemData,
    cts_document: ctsDocumentData
  });

  return { lostItem, ctsDocument };
}