import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
import { Context } from "..";

const LoginForm: FC = () => {
  const { store } = useContext(Context);
  return (
    <div>
      <br />
      <button onClick={() => store.getUsers()}>
        Получить список пользователей
      </button>
      <ul>
        {store.users.map((v) => (
          <li key={`${v.id}`}>{JSON.stringify(v)}</li>
        ))}
      </ul>
    </div>
  );
};

export default observer(LoginForm);
