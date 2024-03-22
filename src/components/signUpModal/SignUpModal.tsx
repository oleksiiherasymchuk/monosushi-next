"use client";
import React from "react";
import styles from "./SignUpModal.module.scss";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActions } from "@/hooks/useActions";
import { toast } from "react-toastify";

type Props = {
  onClose: () => void;
  changeContent: (content: "auth" | "signIn" | "forget") => void;
};

const SignUpModal = ({ onClose, changeContent }: Props) => {
  const router = useRouter();
  const { createUserThunk } = useActions();

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

    try {
      await createUserThunk(user);
      reset();
      onClose();
      router.push("/account");
    } catch (error) {
      toast.error("Помилка реєстрації;(");
      console.error("Failed to sign up:", error);
    }
  };

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
