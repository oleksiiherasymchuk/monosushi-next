import React from 'react';
import styles from './Modal.module.scss';

type Props = {
  isOpen?: boolean,
  onClose?: () => void,
  children?: React.ReactNode
}

const Modal = ({ isOpen, onClose, children }: Props) => {

  const handleClick = (e: any) => {
    // Prevent clicks from propagating outside the modal content
    e.stopPropagation();
  };

  if (!isOpen) return null;
  return (
    <div className={styles.modal} onClick={handleClick}>
      <div className={styles.modalOverlay}></div>
      <div className="bg-white p-4 rounded-lg z-10">
        {/* <button className="absolute top-2 right-2" onClick={onClose}>
          &times;
        </button> */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
