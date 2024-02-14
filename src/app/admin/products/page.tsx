"use client";
import React, { useState } from "react";
import styles from "./Products.module.scss";
import logo from "../../../../public/images/logo.svg";
import Image from "next/image";

const AdminProducts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const addProductItem = () => {
    setIsOpen(!isOpen);
  };

  const addProduct = (e: any) => {
    e.preventDefault();
  };

  const upload = (e: any) => {
    setIsUploaded(true);
  };

  const deleteImage = () => {
    setIsUploaded(false);
  };

  const valueByControl = (controlName: any) => {};

  const adminProducts = [
    {
      category: "Category 1",
      name: "Product 1",
      ingredients: "Ingredients 1",
      weight: "100",
      price: "10",
      imagePath: "image1.jpg",
    },
    {
      category: "Category 2",
      name: "Product 2",
      ingredients: "Ingredients 2",
      weight: "200",
      price: "20",
      imagePath: "image2.jpg",
    },
  ];

  const editProduct = (product: any) => {};
  const deleteProduct = (product: any) => {};

  return (
    <div className={styles.wrapper}>
      <button className={styles.add} onClick={addProductItem}>
        ДОДАТИ ТОВАР
      </button>

      {isOpen && (
        <div className={styles.form}>
          <form onSubmit={addProduct}>
            <div className={styles.product}>
              <label htmlFor="name" className={styles.formLabel}>
                Category
              </label>
              <select name="category" className={styles.formSelect}>
                {adminProducts.map((category: any, index: number) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
                <option>souces</option>
                <option>drinks</option>
                <option>sets</option>
                <option>rolls</option>
              </select>
            </div>
            <div className={styles.name}>
              <input type="text" placeholder="*Назва" name="name" id="name" />
              <input type="text" placeholder="*Шлях" name="path" id="path" />
            </div>
            <div className={styles.ingredients}>
              <input
                type="text"
                placeholder="*Інгредієнти"
                name="ingredients"
                id="ingredients"
              />
            </div>
            <div className={styles.name}>
              <input
                type="text"
                placeholder="*Вага"
                name="weight"
                id="weight"
              />
              <input type="text" placeholder="*Ціна" name="price" id="price" />
            </div>

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
              // disabled={productForm.invalid}
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
              <td>№</td>
              <td>Категорія</td>
              <td>Назва</td>
              <td>Інгредієнти</td>
              <td>Вага</td>
              <td>Ціна</td>
              <td>Картинка</td>
              <td>Дії</td>
            </tr>
          </thead>
          <tbody>
            {adminProducts.map((product, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{product.category}</td>
                <td>{product.name}</td>
                <td>
                  {product.ingredients.slice(0, 30)}
                  {product.ingredients.length > 30 && <span>...</span>}
                </td>
                <td>{product.weight} г.</td>
                <td>{product.price} грн.</td>
                <td>
                  <img src={product.imagePath} alt="" />
                </td>
                <td>
                  <p onClick={() => editProduct(product)}>Редагувати</p>
                  <p onClick={() => deleteProduct(product)}>Видалити</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminProducts;
