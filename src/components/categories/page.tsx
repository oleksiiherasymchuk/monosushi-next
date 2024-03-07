"use client";
import React, { useState, useEffect } from "react";
import styles from "./Categories.module.scss";
import logo from "../../../../public/images/logo.svg";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { database, storage } from "@/firebase/config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v1 } from "uuid";
import { CategoryType } from "@/shared/types/categories/category";
import { deleteFromFirebase } from "@/firebase/deleteFromFirebase";
import Preloader from "@/components/preloader/Preloader";

const AdminCategories = () => {
  const { register, handleSubmit, reset } = useForm();

  const [isOpen, setIsOpen] = useState(false);
  const [adminCategories, setAdminCategories] = useState<any[]>([]);
  const [editCategoryId, setEditCategoryId] = useState<string | null>(null);
  const [editCategoryData, setEditCategoryData] = useState<CategoryType | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  const addCategoryItem = () => {
    setIsOpen(!isOpen);
    setEditCategoryData(null);
  };

  const onSubmit = async (data: any) => {
    try {
      if (data.formFile && data.formFile.length > 0) {
        const imagePath = data.formFile[0];
        const imageName = imagePath.name;

        const storageRef = ref(storage, `images/${imageName}`);
        await uploadBytes(storageRef, imagePath);
        const downloadURL = await getDownloadURL(
          ref(storage, `images/${imageName}`)
        );

        if (editCategoryId) {
          const updatedCategory: CategoryType = {
            ...editCategoryData,
            name: data?.name,
            path: data?.path,
            imagePath: downloadURL,
          };

          const categoryDocRef = doc(
            collection(database, "categories"),
            editCategoryId
          );
          await updateDoc(categoryDocRef, updatedCategory);

          setAdminCategories((prevCategories) =>
            prevCategories.map((category) =>
              category.id === editCategoryId
                ? { ...category, ...updatedCategory }
                : category
            )
          );
        } else {
          const category: CategoryType = {
            name: data.name,
            path: data.path,
            imagePath: downloadURL,
          };

          const categoryID = v1();
          const categoryDocRef = doc(
            collection(database, "categories"),
            categoryID
          );
          await setDoc(categoryDocRef, category);

          setAdminCategories((prevCategories) => [
            ...prevCategories,
            { id: categoryID, ...category },
          ]);
        }
      } else {
        console.error("No file uploaded.");
      }

      reset();
      setIsOpen(false);
    } catch (error) {
      console.error("Error adding/updating category: ", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const categoriesCollectionRef = collection(database, "categories");
        const categoriesSnapshot = await getDocs(categoriesCollectionRef);
        const categoriesData: any[] = [];
        categoriesSnapshot.forEach((doc) => {
          categoriesData.push({ id: doc.id, ...doc.data() });
        });
        setAdminCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const editCategory = async (category: any) => {
    try {
      setEditCategoryId(category.id);

      const categoryDocRef = doc(
        collection(database, "categories"),
        category.id
      );
      const docSnapshot = await getDoc(categoryDocRef);
      const categoryData = docSnapshot.data() as CategoryType;

      setEditCategoryData(categoryData);
      reset();
      setIsOpen(true);
    } catch (error) {
      console.error("Error fetching category data: ", error);
    }
  };

  const deleteCategory = async (categoryId: string) => {
    deleteFromFirebase("categories", categoryId, setAdminCategories);
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.add} onClick={addCategoryItem}>
        ДОДАТИ КАТЕГОРІЮ
      </button>

      {isOpen && (
        <div className={styles.form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.name}>
              <input
                type="text"
                placeholder="*Назва"
                {...register("name", { required: true, maxLength: 20 })}
                defaultValue={editCategoryData ? editCategoryData.name : ""}
              />
              <input
                type="text"
                placeholder="*Шлях"
                {...register("path", { required: true, maxLength: 20 })}
                defaultValue={editCategoryData ? editCategoryData.path : ""}
              />
            </div>
            <div className={styles.file}>
              <input
                type="file"
                className={styles.fileInput}
                {...register("formFile")}
              />
            </div>

            <button className={styles.save} type="submit">
              ЗБЕРЕГТИ
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <Preloader />
      ) : (
        <>
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
                {adminCategories.length === 0 && (
                  <p style={{ marginTop: "30px" }}>NO CATEGORIES</p>
                )}
                {adminCategories.length !== 0 &&
                  adminCategories.map((category, index) => (
                    <tr key={index}>
                      <td>{index + 1}.</td>
                      <td>{category.name}</td>
                      <td>{category.path}</td>
                      <td>
                        <img src={category.imagePath} alt="" />
                      </td>
                      <td>
                        <p onClick={() => editCategory(category)}>Редагувати</p>
                        <p onClick={() => deleteCategory(category.id)}>
                          Видалити
                        </p>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default AdminCategories;
