"use client"
import React, { useState } from 'react';
import styles from './Admin.module.scss'
import AdminNavigation from '@/components/adminNavigation/AdminNavigation';
import AdminDiscounts from '@/components/discounts/page';
import AdminCategories from '@/components/categories/page';
import AdminProducts from '@/components/products/page';

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children}) => {
  const [activePage, setActivePage] = useState("Discounts");

  const handleNavigationClick = (page: string) => {
    setActivePage(page);
  };

  const renderActivePage = () => {
    switch (activePage) {
      case "Discounts":
        return <AdminDiscounts />;
      case "Categories":
        return <AdminCategories />;
      case "Products":
        return <AdminProducts />;
      default:
        return null;
    }
  };
  return (
    <div className={styles.admin}>
      <AdminNavigation onNavigationClick={handleNavigationClick} />
      { children }
      {renderActivePage()}
    </div>
  );
};

export default AdminLayout;