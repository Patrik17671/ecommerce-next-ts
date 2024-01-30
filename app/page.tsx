import Banners from '@/components/index/banners/Banners';
import ProductsSlider from '@/components/productsSlider/ProductsSlider';
import { getCollections } from '@/app/api/fetches/getCollections';
import { CollectionType, ProductsDocsType } from '@/types';
import isEmpty from 'lodash/isEmpty';

const Home = async () => {
  const results: [CollectionType, CollectionType] = await Promise.all([
    getCollections({
      slug: 'products',
      filters: { 'categories.value': { value: 'muzi', operator: 'contains' } },
    }),
    getCollections({
      slug: 'products',
      filters: { 'categories.value': { value: 'zeny', operator: 'contains' } },
    }),
  ]);

  const [menProductsData, womenProductsData] = results;

  return (
    <main className="">
      <Banners />
      {!isEmpty(menProductsData?.docs) ? (
        <div className={'container'}>
          <ProductsSlider title={'Muži'} products={menProductsData.docs as ProductsDocsType[]} />
        </div>
      ) : (
        ''
      )}
      {!isEmpty(womenProductsData?.docs) ? (
        <div className={'container'}>
          <ProductsSlider title={'Ženy'} products={womenProductsData.docs as ProductsDocsType[]} />
        </div>
      ) : (
        ''
      )}
    </main>
  );
};
export default Home;
