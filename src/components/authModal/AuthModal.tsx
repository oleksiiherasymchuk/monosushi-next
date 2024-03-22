"use client";
import React, { FormEvent, useState } from "react";
import styles from "./AuthModal.module.scss";
import { useRouter } from "next/navigation";
import authMe from "@/firebase/auth";
import { toast } from "react-toastify";

type Props = {
  onClose: () => void;
  changeContent: (content: "auth" | "signIn" | "forget") => void;
};

const AuthModal = ({ onClose, changeContent }: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const handleForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { error } = await authMe(email, password);

    if (error) {
      setEmail("");
      setPassword("");
      toast.error(
        "Сталась помилка авторизації. Перевірте правильність вводу даних!"
      );
      return console.log(error);
    }

    if (email === "aleks2198@gmail.com") {
      router.push("/admin");
    } else {
      router.push("/account");
    }

    onClose();
    setEmail("");
    setPassword("");
  };

  const switchToForget = () => {
    changeContent("forget");
  };

  const switchToSignIn = () => {
    changeContent("signIn");
  };

  return (
    <div className={styles.entrance}>
      <button className="absolute top-4 right-4" onClick={onClose}>
        &times;
      </button>
      <h1>Вхід в кабінет</h1>
      <form onSubmit={handleForm}>
        <input
          type="email"
          placeholder="*Ваш email"
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="*Пароль"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">УВІЙТИ В КАБІНЕТ</button>
        <p>
          <span className="forgot" onClick={switchToForget}>
            Забули пароль?
          </span>
          <span className="signIn" onClick={switchToSignIn}>
            Зареєструватися
          </span>
        </p>
      </form>
    </div>
  );
};

export default AuthModal;
