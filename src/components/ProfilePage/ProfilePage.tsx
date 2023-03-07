import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
import { Box, Container } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LoginForm from "../AuthComponents/LoginForm";
import BlockHeader from "../BlockElements/BlockHeader";
import { Context } from "../..";
import { SiteEnum } from "../../models/enums";

const ProfilePage: FC = observer((...props) => {
  const { terminalStore } = useContext(Context);

  return (
    <Container>
      <BlockHeader title="Si14bet"></BlockHeader>
      {!terminalStore.siteContext[SiteEnum.SI14] ? (
        <LoginForm store={terminalStore} site={SiteEnum.SI14} />
      ) : (
        <Container>
          <Box>
            <span>Вход выполнен</span>
          </Box>
          <LoadingButton
            onClick={async () => {
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
          <Box>
            <span>Вход выполнен</span>
            <Box></Box>
          </Box>
          <LoadingButton
            onClick={async () => {
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
