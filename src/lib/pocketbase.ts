import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

// Auto authenticate for any saved auth data
pb.authStore.onChange(() => {
    console.log('Auth state changed:', pb.authStore.isValid);
  });
  
export default pb;