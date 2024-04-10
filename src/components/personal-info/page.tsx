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
import Image from "next/image";
import edit from "../../../public/images/edit.svg";
import deleteIcon from "../../../public/images/deleteIcon.png";

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

  const [addressToEdit, setAddressToEdit] = useState<any>();

  const onCloseModal = () => setIsModalOpen(false);
  const onCloseDataSuccessModal = () => setIsDataSuccessModal(false);

  const { getUserDataThunk, updateUserThunk, deleteAddressThunk } =
    useActions();
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

  const editAddress = async (address: any) => {
    setAddressToEdit(address);
    setIsModalOpen(true);
  };

  const deleteAddress = async (addressId: string) => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await deleteAddressThunk(addressId);
        getUserDataThunk({ userId: currentUser.uid });
      } else {
        throw new Error("Current user not found");
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error("Помилка видалення адреси:(");
    }
  };

  useEffect(() => {
    if (user) {
      setFormData(user);
      // console.log(user);
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
          <div className={styles.addressTitleBlock}>
            <div className={styles.addressTitleBlockNumber}>2</div>
            <div className={styles.addressTitleBlockTitle}>Адреси</div>
          </div>

          {user?.addresses &&
            user.addresses.map((u: any) => {
              return (
                <div className={styles.addressTitleItem} key={u.id}>
                  <div className={styles.addressTitleItemCheckbox}>
                    <label htmlFor="addressType">
                      <input type="radio" name="addressType" id="addressType" />
                      <p>{u.addressType}</p>
                    </label>
                  </div>
                  <div className={styles.addressTitleItemStreet}>
                    {u.deliveryAddress}, {u.houseNumber}, кв.{u.flatNumber}
                  </div>
                  <button
                    className={styles.addressTitleItemEdit}
                    onClick={() => editAddress(u)}
                  >
                    <Image
                      src={edit}
                      alt="editAddress"
                      width={20}
                      height={20}
                    />
                    <span>Редагувати</span>
                  </button>
                  <button
                    className={styles.addressTitleItemDelete}
                    onClick={() => deleteAddress(u.id)}
                  >
                    <Image
                      src={deleteIcon}
                      alt="deleteAddress"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              );
            })}

          <div className={styles.AddressModal}></div>
        </div>

        <div className={styles.buttons}>
          <button
            className={styles.addAddress}
            onClick={() => {
              setAddressToEdit(null)
              setIsModalOpen(true)}}
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

      <Modal isOpen={isModalOpen} onClose={onCloseModal}>
        <AddressModal
          onClose={onCloseModal}
          address={addressToEdit}
          isOpen={isModalOpen}
        />
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
