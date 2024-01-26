'use client';
import { FC, InputHTMLAttributes } from 'react';
import styles from './TextInput.module.scss';
import isEmpty from 'lodash/isEmpty';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { ContactFormInputs } from '@/types';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: keyof ContactFormInputs;
  placeholder?: string;
  required?: boolean;
  errors?: FieldError;
  register: UseFormRegister<ContactFormInputs>;
  validationSchema: any;
}

const TextInput: FC<TextInputProps> = ({
  label,
  name,
  placeholder,
  required = false,
  errors,
  register,
  validationSchema,
}) => {
  return (
    <div className={`${styles.inputWrap} ${!isEmpty(errors) ? styles.error : ''}`}>
      {label && (
        <label>
          {label}
          {required ? '*' : ''}
        </label>
      )}
      <input
        id={name}
        {...register(name, validationSchema)}
        type="text"
        placeholder={placeholder}
      />
      {errors && errors?.message ? <span className={styles.error}>{errors.message}</span> : ''}
    </div>
  );
};

export default TextInput;
