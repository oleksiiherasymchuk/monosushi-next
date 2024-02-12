"use client"
import React, { useState } from "react";
import styles from './Admin.module.scss'
import AdminDiscounts from "./discounts/page";
import AdminCategories from "./categories/page";
import AdminProducts from "./products/page";
import AdminNavigation from "@/components/adminNavigation/AdminNavigation";


type Props = {};

export default function Page(){
  const [activePage, setActivePage] = useState("Discounts"); // Default to PersonalInfo

  // Function to handle navigation click
  const handleNavigationClick = (page: string) => {
    setActivePage(page);
  };

  // Render the active page based on state
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
      {/* <PersonalInfo /> */}
      {renderActivePage()}
    </div>
  )
} 
