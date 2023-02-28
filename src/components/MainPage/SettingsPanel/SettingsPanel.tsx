import { observer } from "mobx-react-lite";
import {
  FC,
  MouseEventHandler,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Box,
  Tabs,
  Tab,
  Grid,
  Stack,
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
import BlockHeader from "../../BlockElements/BlockHeader";
import ManualSettings from "./ManualSettings";
import { Context } from "../../..";

const ControlPanel: FC = observer((...props) => {
  const { terminalStore, strategyStore } = useContext(Context);

  return (
    <Stack spacing={2}>
      <BlockHeader title="Настройки терминала" />

      {!strategyStore.loadingStore.loading ? (
        strategyStore.availableStrategies.bets ? (
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
                await strategyStore.parseStrategies(terminalStore.stateDto);
              }}
              loading={strategyStore.loadingStore.loading}
              loadingIndicator="Парсинг событий..."
              variant="outlined"
            >
              <span>Создать стратегию</span>
            </LoadingButton>
          </Container>
        ) : (
          "Авторизуйтесь в сервисах"
        )
      ) : (
        "Loading"
      )}
      {/* <Container
        sx={{
          textAlign: "right",
        }}
      >
        <LoadingButton
          disabled={false}
          onClick={async () => {}}
          loading={false}
          loadingIndicator="Создание стратегии"
          variant="contained"
        >
          <span>Создать стратегию</span>
        </LoadingButton>
      </Container> */}
    </Stack>
  );
});

export default ControlPanel;
