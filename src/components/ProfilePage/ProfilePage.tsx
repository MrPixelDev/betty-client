import { observer } from "mobx-react-lite";
import { FC, SyntheticEvent, useContext, useState } from "react";
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

const ProfilePage: FC = observer((...props) => {
  const { userStore } = useContext(Context);
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
      {!userStore.isAuth[SiteEnum.SI14] ? (
        <LoginForm store={userStore} site={SiteEnum.SI14} />
      ) : (
        <Container>
          {" "}
          <Box>
            <span>Вход выполнен</span>
            <Box>{userStore.getUserBySite(SiteEnum.SI14)?.username}</Box>
          </Box>
          <LoadingButton
            onClick={async () => {
              await userStore.logout(SiteEnum.SI14);
            }}
            loading={userStore.loading}
            loadingIndicator="Выход..."
            variant="outlined"
          >
            <span>Выйти</span>
          </LoadingButton>
        </Container>
      )}
      <br />
      <BlockHeader title="525600"></BlockHeader>
      {!userStore.isAuth[SiteEnum.FTFSOOBET] ? (
        <LoginForm store={userStore} site={SiteEnum.FTFSOOBET} />
      ) : (
        <Container>
          {" "}
          <Box>
            <span>Вход выполнен</span>
            <Box>{userStore.getUserBySite(SiteEnum.FTFSOOBET)?.username}</Box>
          </Box>
          <LoadingButton
            onClick={async () => {
              await userStore.logout(SiteEnum.FTFSOOBET);
            }}
            loading={userStore.loading}
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
