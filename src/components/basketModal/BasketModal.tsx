import React from "react";
import styles from "./BasketModal.module.scss";
import BasketEmpty from "../../../public/images/cart-empty-img.svg";
import Image from "next/image";
import Link from "next/link";
import Trash from "../../../public/images/trash.png";
import California from "../../../public/images/californiaa.jpeg";

type Props = {
  onClose?: () => void;
};

const BasketModal = ({ onClose }: Props) => {
  const isBasketEmpty = false;
  const basket: any[] = [
    // { imagePath: California, name: "California", count: 1, price: 300 },
    // { imagePath: California, name: "California", count: 1, price: 300 },
  ];
  const productCount = (product: any, value: boolean) => {};
  const deleteBasketProduct = (productID: number) => {};
  const total: number = 0;

  return (
    <div className={styles.basket}>
      <div className={styles.basketOrder}>
        {isBasketEmpty ? (
          <div className={styles.basketOrderEmpty}>
            <Image
              src={BasketEmpty}
              alt="emptyBasket"
              width={100}
              height={100}
            />
            <p>Кошик порожній</p>
            <button onClick={onClose}>
              <Link href="/products">Перейти до каталогу</Link>
            </button>
          </div>
        ) : (
          basket.map((b, i) => (
            <div className={styles.basketOrderProducts} key={i}>
              <div className={styles.basketOrderProductsItem}>
                {/* <a href=""> */}
                <Image
                  src={b.imagePath}
                  alt="productImage"
                  height={92}
                  width={122}
                />
                {/* </a> */}
                <div className={styles.basketOrderProductsItemDescription}>
                  <p>{b.name}</p>
                  <div
                    className={
                      styles.basketOrderProductsItemDescriptionControls
                    }
                  >
                    <div
                      className={
                        styles.basketOrderProductsItemDescriptionControlsQuantity
                      }
                    >
                      <button
                        onClick={() => productCount(b, false)}
                        type="button"
                        className="decrease"
                      >
                        -
                      </button>
                      <input
                        className="form-control"
                        type="text"
                        value={b.count}
                        readOnly
                      />
                      <button
                        onClick={() => productCount(b, true)}
                        type="button"
                        className="increase"
                      >
                        +
                      </button>
                    </div>
                    <div
                      className={
                        styles.basketOrderProductsItemDescriptionControlsPrice
                      }
                    >
                      {b.price * b.count} грн
                    </div>
                    <button
                      className="trash"
                      onClick={() => deleteBasketProduct(i)}
                    >
                      <Image src={Trash} alt="trash" height={15} width={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className={styles.basketBottom}>
        <p>Сума: {total} грн</p>
        <button disabled={isBasketEmpty}>ОФОРМИТИ ЗАМОВЛЕННЯ</button>
      </div>
    </div>
  );
};

export default BasketModal;
