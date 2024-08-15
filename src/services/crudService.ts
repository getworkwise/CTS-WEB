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

  async list(page: number = 1, perPage: number = 20, filter: string = ''): Promise<{ items: T[], totalItems: number }> {
    const requestKey = `${this.collection}_list_${Date.now()}`;
    const result = await pb.collection(this.collection).getList<T>(page, perPage, { 
      filter,
      requestKey // Add this line
    });
    return {
      items: result.items,
      totalItems: result.totalItems,
    };
  }
}