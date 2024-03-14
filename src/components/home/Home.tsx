"use client";
import React, { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import ProductNavigation from "../productNavigation/ProductNavigation";
import ProductItem from "../productItem/ProductItem";
import Link from "next/link";
import ShowMore from "../showMoreButton/ShowMore";
import Image from "next/image";
import Delivery from "../../../public/images/greenzone.svg";
import Logo from "../../../public/images/logo.svg";
import Bonus from "../../../public/images/mono-bonus.svg";
import DiscountPaginator from "../discountSwiper/DiscountSwiper";
import Preloader from "../preloader/Preloader";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { ProductType, ProductsType } from "@/shared/types/products/product";
import { useActions } from "@/hooks/useActions";

type Props = {};

const HomePage = (props: Props) => {
  const loading = useTypedSelector((state) => state.discounts.loading);
  const discounts = useTypedSelector((state) => state.discounts.discounts);
  const rolls = useTypedSelector((state) => state.rolls.rolls);
  const { getDiscountsFromFirebaseThunk, getRollsFromFirebaseThunk } =
    useActions();

  const [sortedRolls, setSortedRolls] = useState<ProductsType | null>(null);

  const handleNavigationClick = (label: string) => {
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

  useEffect(() => {
    getDiscountsFromFirebaseThunk();
    getRollsFromFirebaseThunk();
  }, []);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <div className={styles.home}>
          <DiscountPaginator products={discounts} slides={2} />

          <div className={styles.homeInfo}>
            <div className={styles.homeInfoBlock}>
              <Image src={Delivery} alt="delivery" style={{ width: "135px" }} />
              <Link href="/dostavka-ta-oplata">Зони доставки</Link>
            </div>
            <div className={styles.homeInfoBlock}>
              <Image src={Logo} alt="logo" />
              <p>
                Середній час доставки в зеленій зоні <span>00:43:00</span>
              </p>
            </div>
            <div className={styles.homeInfoBlock}>
              <Image src={Bonus} alt="bonus" />
              <div>
                <p>Наш графік роботи</p>
                <p>
                  Працюємо з <span>11:00</span> до <span>22:30</span>
                </p>
              </div>
            </div>
          </div>

          <div className={styles.homeInfoTablet}>
            <div className={styles.homeInfoTabletBlock}>
              <Image src={Delivery} alt="delivery" style={{ width: "135px" }} />
              <Link href="/dostavka-ta-oplata">Зони доставки</Link>
            </div>
            <div className={styles.homeInfoTabletBlock}>
              <Image src={Logo} alt="logo" />
              <p>
                Середній час доставки в зеленій зоні <span>00:43:00</span>
              </p>
            </div>
            <div className={styles.homeInfoTabletBlock}>
              <Image src={Bonus} alt="bonus" />
              <div>
                <p>Наш графік роботи</p>
                <p>
                  Працюємо з <span>11:00</span> до <span>22:30</span>
                </p>
              </div>
            </div>
          </div>

          <ProductNavigation onNavigationClick={handleNavigationClick} />
          <ProductItem products={sortedRolls || rolls} />
          <div className={styles.homeText}>
            <div className={styles.homeTextBlock}>
              <h1>Доставка суші у Львові від “Monosushi”</h1>
              <p>
                Суші підкорюють багатоманіттям видів та яскравими смаками. Це —
                улюблена страва японської кухні, яку варто обов’язково
                спробувати. Філадельфія, Каліфорнія, макі — суші у Львові вже
                чекають на вас.
              </p>
            </div>
            <div className={styles.homeTextBlock}>
              <h2>Чому варто замовити суші в Monosushi?</h2>
              <p>
                У Monosushi ми готуємо роли, які вам сподобаються. Адже наша
                команда — це справжні перфекціоністи. Дбаємо про якість
                компонентів, дотримуємось найкращих кулінарних традицій,
                доставляємо швидко: всього за 43 хвилини!
              </p>
              <p>Monosushi — це:</p>
              <ul>
                <li>
                  Роли які підкорюють з першого шматочка. Якщо ви бажаєте купити
                  кращі суші у Львові, то ви потрапили за адресою. В Monosushi
                  ми знаємо про смачні роли все. Готуємо з добірних компонентів,
                  дбаємо про найкращі гастрономічні враження. Філадельфія з
                  лососем чи Макі з огірком — вирішувати лише вам.
                </li>
                <li>
                  Великі порції. Ми розробили ідеальний розмір порцій. Так, щоб
                  ви могли ситно поїсти. Кожну порцію ретельно важимо: ви
                  отримуєте рівно таку вагу ролів, як вказана на сайті.
                </li>
                <li>
                  Безкоштовна доставка суші у Львові. Привеземо суші безкоштовно
                  за умови замовлення на мінімальну суму. Додому, в офіс чи
                  навіть у парк біля дому — ви отримаєте замовлення швидко та
                  вчасно.
                </li>
              </ul>
              <p>
                Ви можете замовити смачні та ситні суші з лососем, креветкою. А
                також улюбленими інгредієнтами — такими, як рис, норі, авокадо,
                крем сир, соус Унагі, зелена цибуля, сирний соус, кунжут білий,
                ікра масаго. Лише найсвіжіші інгредієнти!
              </p>
            </div>

            <div className={styles.homeTextBlock}>
              <h2>Спробуйте найкращі суші у Львові</h2>
              <p>
                Меню Monosushi — це роли на будь-який смак! Ми використовуємо
                добірні інгредієнти та свіжі продукти, щоб ви могли
                насолоджуватися кожною стравою. Готуємо всі види суші — від
                класичних до авторських.
              </p>
              <p>
                У нас є запечені{" "}
                <Link href="/product-category/rolls/">роли</Link> — гарячі та
                смачні. Готуємо їх з креветкою, лососем, крем-сиром, копченим
                лососем, соусом Унагі. Ставимося до приготування суші з
                особливою увагою. Використовуємо добірні складники, щоб ви могли
                по-справжньому насолоджуватися. У нашій кухні — стерильна
                чистота. Саме тому, ви можете бути впевнені в безпеці страв.
              </p>
              <p>
                Найкращий вибір для компанії — це{" "}
                <Link href="product-category/sets/">сети суші</Link> від
                Monosushi. Великі порції та поєднання різноманітних смаків —
                можливість спробувати щось новеньке. До ролів ми пропонуємо
                безалкогольні напої — ви можете замовити суші у Львові та одразу
                вибрати сік, колу або фанту до них.
              </p>
            </div>

            <div className={styles.homeTextBlock}>
              <h2>Швидка доставка суші у Львові</h2>
              <p>
                Забудьте про набридливі клопоти з приготуванням їжі. Monosushi
                бере цю функцію на себе. Все, що вам залишилося зробити — це
                обрати улюблені роли, додати їх у кошик та оформити замовлення.
                Ми подзвонимо вам через декілька хвилин та уточнимо деталі.
                Одразу після цього ми почнемо готувати суші для вас. А кур’єр
                одразу підхопить замовлення й доставить за вашою адресою у
                будь-який куточок міста.
              </p>
            </div>

            <ShowMore>
              <div className={styles.homeTextBlock}>
                <p>
                  Оплатити замовлення можна різними способами: онлайн, карткою
                  та готівкою при отриманні. Обирайте варіант, який вам зручний.
                </p>
                <p>
                  Якщо ви бажаєте замовити дешеві суші у Львові, ознайомтеся з
                  розділом Акції. Ми пропонуємо знижки на рол тижня (ціна -50%),
                  даруємо “Запечений сет” на день народження й маємо ще багато
                  цікавого.
                </p>
                <p>
                  Гарантуємо: ви отримаєте роли свіжими, смачними, в акуратному
                  пакуванні. Ви можете одразу подавати їх на святковий стіл.
                  Обирайте та замовляйте улюблені роли з суші ресторану
                  Monosushi!
                </p>
              </div>

              <div className={styles.homeTextBlock}>
                <h3>FAQ</h3>
                <h3>Скільки коштує доставка?</h3>
                <p>
                  Доставка безкоштовна за умови замовлення на мінімальну суму.
                  Це 300 грн для зеленої зони, 400 для жовтої та 500 для
                  червоної.
                </p>
                <h3>Як можна оплатити замовлення?</h3>
                <p>
                  Онлайн при оформленні замовлення, готівкою та карткою кур’єру.
                  Кожен клієнт суші ресторану Monosushi може обрати спосіб
                  зручний спосіб оплати: просто оберіть, як бажаєте
                  розрахуватися.
                </p>
                <h3>Як довго чекати доставку замовлення?</h3>
                <p>
                  Середній час доставки Monosushi — 43 хвилини, адже наші
                  кур’єри є справжніми перфекціоністами. Точний час отримання
                  замовлення залежить від вашої адреси. Перевірити, у якій зоні
                  доставки ви мешкаєте, можна у розділі “Доставка та оплата”
                </p>
                <h3>Які у вас постійні знижки?</h3>
                <p>
                  Знижка 50% на рол тижня у нашому меню, акція до дня
                  народження, 3+1=5. Ознайомитися з повним переліком знижок на
                  доставку суші можна у розділі “Акції” на нашому сайті.
                </p>
                <h3>Який у вас графік роботи?</h3>
                <p>
                  Доставляємо суші та сети щодня з 11:00 до 22:30. Протягом
                  всього дня ви можете замовити топ суші у Львові, та
                  насолодитися улюбленими смаками. Також у вказані години працює
                  самовивіз з нашого ресторану.
                </p>
              </div>
            </ShowMore>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
