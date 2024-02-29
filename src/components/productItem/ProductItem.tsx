import React from "react";
import styles from "./ProductItem.module.scss";
import Title from "@/components/title/Title";
import Image from "next/image";
import PriceAndQuantity from "@/components/priceAndQuantity/PriceAndQuantity";
import Link from "next/link";
import Zsu from "../../../public/images/zsu.jpeg";
import ProductNavigation from "../productNavigation/ProductNavigation";

type Props = {
  products: null | any[];
  title?: string;
};

const ProductItem = ({ products, title }: Props) => {

  const sortProducts = (products: any[]) => {
    products.sort((a, b) => a.name.localeCompare(b.name));
  
    const index = products.findIndex(product => product.name === "Допоможи ЗСУ разом з Моносушиком");
  
    if (index !== -1) {
      const item = products.splice(index, 1)[0];
      products.unshift(item);
    }
  
    return products;
  };
  
  const sortedProducts = sortProducts(products || []);

  return (
    <div className={styles.product}>
      {title && <Title title={title} />}
      {title === "Роли" && <ProductNavigation />}
      <div className={styles.productWrapper}>
        {sortedProducts?.map((product) => {
          return (
            <div className={styles.productWrapperItem} key={product.id}>
              <Link href={`/product/${product.path}`} className={styles.productWrapperItemImage}>
                {product.imagePath ? (
                  <Image src={product.imagePath} alt={product.name} height={240} width={240}/>
                ) : (
                  <Image src={Zsu} alt="defaultProductImage" height={240} width={240}/>
                )}
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
                <p className={styles.productWrapperItemWeight}>
                  {product.weight}
                </p>
              )}
              <PriceAndQuantity product={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductItem;
