"use client";
import React, { useEffect, useState } from "react";
import styles from "./Discounts.module.scss";
import Image from "next/image";
import logo from "../../../../public/images/logo.svg";
import { useForm } from "react-hook-form";
import { DiscountType } from "@/shared/types/discount/discount";
import { database, storage } from "@/firebase/config";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v1 } from "uuid";
import { deleteFromFirebase } from "@/firebase/deleteFromFirebase";
import Preloader from "@/components/preloader/Preloader";

const AdminDiscounts = () => {
  const { register, handleSubmit, reset } = useForm();

  const [isOpen, setIsOpen] = useState(false);
  const [editDiscountId, setEditDiscountId] = useState<string | null>(null);
  const [editDiscountData, setEditDiscountData] = useState<DiscountType | null>(
    null
  );
  const [adminDiscounts, setAdminDiscounts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const addDiscountItem = () => {
    setIsOpen(!isOpen);
    setEditDiscountData(null);
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

        if (editDiscountId) {
          const updatedDiscount: DiscountType = {
            ...editDiscountData,
            name: data?.name,
            title: data?.title,
            description: data?.description,
            imagePath: downloadURL,
          };

          const discountDocRef = doc(
            collection(database, "discounts"),
            editDiscountId
          );
          await updateDoc(discountDocRef, updatedDiscount);

          setAdminDiscounts((prevDiscounts) =>
            prevDiscounts.map((discount) =>
              discount.id === editDiscountId
                ? { ...discount, ...updatedDiscount }
                : discount
            )
          );
        } else {
          const discount: DiscountType = {
            name: data.name,
            title: data.title,
            description: data.description,
            imagePath: downloadURL,
          };

          const discountID = v1();
          const discountDocRef = doc(
            collection(database, "discounts"),
            discountID
          );
          await setDoc(discountDocRef, discount);

          setAdminDiscounts((prevDiscounts) => [
            ...prevDiscounts,
            { id: discountID, ...discount },
          ]);
        }
      } else {
        console.error("No file uploaded.");
      }

      reset();
      setIsOpen(false);
    } catch (error) {
      console.error("Error adding/updating discount: ", error);
    }
  };

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        setLoading(true)
        const discountsCollectionRef = collection(database, "discounts");
        const discountsSnapshot = await getDocs(discountsCollectionRef);
        const discountsData: any[] = [];
        discountsSnapshot.forEach((doc) => {
          discountsData.push({ id: doc.id, ...doc.data() });
        });
        setAdminDiscounts(discountsData);
      } catch (error) {
        console.error("Error fetching discounts: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDiscounts();
  }, []);

  const editDiscount = async (discount: any) => {
    try {
      setEditDiscountId(discount.id);

      const discountDocRef = doc(
        collection(database, "discounts"),
        discount.id
      );
      const docSnapshot = await getDoc(discountDocRef);
      const discountData = docSnapshot.data() as DiscountType;

      setEditDiscountData(discountData);
      reset();
      setIsOpen(true);
    } catch (error) {
      console.error("Error fetching discount data: ", error);
    }
  };

  const deleteDiscount = async (discountId: string) => {
    deleteFromFirebase("discounts", discountId, setAdminDiscounts);
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.add} onClick={addDiscountItem}>
        ДОДАТИ АКЦІЮ
      </button>

      {isOpen && (
        <div className={styles.form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.name}>
              <input
                type="text"
                placeholder="*Назва"
                {...register("name", { required: true, maxLength: 50 })}
                defaultValue={editDiscountData ? editDiscountData.name : ""}
              />
              <input
                type="text"
                placeholder="*Заголовок"
                {...register("title", { required: true, maxLength: 50 })}
                defaultValue={editDiscountData ? editDiscountData.title : ""}
              />
            </div>
            <textarea
              placeholder="*Опис"
              {...register("description", { required: true, maxLength: 2000 })}
              defaultValue={
                editDiscountData ? editDiscountData.description : ""
              }
            />
            <div className={styles.file}>
              <input
                type="file"
                className={styles.fileInput}
                {...register("formFile")}
              />
            </div>


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

     { loading ? <Preloader /> : (
      <>
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
            {adminDiscounts.length === 0 && (
              <p style={{ marginTop: "30px" }}>NO DISCOUNTS</p>
            )}
            {adminDiscounts.length !== 0 &&
              adminDiscounts.map((discount, index) => (
                <tr key={index}>
                  <td>{index + 1}.</td>
                  <td>{discount?.name}</td>
                  <td>{discount?.title}</td>
                  <td>
                    {discount?.description}
                  </td>
                  <td>
                    <img src={discount.imagePath} alt="" />
                  </td>
                  <td>
                    <p onClick={() => editDiscount(discount)}>Редагувати</p>
                    <p onClick={() => deleteDiscount(discount.id)}>Видалити</p>
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

export default AdminDiscounts;
