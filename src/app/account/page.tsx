"use client";
import React, { useState } from "react";
import styles from "./Account.module.scss";
import AccountNavigation from "@/components/accountNavigation/AccountNavigation";
import PersonalInfo from "./personal-info/page";
import PasswordPage from "./password/page";
import PersonalHistory from "./history/page";

type Props = {};

export default function Page() {
  const [activePage, setActivePage] = useState("PersonalInfo");

  const handleNavigationClick = (page: string) => {
    setActivePage(page);
  };

  const renderActivePage = () => {
    switch (activePage) {
      case "PersonalInfo":
        return <PersonalInfo />;
      case "History":
        return <PersonalHistory />;
      case "Password":
        return <PasswordPage />;
      default:
        return null;
    }
  };
  return (
    <div className={styles.account}>
      <AccountNavigation onNavigationClick={handleNavigationClick} />
      {renderActivePage()}
    </div>
  );
}
