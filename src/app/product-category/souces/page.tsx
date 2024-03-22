"use client";
import React, { useEffect } from "react";
import styles from "./Souces.module.scss";
import ProductItem from "@/components/productItem/ProductItem";
import Preloader from "@/components/preloader/Preloader";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";

const Souces = () => {
  const loading = useTypedSelector((state) => state.souces.loading);
  const souces = useTypedSelector((state) => state.souces.souces);

  const { getSoucesFromFirebaseThunk } = useActions();

  useEffect(() => {
    getSoucesFromFirebaseThunk();
  }, []);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <div className={styles.souces}>
          <ProductItem products={souces} title="Соуси" />
          <div className={styles.soucesText}>
            <p>
              Кожне замовлення включає в себе безкоштовні прибори, кількість
              яких залежить від кількості замовлених ролів. (1 рол = 1 людина)
            </p>
            <ul>
              <li>Імбир</li>
              <li>Васабі</li>
              <li>Соєвий соус</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Souces;
