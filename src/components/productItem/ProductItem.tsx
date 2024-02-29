"use client";
import React, { useEffect, useState } from "react";
import styles from "./ProductItem.module.scss";
import Title from "@/components/title/Title";
import Image from "next/image";
import PriceAndQuantity from "@/components/priceAndQuantity/PriceAndQuantity";
import Link from "next/link";
import Zsu from "../../../public/images/zsu.jpeg";
import ProductNavigation from "../productNavigation/ProductNavigation";
import { ProductType, ProductsType } from "@/shared/types/products/product";
import {
  QueryDocumentSnapshot,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { database } from "@/firebase/config";
import Preloader from "../preloader/Preloader";

type Props = {
  products: null | any[];
  title?: string;
};

const ProductItem = ({ products, title }: Props) => {
  const [rolls, setRolls] = useState<ProductsType | null>(null);
  const [sortedRolls, setSortedRolls] = useState<ProductsType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleNavigationClick = (label: string) => {
    let sortedProducts: ProductType[] | any = [];

    if (label === "Всі") {
      sortedProducts = rolls;
    } else if (label === "Роли Філадельфія") {
      sortedProducts = rolls?.filter((product) =>
        product.path?.startsWith("filadelfiya")
      );
    } else if (label === "Роли Каліфорнія") {
      sortedProducts = rolls?.filter((product) =>
        product.path?.startsWith("kaliforniya")
      );
    } else if (label === "Запечені роли") {
      sortedProducts = rolls?.filter((product) =>
        product.path?.startsWith("zapechenyj")
      );
    } else if (label === "Роли Макі") {
      sortedProducts = rolls?.filter((product) =>
        product.path?.startsWith("maki")
      );
    } else if (label === "Преміум суші") {
      sortedProducts = rolls?.filter(
        (product) => parseInt(product.price) > 350
      );
    } else if (label === "Фірмові суші") {
      sortedProducts = rolls?.filter(
        (product) =>
          !product.path?.startsWith("filadelfiya") &&
          !product.path?.startsWith("kaliforniya") &&
          !product.path?.startsWith("zapechenyj") &&
          !product.path?.startsWith("maki") &&
          !(parseInt(product.price) > 350)
      );
    }

    setSortedRolls(sortedProducts);
  };

  const sortProducts = (products: any[]) => {
    products.sort((a, b) => a.name.localeCompare(b.name));

    const index = products.findIndex(
      (product) => product.name === "Допоможи ЗСУ разом з Моносушиком"
    );

    if (index !== -1) {
      const item = products.splice(index, 1)[0];
      products.unshift(item);
    }

    return products;
  };

  const sortedProducts = sortProducts(products || []);

  useEffect(() => {
    const fetchRolls = async () => {
      try {
        setLoading(true);
        const rollsCollectionRef = collection(database, "products");
        const rollsQuery = query(
          rollsCollectionRef,
          where("category", "==", "rolls")
        );
        const rollsSnapshot = await getDocs(rollsQuery);
        const rollsData: ProductType[] = [];
        rollsSnapshot.forEach((doc: QueryDocumentSnapshot) => {
          const data = doc.data();
          rollsData.push({
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
        setRolls(rollsData);
        setSortedRolls(sortProducts(rollsData));
      } catch (error) {
        console.error("Error fetching souces: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRolls();
  }, []);

  const renderProduct = (product: ProductType) => (
    <div className={styles.productWrapperItem} key={product.id}>
      <Link
        href={`/product/${product.path}`}
        className={styles.productWrapperItemImage}
      >
        <Image
          src={product.imagePath || Zsu}
          alt={product.name}
          height={240}
          width={240}
        />
      </Link>
      <p className={styles.productWrapperItemName}>
        <Link href={`/product/${product.path}`}>{product.name}</Link>
      </p>
      {product.ingredients && (
        <p className={styles.productWrapperItemDescription}>
          {product.ingredients}
        </p>
      )}
      {product.weight && (
        <p className={styles.productWrapperItemWeight}>{product.weight}</p>
      )}
      <PriceAndQuantity product={product} />
    </div>
  );

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <div className={styles.product}>
          {title && <Title title={title} />}
          {title === "Роли" && (
            <ProductNavigation onNavigationClick={handleNavigationClick} />
          )}
          <div className={styles.productWrapper}>
            {(title === "Роли" ? sortedRolls : products)?.map(renderProduct)}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductItem;
