import React from "react";
import styles from "./ProductItem.module.scss";
import Title from "@/components/title/Title";
import Image from "next/image";
import PriceAndQuantity from "@/components/priceAndQuantity/PriceAndQuantity";
import Link from "next/link";
import Zsu from "../../../public/images/zsu.jpeg";
import ProductNavigation from "../productNavigation/ProductNavigation";

type Props = {
  products: any[];
  title?: string;
};

const ProductItem = ({ products, title }: Props) => {
  return (
    <div className={styles.product}>
      {title && <Title title={title} />}
      {title === "Роли" && <ProductNavigation />}
      <div className={styles.productWrapper}>
        {products.map((product) => {
          return (
            <div className={styles.productWrapperItem} key={product.id}>
              <Link href={`/product/${product.name}`}>
                {product.image ? (
                  <Image src={product.image} alt={product.name} height={240}/>
                ) : (
                  <Image src={Zsu} alt="defaultProductImage" height={240}/>
                )}
              </Link>
              <p className={styles.productWrapperItemName}>
                <Link href={`/product/${product.name}`}>{product.name}</Link>
              </p>
              {product.description && (
                <p className={styles.productWrapperItemDescription}>
                  {product.description}
                </p>
              )}
              {product.weight && (
                <p className={styles.productWrapperItemWeight}>
                  {product.weight} г
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
