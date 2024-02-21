"use client";
import React, { useState } from "react";
import styles from "./ForgetModal.module.scss";
import { auth, database } from "@/firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";
import Modal from "../modal/Modal";
import PasswordModal from "../password/PasswordModal";
import { collection, getDocs, query, where } from "firebase/firestore";

export type ModalContent =
  | "Пароль змінено"
  | "Лист відновлення паролю надіслано."
  | "Невірний email. Перевірте введені дані.";

type Props = {
  onClose: () => void;
  changeContent: (content: "auth" | "signIn" | "forget") => void;
};

const ForgetModal = ({ onClose, changeContent }: Props) => {
  const [email, setEmail] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ModalContent>();

  const onCloseModal = () => setIsModalOpen(false);

  const switchToSignIn = () => {
    changeContent("auth");
  };

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const emailExists = await checkEmailExists(email);

      if (!emailExists) {
        // onClose()
        setIsModalOpen(true);
        setModalContent("Невірний email. Перевірте введені дані.");
        return;
      }

      await sendPasswordResetEmail(auth, email);
      // onClose();
      setIsModalOpen(true);
      setModalContent("Лист відновлення паролю надіслано.");
    } catch (error) {
      console.log(error);
    }
  };

  const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
      const usersCollectionRef = collection(database, "users");
      const snapshot = await getDocs(query(usersCollectionRef, where('email', '==', email)));
      return !snapshot.empty;
    } catch (error) {
      console.error("Error checking email existence:", error);
      return false;
    }
  };

  return (
    <div className={styles.forgetModal}>
      <button className="absolute top-4 right-4" onClick={onClose}>
        &times;
      </button>
      <h1>Відновити пароль</h1>
      <h3>
        Після заповнення інструкції, ми надішлемо вам детальну інструкцію по
        відновленню паролю
      </h3>
      <form onSubmit={handleResetPassword}>
        <input
          type="email"
          placeholder="*Ваш email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button>ВІДНОВИТИ ПАРОЛЬ</button>
        <p>
          <span>Повернутися до</span>
          <span onClick={switchToSignIn}>Входу</span>
        </p>
      </form>
      <Modal isOpen={isModalOpen}>
        <PasswordModal onClose={onCloseModal} content={modalContent} />
      </Modal>
    </div>
  );
};

export default ForgetModal;
