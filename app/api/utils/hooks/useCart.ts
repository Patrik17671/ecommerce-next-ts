'use client';
import useSWR from 'swr';
import { v4 as uuidv4 } from 'uuid';
import { apiHeaders } from '@/app/api/utils';

const getOrCreateCartHash = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  let cartHash = localStorage.getItem('cartHash');
  if (!cartHash) {
    cartHash = uuidv4();
    localStorage.setItem('cartHash', cartHash);
  }
  return cartHash;
};

const fetcher = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      ...apiHeaders,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

type UseCartOptions = {
  onSuccess?: () => void;
  onError?: () => void;
};

const useCart = ({ onSuccess, onError }: UseCartOptions = {}) => {
  const cartHash = getOrCreateCartHash();
  const { data: cart, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/carts?where[cartHash][equals]=${cartHash}&populate=items.productId`,
    fetcher,
  );

  const addToCart = async (
    productId: string,
    quantity: string | number,
    selectedSize: string | undefined,
  ) => {
    const cartHash = getOrCreateCartHash();

    try {
      let method = 'POST';
      let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/carts`;

      if (cart && cart.docs && cart.docs.length > 0) {
        method = 'PATCH';
        url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/carts/${cart.docs[0].id}`;
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          ...apiHeaders,
        },
        body: JSON.stringify({
          cartHash,
          items: [{ productId, quantity }],
          selectedSize: selectedSize,
        }),
      });

      if (!response.ok) throw new Error('Failed to add item to cart');
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      if (onError) onError();
    }
  };

  const removeFromCart = async (productId: string) => {
    const cartHash = getOrCreateCartHash();

    try {
      if (cart && cart.docs && cart.docs.length > 0) {
        let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/carts/${cart.docs[0].id}`;

        const response = await fetch(url, {
          method: 'PATCH',
          headers: {
            ...apiHeaders,
          },
          body: JSON.stringify({ cartHash, itemsToRemove: [productId] }),
        });

        if (!response.ok) throw new Error('Failed to remove item from cart');
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      console.error(error);
      if (onError) onError();
    }
  };

  const deleteCart = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/carts?where[cartHash][equals]=${cartHash}`,
        {
          method: 'DELETE',
          headers: {
            ...apiHeaders,
          },
        },
      );

      if (!response.ok) throw new Error('Failed to delete cart');
      localStorage.removeItem('cartHash');
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      if (onError) onError();
    }
  };

  return {
    cart,
    addToCart,
    deleteCart,
    removeFromCart,
    isLoading: !error && !cart,
    isError: error,
  };
};

export default useCart;
