"use client";
import React, { FormEvent, useState } from "react";
import styles from "./AuthModal.module.scss";
import { useRouter } from "next/navigation";
import { useActions } from "@/hooks/useActions";
import { useDispatch } from "react-redux";
import { signInThunk } from "@/redux/authReducer";
import { UserCredential } from "firebase/auth";
import authMe from '@/firebase/auth';

type Props = {
  onClose: () => void;
  changeContent: (content: "auth" | "signIn" | "forget") => void;
};

const AuthModal = ({ onClose, changeContent }: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();
  // const { authenticateUser } = useActions()
  const dispatch = useDispatch<any>();

  const handleForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { error } = await authMe(email, password);

    if (error) {
      setEmail("");
      setPassword("");
      return console.log(error);
    }

    if (email === "aleks2198@gmail.com") {
      // Redirect to /admin if the user is an admin
      router.push("/admin");
    } else {
      // Redirect to /account for regular users
      router.push("/account");
    }

    onClose();
    setEmail("");
    setPassword("");
  };
  // const handleForm = async (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   dispatch(signInThunk({ email, password }))
  //   .unwrap()
  //     .then((userCredential: UserCredential | null) => {
  //       if (userCredential) {
  //         authenticateUser(true);

  //         if (email === "aleks2198@gmail.com") {
  //           router.push("/admin");
  //         } else {
  //           router.push("/account");
  //         }

  //         onClose();
  //         setEmail("");
  //         setPassword("");
  //       } else {
  //         console.error("Authentication failed");
  //       }
  //     })
  //     .catch((error: any) => {
  //       console.error("Error signing in:", error);
  //     });
  // }

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

