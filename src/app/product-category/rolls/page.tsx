"use client";
import React, { useEffect, useState } from "react";
import styles from "./Rolls.module.scss";
import ProductItem from "@/components/productItem/ProductItem";
import Link from "next/link";
import ShowMore from "@/components/showMoreButton/ShowMore";
import Preloader from "@/components/preloader/Preloader";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";
import { ProductType, ProductsType } from "@/shared/types/products/product";
import ProductNavigation from "@/components/productNavigation/ProductNavigation";

type Props = {};

const Rolls = (props: Props) => {

  const [sortedRolls, setSortedRolls] = useState<ProductsType | null>(null);

  const { loading, rolls } = useTypedSelector(state => state.rolls)
  const { getRollsFromFirebaseThunk } = useActions()

  useEffect(() => {
    getRollsFromFirebaseThunk()
  }, [])

  const handleNavigationClick = (label: string) => {
    // debugger
    let sortedProducts: ProductType[] | any = [];

    if (label === "Всі") {
      sortedProducts = rolls;
    } else if (label === "Роли Філадельфія") {
      sortedProducts = rolls?.filter((product) =>
        product.path?.startsWith("filadelfiya")
      );
    } else if (label === "Роли Каліфорнія") {
      sortedProducts = rolls?.filter((product) =>
        product.path?.startsWith("kaliforniya")
      );
    } else if (label === "Запечені роли") {
      sortedProducts = rolls?.filter((product) =>
        product.path?.startsWith("zapechenyj")
      );
    } else if (label === "Роли Макі") {
      sortedProducts = rolls?.filter((product) =>
        product.path?.startsWith("maki")
      );
    } else if (label === "Преміум суші") {
      sortedProducts = rolls?.filter(
        (product) => parseInt(product.price) > 350
      );
    } else if (label === "Фірмові суші") {
      sortedProducts = rolls?.filter(
        (product) =>
          !product.path?.startsWith("filadelfiya") &&
          !product.path?.startsWith("kaliforniya") &&
          !product.path?.startsWith("zapechenyj") &&
          !product.path?.startsWith("maki") &&
          !(parseInt(product.price) > 350)
      );
    }

    setSortedRolls(sortedProducts);
  };

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <div className={styles.rolls}>
          <ProductItem products={sortedRolls || rolls} title="Роли" onNavigationClick={handleNavigationClick}/>
          {/* <ProductItem products={sortedRolls || rolls} title="Роли"/> */}
          {/* <ProductNavigation onNavigationClick={handleNavigationClick} /> */}
          <div className={styles.rollsText}>
            <div className={styles.rollsTextBlock}>
              <h1>Суші і роли: по-справжньому великі порції від Monosushi</h1>
              <p>
                У світі японської кухні є страва, яка закохує з першого
                шматочка. Це — роли. Якщо ви любите їх так само як і ми,
                запрошуємо поринути у гастрономічну подорож з Monosushi. Готуємо
                та доставляємо роли у Львові, які вам сподобаються.
                Використовуємо добірні складники, дбаємо про дотримання
                секретних технологій приготування, забезпечуємо швидку доставку
                ролів додому та в офіс. Ви можете замовити суші щодня, з 11:00
                до 22:30.
              </p>
            </div>
            <div className={styles.rollsTextBlock}>
              <h1>Бажаєте замовити cуші-роли у Львові? Monosushi вже тут</h1>
              <p>
                Ми перфекціоністи. І справді любимо азійську кухню. Саме тому,
                готуємо роли, якими не хочеться ділитися: кожен шматочок тішить
                неймовірним смаком. Головний секрет Monosushi — це якісні
                продукти. Для приготування використовуємо добірні морепродукти,
                сир, авокадо, соус унагі та спайсі, водорості норі. Не
                економимо, обираючи інгредієнти для суші. Це — важливе правило.
              </p>
              <p>
                На нашій кухні — ідеальна чистота. Дотримуємося санітарних норм,
                щоб ви були на 100% впевнені в безпеці страв, які замовляєте з
                доставкою. Шеф-кухарі слідкують за дотриманням усіх правил
                приготування ролів, ретельно перевіряють якість кожної порції.
              </p>
              <p>А ще, команда Monosushi:</p>
              <ul>
                <li>
                  <span>Уважна до деталей.</span> Ми — перфекціоністи. Тож
                  ідеальним буде все: від смаку ролів до впакування та подачі.
                  Подбаємо про те, щоб ви отримали суші смачними, свіжими й
                  естетичними.
                </li>
                <li>
                  <span>Дуже пунктуальна.</span> Якщо ви голодні, суші хочеться
                  вже і зараз. Не змусимо чекати: роли з доставкою у Львові
                  привеземо за 43 хвилини. Це — наш середній час доставки
                  містом.
                </li>
                <li>
                  <span>Має вигідні акції для вас.</span> Тішимо вас знижками та
                  даруємо роли на день народження. Ознайомитися з акціями можна
                  у відповідному розділі на нашому сайті.
                </li>
              </ul>
              <p>
                Ми любимо смачні роли, готуємо їх з турботою та можемо доставити
                за будь-якою адресою в місті та за його межами!
              </p>
            </div>

            <div className={styles.rollsTextBlock}>
              <h1>Які роли є в меню Monosushi?</h1>
              <p>Готуємо роли і суші на будь-який смак:</p>
              <ul>
                <li>
                  Роли <Link href="">Філадельфія</Link> та{" "}
                  <Link href="">Каліфорнія</Link> — з лососем, тунцем,
                  креветкою, крабом.
                </li>
                <li>
                  <Link href="">Фірмові суші</Link>— ви можете замовити
                  вегетаріанський рол з чукою, Фелікс з креветкою, вугрем або
                  лососем, сирний рол.
                </li>
                <li>
                  <Link href="">Запечені роли</Link> — гарячі та смачні. Готуємо
                  запечені суші з морепродуктами, крем сиром, соусом спайсі,
                  унагі. Використовуємо добірний рис.
                </li>
                <li>
                  <Link href="">Макі</Link> — з авокадо, огірком, лососем та
                  іншими смачними компонентами. Це класика суші, яка нікого не
                  залишає байдужим.
                </li>
                <li>
                  <Link href="">Преміум роли</Link> — на вас чекають авторські
                  новинки від наших шефів та суші, яких ви не спробуєте більше
                  ніде. Ми експериментуємо зі смаками, пробуємо смачні й
                  незвичайні поєднання. Начинкою для таких ролів може стати
                  сніжний краб, королівська креветка, авокадо, шрірача,
                  обпалений лосось.
                </li>
              </ul>
            </div>

            <ShowMore>
              <div className={styles.rollsTextBlock}>
                <p>
                  Суші та роли ми подаємо з різними соусами: спайсі, унагі,
                  соєвим. А також рекомендуємо доповнювати смак суші від
                  Monosushi класичними додатками — васабі та імбирем. Не
                  відкладайте задоволення на потім: замовляйте й насолоджуйтеся.
                </p>
                <p>
                  Щоб замовити роли, додайте їх у кошик, залиште свої контакті
                  дані. Ми передзвонимо вам за декілька хвилин та підтвердимо
                  замовлення. Шефи одразу почнуть готувати роли для вас, а
                  кур’єр — привезе замовлення вчасно. Діє безкоштовна доставка
                  замовлень на суму від 300 грн.
                </p>
                <p>
                  <Link href="/">Monosushi</Link> — роли, які вам точно
                  сподобаються!
                </p>
              </div>
            </ShowMore>
          </div>
        </div>
      )}
    </>
  );
};

export default Rolls;

  // const [loading, setLoading] = useState<boolean>(true);
  // const [rolls, setRolls] = useState<ProductsType | null>(null);

  // useEffect(() => {
  //   const fetchRolls = async () => {
  //     try {
  //       setLoading(true);
  //       const rollsCollectionRef = collection(database, "products");
  //       const rollsQuery = query(
  //         rollsCollectionRef,
  //         where("category", "==", "rolls")
  //       );
  //       const rollsSnapshot = await getDocs(rollsQuery);
  //       const rollsData: ProductType[] = [];
  //       rollsSnapshot.forEach((doc: QueryDocumentSnapshot) => {
  //         const data = doc.data();
  //         rollsData.push({
  //           id: doc.id,
  //           name: data.name || "",
  //           category: data.category || "",
  //           path: data.path || "",
  //           ingredients: data.ingredients || "",
  //           description: data.description || "",
  //           price: data.price || "",
  //           weight: data.weight || "",
  //           imagePath: data.imagePath || "",
  //         });
  //       });
  //       setRolls(rollsData);
  //     } catch (error) {
  //       console.error("Error fetching souces: ", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchRolls();
  // }, []);
