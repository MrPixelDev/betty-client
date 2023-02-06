import React, { FC, useContext, useState } from "react";
import { Context } from "../..";

const LoginForm: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { store } = useContext(Context);

  return (
    <div className="input-form input-form__login-form">
      <input
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        value={username}
        type="text"
        placeholder="Имя пользователя"
      />
      <input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
        type="password"
        placeholder="Пароль"
      />
      <button
        onClick={() => {
          store.isAuth ? store.logout() : store.login(username, password);
        }}
      >
        {store.isAuth ? "Выход" : "Логин"}
      </button>
    </div>
  );
};

export default LoginForm;
