"use client";
import React, { useState, useEffect } from "react";
import styles from "./Categories.module.scss";
import { useForm } from "react-hook-form";
import { CategoryType } from "@/shared/types/categories/category";
import Preloader from "@/components/preloader/Preloader";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";

const AdminCategories = () => {
  const { register, handleSubmit, reset } = useForm();

  const [isOpen, setIsOpen] = useState(false);
  const { loading, categories } = useTypedSelector((state) => state.admin);

  const [editCategoryId, setEditCategoryId] = useState<string | null>(null);
  const [editCategoryData, setEditCategoryData] = useState<CategoryType | null>(
    null
  );

  const {
    getCategoriesThunk,
    createCategoryThunk,
    editCategoryThunk,
    deleteCategoryThunk,
    getCurrentCategoryToEditThunk,
  } = useActions();

  const addCategoryItem = () => {
    setIsOpen(!isOpen);
    setEditCategoryData(null);
  };

  const onSubmit = async (data: any) => {
    try {
      if (editCategoryData) {
        await editCategoryThunk({ data, categoryId: editCategoryId! });
      } else {
        await createCategoryThunk(data);
      }
      reset();
      setEditCategoryData(null);
      setIsOpen(false);

      getCategoriesThunk();
    } catch (error) {
      console.error("Error adding/updating category: ", error);
    }
  };

  const editCategory = async (category: any) => {
    getCategoriesThunk();
    try {
      setEditCategoryId(category.id);
      getCurrentCategoryToEditThunk(category.id);
      setEditCategoryData(category);

      reset();
      setIsOpen(true);
    } catch (error) {
      console.error("Error editing category data: ", error);
    }
  };

  const deleteCategory = async (categoryId: string | undefined) => {
    getCategoriesThunk();
    if (categoryId) {
      deleteCategoryThunk(categoryId);
    } else {
      console.error("Invalid category to delete:", categoryId);
    }
  };

  useEffect(() => {
    getCategoriesThunk();
  }, []);

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
                {categories?.length === 0 && (
                  <p style={{ marginTop: "30px" }}>NO CATEGORIES</p>
                )}
                {categories?.length !== 0 &&
                  categories?.map((category: CategoryType, index: number) => (
                    <tr key={index}>
                      <td>{index + 1}.</td>
                      <td>{category.name}</td>
                      <td>{category.path}</td>
                      <td>
                        <img src={category.imagePath} alt="categoryImage" />
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
