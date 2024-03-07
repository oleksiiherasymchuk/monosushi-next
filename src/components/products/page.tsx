"use client";
import React, { useState, useEffect } from "react";
import styles from "./Products.module.scss";
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
import { ProductType } from "@/shared/types/products/product";
import Preloader from "@/components/preloader/Preloader";
import { deleteFromFirebase } from "@/firebase/deleteFromFirebase";

const AdminProducts = () => {
  const { register, handleSubmit, reset } = useForm();

  const [isOpen, setIsOpen] = useState(false);
  const [adminProducts, setAdminProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [editProductData, setEditProductData] = useState<ProductType | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesCollectionRef = collection(database, "categories");
        const categoriesSnapshot = await getDocs(categoriesCollectionRef);
        const categoriesData: string[] = [];
        categoriesSnapshot.forEach((doc) => {
          categoriesData.push(doc.data().name);
        });
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };
    fetchCategories();
  }, []);

  const addProductItem = () => {
    if (categories.length === 0) {
      alert("Спочатку додайте категорії");
      return;
    }
    setIsOpen(!isOpen);
    setEditProductData(null);
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

        if (editProductId) {
          const updatedProduct: ProductType = {
            ...editProductData,
            name: data.name,
            category: data.category,
            path: data.path,
            ingredients: data.ingredients,
            weight: data.weight,
            price: data.price,
            imagePath: downloadURL,
          };

          const productDocRef = doc(
            collection(database, "products"),
            editProductId
          );
          await updateDoc(productDocRef, updatedProduct);

          setAdminProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.id === editProductId
                ? { ...product, ...updatedProduct }
                : product
            )
          );
        } else {
          const product: ProductType = {
            name: data.name,
            category: data.category,
            path: data.path,
            ingredients: data.ingredients,
            weight: data.weight,
            price: data.price,
            imagePath: downloadURL,
          };

          const productID = v1();
          const productDocRef = doc(
            collection(database, "products"),
            productID
          );
          await setDoc(productDocRef, product);

          setAdminProducts((prevProducts) => [
            ...prevProducts,
            { id: productID, ...product },
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

  const editProduct = async (product: any) => {
    try {
      setEditProductId(product.id);

      const productDocRef = doc(collection(database, "products"), product.id);
      const docSnapshot = await getDoc(productDocRef);
      const productData = docSnapshot.data() as ProductType;

      setEditProductData(productData);

      reset();
      setIsOpen(true);
    } catch (error) {
      console.error("Error fetching product data: ", error);
    }
  };

  const deleteProduct = (productId: string) => {
    deleteFromFirebase("products", productId, setAdminProducts);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsCollectionRef = collection(database, "products");
        const productsSnapshot = await getDocs(productsCollectionRef);
        const productsData: any[] = [];
        productsSnapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() });
        });
        productsData.sort((a, b) => a.category.localeCompare(b.category));

        setAdminProducts(productsData);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
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

            {/* {editProductData?.imagePath && (
              <div>
                <Image src={editProductData?.imagePath} alt="logo" className={styles.loadedImg} width={50} height={50}/>
                <button
                  type="button"
                  className={styles.deleteImage}
                  // onClick={deleteImage}
                >
                  delete
                </button>
              </div>
            )} */}

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
                {adminProducts.length === 0 && (
                  <p style={{ marginTop: "30px" }}>NO PRODUCTS</p>
                )}
                {adminProducts.length !== 0 &&
                  adminProducts.map((product, index) => (
                    <tr key={index}>
                      <td>{index + 1}.</td>
                      <td>{product.category}</td>
                      <td>{product.name}</td>
                      <td>
                        {/* {product.ingredients.slice(0, 30)} */}
                        {/* {product.ingredients.length > 30 && <span>...</span>} */}
                        {product.ingredients}
                      </td>
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
