import React from "react";
import styles from "./PersonalInfo.module.scss";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Map from "../../../public/images/mapAddress.png";

type Props = {
  onClose: () => void;
};

const AddressModal = ({ onClose }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = () => {};

  return (
    <div className={styles.modal}>
      <button className="absolute top-4 right-4" onClick={onClose}>
        &times;
      </button>

      <h1>Нова адреса</h1>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.modalForm}>
        <input
          type="text"
          className={`${styles.modalFormAddressType} ${
            errors.addressType ? styles.error : ""
          }`}
          placeholder="*Вкажіть тип адреси (наприклад, дім, робота)"
          {...register("addressType", {
            required: true,
          })}
        />

        <input
          type="text"
          className={`${styles.modalFormDelivery} ${
            errors.delivery ? styles.error : ""
          }`}
          placeholder="*Введіть вулицю доставки"
          {...register("delivery", {
            required: true,
          })}
        />

        <div className={styles.modalFormHalfInput}>
          <input
            type="text"
            className={`${styles.modalFormHalfInputAddress} 
            ${errors.houseNumber ? styles.error : ""}
            `}
            placeholder="*№ Будинку"
            {...register("houseNumber", { required: true, maxLength: 4 })}
          />

          <input
            type="text"
            className={`${styles.modalFormHalfInputAddress} ${
              errors.flatNumber ? styles.error : ""
            }`}
            placeholder="№ Квартири"
            {...register("flatNumber", { required: true, maxLength: 5 })}
          />
        </div>

        <div className={styles.modalFormButtons}>
          <button className={styles.modalFormButtonsFindAddress}>
            Пошук адреси
          </button>
          <button
            className={styles.modalFormButtonsSave}
            type="submit"
            disabled={isSubmitting || Object.keys(errors).length > 0}
          >
            Зберегти
          </button>
        </div>

        <div className={styles.modalFormMap}>
          <Image src={Map} alt="map" height={290} width={480} />
        </div>
      </form>
    </div>
  );
};

export default AddressModal;
