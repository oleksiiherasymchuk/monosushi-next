"use client";
import React, { useState, useEffect } from "react";
import styles from "./PersonalInfo.module.scss";
import Modal from "../modal/Modal";
import AddressModal from "./AddressModal";
import { auth } from "@/firebase/config";
import PasswordModal from "../password/PasswordModal";
import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { toast } from "react-toastify";

type User = {
  name: string;
  surname: string;
  phone: string;
  email: string;
};

const PersonalInfo = () => {
  const [isDataSuccessModal, setIsDataSuccessModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<User | any>({
    name: "",
    surname: "",
    phone: "",
    email: "",
  });

  const onCloseModal = () => setIsModalOpen(false);
  const onCloseDataSuccessModal = () => setIsDataSuccessModal(false);

  const { getUserDataThunk, updateUserThunk } = useActions();
  const user = useTypedSelector((state) => state.auth.user);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      getUserDataThunk({ userId: currentUser.uid });
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    try {
      const currentUser = auth.currentUser;
      if (!/^\+380\d{9}$/.test(formData.phone)) {
        toast.error(
          "Будь ласка, введіть номер телефону у форматі +380931234567"
        );
        return;
      }

      if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
      ) {
        toast.error(
          "Будь ласка, введіть електронну пошту у форматі ukraine@ukraine.ua"
        );
        return;
      }

      if (currentUser) {
        updateUserThunk(formData);
      }
      setIsDataSuccessModal(true);
      setModalContent("Дані збережено");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <div className={styles.infoTitle}>
          <div className={styles.number}>1</div>
          <div className={styles.title}>Особисті дані</div>
        </div>

        <form>
          <div className={styles.names}>
            <input
              type="text"
              placeholder="*Імя"
              name="name"
              value={formData.name || ""}
              onChange={handleInputChange}
            />

            <input
              type="text"
              placeholder="*Прізвище"
              name="surname"
              value={formData.surname || ""}
              onChange={handleInputChange}
            />
          </div>

          <input
            type="text"
            placeholder="*Телефон"
            name="phone"
            value={formData.phone || ""}
            onChange={handleInputChange}
          />

          <input
            type="text"
            placeholder="*Пошта"
            name="email"
            value={formData.email || ""}
            onChange={handleInputChange}
          />
        </form>
      </div>

      <div className={styles.address}>
        <div className={styles.addressTitle}>
          <div className={styles.number}>2</div>
          <div className={styles.title}>Адреси</div>

          <div className={styles.AddressModal}></div>
        </div>

        <div className={styles.buttons}>
          <button
            className={styles.addAddress}
            onClick={() => setIsModalOpen(true)}
          >
            Додати адресу
          </button>
          <button
            className={styles.save}
            type="submit"
            onClick={handleSaveChanges}
          >
            Зберегти зміни
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen}>
        <AddressModal onClose={onCloseModal} />
      </Modal>

      <Modal isOpen={isDataSuccessModal}>
        <PasswordModal
          onClose={onCloseDataSuccessModal}
          content={modalContent}
        />
      </Modal>
    </div>
  );
};

export default PersonalInfo;
