import { observer } from "mobx-react-lite";
import { FC, SyntheticEvent, useContext, useState } from "react";
import { Box, Chip, Container, Divider, Tab } from "@mui/material";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import BlockHeader from "../BlockElements/HeaderBlock";
import ManualSettings from "../MainPage/SettingsPanel/ManualSettings";
import { Context } from "../..";
import CreateStrategy from "./CreateStrategy";

const AdminPage: FC = observer((...props) => {
  const { terminalStore, strategyStore } = useContext(Context);
  return (
    <Box>
      <BlockHeader title={"Панель администратора"} />
      <Divider>
        <Chip label="Создание стратегии" />
      </Divider>
      {!strategyStore.loadingStore.loading ? (
        strategyStore.availableStrategyModel.leagues ? (
          <CreateStrategy />
        ) : (
          <Container
            sx={{
              textAlign: "center",
              pt: 3,
            }}
          >
            <LoadingButton
              disabled={false}
              onClick={async () => {
                await strategyStore.parseStrategyModel();
              }}
              loading={strategyStore.loadingStore.loading}
              loadingIndicator="Парсинг событий..."
              variant="outlined"
            >
              <span>Создать стратегию</span>
            </LoadingButton>
          </Container>
        )
      ) : (
        "Loading"
      )}
    </Box>
  );
});

export default AdminPage;
