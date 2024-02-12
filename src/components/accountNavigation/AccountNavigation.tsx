"use client"
import React, { useState } from "react";
import styles from "./AccountNavigation.module.scss";

type Props = {
  onNavigationClick: (page: string) => void,

}

type NavigationItem = {
  label: string;
  active: boolean;
  page: 'PersonalInfo' | 'History' | 'Password';
};

const AccountNavigation = ({ onNavigationClick }: Props) => {
  const [navigationUserItems, setNavigationUserItems] = useState<NavigationItem[]>([
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


// const AccountNavigation = (props: Props) => {
//     const [navigationUserItems, setNavigationUserItems] = useState<NavigationItem[]>([
//       { label: "Особисті дані", active: true },
//       { label: "Історія замовлень", active: false },
//       { label: "Зміна паролю", active: false },
//     ]);
  
//     const handleActiveItem = (index: number, e: React.MouseEvent<HTMLLIElement>) => {
//       e.preventDefault()
//       const changeActiveItem = navigationUserItems.map((item, i) => ({
//         ...item,
//         active: i === index,
//       }));
//       setNavigationUserItems(changeActiveItem);
//     }
  
//     return (
//       <div className={styles.navigation}>
//         <ul>
//           {navigationUserItems.map((nav, index) => (
//             <li key={index} className={nav.active ? styles.active : ""} onClick={(e) => handleActiveItem(index, e)}>
//               {nav.label}
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
// }