import { observer } from "mobx-react-lite";
import { FC, SyntheticEvent, useState } from "react";
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

const ControlPanel: FC = observer((...props) => {
  return (
    <Stack spacing={2}>
      <BlockHeader title="Настройки терминала" />
      <ManualSettings />
      <Container>Состояние</Container>
    </Stack>
  );
});

export default ControlPanel;
