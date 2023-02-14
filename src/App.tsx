import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Context } from ".";
import "./App.css";
import LoginForm from "./components/AuthComponents/LoginForm";
import RegistrationForm from "./components/AuthComponents/RegistrationForm";
import GetUsers from "./components/GetUsers";

function App() {
  const { authStore } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      authStore.checkAuth();
    }
  }, [authStore]);

  if (!authStore.isAuth) {
    return (
      <div className="App">
        <h1>Not authorized</h1>
        <LoginForm />
        <br />
        <RegistrationForm />
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Authorized</h1>
      <RegistrationForm />
      <br />
      <button onClick={() => authStore.logout()}>Выход</button>
      <GetUsers />
    </div>
  );
}

export default observer(App);
