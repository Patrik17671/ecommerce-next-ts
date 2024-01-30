'use client';
import useSWR from 'swr';
import { fetcher } from '@/app/api/utils';
import { useSearchParams } from 'next/navigation';
import map from 'lodash/map';
import Card from '@/components/card/Card';
import Pagination from '@/components/pagination/Pagination';
import { FC } from 'react';

type ProductsProps = {
  category: string;
};
const Products: FC<ProductsProps> = ({ category }) => {
  const searchParams = useSearchParams();

  const queryString = Array.from(searchParams.entries())
    .map(([key, value]) => {
      if (value) {
        return `${key}=${encodeURIComponent(value)}`;
      }
    })
    .join('&');

  const { data, error } = useSWR(
    `/api/products?category=${category}&${decodeURIComponent(queryString)}`,
    fetcher,
  );
  let products;
  let paginationData;

  if (data && data.docs) {
    products = data.docs;
    paginationData = {
      page: data.page,
      totalPages: data.totalPages,
      hasNextPage: data.hasNextPage,
      hasPrevPage: data.hasPrevPage,
    };
  }

  if (error) return <span>Nastala chyba</span>;
  if (!data) return <span>Načitavam...</span>;

  return (
    <div>
      <div className={'grid grid-cols-2 md:grid-cols-4 gap-8'}>
        {map(products, (product, index) => {
          return <Card product={product} key={index} isCategory={true} />;
        })}
      </div>
      <Pagination pagination={paginationData} />
    </div>
  );
};
export default Products;
