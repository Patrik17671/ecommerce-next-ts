import map from 'lodash/map';
import styles from './Forms.module.scss';
import { PaymentOptionsType, SelectedData, SetSelectedData } from '@/types';
import { FC } from 'react';

type PaymentFormProps = {
  payments: PaymentOptionsType[] | null;
  selectedData: SelectedData;
  setSelecetedData: SetSelectedData;
};
const PaymentForm: FC<PaymentFormProps> = ({ payments, selectedData, setSelecetedData }) => {
  return (
    <div className={'flex flex-col gap-8'}>
      {map(payments, (item, index) => {
        return (
          <div
            key={index}
            className={`${styles.formItem} ${
              selectedData.paymentId == item.id ? styles.selected : ''
            }`}
            onClick={() => setSelecetedData({ ...selectedData, paymentId: item.id })}
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
export default PaymentForm;
