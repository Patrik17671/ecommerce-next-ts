import { getCollections } from '@/app/api/fetches/getCollections';

type Filter = {
  value: string | string[];
  operator: 'contains' | 'in';
};

type Filters = {
  [key: string]: Filter;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filters: Filters = {};
  let page: string = '1';
  let sort: string = '-createdAt';

  const category = searchParams.get('category');
  if (category) {
    filters['categories.value'] = { value: category, operator: 'contains' };
  }

  searchParams.forEach((value, key) => {
    if (key === 'filter') {
      const filterParts = value.split('|');
      filterParts.forEach(part => {
        const [filterKey, filterValues] = part.split(':');
        filters[`${filterKey}.value`] = { value: filterValues.split(','), operator: 'in' };
      });
    } else if (key === 'page') {
      page = value;
    } else if (key === 'sort') {
      sort = value;
    }
  });

  try {
    const data = await getCollections({
      slug: 'products',
      filters,
      page,
      sort,
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
