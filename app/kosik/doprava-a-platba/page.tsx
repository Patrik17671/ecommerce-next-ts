import { Suspense } from 'react';
import DeliveryAndPaymentPage from '@/components/cart/DeliveryAndPaymentPage';

const Delivery = () => {
  return (
    <Suspense>
      <DeliveryAndPaymentPage />
    </Suspense>
  );
};
export default Delivery;
