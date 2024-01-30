import { getCollections } from '@/app/api/fetches/getCollections';

type Filter = {
  value: string | string[];
  operator: 'contains' | 'in';
};

type Filters = {
  [key: string]: Filter;
};

/*
	EXAMPLE OF FILTERS OBJECT
	{
	  'categories.value': { value: 'muzi', operator: 'contains' },
	  'sizes.value': { value: [ 'm', 'xl' ], operator: 'in' },
	  'colors.value': { value: [ 'fialova', 'zelena' ], operator: 'in' }
	}
 */

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
    // If the current key is 'filter', process it to set up filtering criteria
    if (key === 'filter') {
      // Split the filter value by '|' to get individual filter rules
      const filterParts = value.split('|');
      filterParts.forEach(part => {
        // For each filter part, split by ':' to separate the filter field from its values
        const [filterKey, filterValues] = part.split(':');
        // Split the filter values by ',' and assign them to the filters object
        // Use the 'in' operator to indicate that the field value should match any of the specified values
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
