import { observer } from "mobx-react-lite";
import { FC, SyntheticEvent, useContext, useEffect, useState } from "react";
import ControlPanel from "./ControlPanel/ControlPanel";
import SettingsPanel from "./SettingsPanel/SettingsPanel";
import RegistrationForm from "../AuthComponents/RegistrationForm";
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
import { Context } from "../..";
import { SiteEnum } from "../../models/IAuth";
// import { useIndexedDB } from "react-indexed-db";

const MainPage: FC = observer((...props) => {
  const { terminalStore } = useContext(Context);

  return (
    <Grid container>
      <Grid
        item={true}
        xs={12}
        md={4}
        sx={{
          padding: "0.5rem",
        }}
      >
        <ControlPanel />
      </Grid>
      <Grid
        item={true}
        xs={12}
        md={8}
        sx={{
          padding: "0.5rem",
        }}
      >
        <SettingsPanel />
      </Grid>
    </Grid>
  );
});

export default MainPage;
