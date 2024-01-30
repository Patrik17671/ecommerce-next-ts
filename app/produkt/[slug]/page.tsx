import { getCollections } from '@/app/api/fetches/getCollections';
import map from 'lodash/map';
import Image from 'next/image';
import styles from './page.module.scss';
import isEmpty from 'lodash/isEmpty';
import AddToCart from '@/components/product/addToCart/AddToCart';
import { convertToHtml } from '@/utils';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const productData = await getCollections({
    slug: 'products',
    filters: { url: { value: params.slug, operator: 'equals' } },
  });

  let product;
  if (productData.docs) {
    product = productData.docs[0];
  }
  return {
    title: product.name,
  };
}

export async function generateStaticParams() {
  const product = await getCollections({
    slug: 'products',
  });

  return map(product?.docs, product => ({
    slug: product?.url,
  }));
}
const Product = async ({ params }: { params: { slug: string } }) => {
  const productData = await getCollections({
    slug: 'products',
    filters: { url: { value: params.slug, operator: 'equals' } },
  });

  let product;

  if (productData.docs) {
    product = productData.docs[0];
  }

  return (
    <div className={styles.productPage}>
      <div className={'container'}>
        <div className={styles.wrapper}>
          {product.file?.url ? (
            <div className={styles.image}>
              <Image
                width={500}
                height={500}
                src={product.file.url}
                alt={product?.file?.alt || 'photo'}
                priority={true}
              />
            </div>
          ) : (
            ''
          )}
          <div className={styles.content}>
            <h1 className={styles.title}>{product.name}</h1>
            {!isEmpty(product?.colors) ? (
              <div className={styles.colors}>
                <span className={styles.label}>Farby:</span>
                <div className={styles.list}>
                  {map(product?.colors, (colors, index) => {
                    return <span key={index}>{colors?.name}</span>;
                  })}
                </div>
              </div>
            ) : (
              ''
            )}
            <div className={styles.price}>
              <span>{product.price} €</span>
            </div>
            <AddToCart productId={product.id} sizes={product.sizes} />
          </div>
        </div>
      </div>
      {!isEmpty(product?.description) ? (
        <div className={styles.desc}>
          <div className={'container'}>
            <div dangerouslySetInnerHTML={{ __html: convertToHtml(product.description) }} />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
export default Product;
