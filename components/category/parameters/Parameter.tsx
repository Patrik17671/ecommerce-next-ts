import { FC } from 'react';
import { ParameterType } from '@/types';
import Link from 'next/link';
import map from 'lodash/map';
import { usePathname, useSearchParams } from 'next/navigation';
import { formatFilterString, isFilterActive } from '@/utils';
import styles from './Parameter.module.scss';

type ParametersProps = {
  label: string;
  parameters: ParameterType[];
  group: string;
};
const Parameter: FC<ParametersProps> = ({ label, parameters, group }) => {
  const searchParams = useSearchParams();
  const filterData = searchParams.get('filter');
  const pathname = usePathname();

  return (
    <div className={styles.list}>
      <strong>{label}</strong>
      {map(parameters, (parameter, index) => {
        const isActive = isFilterActive(filterData, group, parameter.value);
        return (
          <Link
            href={decodeURIComponent(
              formatFilterString(pathname, filterData, group, parameter.value),
            )}
            key={index}
            className={`${styles.item} ${isActive ? styles.active : ''}`}
          >
            <span className={styles.checkbox}></span>
            {parameter.name}
          </Link>
        );
      })}
    </div>
  );
};

export default Parameter;
