import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
import { Grid, Container } from "@mui/material";
import { Send, Stop, Pause } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Context } from "../../..";

const ControlButtons: FC = observer((...props) => {
  const { terminalStore } = useContext(Context);

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
            disabled={terminalStore.currentStrategyId === -1}
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
            disabled={terminalStore.currentStrategyId === -1}
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
            disabled={terminalStore.currentStrategyId === -1}
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
