"use client";
import React, { useState, useEffect } from "react";
import styles from "./Products.module.scss";
import { useForm } from "react-hook-form";
import { ProductType } from "@/shared/types/products/product";
import Preloader from "@/components/preloader/Preloader";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";
import { toast } from "react-toastify";

const AdminProducts = () => {
  const { register, handleSubmit, reset } = useForm();

  const [isOpen, setIsOpen] = useState(false);

  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [editProductData, setEditProductData] = useState<ProductType | null>(
    null
  );
  const { loading, categories, products } = useTypedSelector(
    (state) => state.admin
  );
  const {
    getProductsThunk,
    createProductThunk,
    editProductThunk,
    deleteProductThunk,
    getCurrentProductToEditThunk,
    getCategoriesThunk,
  } = useActions();

  const addProductItem = () => {
    if (categories?.length === 0) {
      toast.info("Спочатку додайте категорії!");
      return;
    }
    setIsOpen(!isOpen);
    setEditProductData(null);
  };

  const onSubmit = async (data: any) => {
    try {
      if (editProductData) {
        await editProductThunk({ data, productID: editProductId! });
      } else {
        await createProductThunk(data);
      }
      reset();
      setEditProductData(null);
      setIsOpen(false);

      getProductsThunk();
    } catch (error) {
      console.error("Error adding/updating product: ", error);
    }
  };

  const editProduct = async (product: any) => {
    getProductsThunk();
    try {
      setEditProductId(product.id);
      getCurrentProductToEditThunk(product.id);
      setEditProductData(product);

      reset();
      setIsOpen(true);
    } catch (error) {
      console.error("Error editing product data: ", error);
    }
  };

  const deleteProduct = async (productId: string | undefined) => {
    getProductsThunk();
    if (productId) {
      deleteProductThunk(productId);
    } else {
      console.error("Invalid product to delete:", productId);
    }
  };

  useEffect(() => {
    getCategoriesThunk();
    getProductsThunk();
  }, []);

  const sortedProducts = products
    ? [...products].sort((a, b) => a.category.localeCompare(b.category))
    : [];

  return (
    <div className={styles.wrapper}>
      <button className={styles.add} onClick={addProductItem}>
        ДОДАТИ ТОВАР
      </button>

      {isOpen && (
        <div className={styles.form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.product}>
              <label htmlFor="name" className={styles.formLabel}>
                Category
              </label>
              <select className={styles.formSelect} {...register("category")}>
                {categories?.map((category: any, index) => {
                  console.log(category);
                  return (
                    <option key={index} value={category.name}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={styles.name}>
              <input
                type="text"
                placeholder="*Назва"
                {...register("name", { required: true, maxLength: 3000 })}
                defaultValue={editProductData ? editProductData.name : ""}
              />
              <input
                type="text"
                placeholder="*Шлях"
                {...register("path", { required: true, maxLength: 200 })}
                defaultValue={editProductData ? editProductData.path : ""}
              />
            </div>
            <div className={styles.ingredients}>
              <input
                type="text"
                placeholder="*Інгредієнти"
                {...register("ingredients", { maxLength: 2000 })}
                defaultValue={
                  editProductData ? editProductData.ingredients : ""
                }
              />
            </div>
            <div className={styles.name}>
              <input
                type="text"
                placeholder="*Вага"
                {...register("weight", { maxLength: 20 })}
                defaultValue={editProductData ? editProductData.weight : ""}
              />
              <input
                type="text"
                placeholder="*Ціна"
                {...register("price", { required: true, maxLength: 20 })}
                defaultValue={editProductData ? editProductData.price : ""}
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
                {products?.length === 0 && (
                  <p style={{ marginTop: "30px" }}>NO PRODUCTS</p>
                )}
                {products?.length !== 0 &&
                  sortedProducts?.map((product, index) => (
                    <tr key={index}>
                      <td>{index + 1}.</td>
                      <td>{product.category}</td>
                      <td>{product.name}</td>
                      <td>{product.ingredients}</td>
                      <td>{product.weight}</td>
                      <td>{product.price} грн.</td>
                      <td>
                        <img src={product.imagePath} alt="" />
                      </td>
                      <td>
                        <p onClick={() => editProduct(product)}>Редагувати</p>
                        <p onClick={() => deleteProduct(product.id)}>
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

export default AdminProducts;
