'use client'
import React, { useState, useEffect } from "react";
import styles from "./PersonalInfo.module.scss";
import Modal from "../modal/Modal";
import AddressModal from "./AddressModal";
import { auth, database } from "@/firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import PasswordModal from "../password/PasswordModal";

type Props = {};

type User = {
  name: string;
  surname: string;
  phone: string;
  email: string;
};

const PersonalInfo = (props: Props) => {

  const [user, setUser] = useState<User>({
    name: "",
    surname: "",
    phone: "",
    email: "",
  });

  const [isDataSuccessModal, setIsDataSuccessModal] = useState<boolean>(false)
  const [modalContent, setModalContent] = useState<string>('');
  const onCloseDataSuccessModal = () => setIsDataSuccessModal(false)


  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const onCloseModal = () => setIsModalOpen(false)


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userDocRef = doc(database, "users", currentUser.uid);
          const userDocSnapshot = await getDoc(userDocRef);
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data() as User;
            setUser(userData);
            console.log(userData)
          }
        }
        console.log(currentUser)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
    console.log(user)
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const handleSaveChanges = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(database, "users", currentUser.uid);
        await setDoc(userDocRef, user, { merge: true });
        console.log("User data saved successfully.");
        setIsDataSuccessModal(true)
        setModalContent("Дані збережено")
      }
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

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
              value={user.name}
              onChange={handleInputChange}/>

            <input 
              type="text" 
              placeholder="*Прізвище" 
              name="surname"
              value={user.surname}
              onChange={handleInputChange}/>
          </div>

          <input 
            type="text" 
            placeholder="*Телефон" 
            name="phone"
            value={user.phone}
            onChange={handleInputChange}/>

          <input 
            type="text" 
            placeholder="*Пошта" 
            name="email"
            value={user.email}
            onChange={handleInputChange}/>
        </form>
      </div>

      <div className={styles.address}>
        <div className={styles.addressTitle}>
          <div className={styles.number}>2</div>
          <div className={styles.title}>Адреси</div>

          <div className={styles.AddressModal}></div>
        </div>

        <div className={styles.buttons}>
          <button className={styles.addAddress} onClick={() => setIsModalOpen(true)}>
            Додати адресу
          </button>
          <button className={styles.save} type="submit" onClick={handleSaveChanges}>
            Зберегти зміни
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen}>
        <AddressModal onClose={onCloseModal} />
      </Modal>

      <Modal isOpen={isDataSuccessModal}>
        <PasswordModal onClose={onCloseDataSuccessModal} content={modalContent}/>
      </Modal>
    </div>
  );
};

export default PersonalInfo;
