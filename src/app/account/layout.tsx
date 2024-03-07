"use client"
import AccountNavigation from '@/components/accountNavigation/AccountNavigation';
import React, { useState } from 'react';
import styles from './Account.module.scss'
import PersonalInfo from "../../components/personal-info/page";
import PasswordPage from "../../components/password/page";
import PersonalHistory from "../../components/history/page";

interface AccountLayoutProps {
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({ children}) => {
  const [activePage, setActivePage] = useState("PersonalInfo");

 
  const handleNavigationClick = (page: string) => {
    setActivePage(page);
    // router.push(`/account/?tab=${page}`);
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
  }

  return (
    <div className={styles.account}>
      <AccountNavigation onNavigationClick={handleNavigationClick}/>
      {children}
      { renderActivePage() }
    </div>
  );
};

export default AccountLayout;