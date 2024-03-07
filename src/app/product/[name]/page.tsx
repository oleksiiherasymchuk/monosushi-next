"use client";
import React, { useEffect } from "react";
import styles from "./ProductItem.module.scss";
import Image from "next/image";
import zsu from "../../../../public/images/zsu.jpeg";
import PriceAndQuantity from "@/components/priceAndQuantity/PriceAndQuantity";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import ProductItem from "@/components/productItem/ProductItem";
import ProductsItemSwiper from "@/components/productItem/ProductsItemSwiper";
import Preloader from "@/components/preloader/Preloader";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";
import { ProductType } from "@/shared/types/products/product";

type Params = {
  params: {
    name: string;
  };
};

const Product = ({ params }: Params) => {
  const { loading, currentProduct } = useTypedSelector(
    (state) => state.products
  );
  const drinks = useTypedSelector((state) => state.drinks.drinks);
  const sets = useTypedSelector((state) => state.sets.sets);

  const {
    getDrinksFromFirebaseThunk,
    getSetsFromFirebaseThunk,
    getProductByName,
  } = useActions();

  useEffect(() => {
    getDrinksFromFirebaseThunk();
    getSetsFromFirebaseThunk();
    getProductByName(params.name);
  }, [params.name]);

  const sortSets = (sets: ProductType[]) => {
    const sortedSets = [...sets];

    sortedSets.sort((a, b) => a.name.localeCompare(b.name));

    const index = sortedSets.findIndex(
      (set) => set.name === "Допоможи ЗСУ разом з Моносушиком"
    );

    if (index !== -1) {
      const item = sortedSets.splice(index, 1)[0];
      sortedSets.unshift(item);
    }

    return sortedSets;
  };

  const sortedSets = sortSets(sets || []);

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
              {currentProduct?.ingredients && (
                <p>
                  <span>Склад: </span>
                  {currentProduct?.ingredients}
                </p>
              )}
              {currentProduct?.weight && (
                <p>
                  <span>Вага: </span>
                  {currentProduct?.weight}
                </p>
              )}
              <PriceAndQuantity product={currentProduct} />
            </div>
          </div>

          <div className={styles.trySwiper}>
            <h2>Також спробуйте</h2>
            <ProductsItemSwiper
              products={sortedSets}
              slides={3}
              navigation={true}
            />
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
