import { apiHeaders } from '../utils';

export type FilterCriteria = {
  value: any;
  operator: 'equals' | 'not_equals' | 'in' | 'nin' | string;
};

export type GlobalProps = {
  slug: string;
  filters?: Record<string, FilterCriteria>;
};

export async function getCollections(props: GlobalProps) {
  const { slug, filters } = props;

  if (!slug) {
    throw new Error('Error: Slug is required');
  }

  let url = `${process.env.API_BASE_URL}/api/${slug}`;

  if (filters && Object.keys(filters).length > 0) {
    const filterParams = Object.keys(filters)
      .map(key => {
        const { value, operator } = filters[key];
        return `where[${key}][${operator}]=${encodeURIComponent(value)}`;
      })
      .join('&');
    url += `?${filterParams}`;
  }

  try {
    const res = await fetch(url, {
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
    console.error('Error fetching collections:', error);
    throw error;
  }
}
