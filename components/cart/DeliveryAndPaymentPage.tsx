'use client';
import useCart from '@/app/api/utils/hooks/useCart';
import useSWR from 'swr';
import { fetcher } from '@/app/api/utils';
import { useEffect, useState } from 'react';
import DeliveryForm from '@/components/cart/forms/DeliveryForm';
import PaymentForm from '@/components/cart/forms/PaymentForm';
import styles from './DeliveryAndPaymentPage.module.scss';
import { useRouter } from 'next/navigation';
import { PaymentOptionsType, SelectedData } from '@/types';

const DeliveryAndPaymentPage = () => {
  const { cart, updateCart, createOrder, deleteCart } = useCart();
  const router = useRouter();
  let cartHash: string;
  let cartData;

  const { data: delivery } = useSWR(
    `/api/cart/delivery`,
    fetcher,
  );
  const { data: payments } = useSWR(
    `/api/cart/payments`,
    fetcher,
  );
  if (cart && cart?.docs && cart?.docs.length > 0) {
    cartHash = cart?.docs[0]?.cartHash;
  }

  const [canOrder, setCanOrder] = useState<boolean>(false);
  const [deliveryOptions, setDeliveryOptions] = useState<PaymentOptionsType[] | null>(null);
  const [paymentsOptions, setPaymentsOptions] = useState<PaymentOptionsType[] | null>(null);
  const [selectedData, setSelecetedData] = useState<SelectedData>({
    deliveryId: null,
    paymentId: null,
  });

  useEffect(() => {
    if (delivery && delivery?.docs) {
      setDeliveryOptions(delivery?.docs);
    }
    if (payments && payments?.docs) {
      setPaymentsOptions(payments?.docs);
    }
    if (selectedData.deliveryId && selectedData.paymentId) {
      updateCart({
        selectedDelivery: selectedData.deliveryId,
        selectedPayment: selectedData.paymentId,
      })
        .then(r => {
          if (r?.ok) {
            setCanOrder(true);
          }
        })
        .catch(error => {
          console.error('Error on server side:', error);
        });
    }
  }, [delivery, payments, selectedData]);

  if (cart && cart?.docs) {
    cartData = cart?.docs[0];
  }

  const handleCreateOrder = () => {
    createOrder()
      .then(r => {
        if (r?.ok) {
          deleteCart();
          router.push(`/dakujeme/${cartHash}`);
        }
      })
      .catch(error => {
        console.error('Error on server side:', error);
      });
  };

  return (
    <div className={styles.wrapper}>
      <h4>Doprava</h4>
      <DeliveryForm
        delivery={deliveryOptions}
        selectedData={selectedData}
        setSelecetedData={setSelecetedData}
      />
      <h4 className={'mt-4'}>Platba</h4>
      {!selectedData.deliveryId ? <p className={styles.infoText}>Najprv vyberte dopravu</p> : ''}
      <div className={!selectedData.deliveryId ? styles.disabled : ''}>
        <PaymentForm
          payments={paymentsOptions}
          selectedData={selectedData}
          setSelecetedData={setSelecetedData}
        />
      </div>
      {cartData?.totalPrice ? (
        <div className={'mt-8 flex md:justify-end'}>
          <span>
            Celková cena: <strong>{cartData.totalPrice} €</strong>
          </span>
        </div>
      ) : (
        ''
      )}
      <div>
        <span
          className={`${styles.btn} ${!canOrder ? styles.disabled : ''}`}
          onClick={handleCreateOrder}
        >
          Objednať
        </span>
      </div>
    </div>
  );
};
export default DeliveryAndPaymentPage;
