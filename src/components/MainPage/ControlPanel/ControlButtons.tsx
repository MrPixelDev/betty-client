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
import {
  Visibility,
  VisibilityOff,
  Send,
  Stop,
  Pause,
} from "@mui/icons-material";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";

const ControlButtons: FC = observer((...props) => {
  return (
    <Container>
      <Grid
        container
        sx={{
          padding: "0",
        }}
        className="btn_container__control"
      >
        <Grid
          item={true}
          xs={12}
          sx={{
            pb: ".5rem",
          }}
        >
          <LoadingButton
            endIcon={<Send />}
            loadingPosition={"end"}
            variant="contained"
            sx={{
              backgroundColor: "rgb(0, 162, 255)",
            }}
            className="btn btn_container__control--start"
          >
            <span>Старт</span>
          </LoadingButton>
        </Grid>
        <Grid
          item={true}
          xs={12}
          md={6}
          sx={{
            pb: ".5rem",
          }}
        >
          <LoadingButton
            endIcon={<Stop />}
            loadingPosition={"end"}
            variant="contained"
            className="btn btn__control--stop"
          >
            <span>Стоп</span>
          </LoadingButton>
        </Grid>
        <Grid item={true} xs={12} md={6}>
          <LoadingButton
            endIcon={<Pause />}
            loadingPosition={"end"}
            variant="contained"
            className="btn btn__control--pause"
            sx={{
              backgroundColor: "rgb(0, 162, 255)",
            }}
          >
            <span>Пауза</span>
          </LoadingButton>
        </Grid>
      </Grid>
    </Container>
  );
});

export default ControlButtons;
