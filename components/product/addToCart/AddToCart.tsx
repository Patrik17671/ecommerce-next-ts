'use client';
import styles from './AddToCart.module.scss';
import useCart from '@/app/api/utils/hooks/useCart';
import { FC, useState } from 'react';
import SizesSelect from '@/components/product/addToCart/select/SizesSelect';
import isEmpty from 'lodash/isEmpty';
import { SizeType } from '@/types';

type AddToCartProps = {
  productId: string;
  sizes: SizeType[];
};
const AddToCart: FC<AddToCartProps> = ({ productId, sizes }) => {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart({
    onSuccess: () => {
      setSuccess('Úspešne pridané!');
      setTimeout(() => setSuccess(null), 3000);
    },
    onError: () => {
      setError('Niečo sa pokazilo!');
      setTimeout(() => setError(null), 3000);
    },
  });

  const [selectedSize, setSelectedSize] = useState<string | undefined>();

  return (
    <div className={styles.wrapper}>
      <SizesSelect sizes={sizes} setSelectedSize={setSelectedSize} />
      <span
        className={`${styles.btn} ${isEmpty(selectedSize) ? styles.disabled : ''}`}
        onClick={() => addToCart(productId, 1, selectedSize)}
      >
        Pridať do košíka
      </span>
      {!isEmpty(success) ? (
        <span className={`${styles.msg} ${styles.success}`}>{success}</span>
      ) : (
        ''
      )}
      {!isEmpty(error) ? <span className={`${styles.msg} ${styles.error}`}>{error}</span> : ''}
    </div>
  );
};
export default AddToCart;
