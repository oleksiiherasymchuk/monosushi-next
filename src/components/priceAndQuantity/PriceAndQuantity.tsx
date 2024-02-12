"use client";
import React, { useState } from "react";
import styles from "./PriceAndQuantity.module.scss";

type Props = {
  // price: number,
  // quantity: number,
  product: any;
};

const PriceAndQuantity = ({ product }: Props) => {
  const productCount = (product: any, value: boolean) => {};
  const addToBasket = (product: any) => {}

  const [productQuantity, setProductQuantity] = useState<number>(1)

  return (
    <div className={styles.controls}>
      <div className={styles.controlsPrice}>
        <span>{product.price * productQuantity}</span> грн
      </div>
      <div className={styles.controlsQuantity}>
        <button
          // onClick={() => productCount(product, false)}
          onClick={() => {
            if(productQuantity > 1) setProductQuantity(productQuantity - 1)
          }}
          type="button"
          className="decrease"
        >
          -
        </button>
        <input
          className="form-control"
          type="text"
          // value={product.quantity}
          value={productQuantity}
          readOnly
        />
        <button
          // onClick={() => productCount(product, true)}
          onClick={() => setProductQuantity(productQuantity + 1)}
          type="button"
          className="increase"
        >
          +
        </button>
      </div>
      <button
        className={styles.controlsButton}
        onClick={() => addToBasket(product)}
      >
        Замовити
      </button>
    </div>
  );
};

export default PriceAndQuantity;
