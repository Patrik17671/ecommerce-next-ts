import styles from './Header.module.scss';
import Link from 'next/link';
const Logo = () => {
  return (
    <Link href={'/'} className={styles.logo}>
      Spilus
    </Link>
  );
};
export default Logo;
