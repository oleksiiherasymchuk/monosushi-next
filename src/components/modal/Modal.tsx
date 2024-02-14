import React from "react";
import styles from "./Modal.module.scss";

type Props = {
  isOpen?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
};

const Modal = ({ isOpen, onClose, children }: Props) => {
  const handleClick = (e: any) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;
  return (
    <div className={styles.modal} onClick={handleClick}>
      <div className={styles.modalOverlay}></div>
      <div className="bg-white p-4 rounded-lg z-10">{children}</div>
    </div>
  );
};

export default Modal;
