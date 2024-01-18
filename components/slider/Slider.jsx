'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './Slider.module.scss';
import IconRight from '@/components/_other/icons/IconRight';
import IconLeft from '@/components/_other/icons/IconLeft';

const Slider = ({ children, btnClass = '', sliderClass = '' }) => {
  const containerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef?.current;
      setShowLeftArrow(container?.scrollLeft > 0);
      setShowRightArrow(container?.scrollLeft < container?.scrollWidth - container?.clientWidth);
    };
    handleScroll();
    containerRef?.current?.addEventListener('scroll', handleScroll);
    return () => containerRef?.current?.removeEventListener('scroll', handleScroll);
  }, [children]);

  const handleScroll = scrollOffset => {
    containerRef.current.scrollLeft += scrollOffset;
  };
  return (
    <div className={`${styles.wrapper}`}>
      <span
        className={`${styles.btn} ${styles.btnRight} ${btnClass} ${
          showRightArrow ? styles.visible : ''
        }`}
        onClick={() => handleScroll(365)}
      >
        <IconRight />
      </span>
      <div ref={containerRef} className={`${styles.slider} ${sliderClass ? sliderClass : ''}`}>
        {children}
      </div>
      <span
        className={`${styles.btn} ${styles.btnLeft} ${btnClass} ${
          showLeftArrow ? styles.visible : ''
        }`}
        onClick={() => handleScroll(-365)}
      >
        <IconLeft />
      </span>
    </div>
  );
};
export default Slider;
