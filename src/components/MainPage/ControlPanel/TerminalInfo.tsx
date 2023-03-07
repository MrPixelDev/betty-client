import { observer } from "mobx-react-lite";
import io, { Socket } from "socket.io-client";
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
// import { WebSocketContext } from "../../../services/WSService";
// import socket from "../../../services/WSService";

const TerminalInfo: FC = observer((...props) => {
  const [msg, setMsg] = useState<any[]>([]);
  const { terminalStore } = useContext(Context);

  return (
    <Container
      sx={{
        padding: "1rem 0.5rem",
        backgroundColor: "#D0EDFF",
        minHeight: "200px",
      }}
    >
      <Box className="terminalInfo">
        <span>
          Баланс Биржи:{" "}
          {terminalStore.state.biBalance === 0.001
            ? "Баланс не доступен"
            : terminalStore.state.biBalance + " $"}
        </span>
        <br />
        <span>
          Баланс БК:{" "}
          {terminalStore.state.bkBalance === 0.001
            ? "Баланс не доступен"
            : terminalStore.state.bkBalance + " $"}
        </span>
        <br />
        <span>Прибыль: {terminalStore.state.profit} $</span>
        <br />
      </Box>
    </Container>
  );
});

export default TerminalInfo;
