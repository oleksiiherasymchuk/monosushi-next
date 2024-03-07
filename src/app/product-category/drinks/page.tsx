"use client";
import React, { useEffect } from "react";
import styles from "./Drinks.module.scss";
import ProductItem from "@/components/productItem/ProductItem";
import Link from "next/link";
import ShowMore from "@/components/showMoreButton/ShowMore";
import Preloader from "@/components/preloader/Preloader";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";

type Props = {};

const Drinks = (props: Props) => {

  const drinks = useTypedSelector(state => state.drinks.drinks)
  const loading = useTypedSelector(state => state.drinks.loading)

  const { getDrinksFromFirebaseThunk } = useActions()

  useEffect(() => {
    getDrinksFromFirebaseThunk()
  }, [])

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <div className={styles.drinks}>
          <ProductItem products={drinks} title="Безалкогольні напої" />
          <div className={styles.drinksText}>
            <div className={styles.drinksTextBlock}>
              <h1>Безалкогольні напої до суші та ролів</h1>
              <p>
                Смакувати улюбленими ролами ще приємніше, якщо обрати до них
                напої. Тепер вам не доведеться витрачати час і йти до
                супермаркету. Обрати безалкогольний напій можна в меню
                Monosushi. Просто додайте варіант, який вам сподобався, у кошик,
                та оформіть замовлення. Діє безкоштовна доставка замовлень на
                суму від 300 грн!
              </p>
            </div>
            <div className={styles.drinksTextBlock}>
              <h1>Які безалкогольні напої є в Monosushi?</h1>
              <p>
                Смачні, свіжі, різноманітні! Наша команда — це справжні
                перфекціоністи. Тож ми подбали про те, щоб ви могли замовити
                лише добірну продукцію від надійних виробників.
              </p>
              <p>Смакувати суші приємніше з:</p>
              <ul>
                <li>соком;</li>
                <li>фантою;</li>
                <li>кока-колою.</li>
              </ul>
              <p>
                Меню напоїв лише ростиме з часом, тож ви гарантовано зможете
                обрати варіант, який до душі саме вам. Смак суші буде лише
                яскравішим з вдало обраним напоєм.
              </p>
              <p>
                Замовити безалкогольні напої — так само просто, як і ваші
                улюблені страви. Додайте напій у кошик, залиште свої контактні
                дані, та дочекайтеся дзвінка менеджера. Ми передзвонимо вам за
                декілька хвилин й уточнимо всі деталі замовлення. Доставляємо
                напої та суші справді швидко. Всього 43 хвилини — 1 година, і
                замовлення буде біля ваших дверей!
              </p>
            </div>

            <ShowMore>
              <div className={styles.drinksTextBlock}>
                <h1>Які безалкогольні напоїдо суші обирають японці?</h1>
                <p>
                  Найчастіше, це — зелений або трав’яний чай. Але не
                  пакетований: лише добірний листовий. У напій не додають цукор
                  чи інші підсолоджувачі. Вибір такого напою продиктований не
                  лише японськими традиціями, а й тим, що в зеленому чаї
                  міститься багато ферментів, які покращують травлення.
                </p>
                <p>
                  У світі ж до суші частіше замовляють соки, звичайну воду або ж
                  біле вино.
                </p>
                <p>
                  Обирайте напій, який вам до душі, та замовляйте з доставкою
                  додому або в офіс. <Link href="/">Monosushi</Link> подбає про
                  швидку доставку!
                </p>
              </div>
            </ShowMore>
          </div>
        </div>
      )}
    </>
  );
};

export default Drinks;