"use client";
import React, { useEffect } from "react";
import styles from "./Sets.module.scss";
import ProductItem from "@/components/productItem/ProductItem";
import Link from "next/link";
import ShowMore from "@/components/showMoreButton/ShowMore";
import Preloader from "@/components/preloader/Preloader";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";

type Props = {};

const Sets = (props: Props) => {

  const loading = useTypedSelector(state => state.sets.loading)
  const sets = useTypedSelector(state => state.sets.sets)

  const { getSetsFromFirebaseThunk } = useActions()

  useEffect(() => {
    getSetsFromFirebaseThunk()
  },[])

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <div className={styles.sets}>
          <ProductItem products={sets} title="Сети" />
          <div className={styles.setsText}>
            <div className={styles.setsTextBlock}>
              <h1>Доставка суші-сетів для великої компанії</h1>
              <p>
                Cет суші — це найкращий вибір, якщо ви плануєте вечірку вдома.
                Або романтичний вечір. Або просто хочете багато-багато смачних
                ролів. Ми подбали про те, щоб кожен набір був особливим. Та
                головне — дуже смачним. Замовити суші-сети додому від Monosushi
                можна щодня й без вихідних. Просто оберіть варіант, який вам
                найбільше сподобався!
              </p>
            </div>
            <div className={styles.setsTextBlock}>
              <h1>
                Суші-сети від Monosushi — яскравий смак та гігантські порції
              </h1>
              <p>
                Ми готуємо суші-сети на будь-який смак. Кожна порція — справді
                велика, тож вистачить на компанію друзів. Свіжість, пікантність,
                гостринка — в сетах гармонійно поєднуються різні смаки, які
                дарують справжню насолоду.
              </p>
              <p>Чому варто замовити суші сет від Monosushi:</p>
              <ul>
                <li>
                  Можливість спробувати різні смаки. Сет суші з доставкою — це
                  зажди різноманіття ролів і чудова нагода спробувати варіанти,
                  які ви ще ніколи не куштували.
                </li>
                <li>
                  Вдалий вибір на компанію. Коли вдома збираються родичі та
                  друзі, домовитися про доставку, яка б сподобалася усім, буває
                  складно. Але сет суші — це завжди компроміс. Ви можете обрати
                  набір, в якому будуть різні роли — такі ж різні, як і смаки
                  ваших гостей.
                </li>
                <li>
                  Економія коштів для вас. У сеті — дешевше, ніж окремо. Ви
                  можете не переплачувати за кілька маленьких позицій.
                </li>
                <li>Швидка доставка суші сетів у будь-який куточок міста</li>
              </ul>
              <p>
                Ми знаємося на секретах приготування суші. Тож впевнені: наші
                роли вам точно сподобаються, а доставка суші сетів у Львові
                здивує швидкістю та пунктуальністю.
              </p>
            </div>

            <ShowMore>
              <div className={styles.setsTextBlock}>
                <h1>Оцініть меню суші-сетів у Львові</h1>
                <p>
                  Команда Monosushi — це справжні перфекціоністи. Особливо, коли
                  йдеться про приготування суші. Ми знаємо, що секрет смаку —
                  добірні продукти. Свіжі креветки та лосось, авокадо, крем-сир,
                  соус Унагі, кунжут — ми працюємо з перевіреними
                  постачальниками товарів, щоб ви отримували лише найкраще.
                  Суші-майстри у нашому закладі дотримуються всіх правил
                  приготування суші та ретельно слідкують за якістю кожної
                  страви.
                </p>
                <p>У меню на вас чекає великий вибір суші-сетів у Львові:</p>
                <ul>
                  <li>
                    Сет Філадельфія — з усіма видами суші Філадельфія, які є в
                    нашому меню.
                  </li>
                  <li>Сет Каліфорнія — рол з креветкою, вугрем або крабом</li>
                  <li>Запечений сет — для тих, хто полюбляє гарячі роли.</li>
                  <li>
                    Класичний сет — з лососем, креветкою, вугрем та крабом.
                    Смачно та різноманітно.
                  </li>
                  <li>
                    Унагі сет — Філадельфія, Каліфорнія та наш фірмовий рол
                    Фелікс.
                  </li>
                  <li>
                    Сет макі — з лососем, огірком та вугрем. Класика суші, яка
                    ніколи не набридає.
                  </li>
                </ul>

                <p>
                  Додавайте улюблений сет у кошик на сайті та оформляйте
                  замовлення. Найшвидша доставка <Link href="/">Monosushi</Link>{" "}
                  привезе суші сет всього за 43 хвилини за вашою адресою.
                  Безкоштовна доставка суші сетів діє від 300 грн.
                </p>
              </div>
            </ShowMore>
          </div>
        </div>
      )}
    </>
  );
};

export default Sets;


  // const [loading, setLoading] = useState<boolean>(true);
  // const [sets, setSets] = useState<ProductsType | null>(null);

  // useEffect(() => {
  //   const fetchSets = async () => {
  //     try {
  //       setLoading(true);
  //       const setsCollectionRef = collection(database, "products");
  //       const setsQuery = query(
  //         setsCollectionRef,
  //         where("category", "==", "sets")
  //       );
  //       const setsSnapshot = await getDocs(setsQuery);
  //       const setsData: ProductType[] = [];
  //       setsSnapshot.forEach((doc: QueryDocumentSnapshot) => {
  //         const data = doc.data();
  //         setsData.push({
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
  //       setSets(setsData);
  //     } catch (error) {
  //       console.error("Error fetching souces: ", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchSets();
  // }, []);