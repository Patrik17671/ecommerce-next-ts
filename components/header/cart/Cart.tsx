'use client';
import IconCart from '@/components/_other/icons/IconCart';
import styles from './Cart.module.scss';
import useCart from '@/app/api/utils/hooks/useCart';
import Link from 'next/link';

const Cart = () => {
  const { cart } = useCart();
  let cartCount = 0;

  if (cart && cart?.docs && cart?.docs.length > 0) {
    cartCount = cart?.docs[0]?.items?.length;
  }

  return (
    <div className={styles.wrapper}>
      <Link href={'/kosik'} aria-label={'Link to cart'} className={styles.btn}>
        {cartCount > 0 ? <span className={styles.counter}>{cartCount}</span> : ''}
        <IconCart />
      </Link>
    </div>
  );
};
export default Cart;
