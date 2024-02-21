"use client";
import React from "react";
import styles from "./SignUpModal.module.scss";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth, database } from "@/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";

type Props = {
  onClose: () => void;
  changeContent: (content: "auth" | "signIn" | "forget") => void;
};

const SignUpModal = ({ onClose, changeContent }: Props) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    reset,
  } = useForm();


  const { password, confirmPassword } = getValues();

  const onSubmit = async (user: any) => {
      if (user.password !== user.confirmPassword) {
      return;
    }

    const usersCollectionRef = collection(database, 'users');
    const querySnapshot = await getDocs(query(usersCollectionRef, where('email', '==', user.email)));
    if (!querySnapshot.empty) {
    console.error('Email already exists');
    return;
    }

    createUserWithEmailAndPassword(auth, user.email, user.password)
    .then((userCredential) => {
      const authUser = userCredential.user;
      const dataUser = {
        userID: authUser.uid,
        email: authUser.email,
        name: user.name,
        surname: user.surname,
        phone: user.phone,
        role: "User"
      };
      const usersCollectionRef = collection(database, "users");
      const userDocRef = doc(usersCollectionRef, authUser.uid);
      setDoc(userDocRef, dataUser)
        .then(() => {
          console.log("user signed up");
          reset()
          onClose()
          router.push("/account");
        })
        .catch((error) => {
          console.error("user sign up failed", error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const switchToAuth = () => {
    changeContent("auth");
  };

  return (
    <div className={styles.signInModal}>
      <button className="absolute top-4 right-4" onClick={onClose}>
        &times;
      </button>

      <h1>Зареєструватися</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.signInModalForm}
      >
        <div className={styles.signInModalFormHalfInput}>
          <input
            type="text"
            className={`${styles.signInModalFormHalfInputName} ${
              errors.name ? styles.error : ""
            }`}
            placeholder="Ваше ім'я"
            {...register("name", { required: true, maxLength: 20 })}
          />

          <input
            type="text"
            className={`${styles.signInModalFormHalfInputSurname} ${
              errors.surname ? styles.error : ""
            }`}
            placeholder="Ваше прізвище"
            {...register("surname", { required: true, maxLength: 20 })}
          />
        </div>

        <input
          type="phoneNumber"
          className={`${styles.signInModalFormPhone} ${
            errors.phone ? styles.error : ""
          }`}
          // placeholder="Ваш телефон"
          placeholder="+380XXXXXXXXX"
          {...register("phone", {
            required: true,
            pattern: /^\+380\d{9}$/,
          })}
        />

        <input
          type="email"
          className={`${styles.signInModalFormEmail} ${
            errors.email ? styles.error : ""
          }`}
          placeholder="Ваш email"
          {...register("email", {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          })}
        />


        <div className={styles.signInModalFormHalfInput}>
          <input
            type="password"
            className={`${styles.signInModalFormHalfInputPassword} ${
              errors.password ? styles.error : ""
            }`}
            placeholder="Пароль"
            {...register("password", { required: true })}
          />
          <input
            type="password"
            className={`${styles.signInModalFormHalfInputRepeatPassword} ${
              errors.confirmPassword ? styles.error : ""
            }`}
            placeholder="Повторіть пароль"
            {...register("confirmPassword", { required: true })}
          />
        </div>
        {password !== confirmPassword && (
          <p style={{ color: "red" }}>Паролі не співпадають</p>
        )}

        <div className={styles.signInModalFormCheckbox}>
          <label htmlFor="checkbox">
            <input
              type="checkbox"
              className={styles.signInModalFormCheckboxInput}
              {...register("checkbox", { required: false })}
            />
            <span>
              Я погоджуюсь з{" "}
              <Link href="/dogovir-oferta">Правилами користування</Link>
            </span>
          </label>
        </div>

        {/* <button disabled={registerForm.invalid} type="submit"> */}
        <button
          type="submit"
          disabled={isSubmitting || Object.keys(errors).length > 0}
        >
          ЗАРЕЄСТРУВАТИСЯ
        </button>
        {errors.firstName &&
          errors.lastName &&
          errors.email &&
          confirmPassword === password &&
          errors.phoneNumber && (
            <p className={styles.errorColor}>Умови користування не прийняті.</p>
          )}
        <p>
          <span>Вже зареєстровані?</span>
          <span onClick={switchToAuth}>Увійти</span>
        </p>
      </form>
    </div>
  );
};

export default SignUpModal;
