import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
import { Context } from "../..";
import useInput from "../../hooks/useInput";

const LoginForm: FC = () => {
  const { authStore } = useContext(Context);

  const username = useInput("", { isEmpty: true });
  const password = useInput("", { isEmpty: true });

  return (
    <div className="input-form input-form__login-form">
      <input
        value={username.value}
        onChange={username.onChange}
        type="text"
        placeholder="Имя пользователя"
      />
      <input
        value={password.value}
        onChange={password.onChange}
        type="password"
        placeholder="Пароль"
      />
      <button
        disabled={username.isEmpty || password.isEmpty}
        onClick={async () => {
          await authStore.login(username.value, password.value);
        }}
      >
        Логин
      </button>
    </div>
  );
};

export default observer(LoginForm);
