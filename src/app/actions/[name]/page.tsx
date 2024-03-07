"use client";
import styles from "./discount.module.scss";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import { useEffect } from "react";
import Preloader from "@/components/preloader/Preloader";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";

type Params = {
  params: {
    name: string;
  };
};

export default function Discount({ params }: Params) {
  const loading = useTypedSelector((state) => state.discounts.loading);
  const currentDiscount = useTypedSelector(
    (state) => state.discounts.currentDiscount
  );
  const { getDiscountByName } = useActions();

  useEffect(() => {
    getDiscountByName(params.name);
  }, [params.name]);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <Breadcrumb
            categoryName={"actions"}
            productName={currentDiscount?.name}
          />

          <div className={styles.discount}>
            <div className={styles.discountTitle}>
              <div className={styles.discountTitleTitle}>
                <div className={styles.hr}></div>
                <p>{currentDiscount?.name}</p>
              </div>
            </div>

            <div className={styles.discountDescription}>
              <ul>
                <li>{currentDiscount?.description}</li>
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}
