import React from 'react';
import styles from './styles.module.css';
import { ModalProps } from '../../types';

const Modal: React.FC<ModalProps> = ({ show, onClose, title, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h2>{title}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles.modalBody}>{children}</div>
        <div className={styles.modalFooter}>
          <button className={styles.actionButton} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
