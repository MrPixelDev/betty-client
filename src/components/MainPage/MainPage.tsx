import { observer } from "mobx-react-lite";
import { FC } from "react";
import ControlPanel from "./ControlPanel/ControlPanel";
import SettingsPanel from "./SettingsPanel/SettingsPanel";
import { Grid } from "@mui/material";
// import { useIndexedDB } from "react-indexed-db";

const MainPage: FC = observer((...props) => {
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
