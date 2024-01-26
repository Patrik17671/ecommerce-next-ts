'use client';
import useCart from '@/app/api/utils/hooks/useCart';
import ContactForm from '@/components/cart/forms/ContactFrom';

const CartPage = () => {
  const { cart, isLoading } = useCart();

  let cartCount = 0;
  if (cart && cart?.docs && cart?.docs.length > 0) {
    cartCount = cart?.docs[0]?.items?.length;
  }

  if (isLoading) {
    return (
      <div>
        <h2 className={'text-center'}>Načitavam košík....</h2>
      </div>
    );
  }

  if (cartCount == 0) {
    return (
      <div>
        <h2 className={'text-center'}>Najpr si niečo pridaj do košíka ;)</h2>
      </div>
    );
  }

  return (
    <div>
      <ContactForm />
    </div>
  );
};
export default CartPage;
