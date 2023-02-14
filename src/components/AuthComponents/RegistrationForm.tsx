import { observer } from "mobx-react-lite";
import { FC, useContext, useState } from "react";
import { Context } from "../..";

const RegistrationForm: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { store } = useContext(Context);

  return (
    <div className="input-form input-form__registration-form">
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
          store.register(username, password);
        }}
      >
        Регистрация
      </button>
      {store.error && <div style={{ color: "red" }}>{store.error}</div>}
    </div>
  );
};

export default observer(RegistrationForm);
