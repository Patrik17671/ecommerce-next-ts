'use client';
import Select from 'react-select';
import map from 'lodash/map';
import styles from './SizeSelect.module.scss';
import { SizeType } from '@/types';
import { FC } from 'react';

type SizesSelectProps = {
  setSelectedSize: (value: string) => void;
  sizes: SizeType[];
};

type SelectedOptionType = {
  value: string;
  label: string;
};

const SizesSelect: FC<SizesSelectProps> = ({ sizes, setSelectedSize }) => {
  const options = map(sizes, size => ({ value: size.size, label: size.size }));

  const handleChange = (selectedOption: SelectedOptionType | null) => {
    if (selectedOption?.value) {
      setSelectedSize(selectedOption.value);
    }
  };

  return (
    <div className={styles.select}>
      <Select
        options={options}
        onChange={handleChange}
        placeholder="Vyberte veľkosť"
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </div>
  );
};
export default SizesSelect;
