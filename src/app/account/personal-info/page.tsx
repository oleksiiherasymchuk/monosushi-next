import React from 'react'
import styles from './PersonalInfo.module.scss'

type Props = {}

const PersonalInfo = (props: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <div className={styles.infoTitle}>
          <div className={styles.number}>1</div>
          <div className={styles.title}>Особисті дані</div>
        </div>

        <form>
          <div className={styles.names}>
            <input type="text" placeholder="*Імя" />
            <input type="text" placeholder="*Прізвище" />
          </div>
          <input type="text" placeholder="*Телефон" />
          <input type="text" placeholder="*Пошта" />
        </form>
      </div>

      <div className={styles.address}>
        <div className={styles.addressTitle}>
          <div className={styles.number}>2</div>
          <div className={styles.title}>Адреси</div>

          <div className={styles.AddressModal}></div>
        </div>

        <div className={styles.buttons}>
          <button className={styles.addAddress} type="submit">Додати адресу</button>
          <button className={styles.save} type="submit">Зберегти зміни</button>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo