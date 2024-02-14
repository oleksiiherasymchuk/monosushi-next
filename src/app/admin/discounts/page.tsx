"use client";
import React, { useState } from "react";
import styles from "./Discounts.module.scss"; // Adjust path to your SCSS file
import Image from "next/image";
import logo from "../../../../public/images/logo.svg";

const AdminDiscounts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const addDiscountItem = () => {
    setIsOpen(!isOpen);
  };

  const addDiscount = (e: any) => {
    e.preventDefault();
  };

  const upload = (e: any) => {
    setIsUploaded(true);
  };

  const deleteImage = () => {
    setIsUploaded(false);
  };

  const valueByControl = (controlName: any) => {};

  const adminDiscounts = [
    {
      name: "Discount 1",
      title: "Title 1",
      description: "Description 1",
      imagePath: "image1.jpg",
    },
    {
      name: "Discount 2",
      title: "Title 2",
      description: "Description 2",
      imagePath: "image2.jpg",
    },
  ];

  const editDiscount = (discount: any) => {};
  const deleteDiscount = (discount: any) => {};

  return (
    <div className={styles.wrapper}>
      <button className={styles.add} onClick={addDiscountItem}>
        ДОДАТИ АКЦІЮ
      </button>

      {isOpen && (
        <div className={styles.form}>
          <form onSubmit={addDiscount}>
            <div className={styles.name}>
              <input type="text" placeholder="*Назва" name="name" id="name" />
              <input
                type="text"
                placeholder="*Заголовок"
                name="title"
                id="title"
              />
            </div>
            <textarea
              placeholder="*Опис"
              name="description"
              id="description"
            ></textarea>
            <div className={styles.file}>
              <input
                type="file"
                name="formFile"
                className={styles.fileInput}
                id="formFile"
                onChange={upload}
              />
            </div>

            {isUploaded && (
              <div>
                <Image src={logo} alt="logo" className={styles.loadedImg} />
                <button
                  type="button"
                  className={styles.deleteImage}
                  onClick={deleteImage}
                >
                  delete
                </button>
              </div>
            )}

            <button
              className={styles.save}
              // disabled={discountForm.invalid}
              type="submit"
            >
              ЗБЕРЕГТИ
            </button>
          </form>
        </div>
      )}

      {!isOpen && (
        <table>
          <thead>
            <tr>
              <td>Дата</td>
              <td>Назва</td>
              <td>Заголовок</td>
              <td>Опис</td>
              <td>Картинка</td>
              <td>Дії</td>
            </tr>
          </thead>
          <tbody>
            {adminDiscounts.map((discount, index) => (
              <tr key={index}>
                <td>24.03.2023</td>
                <td>{discount.name}</td>
                <td>{discount.title}</td>
                <td>
                  {discount.description.slice(0, 100)}
                  {discount.description.length > 60 && <span>...</span>}
                </td>
                <td>
                  <img src={discount.imagePath} alt="" />
                </td>
                <td>
                  <p onClick={() => editDiscount(discount)}>Редагувати</p>
                  <p onClick={() => deleteDiscount(discount)}>Видалити</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDiscounts;
