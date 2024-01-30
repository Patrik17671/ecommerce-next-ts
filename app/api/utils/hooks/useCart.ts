'use client';
import useSWR from 'swr';
import { v4 as uuidv4 } from 'uuid';
import { apiHeaders, fetcher } from '@/app/api/utils';
import { ContactFormInputs } from '@/types';

// Retrieves or creates a unique cart identifier stored in the local storage
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

type UseCartOptions = {
  onSuccess?: () => void;
  onError?: () => void;
};

type UpdateCart = {
  selectedDelivery?: string;
  selectedPayment?: string;
  deliveryAddress?: ContactFormInputs;
};

// Custom hook to manage cart operations
const useCart = ({ onSuccess, onError }: UseCartOptions = {}) => {
  const cartHash = getOrCreateCartHash();
  // Fetch the current cart data using SWR for data fetching and local state caching
  const {
    data: cart,
    mutate,
    error,
    isValidating,
    isLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/carts?where[cartHash][equals]=${cartHash}&populate=items.productId&populate=selectedDelivery&populate=selectedPayment`,
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

      // If a cart already exists, update it instead of creating a new one
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
          items: [{ productId, quantity, selectedSize }],
        }),
      });

      if (!response.ok) throw new Error('Failed to add item to cart');
      if (onSuccess) onSuccess();
      await mutate();
      return response;
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
        await mutate();
        return response;
      }
    } catch (error) {
      console.error(error);
      if (onError) onError();
    }
  };

  //Update cart use for updating address and delivery options
  const updateCart = async (updateData: UpdateCart) => {
    const cartHash = getOrCreateCartHash();

    try {
      if (cart && cart.docs && cart.docs.length > 0) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/carts/${cart.docs[0].id}`,
          {
            method: 'PATCH',
            headers: {
              ...apiHeaders,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              cartHash,
              ...updateData,
            }),
          },
        );

        if (!response.ok) throw new Error('Failed to update cart');
        if (onSuccess) onSuccess();
        await mutate();
        return response;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createOrder = async () => {
    const cartHash = getOrCreateCartHash();

    try {
      if (cart && cart.docs && cart.docs.length > 0) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/carts/${cart.docs[0].id}`,
          {
            method: 'PATCH',
            headers: {
              ...apiHeaders,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              cartHash,
              createOrder: true,
            }),
          },
        );

        if (!response.ok) throw new Error('Failed to create order');
        if (onSuccess) onSuccess();
        await mutate();
        return response;
      }
    } catch (error) {
      console.error(error);
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
      await mutate();
    } catch (error) {
      console.error(error);
      if (onError) onError();
    }
  };

  return {
    cart,
    addToCart,
    updateCart,
    deleteCart,
    createOrder,
    removeFromCart,
    isLoading: isLoading,
    isValidating: isValidating,
    isError: error,
  };
};

export default useCart;
