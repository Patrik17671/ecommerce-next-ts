'use client';
import Carousel from 'nuka-carousel';
import IconRight from '@/components/_other/icons/IconRight';
import IconLeft from '@/components/_other/icons/IconLeft';
import styles from './Carousel.module.scss';
const CarouselComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.carousel}>
      <Carousel
        wrapAround={true}
        autoplay={true}
        renderCenterRightControls={({ nextSlide }) => (
          <span onClick={nextSlide} className={`${styles.arrows} ${styles.arrowRight}`}>
            <IconRight />
          </span>
        )}
        renderCenterLeftControls={({ previousSlide }) => (
          <span onClick={previousSlide} className={`${styles.arrows} ${styles.arrowLeft}`}>
            <IconLeft />
          </span>
        )}
      >
        {children}
      </Carousel>
    </div>
  );
};
export default CarouselComponent;
