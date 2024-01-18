import { ProductsDocsType } from '@/types';
import map from 'lodash/map';
import Card from '@/components/card/Card';
import { FC } from 'react';
import Slider from '@/components/slider/Slider';
import styles from './ProuctsSlider.module.scss';

type ProductsSliderProps = {
  title?: string;
  products?: ProductsDocsType[];
};

const ProductsSlider: FC<ProductsSliderProps> = ({ title, products }) => {
  return (
    <div className={styles.slider}>
      <strong className={styles.title}>{title}</strong>
      <Slider>
        {map(products, (product, index: number) => {
          return <Card key={index} product={product} />;
        })}
      </Slider>
    </div>
  );
};
export default ProductsSlider;
