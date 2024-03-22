import React from "react";
import styles from "./Dostavka.module.scss";
import greenZone from "../../../public/images/greenzone.svg";
import map from "../../../public/images/map.png";
import cash from "../../../public/images/cash.svg";
import cashless from "../../../public/images/cashless.svg";
import Image from "next/image";

const DeliveryAndPaymentPage = () => {
  return (
    <div className={styles.delivery}>
      <div className={styles.deliveryTitle}>
        <h1>Доставка та оплата</h1>
      </div>

      <div className={styles.deliveryZones}>
        <div className={styles.deliveryZonesGreenZone}>
          <div className={styles.deliveryZonesGreenZoneImg}>
            <Image src={greenZone} alt="greenZone" />
          </div>
          <div className={styles.deliveryZonesGreenZoneRight}>
            <p className={styles.deliveryZonesGreenZoneRightText}>
              Зелена зона
            </p>
            <p className={styles.deliveryZonesGreenZoneRightDescription}>
              В межах зеленої зони доставляємо протягом <span>1 год.</span>{" "}
              Мінімальна сума замовлення в цю зону становить{" "}
              <span>200 грн.</span>
            </p>
          </div>
        </div>

        <div className={styles.deliveryZonesYellowZone}>
          <div className={styles.deliveryZonesYellowZoneImg}>
            <Image src={greenZone} alt="greenZone" />
          </div>
          <div className={styles.deliveryZonesYellowZoneRight}>
            <p className={styles.deliveryZonesYellowZoneRightText}>
              Жовта зона
            </p>
            <p className={styles.deliveryZonesYellowZoneRightDescription}>
              В межах жовтої зони доставляємо протягом <span>1,5 год.</span>{" "}
              Мінімальна сума замовлення в цю зону становить{" "}
              <span>300 грн.</span>
            </p>
          </div>
        </div>
      </div>

      <div className={styles.deliveryMap}>
        <Image src={map} alt="map" />
      </div>

      <div className={styles.deliveryTextPage}>
        Команда «Monosushi» пропонує надзвичайно зручну систему доставки та
        оплати. Чіткість наших стандартів роботи забезпечує швидке і якісне
        виконання замовлень для наших гостей.
        <br />
        <br />
        Ми поділили Львів на умовні зони доставки – зелену та жовту. Для кожної
        зони ми чітко визначаємо час доставки.
        <br />
        Зелена зона доставки знаходиться ближче до нашої кухні, тому замовлення
        в цю зону доставляються – до 1 год. В жовту зону, яка знаходиться значно
        далі – до 1,5 год.
      </div>

      <div className={styles.deliveryPayment}>
        <h2>Оплата</h2>
        <div className={styles.deliveryPaymentItems}>
          <div className={styles.deliveryPaymentItemsItem}>
            <div className={styles.deliveryPaymentItemsItemImg}>
              <Image src={cash} alt="cash" />
            </div>
            <div className={styles.deliveryPaymentItemsItemDescription}>
              <p className={styles.deliveryPaymentItemsItemDescriptionTitle}>
                Оплата готівкою
              </p>
              <p
                className={
                  styles.deliveryPaymentItemsItemDescriptionDescription
                }
              >
                Розраховуйтесь за свої улюблені сушики готівкою при отриманні.
              </p>
            </div>
          </div>
          <div className={styles.deliveryPaymentItemsItem}>
            <div className={styles.deliveryPaymentItemsItemImg}>
              <Image src={cashless} alt="cashless" />
            </div>
            <div className={styles.deliveryPaymentItemsItemDescription}>
              <p className={styles.deliveryPaymentItemsItemDescriptionTitle}>
                Безготівкова оплата
              </p>
              <p className={styles.description}>
                Розраховуйтесь за свої улюблені сушики онлайн або карткою при
                отриманні
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.deliveryTextPage}>
        <p>
          Ми пропонуємо Вам 3 найпоширеніші варіанти для розрахунку: готівка,
          оплата онлайн або ж розрахунок карткою.
        </p>
        <br />
        <p>
          Просто позначте найбільш зручний для Вас спосіб оплати при оформленні
          замовлення на сайті або ж повідомте про це оператора по телефону.
        </p>
        <br />
        <p>
          {" "}
          Доставка «Моносуші» – це чіткі стандарти роботи, високий рівень
          сервісу та турбота про кожного гостя. Ми щодня розвиваємось, щоб
          почути лише три слова «Моносуші – це любов».
        </p>
      </div>
    </div>
  );
};

export default DeliveryAndPaymentPage;
