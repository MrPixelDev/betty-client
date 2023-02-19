import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
import { Context } from "..";

const LoginForm: FC = () => {
  const { userStore } = useContext(Context);
  return (
    <div>
      <br />
      <button onClick={() => userStore.getUsers()}>
        Получить список пользователей
      </button>
      <ul>
        {userStore.users.map((v) => (
          <li key={`${v.userId}`}>{JSON.stringify(v)}</li>
        ))}
      </ul>
    </div>
  );
};

export default observer(LoginForm);
