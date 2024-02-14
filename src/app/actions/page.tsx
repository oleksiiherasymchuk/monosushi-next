import React from "react";
import Link from "next/link";
import styles from "./Actions.module.scss";
import Action from "../../../public/images/discount.svg";
import Rolls from "../../../public/images/rolls.svg";
import Image from "next/image";
import { DiscountType } from "@/shared/types/discount/discount";

type Props = {};
const discountArray: DiscountType[] = [
  { id: 1, imagePath: Action, name: "3+1=5" },
  { id: 2, imagePath: Rolls, name: "HP" },
  { id: 3, imagePath: Rolls, name: "HP" },
  { id: 4, imagePath: Rolls, name: "HP" },
  { id: 5, imagePath: Rolls, name: "HP" },
];

export default function Discounts() {
  return (
    <div className={styles.actions}>
      <div className={styles.actionsTitle}>
        <h1>Акції на суші</h1>
      </div>

      <div className={styles.actionsDiscounts}>
        {discountArray.map((discount) => {
          return (
            <div className={styles.actionsDiscountsDiscount} key={discount.id}>
              <div className={styles.actionsDiscountsDiscountImg}>
                <Link href={`/actions/${discount.id}`}>
                  <Image src={Action} alt="discountImage" />
                </Link>
              </div>
              <h5>
                <Link href={`/actions/${discount.id}`}>{discount.name}</Link>
              </h5>
              <hr />
              <Link href={`/actions/${discount.id}`}>
                <button>ДІЗНАТИСЯ БІЛЬШЕ</button>
              </Link>
            </div>
          );
        })}
      </div>

      <div className={styles.actionsText}>
        <div className={styles.actionsTextItem}>
          <h2>Суші-акції у Львові</h2>
          <p>
            Мрієте смакувати суші, не переплачуючи? З Monosushi це можливо! Ми
            зібрали найвигідніші акційні суші у Львові у цьому розділі сайту. Ви
            можете легко ознайомитися з усіма спеціальними пропозиціями та
            замовити роли за привабливою ціною. А ще — отримати рол або цілий
            сет у подарунок!
          </p>
        </div>

        <div className={styles.actionsTextItem}>
          <h2>Акційні суші, які вам точно сподобаються</h2>
          <p>
            Ми пропонуємо смачні та вигідні акції, які допоможуть смакувати
            ролами вигідно:
          </p>
          <ul>
            <li>
              Акція “Рол тижня”. Знижка 50% на один з ролів у нашому меню.
            </li>
            <li>
              3+1 = 5. Замовляйте 4 роли та отримуйте п’ятий абсолютно
              безкоштовно. Те, що треба на велику компанію.
            </li>
            <li>
              День народження з Моносуші. Отримайте “Запечений сет” у подарунок,
              якщо сьогодні святкуєте день народження.
            </li>
            <li>
              Акція на самовивіз. Якщо ви забираєте суші самостійно, отримайте
              запечені моно макі у подарунок.
            </li>
            <li>
              Фотомарафон — розіграш ролів за контент зі згадкою Monosushi в
              соціальних мережах.
            </li>
          </ul>
        </div>

        <div className={styles.actionsTextItem}>
          <h2>Доставка суші по акції у Львові: правила від Monosushi</h2>
          <p>
            Більшість наших акцій не сумуються між собою, а також доступні при
            замовленні суші на певну суму. Ознайомитися з правилами та умовами
            кожної акції можна, натиснувши “Дізнатися більше”. Також наші
            менеджери із задоволенням проконсультують вас акцій на суші у
            Львові.
          </p>
          <p>
            Швидка доставка акційних суші, неповторний смак, аромат та гарна
            подача гарантовані. Адже ми — справжні перфекціоністи, які дуже
            уважні до дрібниць. Готуємо роли з добірних продуктів, стежимо за
            дотриманням усіх тонкощів кулінарного процесу. На нашій кухні
            стерильно, а наші рецепти — досконалі.
          </p>
          <p>
            Скоріш оформляйте замовлення та смакуйте улюблені роли вигідно з
            Monosushi!
          </p>
        </div>
      </div>
    </div>
  );
}
