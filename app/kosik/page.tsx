import { Suspense } from 'react';
import CartPage from '@/components/cart/CartPage';

const Cart = () => {
  return (
    <Suspense>
      <CartPage />
    </Suspense>
  );
};
export default Cart;
