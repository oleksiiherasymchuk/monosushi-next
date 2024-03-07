"use client";
import React from "react";
import styles from "./ProductItem.module.scss";
import Title from "@/components/title/Title";
import Image from "next/image";
import PriceAndQuantity from "@/components/priceAndQuantity/PriceAndQuantity";
import Link from "next/link";
import Zsu from "../../../public/images/zsu.jpeg";
import ProductNavigation from "../productNavigation/ProductNavigation";
import { ProductType } from "@/shared/types/products/product";

type Props = {
  products: ProductType[] | null;
  title?: string;
  onNavigationClick?: (label: string) => void;
};

const ProductItem = ({ products, title, onNavigationClick }: Props) => {
  const sortProducts = (products: any[]) => {
    const sortedProducts = [...products];

    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));

    const index = sortedProducts.findIndex(
      (product) => product.name === "Допоможи ЗСУ разом з Моносушиком"
    );

    if (index !== -1) {
      const item = sortedProducts.splice(index, 1)[0];
      sortedProducts.unshift(item);
    }

    return sortedProducts;
  };

  const sortedProducts = sortProducts(products || []);

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
    <div className={styles.product}>
      {title && <Title title={title} />}
      {title === "Роли" && (
        <ProductNavigation onNavigationClick={onNavigationClick} />
      )}
      <div className={styles.productWrapper}>
        {sortedProducts?.map(renderProduct)}
      </div>
    </div>
  );
};

export default ProductItem;
