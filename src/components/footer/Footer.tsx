import React from "react";
import styles from "./Footer.module.scss";
import HeaderLogo from "../../../public/images/headerLogo.svg";
import Link from "next/link";
import Image from "next/image";
import MasterCard from "../../../public/images/mastercard.svg";
import Visa from "../../../public/images/visa.svg";
import Liqpay from "../../../public/images/liqpay.svg";
import Facebook from "../../../public/images/facebook-icon.svg";
import Instagram from "../../../public/images/inst.png";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerTopLogo}>
          <Image src={HeaderLogo} height={50} width={50} alt="headerLogo" />
        </div>

        <div className={styles.footerTopItems}>
          <ul>
            <li>
              <Link href="/actions">Акції на суші</Link>
            </li>
            <li>
              <Link href="/about-us">Про нас</Link>
            </li>
            <li>
              <Link href="/dogovir-oferta">Оферта</Link>
            </li>
          </ul>
        </div>

        <div className={styles.footerTopInfo}>
          <div className={styles.footerTopInfoDelivery}>
            <p className={styles.footerTopInfoDeliveryTitle}>Точки самовивозу</p>
            <p className={styles.footerTopInfoDeliveryDescription}>вул. Володимира Зеленського, 95</p>
            <p className={styles.footerTopInfoDeliveryDescription}>вул. Валерія Залужного, 24</p>
            <p className={styles.footerTopInfoDeliveryDescription}>вул. Кирила Буданова, 33</p>
          </div>

          <div className={styles.footerTopInfoPhone}>
            <p className={styles.footerTopInfoPhoneTitle}>Оформити замовлення</p>
            <p className={styles.footerTopInfoPhoneDescription}>(093) 847 51 52</p>
          </div>

          <div className={styles.footerTopInfoWork}>
            <p className={styles.footerTopInfoWorkTitle}>Графік роботи</p>
            <p className={styles.footerTopInfoWorkDescription}>працюємо з 10:00 до 22:00</p>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.footerBottomCopyright}>
          <p>© 2024 Monosushi</p>
        </div>

        <div className={styles.footerBottomPaycards}>
          <div className={styles.footerBottomPaycardsCardsItem}>
            <Image src={MasterCard} alt="mastercard" height={50} width={50} />
          </div>
          <div className={styles.footerBottomPaycardsCardsItem}>
            <Image src={Visa} alt="visa" height={50} width={50} />
          </div>
          <div className={styles.footerBottomPaycardsCardsItem}>
            <Image src={Liqpay} alt="liqpay" height={50} width={50} />
          </div>
          <div className={styles.footerBottomPaycardsOwner}>
            <p>ФОП Малюк Василь Васильович</p>
          </div>
        </div>

        <div className={styles.footerBottomSocial}>
          <p>Слідкуйте за нами</p>
          <div className={styles.footerBottomSocialItem}>
            <Image src={Facebook} alt="facebookIcon" height={50} width={50} />
          </div>
          <div className={styles.footerBottomSocialItem}>
            <Image src={Instagram} alt="instagramIcon" height={50} width={50} />
          </div>
        </div>

        <div className={styles.footerBottomDeveloper}>
          <p>Oleksii Herasymchuk</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
