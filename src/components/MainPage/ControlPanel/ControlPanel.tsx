import { observer } from "mobx-react-lite";
import { FC, SyntheticEvent, useContext, useState } from "react";
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
import BlockHeader from "../../BlockElements/BlockHeader";
import ControlButtons from "./ControlButtons";
import TerminalInfo from "./TerminalInfo";
import { Context } from "../../..";

const ControlPanel: FC = observer((...props) => {
  return (
    <Stack spacing={2}>
      <BlockHeader title="Панель управления" />
      <ControlButtons />
      <BlockHeader title="Состояние терминала"></BlockHeader>
      <TerminalInfo />
    </Stack>
  );
});

export default ControlPanel;
