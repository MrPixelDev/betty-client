import { observer } from "mobx-react-lite";
import { FC, SyntheticEvent, useContext, useEffect, useState } from "react";
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
  SelectChangeEvent,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Send,
  Stop,
  Pause,
} from "@mui/icons-material";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import BlockHeader from "../../BlockElements/BlockHeader";
import ControlButtons from "./ControlButtons";
import TerminalInfo from "./TerminalInfo";
import { Context } from "../../..";
import { autorun } from "mobx";

const ControlPanel: FC = observer((...props) => {
  const { terminalStore } = useContext(Context);
  const [strategyId, setStrategyId] = useState(-1);

  const handleStrategyChange = (event: SelectChangeEvent) => {
    setStrategyId(+event.target.value);
    terminalStore.setCurrentStrategyId(+event.target.value);
  };

  useEffect(() => {
    return () => {
      autorun(() => {
        if (terminalStore.stateDto.bi && terminalStore.stateDto.bk) {
          terminalStore.getState();
        }
      });
    };
  }, [terminalStore.stateDto, terminalStore.state.stateId]);

  return (
    <Stack spacing={2}>
      <BlockHeader title="Панель управления" />
      <ControlButtons />
      <BlockHeader title="Состояние терминала"></BlockHeader>
      {!terminalStore.state.stateId ? (
        <Box className="terminalInfo">
          <span>Залогиньтесь</span>
        </Box>
      ) : (
        <>
          <Box>
            <span>Выберите стратегию: </span>
            <br />
            <FormControl sx={{ m: 1, minWidth: 160 }}>
              <InputLabel id="strategyName-label">Стратегия</InputLabel>
              <Select
                disabled={
                  !terminalStore.state.strategyList ||
                  !terminalStore.state.strategyList.length
                }
                labelId="strategyName-label"
                id="stragetyName"
                value={`${strategyId === -1 ? "" : strategyId}`}
                onChange={handleStrategyChange}
                autoWidth
                label="Стратегия"
              >
                {terminalStore.state.strategyList &&
                  terminalStore.state.strategyList.map((v) => (
                    <MenuItem key={`${v.strategyId}`} value={v.strategyId}>
                      {v.strategyName}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
          {strategyId > -1 && (
            <Container
              sx={{
                padding: "1rem 0.5rem",
                backgroundColor: "#D0EDFF",
                minHeight: "200px",
              }}
            >
              <Box className="terminalInfo">
                <span>
                  Статус: {terminalStore.state.strategyList[strategyId].status}
                </span>
                <br />
                <span>
                  Спорт:{" "}
                  {terminalStore.state.strategyList[strategyId].sportName}
                </span>
                <br />
                <span>
                  Лига: {terminalStore.state.strategyList[strategyId].league}
                </span>
                <br />
                <span>
                  Обязательства:
                  {terminalStore.state.strategyList[strategyId].obligation}
                </span>
                <br />
                <span>
                  Маржинальность:
                  {terminalStore.state.strategyList[strategyId].marginality}
                </span>
                <br />
                <span>
                  Количество в стеке:
                  {terminalStore.state.strategyList[strategyId].stackSize}
                </span>
                <br />
                <span>
                  Заполнено в стеке:
                  {terminalStore.state.strategyList[strategyId].stackFilled}
                </span>
                <br />
              </Box>
            </Container>
          )}
          <br />
          <TerminalInfo />
        </>
      )}
    </Stack>
  );
});

export default ControlPanel;
