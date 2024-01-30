'use client';
import React from 'react';
import Select from 'react-select';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createQueryString } from '@/utils';
import styles from './Ordering.module.scss';

type OptionType = {
  label: string;
  value: string;
};

const SortingSelect = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const options: any = [
    { value: '-createdAt', label: 'Najnovšie' },
    { value: '-price', label: 'Cena ▼' },
    { value: 'price', label: 'Cena ▲' },
  ];

  const formatLabel = ({ label, value }: OptionType) => (
    <Link
      className={''}
      href={pathname + '?' + createQueryString('sort', value, searchParams)}
      scroll={false}
    >
      {label}
    </Link>
  );

  return (
    <div className={styles.wrapper}>
      <Select
        options={options}
        className={'react-select'}
        classNamePrefix={'order-select'}
        formatOptionLabel={formatLabel}
        placeholder={'Zoradiť'}
      />
    </div>
  );
};

export default SortingSelect;
