import { getCollections } from '@/app/api/fetches/getCollections';
import isEmpty from 'lodash/isEmpty';
import { convertToHtml } from '@/utils';
import Products from '@/components/category/products/Products';
import Sidebar from '@/components/category/sidebar/Sidebar';
import Ordering from '@/components/category/ordering/Ordering';
import { Suspense } from 'react';

const Category = async ({ params }: { params: { slug: string } }) => {
  const categoryData = await getCollections({
    slug: 'categories',
    filters: { url: { value: params.slug, operator: 'equals' } },
  });

  let category;

  if (categoryData.docs) {
    category = categoryData.docs[0];
  }

  return (
    <div className={'container'}>
      <div className={'flex'}>
        <div>
          <Sidebar />
        </div>
        <div className={'py-12'}>
          <h1>{category?.title}</h1>
          {!isEmpty(category?.description) ? (
            <div
              className={'mb-8'}
              dangerouslySetInnerHTML={{ __html: convertToHtml(category?.description) }}
            />
          ) : (
            ''
          )}
          <Suspense>
            <Ordering />
          </Suspense>
          <Suspense>
            <Products category={params.slug} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
export default Category;
