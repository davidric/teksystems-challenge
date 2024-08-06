import React from 'react';
import styles from './styles.module.css';
import Spinner from '../Spinner';
import { ButtonProps } from '../../types';

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  isLoading,
  loadingText,
  disabled,
  children,
}: React.PropsWithChildren<ButtonProps>) => {
  return (
    <button
      type="submit"
      className={disabled ? styles.btnDisabled : styles.btn}
      disabled={disabled || isLoading}
    >
      {isLoading && <Spinner />}
      <span>{isLoading ? loadingText : children}</span>
    </button>
  );
};

export default Button;
