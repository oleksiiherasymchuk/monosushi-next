import React, { useState } from "react";
import styles from "../accountNavigation/AccountNavigation.module.scss";

type Props = {
  onNavigationClick: (page: string) => void;
};

type NavigationItem = {
  label: string;
  active: boolean;
  page: "Discounts" | "Categories" | "Products" | "Orders";
};

const AdminNavigation = ({ onNavigationClick }: Props) => {
  const [navigationUserItems, setNavigationUserItems] = useState<
    NavigationItem[]
  >([
    { label: "Акції", page: "Discounts", active: true },
    { label: "Категорії", page: "Categories", active: false },
    { label: "Продукти", page: "Products", active: false },
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

export default AdminNavigation;
