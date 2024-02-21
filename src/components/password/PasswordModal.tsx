import React from 'react'
import styles from './PasswordPage.module.scss'
import { ModalContent } from './page';

type Props = {
  // content: ModalContent | undefined
  content: string | undefined
  onClose: () => void;
}

const PasswordModal = ({ content, onClose }: Props) => {
  return (
    <div className={styles.modal}>
    <button className="absolute top-4 right-4" onClick={onClose}>
      &times;
    </button>
    <p>{content}</p>
  </div>
  )
}

export default PasswordModal