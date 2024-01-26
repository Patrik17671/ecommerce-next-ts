'use client';
import useCart from '@/app/api/utils/hooks/useCart';
import Link from 'next/link';
import map from 'lodash/map';
import Image from 'next/image';
import styles from './Sidebar.module.scss';
import IconClose from '@/components/_other/icons/IconClose';

const Sidebar = () => {
  const { cart, removeFromCart } = useCart();
  let items;
  if (cart && cart?.docs && cart?.docs.length > 0) {
    items = cart?.docs[0]?.items;
  }

  if (items?.length == 0) {
    return '';
  }

  return (
    <div className={styles.sidebar}>
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
            <span className={styles.close} onClick={() => removeFromCart(product.id)}>
              <IconClose />
            </span>
          </div>
        );
      })}
    </div>
  );
};
export default Sidebar;
