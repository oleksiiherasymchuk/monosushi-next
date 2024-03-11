"use client";
import React, { useEffect, useState } from "react";
import styles from "./Discounts.module.scss";
import { useForm } from "react-hook-form";
import { DiscountType } from "@/shared/types/discount/discount";
import Preloader from "@/components/preloader/Preloader";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useActions } from "@/hooks/useActions";

const AdminDiscounts = () => {
  const { register, handleSubmit, reset } = useForm();

  const [isOpen, setIsOpen] = useState(false);
  const [editDiscountId, setEditDiscountId] = useState<string | null>(null);
  const [editDiscountData, setEditDiscountData] = useState<DiscountType | null>(
    null
  );
  const { loading, discounts } = useTypedSelector((state) => state.admin);
  const {
    createDiscountThunk,
    getCurrentDiscountToEditThunk,
    deleteDiscountThunk,
    editDiscountThunk,
    getDiscountsThunk,
  } = useActions();

  const addDiscountItem = () => {
    setIsOpen(!isOpen);
    setEditDiscountData(null);
  };

  const onSubmit = async (data: any) => {
    try {
      if (editDiscountData) {
        await editDiscountThunk({ data, discountID: editDiscountId! });
      } else {
        await createDiscountThunk(data);
      }
      reset();
      setEditDiscountData(null);
      setIsOpen(false);

      getDiscountsThunk();
    } catch (error) {
      console.error("Error adding/updating category: ", error);
    }
  };

  const editDiscount = async (discount: any) => {
    getDiscountsThunk();
    try {
      setEditDiscountId(discount.id);
      getCurrentDiscountToEditThunk(discount.id);
      setEditDiscountData(discount);

      reset();
      setIsOpen(true);
    } catch (error) {
      console.error("Error editing discount data: ", error);
    }
  };

  const deleteDiscount = async (discountId: string | undefined) => {
    getDiscountsThunk();
    if (discountId) {
      deleteDiscountThunk(discountId);
    } else {
      console.error("Invalid category to delete:", discountId);
    }
  };

  useEffect(() => {
    getDiscountsThunk();
  }, []);

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
                  <td>Дата</td>
                  <td>Назва</td>
                  <td>Заголовок</td>
                  <td>Опис</td>
                  <td>Картинка</td>
                  <td>Дії</td>
                </tr>
              </thead>
              <tbody>
                {discounts?.length === 0 && (
                  <p style={{ marginTop: "30px" }}>NO DISCOUNTS</p>
                )}
                {discounts?.length !== 0 &&
                  discounts?.map((discount, index) => (
                    <tr key={index}>
                      <td>{index + 1}.</td>
                      <td>{discount?.name}</td>
                      <td>{discount?.title}</td>
                      <td>{discount?.description}</td>
                      <td>
                        <img src={discount.imagePath} alt="" />
                      </td>
                      <td>
                        <p onClick={() => editDiscount(discount)}>Редагувати</p>
                        <p onClick={() => deleteDiscount(discount.id)}>
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

export default AdminDiscounts;
