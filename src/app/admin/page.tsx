"use client";
import React, { useEffect } from "react";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/authContext/AuthContext";


export default function Page() {

  const { user } = useAuthContext()
  // const isAuth = useTypedSelector(state => state.auth.isAuthenticated)
  const router = useRouter()

  useEffect(() => {
    if (user == null){
      router.push("/")
      // alert('Admin page!!!')
    }
  }, [user])

  return (
    <></>
  );
  // const [activePage, setActivePage] = useState("Discounts");

  // const handleNavigationClick = (page: string) => {
  //   setActivePage(page);
  // };

  // const renderActivePage = () => {
  //   switch (activePage) {
  //     case "Discounts":
  //       return <AdminDiscounts />;
  //     case "Categories":
  //       return <AdminCategories />;
  //     case "Products":
  //       return <AdminProducts />;
  //     default:
  //       return null;
  //   }
  // };
  // return (
  //   <div className={styles.admin}>
  //     <AdminNavigation onNavigationClick={handleNavigationClick} />
  //     {renderActivePage()}
  //   </div>
  // );
}
