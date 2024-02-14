import React, { useState } from "react";
import styles from "./SignInModal.module.scss";

type Props = {
  onClose: () => void;
  changeContent: (content: "auth" | "signIn" | "forget") => void;
};

const SignInModal = ({ onClose, changeContent }: Props) => {
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });

  const [matchError, setMatchError] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setRegisterForm({ ...registerForm, [name]: value });
  };

  const checkConfirmedPassword = () => {
    if (registerForm.password !== registerForm.confirmedPassword) {
      setMatchError(true);
    } else {
      setMatchError(false);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
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
      <form onSubmit={handleSubmit} className={styles.signInModalForm}>
        <div className={styles.signInModalFormHalfInput}>
          <input
            name="firstName"
            type="text"
            className={styles.signInModalFormHalfInputName}
            placeholder="Ваше ім'я"
            value={registerForm.firstName}
            onChange={handleChange}
          />
          <input
            name="lastName"
            type="text"
            className={styles.signInModalFormHalfInputSurname}
            placeholder="Ваше прізвище"
            value={registerForm.lastName}
            onChange={handleChange}
          />
        </div>
        <input
          name="phoneNumber"
          type="phoneNumber"
          className={styles.signInModalFormPhone}
          placeholder="Ваш телефон"
          value={registerForm.phoneNumber}
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          className={styles.signInModalFormEmail}
          placeholder="Ваш email"
          value={registerForm.email}
          onChange={handleChange}
        />
        <div className={styles.signInModalFormHalfInput}>
          <input
            name="password"
            type="password"
            className={styles.signInModalFormHalfInputPassword}
            placeholder="Пароль"
            value={registerForm.password}
            onChange={handleChange}
            onBlur={checkConfirmedPassword}
          />
          <input
            name="confirmedPassword"
            type="password"
            className={styles.signInModalFormHalfInputRepeatPassword}
            placeholder="Повторіть пароль"
            value={registerForm.confirmedPassword}
            onChange={handleChange}
            onBlur={checkConfirmedPassword}
          />
        </div>
        {matchError && <p>Confirmed password is required</p>}
        <div className={styles.signInModalFormCheckbox}>
          <label htmlFor="checkbox">
            <input
              type="checkbox"
              className={styles.signInModalFormCheckboxInput}
            />
            <span>
              Я погоджуюсь з <b>Правилами користування</b>
            </span>
          </label>
        </div>

        {/* <button disabled={registerForm.invalid} type="submit"> */}
        <button type="submit">ЗАРЕЄСТРУВАТИСЯ</button>

        <p>
          <span>Вже зареєстровані?</span>
          <span onClick={switchToAuth}>Увійти</span>
        </p>
      </form>
    </div>
  );
};

export default SignInModal;
