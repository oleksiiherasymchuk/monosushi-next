import React from "react";
import styles from "./AuthModal.module.scss";
// use react hook form

type Props = {
  onClose: () => void;
  changeContent: (content: "auth" | "signIn" | "forget") => void;
};

const AuthModal = ({ onClose, changeContent }: Props) => {

  const switchToForget = () => {
    changeContent("forget");
  };

  const switchToSignIn = () => {
    changeContent("signIn");
  };

  return (
    <div
      className={styles.entrance}
    >
       <button className="absolute top-4 right-4" onClick={onClose}>
          &times;
        </button>
      <h1>Вхід в кабінет</h1>
      <form>
        <input
          type="email"
          placeholder="*Ваш email"
          className="form-control"
        />
        <input
          type="password"
          placeholder="*Пароль"
        />
        <button type="submit">
          УВІЙТИ В КАБІНЕТ
        </button>
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

// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';

// const EntranceModal = ({ isEntranceModalShown }) => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const loginUser = (data) => {
//     // Handle login logic here
//     console.log(data);
//   };

//   const showForgetModal = () => {
//     // Handle forget password modal
//     console.log('Forget password modal shown');
//   };

//   const showSignInModal = () => {
//     // Handle sign in modal
//     console.log('Sign in modal shown');
//   };

//   return (
//     <div className="entrance" style={{ display: isEntranceModalShown ? 'block' : 'none' }}>
//       <h1>Вхід в кабінет</h1>
//       <form onSubmit={handleSubmit(loginUser)}>
//         <input {...register('email', { required: true })} type="email" placeholder="*Ваш email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
//         {errors.email && <p>This field is required</p>}
//         <input {...register('password', { required: true })} type="password" placeholder="*Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
//         {errors.password && <p>This field is required</p>}
//         <button type="submit" disabled={!email || !password}>УВІЙТИ В КАБІНЕТ</button>
//         <p>
//           <span className="forgot" onClick={showForgetModal}>Забули пароль?</span>
//           <span className="signIn" onClick={showSignInModal}>Зареєструватися</span>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default EntranceModal;
