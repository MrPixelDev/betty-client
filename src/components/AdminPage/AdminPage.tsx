import { observer } from "mobx-react-lite";
import { FC, SyntheticEvent, useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import BlockHeader from "../BlockElements/BlockHeader";

const AdminPage: FC = observer((...props) => {
  return (
    <Box>
      <BlockHeader title={"Панель администратора"} />
    </Box>
  );
});

export default AdminPage;
