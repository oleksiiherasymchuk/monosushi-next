'use client'
import React from "react";
import styles from "./PersonalHistory.module.scss";
import Link from "next/link";

type Props = {};

const PersonalHistory = (props: Props) => {


  const clientOrders = [
    {
      id: 1,
      name: "Запечені моно макі з лососем",
      time: "12.02.2024",
      delivery: "Самовивіз",
      sum: 251,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <p>Поки що ви не зробили жодного замовлення <Link href='/'>перейти в каталог</Link></p>
      {/* <table className={styles.table}>
        <thead>
          <tr>
            <td>№ замовлення</td>
            <td>Дата та час</td>
            <td>Адреса</td>
            <td>Сума</td>
            <td>Статус</td>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.head}>
            <td>№ 1</td>
            <td>08.2022 18:47:25</td>
            <td>Самовивіз</td>
            <td>
              <span>251</span> грн
            </td>
            <td>
              <p className={styles.done}>виконано</p>
              <p className={styles.repeat}>Повторити</p>
            </td>
          </tr>
          <tr>
            <td colSpan={3}>Запечений сет</td>
            <td>1</td>
          </tr>
          <tr>
            <td colSpan={3}>Запечені моно макі з лососем</td>
            <td>1</td>
          </tr>
          <tr className={styles.head}>
            <td>№ 2</td>
            <td>08.2022 18:47:25</td>
            <td>Самовивіз</td>
            <td>
              <span>251</span> грн
            </td>
            <td>
              <p className={styles.done}>виконано</p>
              <p className={styles.repeat}>Повторити</p>
            </td>
          </tr>
          <tr>
            <td colSpan={3}>Запечений сет</td>
            <td>1</td>
          </tr>
          <tr>
            <td colSpan={3}>Запечені моно макі з лососем</td>
            <td>1</td>
          </tr>
        </tbody>
      </table> */}
    </div>
  );
};

export default PersonalHistory;
