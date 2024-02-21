'use client'
import React, { FormEvent, useState } from "react";
import styles from "./AuthModal.module.scss";
import { useRouter } from "next/navigation";
import authMe from "@/firebase/auth";

type Props = {
  onClose: () => void;
  changeContent: (content: "auth" | "signIn" | "forget") => void;
};

const AuthModal = ({ onClose, changeContent }: Props) => {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const router = useRouter()

  const handleForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { error } = await authMe(email, password);

    if (error) {
        setEmail('')
        setPassword('')
        return console.log(error)
    }
    onClose()
    setEmail('')
    setPassword('')
    return router.push("/account")
}

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
