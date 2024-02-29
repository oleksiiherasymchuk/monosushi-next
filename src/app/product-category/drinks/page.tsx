"use client";
import React, { useEffect, useState } from "react";
import styles from "./Drinks.module.scss";
import ProductItem from "@/components/productItem/ProductItem";
import Link from "next/link";
import ShowMore from "@/components/showMoreButton/ShowMore";
import { ProductType, ProductsType } from "@/shared/types/products/product";
import {
  QueryDocumentSnapshot,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { database } from "@/firebase/config";
import Preloader from "@/components/preloader/Preloader";

type Props = {};

const Drinks = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [drinks, setDrinks] = useState<ProductsType | null>(null);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        setLoading(true);
        const drinksCollectionRef = collection(database, "products");
        const drinksQuery = query(
          drinksCollectionRef,
          where("category", "==", "drinks")
        );
        const drinksSnapshot = await getDocs(drinksQuery);
        const drinksData: ProductType[] = [];
        drinksSnapshot.forEach((doc: QueryDocumentSnapshot) => {
          const data = doc.data();
          drinksData.push({
            id: doc.id,
            name: data.name || "",
            category: data.category || "",
            path: data.path || "",
            ingredients: data.ingredients || "",
            description: data.description || "",
            price: data.price || "",
            weight: data.weight || "",
            imagePath: data.imagePath || "",
          });
        });
        setDrinks(drinksData);
      } catch (error) {
        console.error("Error fetching souces: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDrinks();
  }, []);

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
