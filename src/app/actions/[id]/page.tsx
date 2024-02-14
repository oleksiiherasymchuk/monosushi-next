"use client";
import styles from "./discount.module.scss";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
      <div className={styles.breadcrumb}>
        <nav className="w-full rounded-md">
          <ol className="list-reset flex">
            <li>
              <Link
                href="/"
                className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
              >
                Головна
              </Link>
            </li>
            <li>
              <span className="mx-2 text-neutral-500 dark:text-neutral-400"></span>
            </li>
            <li>
              <Link
                href="/actions"
                className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
              >
                Акції
              </Link>
            </li>
            <li>
              <span className="mx-2 text-neutral-500 dark:text-neutral-400"></span>
            </li>
            <li className="text-neutral-500 dark:text-neutral-400">
              {currentDiscount.name}
            </li>
          </ol>
        </nav>
      </div>

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
