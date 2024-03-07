"use client";
import React, { useState } from "react";
import styles from "./PriceAndQuantity.module.scss";
import { useActions } from "@/hooks/useActions";

type Props = {
  product: any;
};

const PriceAndQuantity = ({ product }: Props) => {
  const { addToBasket } = useActions();

  const [productQuantity, setProductQuantity] = useState<number>(1);

  return (
    <div className={styles.controls}>
      <div className={styles.controlsPrice}>
        <span>{product?.price * productQuantity}</span> грн
      </div>
      <div className={styles.controlsQuantity}>
        <button
          onClick={() => {
            if (productQuantity > 1) setProductQuantity(productQuantity - 1);
          }}
          type="button"
          className="decrease"
        >
          -
        </button>
        <input
          className="form-control"
          type="text"
          value={productQuantity}
          min={1}
          readOnly
        />
        <button
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
