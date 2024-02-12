import React from "react";
import styles from "./PasswordPage.module.scss";

type Props = {};

const PasswordPage = (props: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <div className={styles.infoTitle}>
          <div className={styles.title}>Зміна паролю</div>
        </div>

        <form>
          <input type="text" placeholder="*Ваш поточний пароль" />
          <input type="text" placeholder="*Новий пароль" />
          <input type="text" placeholder="*Повторіть пароль" />
        </form>

        <div className={styles.buttons}>
          <button className={styles.cancel} type="submit">
            Скасувати
          </button>
          <button className={styles.save} type="submit">
            Зберегти зміни
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordPage;
