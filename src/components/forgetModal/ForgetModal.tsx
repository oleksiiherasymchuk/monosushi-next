import React from "react";
import styles from "./ForgetModal.module.scss";

type Props = {
  onClose: () => void;
  changeContent: (content: "auth" | "signIn" | "forget") => void;
};

const ForgetModal = ({ onClose, changeContent }: Props) => {

  const switchToSignIn = () => {
    changeContent("signIn");
  };
  
  return (
    <div className={styles.forgetModal}>
      <button className="absolute top-4 right-4" onClick={onClose}>
        &times;
      </button>
      <h1>Відновити пароль</h1>
      <h3>
        Після заповнення інструкції, ми надішлемо вам детальну інструкцію по
        відновленню паролю
      </h3>
      <form>
        <input type="email" placeholder="*Ваш email" />
        <button>ВІДНОВИТИ ПАРОЛЬ</button>
        <p>
          <span>Повернутися до</span>
          <span onClick={switchToSignIn}>Входу</span>
        </p>
      </form>
    </div>
  );
};

export default ForgetModal;
