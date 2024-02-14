"use client";
import React, { useState } from "react";
import styles from "./AccountNavigation.module.scss";

type Props = {
  onNavigationClick: (page: string) => void;
};

type NavigationItem = {
  label: string;
  active: boolean;
  page: "PersonalInfo" | "History" | "Password";
};

const AccountNavigation = ({ onNavigationClick }: Props) => {
  const [navigationUserItems, setNavigationUserItems] = useState<
    NavigationItem[]
  >([
    { label: "Особисті дані", page: "PersonalInfo", active: true },
    { label: "Історія замовлень", page: "History", active: false },
    { label: "Зміна паролю", page: "Password", active: false },
  ]);

  const handleActiveItem = (page: string) => {
    const updatedItems = navigationUserItems.map((item) => ({
      ...item,
      active: item.page === page,
    }));
    setNavigationUserItems(updatedItems);
    onNavigationClick(page);
  };

  return (
    <div className={styles.navigation}>
      <ul>
        {navigationUserItems.map((nav) => (
          <li
            key={nav.page}
            className={nav.active ? styles.active : ""}
            onClick={() => handleActiveItem(nav.page)}
          >
            {nav.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountNavigation;
