"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import styles from "./AuthUserAccountBurgerMenu.module.scss";
import Link from "next/link";
import User from "../../../public/images/user.svg";

type Props = {
  logout: () => void;
};

const AuthUserAccountBurgerMenu = ({ logout }: Props) => {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState<boolean>(false);
  const toggleModal = () => setIsBurgerMenuOpen(!isBurgerMenuOpen);
  const burgerMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        burgerMenuRef.current &&
        !burgerMenuRef.current.contains(event.target as Node)
      ) {
        setIsBurgerMenuOpen(false);
      }
    };

    if (isBurgerMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isBurgerMenuOpen]);

  const preventPropagation = (e: React.MouseEvent) => {
    setIsBurgerMenuOpen(false);
    e.stopPropagation();
  };

  return (
    <div
      className={styles.menu}
      onClick={toggleModal}
      ref={burgerMenuRef}
    >
      <Image src={User} alt="user" height={25} width={25} />

      {
        isBurgerMenuOpen && (
          <div className={styles.menuBurger} onClick={preventPropagation}>
            <Image
              src={User}
              height={25}
              width={25}
              alt="burgerMenuOpenIcon"
              className={styles.menuBurgerIcon}
              onClick={toggleModal}
            />

            <div className={styles.menuBurgerItem}>
              <Link href="/account">Особисті дані </Link>
            </div>

            <div className={styles.menuBurgerItem}>
              {/* <Link href="/account">Історія замовлень</Link> */}
              <Link href="/">Замовити</Link>
            </div>
            <div className={styles.menuBurgerItem}>
              <Link href="/actions">Акції</Link>
            </div>
            <div className={styles.menuBurgerItem} onClick={() => logout()}>
              <button>Вихід</button>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default AuthUserAccountBurgerMenu;

{
  /* <div className={styles.headerMenu} onClick={toggleMenu} ref={burgerMenuRef}>
<Image src={Menu} height={50} width={50} alt="burgerMenu" />
</div> */
}
