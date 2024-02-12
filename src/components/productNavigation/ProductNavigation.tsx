"use client"
import React, { useState } from "react";
import styles from "./ProductNavigation.module.scss";

type Props = {};

type NavigationItem = {
  label: string;
  active: boolean;
};

const ProductNavigation = (props: Props) => {
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([
    { label: "Всі", active: true },
    { label: "Роли Філадельфія", active: false },
    { label: "Роли Каліфорнія", active: false },
    { label: "Запечені роли", active: false },
    { label: "Фірмові суші", active: false },
    { label: "Роли Макі", active: false },
    { label: "Преміум суші", active: false },
  ]);

  const handleActiveItem = (index: number, e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault()
    const changeActiveItem = navigationItems.map((item, i) => ({
      ...item,
      active: i === index,
    }));
    setNavigationItems(changeActiveItem);
  }

  return (
    <div className={styles.navigation}>
      <ul>
        {navigationItems.map((nav, index) => (
          <li key={index} className={nav.active ? styles.active : ""} onClick={(e) => handleActiveItem(index, e)}>
            {/* <Link href="#">{nav.label}</Link> */}
            {nav.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductNavigation;