"use client";
import styles from "./discount.module.scss";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";

type Props = {
  // currentDiscount: DiscountType
};
const currentDiscount = {
  id: 1,
  imagePath: "Action",
  name: "3+1=5",
  description: "Description 1",
};

const Discount = (props: Props) => {
  const router = useRouter();

  return (
    <>
      <Breadcrumb categoryName={'Акції'} productName={currentDiscount.name}/>

      <div className={styles.discount}>
        <div className={styles.discountTitle}>
          <div className={styles.discountTitleTitle}>
            <div className={styles.hr}></div>
            <p>{currentDiscount.name}</p>
          </div>
        </div>

        <div className={styles.discountDescription}>
          <ul>
            <li>{currentDiscount.description}</li>
            <li>
              Щотижня діє знижка {currentDiscount.name} на один з ролів у нашому
              меню.
            </li>
            <li>
              “{currentDiscount.name}” ви можете знайти на головній сторінці
              нашого сайту.
            </li>
            <li>Знижка діє при мінімальній сумі замовлення 300 грн.</li>
            <li>Ця акція не поєднується з іншими акціями.</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Discount;
