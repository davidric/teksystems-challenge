import React from 'react';
import styles from './styles.module.css';
import Spinner from '../Spinner';

interface Props {
  isLoading?: boolean;
  loadingText?: string;
  disabled?: boolean;
}

const Button: React.FC<React.PropsWithChildren<Props>> = ({
  isLoading,
  loadingText,
  disabled,
  children,
}: React.PropsWithChildren<Props>) => {
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
