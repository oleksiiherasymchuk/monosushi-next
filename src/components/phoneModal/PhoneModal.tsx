import React from "react";
import styles from "./PhoneModal.module.scss";

type Props = {
  onClose: () => void;
};

const PhoneModal = ({ onClose }: Props) => {
  return (
    <div className={styles.phoneModal}>
      <button className="absolute top-2 right-2" onClick={onClose}>
        &times;
      </button>
      <h1>Ми зателефонуємо</h1>
      <h3>Залиште номер телефону і наші менеджери звяжуться з вами</h3>
      <form className={styles.phoneModalForm}>
        <input
          className={styles.phoneModalFormName}
          type="text"
          placeholder="Ваше ім'я"
        />
        <input
          className={styles.phoneModalFormNumber}
          type="number"
          placeholder="Ваш номер телефону"
          pattern="[0-9]*"
        />
        <button className={styles.phoneModalFormSend}>НАДІСЛАТИ</button>
      </form>
    </div>
  );
};

export default PhoneModal;
