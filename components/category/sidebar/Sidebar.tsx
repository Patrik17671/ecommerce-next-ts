'use client';
import useSWR from 'swr';
import { fetcher } from '@/app/api/utils';
import Parameter from '@/components/category/parameters/Parameter';
import { useState } from 'react';
import styles from './Sidebar.module.scss';

const Sidebar = () => {
  const { data, isLoading } = useSWR(`/api/parameters`, fetcher);
  const [active, setActive] = useState<boolean>(false);

  let colors;
  let sizes;

  if (data && data.docs) {
    colors = data.docs[0].colors;
  }
  if (data && data.docs) {
    sizes = data.docs[0].sizes;
  }

  return (
    <div>
      <aside className={`${styles.sidebar} ${active ? styles.active : ''}`}>
        {isLoading ? (
          <span>Načitavam...</span>
        ) : (
          <>
            <Parameter label={'Veľkosti'} parameters={sizes} group={'sizes'} />
            <Parameter label={'Farby'} parameters={colors} group={'colors'} />
          </>
        )}
      </aside>
      <span onClick={() => setActive(!active)} className={styles.btn}>
        {!active ? 'Otvoriť filter' : 'Zatvoriť filter'}
      </span>
    </div>
  );
};
export default Sidebar;
