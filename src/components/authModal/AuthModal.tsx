import React from "react";
import styles from "./AuthModal.module.scss";
// use react hook form

type Props = {
  onClose: () => void;
  changeContent: (content: "auth" | "signIn" | "forget") => void;
};

const AuthModal = ({ onClose, changeContent }: Props) => {
  const switchToForget = () => {
    changeContent("forget");
  };

  const switchToSignIn = () => {
    changeContent("signIn");
  };

  return (
    <div className={styles.entrance}>
      <button className="absolute top-4 right-4" onClick={onClose}>
        &times;
      </button>
      <h1>Вхід в кабінет</h1>
      <form>
        <input type="email" placeholder="*Ваш email" className="form-control" />
        <input type="password" placeholder="*Пароль" />
        <button type="submit">УВІЙТИ В КАБІНЕТ</button>
        <p>
          <span className="forgot" onClick={switchToForget}>
            Забули пароль?
          </span>
          <span className="signIn" onClick={switchToSignIn}>
            Зареєструватися
          </span>
        </p>
      </form>
    </div>
  );
};

export default AuthModal;
