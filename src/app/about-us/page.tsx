"use client";
import React, { useState } from "react";
import styles from "./AboutUs.module.scss";
import AboutUs1 from "../../../public/images/aboutus1.jpeg";
import AboutUs2 from "../../../public/images/aboutus2.jpeg";
import Advantage1 from "../../../public/images/advantages-img-1.svg";
import Advantage2 from "../../../public/images/advantages-img-2.svg";
import Advantage3 from "../../../public/images/advantages-img-3.svg";
import Image from "next/image";

type DropdownState = {
  [key: string]: boolean;
};

type Props = {};

export default function Page(props: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<DropdownState>({});

  const toggleDropdown = (dropdownName: string) => {
    setIsDropdownOpen((prevState) => ({
      [dropdownName]: !prevState[dropdownName],
    }));
  };

  return (
    <div className={styles.about}>
      <div className={styles.aboutTitle}>
        <h1>Про нас</h1>
      </div>

      <div className={styles.aboutText}>
        <h1>Monosushi – доставка неймовірно смачних суші у Львові.</h1>
        <p>
          Головний пріоритет – висока якість їжі та сервісу. Ми – команда
          професіоналів, яка щодня працює для Вас.
          <br />
          Якість та Швидкість! – це два основних пріоритети в роботі команди. В
          першу чергу звичайно ж Якість. Суші готуються без затримок, одразу ж
          після Вашого замовлення.
          <br />А завдяки сучасним технологіям та відповідальному навчанню
          працівників, свіжі страви можливо доставляти до 59 хв в 75% замовлень.
        </p>
        <ul>
          <li>висока якість їжі та сервісу</li>
          <li>команда професіоналів</li>
          <li>сучасні технології приготування</li>
        </ul>
      </div>

      <div className={styles.aboutPictures}>
        <div className={styles.aboutPicturesItems}>
          <div className={styles.aboutPicturesItemsImg}>
            <Image src={AboutUs1} alt="AboutUs" />
          </div>
          <div className={styles.aboutPicturesItemsText}>
            <h2>Привіт! Познайомимось?</h2>
            <p>
              Monosushi – це доставка найсмачніших суші у Львові, яка була
              створена командою перфекціоністів. Двоє друзів, які обожнюють роли
              вирішили створити продукт, якого їм не вистачало на ринку Львова.
              Продукт, в якому ідеальним буде все: смак, упакування, сервіс і
              все це за лояльною ціною!
            </p>
          </div>
        </div>
        <div className={styles.aboutPicturesItems}>
          <div className={styles.aboutPicturesItemsText}>
            <h2>Наш пріоритет - ваша посмішка від задоволення</h2>
            <p>
              <b>Monosushi</b> – це доставка одного (mono) продукту. Роли вже
              давно стали рядовою стравою, проте процес їх приготування всеодно
              залишається цілим мистецтвом. Суші потрібно готувати за чіткою
              технологією суворо дотримуючись традицій. І в цьому ми справжні
              експерти! Сумніваєтесь? Тоді замовляйте безкоштовну доставку
              Monosushi і насолоджуйтесь.
            </p>
          </div>
          <div className={styles.aboutPicturesItemsImg}>
            <Image src={AboutUs2} alt="AboutUs" />
          </div>
        </div>
      </div>

      <div className={styles.aboutAdvantages}>
        <h1>Наші переваги</h1>
        <div className={styles.aboutAdvantagesAdvantage}>
          <div className={styles.aboutAdvantagesAdvantageItem}>
            <div className={styles.aboutAdvantagesAdvantageItemImgAdv}>
              <Image src={Advantage1} alt="advantage" />
            </div>
            <h3>Свіжі продукти</h3>
            <p>
              Наші інгредієнти ще вчора плавали у морі, а сьогодні вже у Ваших
              сушиках
            </p>
          </div>
          <div className={styles.aboutAdvantagesAdvantageItem}>
            <div className={styles.aboutAdvantagesAdvantageItemImgAdv}>
              <Image src={Advantage2} alt="advantage" />
            </div>
            <h3>Неймовірний смак</h3>
            <p>
              Ми створили сушики, які змусять Ваші рецептори вибухнути від
              насолоди
            </p>
          </div>
          <div className={styles.aboutAdvantagesAdvantageItem}>
            <div className={styles.aboutAdvantagesAdvantageItemImgAdv}>
              <Image src={Advantage3} alt="advantage" />
            </div>
            <h3>Великі порції</h3>
            <p>
              Ми віднайшли ідеальні порції ролів та завжди дотримуємось грамажу
              вказаного на сайті
            </p>
          </div>
        </div>
      </div>

      <div className={styles.aboutQuestions}>
        <h1>Популярні запитання</h1>
        <div className={styles.aboutQuestionsDropdowns}>
          <div className={styles.aboutQuestionsDropdownsDropdown}>
            <div className={styles.aboutQuestionsDropdownsDropdownTitle}>
              <p>
                Як можна замовити, якщо наша адреса не входить у вашу зону
                доставки?
              </p>
              <button onClick={() => toggleDropdown("address")}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: !isDropdownOpen.address ? "&#8964;" : "&#8963;",
                  }}
                />
              </button>
            </div>
            {isDropdownOpen.address && (
              <div
                className={`${styles.aboutQuestionsDropdownsDropdownFull} ${
                  isDropdownOpen.address
                    ? styles.aboutQuestionsDropdownsDropdownFullOpen
                    : ""
                }`}
              >
                <p>
                  Якщо ваша адреса знаходиться поза межами нашої зони доставки,
                  ви можете:
                </p>
                <ul>
                  <li>
                    Забрати замовлення самовивозом за однією з наших адрес. (В
                    такому випадку ви отримаєте “Запечені моно макі з лососем у
                    подарунок).
                  </li>
                  <li>
                    Дізнатись в оператора чи є можливість зробити виключення для
                    доставки поза межі зони в даний момент часу.
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className={styles.aboutQuestionsDropdownsDropdown}>
            <div className={styles.aboutQuestionsDropdownsDropdownTitle}>
              <p>Скільки часу очікувати на замовлення?</p>
              <button onClick={() => toggleDropdown("deliveryTime")}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: !isDropdownOpen.deliveryTime
                      ? "&#8964;"
                      : "&#8963;",
                  }}
                />
              </button>
            </div>
            {isDropdownOpen.deliveryTime && (
              // <div className={styles.aboutQuestionsDropdownsDropdownFull}>
              <div
                className={`${styles.aboutQuestionsDropdownsDropdownFull} ${
                  isDropdownOpen.deliveryTime
                    ? styles.aboutQuestionsDropdownsDropdownFullOpen
                    : ""
                }`}
              >
                <p>
                  Час доставки залежить від адреси замовлення.
                  <br />
                  Доставка в зелену зону – до 1 год.
                  <br />
                  Доставка в жовту зону – до 1,5 год.
                </p>
              </div>
            )}
          </div>

          <div className={styles.aboutQuestionsDropdownsDropdown}>
            <div className={styles.aboutQuestionsDropdownsDropdownTitle}>
              <p>Доставка безкоштовна?</p>
              <button onClick={() => toggleDropdown("deliveryPrice")}>
                {" "}
                <span
                  dangerouslySetInnerHTML={{
                    __html: !isDropdownOpen.deliveryPrice
                      ? "&#8964;"
                      : "&#8963;",
                  }}
                />{" "}
              </button>
            </div>
            {isDropdownOpen.deliveryPrice && (
              <div
                className={`${styles.aboutQuestionsDropdownsDropdownFull} ${
                  isDropdownOpen.deliveryPrice
                    ? styles.aboutQuestionsDropdownsDropdownFullOpen
                    : ""
                }`}
              >
                <p>
                  Так, доставка безкоштовна при мінімальній сумі замовлення 200
                  грн в зелену зону доставки та 300 грн в жовту зону.
                </p>
              </div>
            )}
          </div>

          <div className={styles.aboutQuestionsDropdownsDropdown}>
            <div className={styles.aboutQuestionsDropdownsDropdownTitle}>
              <p>До якої години ви приймаєте замовлення?</p>
              <button onClick={() => toggleDropdown("orderTime")}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: !isDropdownOpen.orderTime ? "&#8964;" : "&#8963;",
                  }}
                />
              </button>
            </div>
            {isDropdownOpen.orderTime && (
              <div
                className={`${styles.aboutQuestionsDropdownsDropdownFull} ${
                  isDropdownOpen.orderTime
                    ? styles.aboutQuestionsDropdownsDropdownFullOpen
                    : ""
                }`}
              >
                <p>
                  Ми приймаємо замовлення кожного дня з 10:00 по 21:00 (у
                  зв’язку з комендантською годиною)
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
