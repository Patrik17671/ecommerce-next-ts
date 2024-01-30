'use client';
import styles from './Items.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import map from 'lodash/map';
import { FC } from 'react';
import { CartItems } from '@/types';

type ItemsProps = {
  items: CartItems[];
};

const Items: FC<ItemsProps> = ({ items }) => {
  return (
    <div className={'flex flex-col gap-8'}>
      {map(items, (item, index) => {
        const product = item.productId;
        return (
          <div key={index} className={styles.card}>
            <Link
              aria-label={`Link to ${product.name}`}
              href={`/produkt/${product?.url}` || '/'}
              className={'abs-link'}
            />
            {product.file?.url ? (
              <div>
                <Image
                  width={80}
                  height={120}
                  src={product.file.url}
                  alt={product?.file?.alt || 'photo'}
                />
              </div>
            ) : (
              ''
            )}
            <div className={styles.content}>
              <strong>{product.name}</strong>
              <span>{product.price} €</span>
              <span className={styles.qty}>
                Počet:
                <strong> {item.quantity} ks</strong>
              </span>
              <span className={styles.size}>
                Veľkosť:
                <strong> {item.selectedSize}</strong>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Items;
