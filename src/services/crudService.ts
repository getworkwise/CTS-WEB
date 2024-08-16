import pb from '@/lib/pocketbase';

export class CrudService<T extends { id: string }> {
  private collection: string;

  constructor(collection: string) {
    this.collection = collection;
  }

  async create(data: Omit<T, 'id' | 'created' | 'updated'>): Promise<T> {
    try {
      const record = await pb.collection(this.collection).create<T>(data);
      return record;
    } catch (error) {
      console.error(`Error creating record in ${this.collection}:`, error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      throw error;
    }
  }

  async read(id: string): Promise<T> {
    return pb.collection(this.collection).getOne<T>(id);
  }

  async update(id: string, data: Partial<Omit<T, 'id' | 'created' | 'updated'>>): Promise<T> {
    return pb.collection(this.collection).update<T>(id, data);
  }

  async delete(id: string): Promise<boolean> {
    return pb.collection(this.collection).delete(id);
  }

  async list(): Promise<T[]> {
    const result = await pb.collection(this.collection).getFullList<T>({
      sort: '-created', // Sort by creation date, newest first
      requestKey: null, // Disable auto-cancellation for this request
    });
    return result;
  }
}