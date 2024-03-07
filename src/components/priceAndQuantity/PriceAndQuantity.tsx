"use client";
import React, { useState } from "react";
import styles from "./PriceAndQuantity.module.scss";
import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
// import { auth, database } from "@/firebase/config";
// import { addDoc, collection, serverTimestamp } from "firebase/firestore";

type Props = {
  product: any;
};

const PriceAndQuantity = ({ product }: Props) => {

  const { addToBasket } = useActions()
  // const { order } = useTypedSelector(state => state)

  // console.log(order)
  
  const [productQuantity, setProductQuantity] = useState<number>(1);

  // const addToBasket = (product: any) => {
  //   //  here to do add to basket with redux 
  //   console.log(product)

  //   // this for order in basket component
  //   // try {
  //   //   const user = auth.currentUser;
  
  //   //   if (user) {
  //   //     const orderData = {
  //   //       userId: user.uid,
  //   //       productId: product.id,
  //   //       productName: product.name,
  //   //       productPrice: product.price,
  //   //       quantity: productQuantity,
  //   //       timestamp: serverTimestamp(),
  //   //     };
  
  //   //     const docRef = await addDoc(collection(database, "orders"), orderData);
  //   //     console.log("Order added with ID: ", docRef.id);
  
  //   //   } else {
  //   //     console.error("User is not authenticated");
  //   //   }
  //   // } catch (error) {
  //   //   console.error("Error adding order: ", error);
  //   // }
  // };



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
