"use client";
import React, { useState, useCallback } from "react";
import styles from "./PriceAndQuantity.module.scss";
import { useActions } from "@/hooks/useActions";

type Props = {
  product: any;
};

const PriceAndQuantity = ({ product }: Props) => {
  const { addToBasket, updateProductQuantity } = useActions();
  const [productQuantity, setProductQuantity] = useState<number>(1);

  const handleDecrease = useCallback(() => {
    if (productQuantity > 1) {
      setProductQuantity((prevQuantity) => prevQuantity - 1);
      updateProductQuantity({ id: product.id, quantity: productQuantity - 1 });
    }
  }, [product?.id, productQuantity, updateProductQuantity]);

  const handleIncrease = useCallback(() => {
    setProductQuantity((prevQuantity) => prevQuantity + 1);
    updateProductQuantity({ id: product.id, quantity: productQuantity + 1 });
  }, [product?.id, productQuantity, updateProductQuantity]);

  return (
    <div className={styles.controls}>
      <div className={styles.controlsPrice}>
        <span>{product?.price * productQuantity}</span> грн
      </div>
      <div className={styles.controlsQuantity}>
        <button onClick={handleDecrease} type="button" className="decrease">
          -
        </button>
        <input
          className="form-control"
          type="text"
          value={productQuantity}
          min={1}
          readOnly
        />
        <button onClick={handleIncrease} type="button" className="increase">
          +
        </button>
      </div>
      <button
        className={styles.controlsButton}
        onClick={() => addToBasket({ ...product, quantity: productQuantity })}
      >
        Замовити
      </button>
    </div>
  );
};

export default React.memo(PriceAndQuantity);
