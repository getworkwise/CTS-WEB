import pb from '@/lib/pocketbase';
import { CrudService } from './crudService';

// Base type for PocketBase records
export interface BaseRecord {
  id: string;
  created: string;
  updated: string;
}

export interface User extends BaseRecord {
  name: string;
  email: string;
  role: 'admin' | 'agent';
  district: string;
  last_login: string | null;
}

export interface LostItem extends BaseRecord {
  title: string;
  description: string;
  date_lost: string;
  location: string;
  status: string;
  user: string; // This should be the ID of the user who reported the item
  is_official_document: boolean;
  // Fields from CTSDocument
  document_type?: string;
  document_number?: string;
  issuing_authority?: string;
  issue_date?: string;
  expiry_date?: string;
  document_status?: 'reported' | 'found' | 'returned' | 'expired';
}


export interface FoundItem extends BaseRecord {
  title: string;
  description: string;
  date_found: string;
  location: string;
  status: 'unclaimed' | 'in_progress' | 'returned' | 'matched';
  finder_name: string;
  finder_contact: string;
}

export interface Match extends BaseRecord {
  lost_item: string; // ID of the related lost item
  found_item: string; // ID of the related found item
  status: 'pending' | 'confirmed' | 'rejected';
  confidence_score: number;
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
  try {
    const log = await auditLogService.create({
      user: userId,
      action,
      collection_name: collectionName,
      record_id: recordId,
      details
    });
    console.log('Audit log created:', log);
    return log;
  } catch (error) {
    console.error('Error creating audit log:', error);
    throw error;
  }
}

// Helper function to report a lost item
export async function reportLostItem(
  lostItemData: Omit<LostItem, 'id' | 'created' | 'updated' | 'user' | 'status' | 'is_official_document' | 'document_status'>,
  userId: string,
  isOfficialDocument: boolean
) {
  console.log('Starting reportLostItem function');
  console.log('Lost item data:', lostItemData);
  console.log('User ID:', userId);
  console.log('Is official document:', isOfficialDocument);

  try {
    const lostItem = await lostItemService.create({
      ...lostItemData,
      user: userId,
      status: 'open',
      is_official_document: isOfficialDocument,
      document_status: isOfficialDocument ? 'reported' : undefined
    });
    console.log('Lost item created successfully:', lostItem);

    console.log('Attempting to create audit log');
    try {
      await createAuditLog(userId, 'report_lost_item', 'lost_items', lostItem.id, {
        ...lostItemData,
        is_official_document: isOfficialDocument
      });
      console.log('Audit log created successfully');
    } catch (error) {
      console.error('Error creating audit log:', error);
    }

    return lostItem;
  } catch (error) {
    console.error('Error in reportLostItem function:', error);
    throw error;
  }
}