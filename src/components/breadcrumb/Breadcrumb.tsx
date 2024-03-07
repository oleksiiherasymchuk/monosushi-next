import React from "react";
import styles from "./Breadcrumb.module.scss";
import Link from "next/link";

type Props = {
  categoryName?: string;
  productName?: string;
};

const Breadcrumb = ({ categoryName, productName }: Props) => {

  function getCategoryPath(categoryName: any) {
    switch (categoryName) {
      case 'actions':
        return 'Акції';
      case 'rolls':
        return 'Роли';
      case 'sets':
        return 'Сети';
      case 'drinks':
        return 'Безакогольні напої';
      case 'souces':
        return 'Соуси';
      default:
        return '';
    }
  }


  return (
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
              href={categoryName === 'actions' ? `/actions` : `/product-category/${categoryName}`}
              className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
            >
              {getCategoryPath(categoryName)}
            </Link>
          </li>
          <li>
            <span className="mx-2 text-neutral-500 dark:text-neutral-400"></span>
          </li>
          <li className="text-neutral-500 dark:text-neutral-400">
            {productName}
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
