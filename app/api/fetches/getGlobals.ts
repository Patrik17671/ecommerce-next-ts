import { apiHeaders } from '../utils';

type GlobalProps = {
  slug: string;
};

export async function getGlobals(props: GlobalProps) {
  const slug = props?.slug;

  if (!slug) {
    throw new Error('Error: Slug is required');
  }

  try {
    const res = await fetch(`${process.env.API_BASE_URL}/api/globals/${slug}`, {
      method: 'GET',
      headers: {
        ...apiHeaders,
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching hero content:', error);
    throw error;
  }
}
