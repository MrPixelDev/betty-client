import { observer } from "mobx-react-lite";
import { FC, SyntheticEvent, useState } from "react";
import MainPage from "./MainPage/MainPage";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ProfilePage from "./ProfilePage/ProfilePage";
import { IUser } from "../models/IUser";
import AdminPage from "./AdminPage/AdminPage";
import StatisticsPage from "./StatisticsPage/StatisticsPage";

interface IMainTabsProps {
  user: IUser;
}

const MainTabs: FC<IMainTabsProps> = observer((props: IMainTabsProps) => {
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
          {props.user.role !== "user" && (
            <Tab label="Администратор" value="administrator" />
          )}
        </TabList>
        <TabPanel value="main">
          <MainPage />
        </TabPanel>
        <TabPanel value="profile">
          <ProfilePage />
        </TabPanel>
        <TabPanel value="statistics">
          <StatisticsPage />
        </TabPanel>
        {props.user.role !== "user" && (
          <TabPanel value="administrator">
            <AdminPage />
          </TabPanel>
        )}
      </TabContext>
    </Box>
  );
});

export default MainTabs;
