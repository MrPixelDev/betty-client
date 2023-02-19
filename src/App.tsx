import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from ".";
import LoginForm from "./components/AuthComponents/LoginForm";
import RegistrationForm from "./components/AuthComponents/RegistrationForm";
import GetUsers from "./components/GetUsers";
import MainPage from "./components/MainPage/MainPage";
import useNotistackSnackbar from "./hooks/useNotistackSnackbar";
import { Container } from "@mui/material";
import MainTabs from "./components/MainTabs";
import { SiteEnum } from "./models/IAuth";

function App() {
  const { authStore } = useContext(Context);
  const [authChecked, setAuthChecked] = useState(false);
  useNotistackSnackbar();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      authStore.checkAuth();
    }
    setAuthChecked(true);
  }, [authStore]);

  if (!authChecked) {
    return <></>;
  }

  if (!authStore.isAuth || !authChecked) {
    return (
      <div className="app">
        <Container
          className="wrapper"
          sx={{
            mt: "1rem",
            bgcolor: "white",
          }}
        >
          <LoginForm store={authStore} site={SiteEnum.MAIN} />
          <br />
          <RegistrationForm />
        </Container>
      </div>
    );
  }

  return (
    <div className="app">
      <Container
        className="wrapper"
        sx={{
          mt: "1rem",
          bgcolor: "white",
        }}
      >
        <MainTabs />
        <br />
        <button onClick={() => authStore.logout()}>Выход</button>
        <GetUsers />
      </Container>
    </div>
  );
}

export default observer(App);
