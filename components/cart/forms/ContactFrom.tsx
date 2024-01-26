'use client';
import TextInput from '@/components/_other/form/TextInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import useCart from '@/app/api/utils/hooks/useCart';
import { ContactFormInputs } from '@/types';
import styles from './Forms.module.scss';
import { useRouter } from 'next/navigation';

const ContactForm = () => {
  const { cart, updateCart } = useCart();
  const router = useRouter();

  let deliveryAddress;

  if (cart && cart?.docs && cart?.docs.length > 0) {
    deliveryAddress = cart?.docs[0]?.deliveryAddress;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormInputs>({
    defaultValues: {
      name: deliveryAddress.name || '',
      lastName: deliveryAddress.lastName || '',
      email: deliveryAddress.email || '',
      phone: deliveryAddress.phone || '',
      town: deliveryAddress.town || '',
    },
  });

  const onSubmit: SubmitHandler<ContactFormInputs> = data => {
    updateCart({ deliveryAddress: data })
      .then(r => {
        if (r?.ok) {
          router.push('/kosik/doprava-a-platba');
        }
      })
      .catch(error => {
        console.error('Error on server side:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        label="Meno"
        name={'name'}
        placeholder="Zadajte svoje meno"
        errors={errors.name}
        register={register}
        validationSchema={{ required: 'Pole meno je povinné' }}
        required
      />

      <TextInput
        label="Priezvisko"
        name="lastName"
        placeholder="Zadajte svoje meno"
        errors={errors.lastName}
        required
        register={register}
        validationSchema={{ required: 'Pole priezvisko je povinné' }}
      />

      <TextInput
        label="E-mail"
        name="email"
        type="text"
        placeholder="Zadajte svoj e-mail"
        errors={errors.email}
        required
        register={register}
        validationSchema={{
          required: 'Pole e-mail je povinné',
          pattern: { value: /^\S+@\S+$/i, message: 'Neplatný e-mail' },
        }}
      />

      <TextInput
        label="Telefónne číslo"
        name="phone"
        type="tel"
        register={register}
        validationSchema={{
          required: 'Pole telefónne číslo je povinné',
          pattern: {
            value: /^(?:\+421|0)9\d{2}\s?\d{3}\s?\d{3}$/,
            message:
              'Neplatné telefónne číslo (správny formát +421 9xx xxx xxx alebo 09xx xxx xxx)',
          },
        }}
        placeholder="Zadajte svoje telefónne číslo"
        errors={errors.phone}
      />

      <TextInput
        label="Mesto"
        name="town"
        placeholder="Zadajte mesto"
        register={register}
        validationSchema={{ required: 'Zadajte mesto' }}
        errors={errors.town}
        required
      />

      <button className={styles.btn} type="submit">
        Pokračovať
      </button>
    </form>
  );
};

export default ContactForm;
