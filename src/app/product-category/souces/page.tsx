"use client";
import React, { useState, useEffect } from "react";
import styles from "./Souces.module.scss";
import ProductItem from "@/components/productItem/ProductItem";
import {
  QueryDocumentSnapshot,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { database } from "@/firebase/config";
import Preloader from "@/components/preloader/Preloader";
import { ProductType, ProductsType } from "@/shared/types/products/product";

type Props = {};

const Souces = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [souces, setSouces] = useState<ProductsType | null>(null);

  useEffect(() => {
    const fetchSouces = async () => {
      try {
        setLoading(true);
        const soucesCollectionRef = collection(database, "products");
        const soucesQuery = query(
          soucesCollectionRef,
          where("category", "==", "souces")
        );
        const soucesSnapshot = await getDocs(soucesQuery);
        const soucesData: ProductType[] = [];
        soucesSnapshot.forEach((doc: QueryDocumentSnapshot) => {
          const data = doc.data();
          soucesData.push({
            id: doc.id,
            name: data.name || "",
            category: data.category || "",
            path: data.path || "",
            ingredients: data.ingredients || "",
            description: data.description || "",
            price: data.price || "",
            weight: data.weight || "",
            imagePath: data.imagePath || "",
          });
        });
        setSouces(soucesData);
      } catch (error) {
        console.error("Error fetching souces: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSouces();
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
