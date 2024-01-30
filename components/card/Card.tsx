import styles from './Card.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import map from 'lodash/map';
import { ProductsDocsType } from '@/types';
import { FC } from 'react';

type ProductCardProps = {
  product: ProductsDocsType;
  isCategory?: boolean;
};
const Card: FC<ProductCardProps> = ({ product, isCategory = false }) => {
  return (
    <div className={`${styles?.card} ${isCategory ? styles.category : ''}`}>
      <Link
        href={`/produkt/${product.url}`}
        className={'abs-link'}
        aria-label={`Link to ${product.name}`}
      />
      {product.file?.url ? (
        <div>
          <Image
            width={300}
            height={400}
            src={product.file.url}
            alt={product?.file?.alt || 'photo'}
          />
        </div>
      ) : (
        ''
      )}
      <div className={styles?.name}>
        <strong>{product.name}</strong>
        <span>{product.price} €</span>
      </div>
      <div className={styles?.sizes}>
        {map(product?.sizes, (size, index) => {
          return <span key={index}>{size?.name}</span>;
        })}
      </div>
      <div>
        {map(product?.colors, (color, index) => {
          return <span key={index}>{color?.name}</span>;
        })}
      </div>
    </div>
  );
};
export default Card;
