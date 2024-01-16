import { apiHeaders } from '../utils';

type GlobalProps = {
  slug: string;
  filters?: any;
};

export async function getCollections(props: GlobalProps) {
  const { slug, filters } = props;

  if (!slug) {
    throw new Error('Error: Slug is required');
  }

  let url = `${process.env.API_BASE_URL}/api/${slug}`;

  if (filters && Object.keys(filters).length > 0) {
    const filterParams = Object.keys(filters)
      .map(key => `where[${key}][equals]=${encodeURIComponent(filters[key])}`)
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

// export async function getCollections(props: GlobalProps) {
//   const slug = props?.slug;
//
//   if (!slug) {
//     throw new Error('Error: Slug is required');
//   }
//
//   let url;
//
//   try {
//     const res = await fetch(
//       `${process.env.API_BASE_URL}/api/${slug}?where[location][equals]=HOMEPAGE_MAIN`,
//       {
//         method: 'GET',
//         headers: {
//           ...apiHeaders,
//         },
//       },
//     );
//     if (!res.ok) {
//       throw new Error(`Failed to fetch data. Status: ${res.status}`);
//     }
//     return res.json();
//   } catch (error) {
//     console.error('Error fetching hero content:', error);
//     throw error;
//   }
// }
