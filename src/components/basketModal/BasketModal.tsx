"use client";
import React, { useEffect } from "react";
import styles from "./BasketModal.module.scss";
import BasketEmpty from "../../../public/images/cart-empty-img.svg";
import Image from "next/image";
import Link from "next/link";
import Trash from "../../../public/images/trash.png";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";
import { ProductType } from "@/shared/types/products/product";
import { useAuthContext } from "@/contexts/authContext/AuthContext";
import Preloader from "../preloader/Preloader";

type Props = {
  onClose?: () => void;
};

const BasketModal = ({ onClose }: Props) => {
  const { user } = useAuthContext();

  const { products, loading } = useTypedSelector((state) => state.order);
  const { deleteFromBasket, updateProductQuantity, createUserOrderThunk } =
    useActions();

  const deleteBasketProduct = (productId: string | undefined) => {
    deleteFromBasket({ id: productId });
  };

  const handleQuantityChange = (
    productId: string | undefined,
    newQuantity: number
  ) => {
    const updatedQuantity = Math.max(newQuantity, 1);
    updateProductQuantity({ id: productId, quantity: updatedQuantity });
  };

  const acceptOrder = async (products: ProductType[]) => {
    if (user) {
      await createUserOrderThunk({ products, userId: user.uid });
    } else {
      await createUserOrderThunk({ products });
    }
    onClose?.();
  };

  const totalSum = products.reduce(
    (total, product) => total + Number(product.price) * product.quantity!,
    0
  );
  const sum = totalSum === 0 ? 0 : totalSum;

  useEffect(() => {
    console.log(sum);
  }, [products]);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <div className={styles.basket}>
          <div className={styles.basketOrder}>
            {products.length === 0 ? (
              <div className={styles.basketOrderEmpty}>
                <Image
                  src={BasketEmpty}
                  alt="emptyBasket"
                  width={100}
                  height={100}
                />
                <p>Кошик порожній</p>
                <button onClick={onClose}>
                  <Link href="/">Перейти до каталогу</Link>
                </button>
              </div>
            ) : (
              products.map((product, i) => (
                <div className={styles.basketOrderProducts} key={i}>
                  <div className={styles.basketOrderProductsItem}>
                    <Image
                      src={product.imagePath}
                      alt="productImage"
                      height={92}
                      width={122}
                    />
                    <div className={styles.basketOrderProductsItemDescription}>
                      <p>{product.name}</p>
                      <div
                        className={
                          styles.basketOrderProductsItemDescriptionControls
                        }
                      >
                        <div
                          className={
                            styles.basketOrderProductsItemDescriptionControlsPrice
                          }
                        >
                          <span>
                            {Number(product.price) * Number(product.quantity)}
                          </span>{" "}
                          грн
                        </div>
                        <div
                          className={
                            styles.basketOrderProductsItemDescriptionControlsQuantity
                          }
                        >
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                product.id,
                                product.quantity! - 1
                              )
                            }
                            type="button"
                            className="decrease"
                          >
                            -
                          </button>
                          <input
                            className="form-control"
                            type="text"
                            value={product.quantity}
                            min={1}
                            readOnly
                          />
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                product.id,
                                product.quantity! + 1
                              )
                            }
                            type="button"
                            className="increase"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        className={
                          styles.basketOrderProductsItemDescriptionButton
                        }
                        onClick={() => deleteBasketProduct(product.id)}
                      >
                        <Image src={Trash} alt="trash" height={20} width={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className={styles.basketBottom}>
            <p>Сума: {sum} грн</p>
            <button
              disabled={products?.length === 0}
              onClick={() => acceptOrder(products)}
            >
              ОФОРМИТИ ЗАМОВЛЕННЯ
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BasketModal;
