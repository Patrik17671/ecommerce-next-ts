import styles from './Header.module.scss';
import HeaderClient from '@/components/header/HeaderClient';
// import Logo from '@/components/logo/Logo';
import { getGlobals } from '@/app/api/fetches/getGlobals';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import { FC } from 'react';
import { HeaderType } from '@/types';
import Link from 'next/link';

const Header: FC = async () => {
  const data: HeaderType = await getGlobals({ slug: 'header' });
  const categories = data?.categories;
  const customLinks = data?.customLinks;

  return (
    <HeaderClient>
      <div className={styles.wrapper}>
        {/*<Logo />*/}
        <ul>
          <>
            {!isEmpty(categories) ? (
              <>
                {map(categories, (item, index: number) => {
                  return (
                    <li key={index}>
                      <Link href={item.url || '/'}>{item.title}</Link>
                    </li>
                  );
                })}
              </>
            ) : (
              ''
            )}
            {!isEmpty(customLinks) ? (
              <>
                {map(customLinks, (item, index: number) => {
                  return (
                    <li key={index}>
                      <Link href={item?.url || '/'}>{item.label}</Link>
                    </li>
                  );
                })}
              </>
            ) : (
              ''
            )}
          </>
        </ul>
      </div>
    </HeaderClient>
  );
};

export default Header;
