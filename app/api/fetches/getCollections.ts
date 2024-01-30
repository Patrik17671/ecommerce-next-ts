import { apiHeaders } from '../utils';

export type FilterCriteria = {
  value: any;
  operator: 'equals' | 'not_equals' | 'in' | 'nin' | string;
};

export type GlobalProps = {
  slug: string;
  filters?: Record<string, FilterCriteria>;
  page?: string | number;
  sort?: string;
};

export async function getCollections(props: GlobalProps) {
  const { slug, filters, page, sort } = props;

  if (!slug) {
    throw new Error('Error: Slug is required');
  }

  let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${slug}`;

  let queryParams = [];

  if (filters && Object.keys(filters).length > 0) {
    const filterParams = Object.keys(filters).map(key => {
      const { value, operator } = filters[key];
      return `where[${key}][${operator}]=${encodeURIComponent(value)}`;
    });
    queryParams.push(...filterParams);
  }

  if (page) {
    queryParams.push(`page=${page}`);
  }

  if (sort) {
    queryParams.push(`sort=${sort}`);
  }

  if (queryParams.length > 0) {
    url += `?${queryParams.join('&')}`;
  }

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        ...apiHeaders,
      },
      next: { revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE) },
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
