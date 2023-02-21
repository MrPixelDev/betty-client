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
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Send,
  Stop,
  Pause,
} from "@mui/icons-material";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import { Context } from "../../..";
import { autorun } from "mobx";
import BlockHeader from "../../BlockElements/BlockHeader";

const TerminalInfo: FC = observer((...props) => {
  const { loadingStore, terminalStore } = useContext(Context);

  useEffect(
    () =>
      autorun(() => {
        if (
          !terminalStore.state.stateId &&
          terminalStore.stateDto.bi &&
          terminalStore.stateDto.bk
        ) {
          terminalStore.getState();
        }
      }),
    [terminalStore.stateDto, terminalStore.state.stateId, terminalStore]
  );

  return (
    <Container
      sx={{
        padding: "1rem 0.5rem",
        backgroundColor: "#D0EDFF",
        minHeight: "200px",
      }}
    >
      {!terminalStore.state.stateId ? (
        <Box className="terminalInfo">
          <span>Залогиньтесь</span>
        </Box>
      ) : (
        <Box className="terminalInfo">
          <span>Статус: {terminalStore.state.status}</span>
          <br />
          <span>Баланс Биржи: {terminalStore.state.biBalance}</span>
          <br />
          <span>Баланс БК: {terminalStore.state.bkBalance}</span>
          <br />
          <span>Сумма ставок: {terminalStore.state.betSum}</span>
          <br />
          <span>Количество в стеке: {terminalStore.state.stackSize}</span>
          <br />
          <span>Заполнено в стеке: {terminalStore.state.stackFilled}</span>
          <br />
          <span>Прибыль: {terminalStore.state.profit}</span>
          <br />
        </Box>
      )}
    </Container>
  );
});

export default TerminalInfo;
