import { observer } from "mobx-react-lite";
import { FC, SyntheticEvent, useContext, useState } from "react";
import MainPage from "./MainPage/MainPage";
import {
  Box,
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
import ProfilePage from "./ProfilePage/ProfilePage";
import { Context } from "..";

const MainTabs: FC = observer((...props) => {
  const [tab, setTab] = useState("main");

  const handleTabChange = (event: SyntheticEvent, tab: string) => {
    setTab(tab);
  };

  return (
    <Box>
      <TabContext value={tab}>
        <TabList onChange={handleTabChange} aria-label="APIII">
          <Tab label="Главная" value="main" />
          <Tab label="Личный Кабинет" value="profile" />
          <Tab label="Статистика" value="statistics" />
        </TabList>
        <TabPanel value="main">
          <MainPage />
        </TabPanel>
        <TabPanel value="profile">
          <ProfilePage />
        </TabPanel>
        <TabPanel value="statistics">Statistics</TabPanel>
      </TabContext>
    </Box>
  );
});

export default MainTabs;
