import { FC } from 'react';
import times from 'lodash/times';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import IconLeft from '@/components/_other/icons/IconLeft';
import IconRight from '@/components/_other/icons/IconRight';
import styles from './Pagination.module.scss';
import { createQueryString } from '@/utils';

type PaginationType = {
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};
type PaginationProps = {
  pagination: PaginationType | undefined;
};

const Pagination: FC<PaginationProps> = ({ pagination }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (pagination && pagination?.totalPages <= 1) {
    return '';
  }

  return (
    <div className={styles.wrapper}>
      {pagination && pagination.hasPrevPage ? (
        <Link
          className={`${styles.btn}`}
          href={
            pathname + '?' + createQueryString('page', String(pagination?.page - 1), searchParams)
          }
        >
          <IconLeft />
        </Link>
      ) : (
        ''
      )}
      {pagination?.totalPages ? (
        <>
          {times(pagination.totalPages, index => {
            return (
              <Link
                className={`${pagination?.page == index + 1 ? styles.active : ''}`}
                href={pathname + '?' + createQueryString('page', String(index + 1), searchParams)}
                key={index}
              >
                {index + 1}
              </Link>
            );
          })}
        </>
      ) : (
        ''
      )}
      {pagination && pagination.hasNextPage ? (
        <Link
          className={`${styles.btn}`}
          href={
            pathname + '?' + createQueryString('page', String(pagination?.page + 1), searchParams)
          }
        >
          <IconRight />
        </Link>
      ) : (
        ''
      )}
    </div>
  );
};
export default Pagination;
