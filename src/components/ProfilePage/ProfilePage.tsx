import { observer } from "mobx-react-lite";
import { FC, SyntheticEvent, useContext, useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Grid,
  styled,
  Container,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import LoginForm from "../AuthComponents/LoginForm";
import BlockHeader from "../BlockElements/BlockHeader";
import { Context } from "../..";
import { SiteEnum } from "../../models/IAuth";
import LoadingStore from "../../store/loadingStore";
import { autorun } from "mobx";

const ProfilePage: FC = observer((...props) => {
  const { terminalStore } = useContext(Context);
  // const [authChecked, setAuthChecked] = useState(false);
  // useNotistackSnackbar();

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     authStore.checkAuth();
  //   }
  //   setAuthChecked(true);
  // }, [authStore]);

  // if (!authChecked) {
  //   return <></>;
  // }

  // if (!authStore.isAuth || !authChecked) {
  //   return (
  //     <Container>
  //     <BlockHeader title="Si14bet"></BlockHeader>
  //     {}<LoginForm store={sideAuthStore} site="si" />
  //     <br />
  //     <BlockHeader title="525600"></BlockHeader>
  //     <LoginForm store={sideAuthStore} site="5256" />
  //   </Container>
  //   );
  // }

  // return (
  //   <div className="app">
  //     <Container
  //       className="wrapper"
  //       sx={{
  //         mt: "1rem",
  //         bgcolor: "white",
  //       }}
  //     >
  //       <MainTabs />
  //       <br />
  //       <button onClick={() => authStore.logout()}>Выход</button>
  //       <GetUsers />
  //     </Container>
  //   </div>
  // );
  return (
    <Container>
      <BlockHeader title="Si14bet"></BlockHeader>
      {!terminalStore.siteContext[SiteEnum.SI14] ? (
        <LoginForm store={terminalStore} site={SiteEnum.SI14} />
      ) : (
        <Container>
          {" "}
          <Box>
            <span>Вход выполнен</span>
          </Box>
          <LoadingButton
            onClick={async () => {
              console.log("LOGOUT");
              await terminalStore.logout(SiteEnum.SI14);
            }}
            loading={terminalStore.loadingStore.loadingFrom[SiteEnum.SI14]}
            loadingIndicator="Выход..."
            variant="outlined"
          >
            <span>Выйти</span>
          </LoadingButton>
        </Container>
      )}
      <br />
      <BlockHeader title="525600"></BlockHeader>
      {!terminalStore.siteContext[SiteEnum.FTFSOOBET] ? (
        <LoginForm store={terminalStore} site={SiteEnum.FTFSOOBET} />
      ) : (
        <Container>
          {" "}
          <Box>
            <span>Вход выполнен</span>
            <Box></Box>
          </Box>
          <LoadingButton
            onClick={async () => {
              console.log("LOGOUT");
              await terminalStore.logout(SiteEnum.FTFSOOBET);
            }}
            loading={terminalStore.loadingStore.loadingFrom[SiteEnum.FTFSOOBET]}
            loadingIndicator="Выход..."
            variant="outlined"
          >
            <span>Выйти</span>
          </LoadingButton>
        </Container>
      )}
    </Container>
  );
});

export default ProfilePage;
