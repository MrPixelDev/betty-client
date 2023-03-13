import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
import { Stack, Container } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import BlockHeader from "../../BlockElements/HeaderBlock";
import ManualSettings from "./ManualSettings";
import { Context } from "../../..";

const ControlPanel: FC = observer((...props) => {
  const { terminalStore, strategyStore } = useContext(Context);

  return (
    <Stack spacing={2}>
      <BlockHeader title="Настройки терминала" />

      {!strategyStore.loadingStore.loading ? (
        strategyStore.availableStrategies.length ? (
          <ManualSettings />
        ) : terminalStore.state.stateId ? (
          <Container
            sx={{
              textAlign: "center",
            }}
          >
            <LoadingButton
              disabled={false}
              onClick={async () => {
                strategyStore.parseAvailableStrategies();
              }}
              loading={strategyStore.loadingStore.loading}
              loadingIndicator="Парсинг событий..."
              variant="outlined"
            >
              <span>Показать доступные стратегии</span>
            </LoadingButton>
          </Container>
        ) : (
          "Авторизуйтесь в сервисах"
        )
      ) : (
        "Loading..."
      )}
    </Stack>
  );
});

export default ControlPanel;
