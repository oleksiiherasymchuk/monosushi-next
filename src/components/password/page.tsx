"use client";
import React, { useState } from "react";
import styles from "./PasswordPage.module.scss";
import { useForm } from "react-hook-form";
import { auth } from "@/firebase/config";
import { signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import Modal from "../modal/Modal";
import PasswordModal from "./PasswordModal";

type Props = {};
export type ModalContent = 'Дані збережено' | 'Невірний старий пароль' | 'Помилка. Підтвердження паролю не співпадає.';

const PasswordPage = (props: Props) => {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ModalContent>();

  const onCloseModal = () => setIsModalOpen(false)

  const onSubmit = async (data: any) => {
    if (data.newPassword !== data.confirmNewPassword) {
      setIsModalOpen(true)
      setModalContent("Помилка. Підтвердження паролю не співпадає.")
      return;
    }
  
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User is not authenticated")
      }
  
      const email = user.email || '';
      const currentPassword = data.currentPassword;
  
      try {
        await signInWithEmailAndPassword(auth, email, currentPassword);
      } catch (signInError) {
        setIsModalOpen(true)
        setModalContent("Невірний старий пароль")
        return;
      }
  
      const newPassword = data.newPassword;
      await updatePassword(user, newPassword);
      
      setIsModalOpen(true)
      setModalContent("Дані збережено")
      reset();
    } catch (error) {
      console.log(error)
    }
  };
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <div className={styles.infoTitle}>
          <div className={styles.title}>Зміна паролю</div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>

          <input
            type="password"
            placeholder="*Ваш поточний пароль"
            {...register("currentPassword", { required: true })}
          />

          <input
            type="password"
            placeholder="*Новий пароль"
            {...register("newPassword", { required: true })}
          />

          <input
            type="password"
            placeholder="*Повторіть пароль"
            {...register("confirmNewPassword", { required: true })}
          />

          <div className={styles.buttons}>
            <button className={styles.cancel} type="reset">
              Скасувати
            </button>
            <button className={styles.save} type="submit">
              Зберегти зміни
            </button>
          </div>
        </form>
      </div>
      <Modal isOpen={isModalOpen}>
        <PasswordModal onClose={onCloseModal} content={modalContent}/>
      </Modal>
    </div>
  );
};

export default PasswordPage;