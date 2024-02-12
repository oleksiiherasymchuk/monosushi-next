"use client";
import React, { useState } from "react";
import styles from "./Categories.module.scss"; // Adjust path to your SCSS file
import logo from "../../../../public/images/logo.svg";
import Image from "next/image";

const AdminCategories = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  // Function to add category item
  const addCategoryItem = () => {
    // setIsOpen(true);
    setIsOpen(!isOpen)
  };

  // Function to handle form submission
  const addCategory = (e: any) => {
    e.preventDefault();
    // Logic to add category
  };

  // Function to handle file upload
  const upload = (e: any) => {
    // Logic to handle file upload
    setIsUploaded(true);
  };

  // Function to delete image
  const deleteImage = () => {
    // Logic to delete image
    setIsUploaded(false);
  };

  // Function to render image source
  const valueByControl = (controlName: any) => {
    // Logic to return image source based on controlName
  };

  // Dummy data for demonstration
  const adminCategories = [
    { name: "Category 1", path: "/path1", imagePath: "image1.jpg" },
    { name: "Category 2", path: "/path2", imagePath: "image2.jpg" },
    // Add more dummy data as needed
  ];

  const editCategory = (category: any) => {};
  const deleteCategory = (category: any) => {};

  return (
    <div className={styles.wrapper}>
      <button className={styles.add} onClick={addCategoryItem}>
        ДОДАТИ КАТЕГОРІЮ
      </button>

      {isOpen && (
        <div className={styles.form}>
          <form onSubmit={addCategory}>
            <div className={styles.name}>
              <input type="text" placeholder="*Назва" name="name" id="name" />
              <input type="text" placeholder="*Шлях" name="path" id="path" />
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
                <Image
                  src={logo}
                  // src={valueByControl('imagePath')}
                  alt="logo"
                  className={styles.loadedImg}
                />
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
              // disabled={categoryForm.invalid}
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
              <td>Назва</td>
              <td>Шлях</td>
              <td>Картинка</td>
              <td>Дії</td>
            </tr>
          </thead>
          <tbody>
            {adminCategories.map((category, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{category.name}</td>
                <td>{category.path}</td>
                <td>
                  <img src={category.imagePath} alt="" />
                </td>
                <td>
                  <p onClick={() => editCategory(category)}>Редагувати</p>
                  <p onClick={() => deleteCategory(category)}>Видалити</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminCategories;
