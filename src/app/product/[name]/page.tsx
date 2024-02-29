"use client";
import React, { useEffect, useState } from "react";
import styles from "./ProductItem.module.scss";
import Image from "next/image";
import zsu from "../../../../public/images/zsu.jpeg";
import PriceAndQuantity from "@/components/priceAndQuantity/PriceAndQuantity";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import ProductItem from "@/components/productItem/ProductItem";
import ProductsItemSwiper from "@/components/productItem/ProductsItemSwiper";
import { ProductType, ProductsType } from "@/shared/types/products/product";
import {
  QueryDocumentSnapshot,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { database } from "@/firebase/config";
import Preloader from "@/components/preloader/Preloader";

type Params = {
  params: {
    name: string;
  };
};

const Product = ({ params }: Params) => {
  const [loading, setLoading] = useState<boolean>(true);

  const [drinks, setDrinks] = useState<ProductsType | null>(null);
  const [currentProduct, setCurrentProduct] = useState<ProductType | null>(
    null
  );
  const [sets, setSets] = useState<ProductsType | null>(null);

  useEffect(() => {
    const fetchSets = async () => {
      try {
        setLoading(true);
        const setsCollectionRef = collection(database, "products");
        const setsQuery = query(
          setsCollectionRef,
          where("category", "==", "sets")
        );
        const setsSnapshot = await getDocs(setsQuery);
        const setsData: ProductType[] = [];
        setsSnapshot.forEach((doc: QueryDocumentSnapshot) => {
          const data = doc.data();
          setsData.push({
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
        setSets(setsData);
      } catch (error) {
        console.error("Error fetching souces: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSets();
  }, []);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        setLoading(true);
        const drinksCollectionRef = collection(database, "products");
        const drinksQuery = query(
          drinksCollectionRef,
          where("category", "==", "drinks")
        );
        const drinksSnapshot = await getDocs(drinksQuery);
        const drinksData: ProductType[] = [];
        drinksSnapshot.forEach((doc: QueryDocumentSnapshot) => {
          const data = doc.data();
          drinksData.push({
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
        setDrinks(drinksData);
      } catch (error) {
        console.error("Error fetching souces: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDrinks();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productQuery = query(
          collection(database, "products"),
          where("path", "==", params.name)
        );
        const querySnapshot = await getDocs(productQuery);
        querySnapshot.forEach((doc) => {
          setCurrentProduct({
            id: doc.id,
            ...doc.data(),
          } as ProductType);
        });
      } catch (error) {
        console.error("Error fetching discount: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.name) {
      fetchProduct();
    }
  }, [params.name]);

  useEffect(() => {
    console.log(currentProduct);
  }, [currentProduct]);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <Breadcrumb
            categoryName={currentProduct?.category}
            productName={currentProduct?.name}
          />

          <div className={styles.product}>
            <div className={styles.productImage}>
              <Image
                src={currentProduct?.imagePath || zsu}
                alt={currentProduct?.name || "currentProductImage"}
                width={240}
                height={240}
              />
            </div>
            <div className={styles.productDescription}>
              <h5>{currentProduct?.name}</h5>
              <p>
                <span>Склад: </span>
                {currentProduct?.ingredients}
              </p>
              <p>
                <span>Вага: </span>
                {currentProduct?.weight}
              </p>
              <PriceAndQuantity product={currentProduct} />
            </div>
          </div>

          <div className={styles.trySwiper}>
            <h2>Також спробуйте</h2>
            <ProductsItemSwiper products={sets} slides={3} navigation={true} />
          </div>

          <div className={styles.tasteWithSwiper}>
            <h2>Смакує разом</h2>
            <ProductItem products={drinks} />
          </div>
        </>
      )}
    </>
  );
};

export default Product;
