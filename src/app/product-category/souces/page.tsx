import React from "react";
import styles from "./Souces.module.scss";
import { SoucesType } from "@/shared/types/products/souces";
import ProductItem from "@/components/productItem/ProductItem";

type Props = {};

const Souces = (props: Props) => {
  const souces: SoucesType = [
    {
      id: 1,
      name: "Допоможи ЗСУ разом з Моносушиком",
      price: 50,
      description:
        'Всі виручені кошти перераховуємо в благодійний фонд "Повернись живим"',
    },
    { id: 2, name: "Ketchup", price: 15, weight: 15 },
    { id: 3, name: "Mas", price: 25, weight: 15 },
    { id: 4, name: "Imbyr", price: 35, weight: 15 },
    { id: 5, name: "Imbyr", price: 35, weight: 15 },
    { id: 6, name: "Imbyr", price: 35, weight: 15 },
  ];

  return (
    <div className={styles.souces}>
      <ProductItem products={souces} title='Соуси' />
      <div className={styles.soucesText}>
        <p>
          Кожне замовлення включає в себе безкоштовні прибори, кількість яких
          залежить від кількості замовлених ролів. (1 рол = 1 людина)
        </p>
        <ul>
          <li>Імбир</li>
          <li>Васабі</li>
          <li>Соєвий соус</li>
        </ul>
      </div>
    </div>
  );
};

export default Souces;
