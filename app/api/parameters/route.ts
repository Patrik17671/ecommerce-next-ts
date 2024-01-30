import { getCollections } from '@/app/api/fetches/getCollections';

export async function GET() {
  try {
    const data = await getCollections({
      slug: 'parameters',
    });
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching filtered products:', error);
    return new Response(JSON.stringify({ message: 'Error fetching products' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
