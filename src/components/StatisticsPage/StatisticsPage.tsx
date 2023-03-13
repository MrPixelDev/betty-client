import { observer } from "mobx-react-lite";
import { FC, SyntheticEvent, useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import BlockHeader from "../BlockElements/HeaderBlock";

const StatisticsPage: FC = observer((...props) => {
  return (
    <Box>
      <BlockHeader title={"Статистика"} />
    </Box>
  );
});

export default StatisticsPage;
