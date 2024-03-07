"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import styles from "./Actions.module.scss";
import Action from "../../../public/images/discount.svg";
import Image from "next/image";
import { DiscountType } from "@/shared/types/discount/discount";
import Preloader from "@/components/preloader/Preloader";
import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";


export default function Discounts() {

  const discounts = useTypedSelector(state => state.discounts.discounts)
  const loading = useTypedSelector(state => state.discounts.loading)

  const { getDiscountsFromFirebaseThunk } = useActions()

  useEffect(() => {
    getDiscountsFromFirebaseThunk()
  }, [])

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <div className={styles.actions}>
          <div className={styles.actionsTitle}>
            <h1>Акції на суші</h1>
          </div>

          <div className={styles.actionsDiscounts}>
            {discounts?.map((discount: DiscountType, index: number) => {
              return (
                <div
                  className={styles.actionsDiscountsDiscount}
                  key={discount.id}
                >
                  <div className={styles.actionsDiscountsDiscountImg}>
                    <Link href={`/actions/${discount.title}`}>
                      <Image
                        src={discount.imagePath || Action}
                        alt="discountImage"
                        width={240}
                        height={240}
                      />
                    </Link>
                  </div>
                  <h5>
                    <Link href={`/actions/${discount.title}`}>
                      {discount.name}
                    </Link>
                  </h5>
                  <hr />
                  <Link href={`/actions/${discount.title}`}>
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
                Мрієте смакувати суші, не переплачуючи? З Monosushi це можливо!
                Ми зібрали найвигідніші акційні суші у Львові у цьому розділі
                сайту. Ви можете легко ознайомитися з усіма спеціальними
                пропозиціями та замовити роли за привабливою ціною. А ще —
                отримати рол або цілий сет у подарунок!
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
                  День народження з Моносуші. Отримайте “Запечений сет” у
                  подарунок, якщо сьогодні святкуєте день народження.
                </li>
                <li>
                  Акція на самовивіз. Якщо ви забираєте суші самостійно,
                  отримайте запечені моно макі у подарунок.
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
                Більшість наших акцій не сумуються між собою, а також доступні
                при замовленні суші на певну суму. Ознайомитися з правилами та
                умовами кожної акції можна, натиснувши “Дізнатися більше”. Також
                наші менеджери із задоволенням проконсультують вас акцій на суші
                у Львові.
              </p>
              <p>
                Швидка доставка акційних суші, неповторний смак, аромат та гарна
                подача гарантовані. Адже ми — справжні перфекціоністи, які дуже
                уважні до дрібниць. Готуємо роли з добірних продуктів, стежимо
                за дотриманням усіх тонкощів кулінарного процесу. На нашій кухні
                стерильно, а наші рецепти — досконалі.
              </p>
              <p>
                Скоріш оформляйте замовлення та смакуйте улюблені роли вигідно з
                Monosushi!
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


    // const [discounts, setDiscounts] = useState<DiscountType[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // useEffect(() => {
  //   const fetchDiscounts = async () => {
  //     try {
  //       setLoading(true);
  //       const discountsCollectionRef = collection(database, "discounts");
  //       const discountsSnapshot = await getDocs(discountsCollectionRef);
  //       const discountsData: DiscountType[] = [];
  //       discountsSnapshot.forEach((doc) => {
  //         discountsData.push({ id: doc.id, ...doc.data() } as DiscountType);
  //       });
  //       setDiscounts(discountsData);
  //     } catch (error) {
  //       console.error("Error fetching discounts: ", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchDiscounts();
  // }, []);