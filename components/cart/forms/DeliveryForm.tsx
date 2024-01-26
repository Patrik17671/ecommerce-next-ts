import map from 'lodash/map';
import styles from './Forms.module.scss';
import { FC } from 'react';
import { PaymentOptionsType, SelectedData, SetSelectedData } from '@/types';

type DeliveryFormProps = {
  delivery: PaymentOptionsType[] | null;
  selectedData: SelectedData;
  setSelecetedData: SetSelectedData;
};

const DeliveryForm: FC<DeliveryFormProps> = ({ delivery, selectedData, setSelecetedData }) => {
  return (
    <div className={'flex flex-col gap-8'}>
      {map(delivery, (item, index) => {
        return (
          <div
            key={index}
            className={`${styles.formItem} ${
              selectedData.deliveryId == item.id ? styles.selected : ''
            }`}
            onClick={() => setSelecetedData({ ...selectedData, deliveryId: item.id })}
          >
            <span className={styles.checkbox}></span>
            <div className={styles.content}>
              <span>{item.name}</span>
              <span>{item.price} €</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default DeliveryForm;
