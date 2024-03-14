"use client";
import React, { useEffect } from "react";
import styles from "./PersonalHistory.module.scss";
import Link from "next/link";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";
import { useAuthContext } from "@/contexts/authContext/AuthContext";
import Preloader from "../preloader/Preloader";

type Props = {};

const PersonalHistory = (props: Props) => {
  const { loading, orders } = useTypedSelector((state) => state.order);

  const userData = useTypedSelector((state) => state.auth.user);

  const { getCurrentUserOrdersThunk, getUserDataThunk } = useActions();

  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      getCurrentUserOrdersThunk(user.uid);
    }
  }, [user]);

  useEffect(() => {
    getUserDataThunk(user.uid);
    console.log(userData);
  }, []);

  return (
    <div className={styles.wrapper}>
      {loading ? (
        <Preloader />
      ) : orders?.length === 0 ? (
        <p>
          Поки що ви не зробили жодного замовлення{" "}
          <Link href="/">перейти в каталог</Link>
        </p>
      ) : (
        <div className={styles.wrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <td>№ замовлення</td>
                <td>Дата та час</td>
                <td>Адреса</td>
                <td>Замовлення</td>
                <td>Статус</td>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order: any, index) => {
                console.log(order);
                let totalSum = 0;
                return (
                  <React.Fragment key={order.id}>
                    <tr>
                      <td className={styles.orderHeader}>№ {index + 1}</td>
                      <td>
                        {new Date(order.timestamp.toDate()).toLocaleString()}
                      </td>
                      <td>
                        {userData?.adress ? userData?.adress : "Самовивіз"}
                      </td>
                      <td></td>
                      <td>
                        <p className={styles.done}>виконано</p>
                        {/* <p className={styles.repeat}>Повторити</p> */}
                      </td>
                    </tr>
                    {order.products.map(
                      (product: any, productIndex: number) => {
                        totalSum += Number(product.price) * product.quantity;
                        return (
                          <tr key={product.id}>
                            <td></td>
                            <td style={{ color: "black" }}>
                              {product.price} грн.
                            </td>
                            <td style={{ color: "black" }}>
                              {product.quantity} шт.
                            </td>
                            <td>
                              <span>{product.name}</span>
                            </td>
                            <td></td>
                          </tr>
                        );
                      }
                    )}
                    <tr style={{ borderBottom: "2px solid #5a5a5a" }}>
                      <td colSpan={5} style={{ fontStyle: "italic" }}>
                        Загальна сума: {totalSum} грн
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PersonalHistory;
