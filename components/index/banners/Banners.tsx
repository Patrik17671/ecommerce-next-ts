import { getCollections } from '@/app/api/fetches/getCollections';
import Carousel from '@/components/carousel/Carousel';
import map from 'lodash/map';
import Image from 'next/image';
import Link from 'next/link';
import isEmpty from 'lodash/isEmpty';
import styles from './Banners.module.scss';
import { BannersDocsType, CollectionType } from '@/types';

const Banners = async () => {
  const mainBannersData: CollectionType = await getCollections({
    slug: 'banners',
    filters: { location: { value: 'HOMEPAGE_MAIN', operator: 'equals' } },
  });
  const sideBannersData: CollectionType = await getCollections({
    slug: 'banners',
    filters: { location: { value: 'HOMEPAGE_MAINSIDE', operator: 'equals' } },
  });

  const mainBanners = mainBannersData.docs as BannersDocsType[];
  const sideBanners = sideBannersData.docs as BannersDocsType[];

  return (
    <div className={'container'}>
      <div className={styles.wrapper}>
        <div className={styles.main}>
          {!isEmpty(mainBanners) ? (
            <Carousel>
              {map(mainBanners, (banner, index: number) => {
                return (
                  <div key={index} className={'relative'}>
                    <Link aria-label={'Link to somewhere'} href={banner?.url || '/'}>
                      {banner.file.url ? (
                        <Image
                          width={800}
                          height={500}
                          src={banner.file.url}
                          sizes="(max-width: 768px) 100vw, 66vw)"
                          alt={banner?.file?.alt || 'photo'}
                          priority={index == 0}
                        />
                      ) : (
                        ''
                      )}
                    </Link>
                  </div>
                );
              })}
            </Carousel>
          ) : (
            ''
          )}
        </div>
        <div className={styles.side}>
          {!isEmpty(sideBanners) ? (
            <>
              {map(sideBanners, (banner, index: number) => {
                return (
                  <div key={index} className={'relative'}>
                    <Link aria-label={'Link to somewhere'} href={banner?.url || '/'}>
                      {banner.file.url ? (
                        <Image
                          src={banner.file.url}
                          width={300}
                          height={250}
                          sizes="(max-width: 768px) 50vw, 33vw)"
                          alt={banner?.file?.alt || 'photo'}
                        />
                      ) : (
                        ''
                      )}
                    </Link>
                  </div>
                );
              })}
            </>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};
export default Banners;
