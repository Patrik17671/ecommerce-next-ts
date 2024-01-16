'use client';
import styles from '@/components/header/Header.module.scss';
import IconMenu from '@/components/_other/icons/IconMenu';
import IconClose from '@/components/_other/icons/IconClose';
import { FC, useState } from 'react';
import ConsoleLog from '@/utils/consoleLog';
import { ReactNode } from 'react';

type ChildrenType = {
  children?: ReactNode;
};

const HeaderClient: FC<ChildrenType> = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(false);

  return (
    <header className={`${styles.header} ${activeMenu ? styles.activeMenu : ''}`}>
      <div className={'container ' + styles.container}>
        {children}
        <span className={styles.hamburger} onClick={() => setActiveMenu(!activeMenu)}>
          <IconMenu className={styles.menu} />
          <IconClose className={styles.close} />
        </span>
      </div>
    </header>
  );
};
export default HeaderClient;
