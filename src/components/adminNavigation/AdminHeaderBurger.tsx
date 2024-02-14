import Image from "next/image";
import React from "react";
import styles from "./AdminHeaderBurger.module.scss";
import Link from "next/link";
import User from "../../../public/images/user.svg";

type Props = {};

const AdminHeaderBurger = (props: Props) => {
  const preventPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  return (
    <div className={styles.modal} onClick={preventPropagation}>
      <Image
        src={User}
        height={50}
        width={50}
        alt="burgerMenuOpenIcon"
        className={styles.modalIcon}
      />

      <div className={styles.modalItem}>
        <Link href="/dostavka-ta-oplata"> Особисті дані </Link>
      </div>

      <div className={styles.modalItem}>
        <Link href="/about-us">Історія замовлень</Link>
      </div>
      <div className={styles.modalItem}>
        <Link href="/actions">Зміна паролю</Link>
      </div>
      <div className={styles.modalItem}>
        <Link href="/">Вихід</Link>
      </div>
    </div>
  );
};

export default AdminHeaderBurger;
