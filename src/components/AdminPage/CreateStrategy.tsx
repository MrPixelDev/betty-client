import { observer } from "mobx-react-lite";
import { FC, useContext, useState } from "react";
import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Context } from "../..";

const CreateStrategy: FC = observer((...props) => {
  const { strategyStore } = useContext(Context);

  const [strategyName, setStrategyName] = useState("");
  const [sportName, setSportName] = useState("");
  const [league, setLeague] = useState("");
  const [bet, setBet] = useState("");
  const [obligation, setObligation] = useState("");
  const [marginality, setMarginality] = useState("");
  const [stackSize, setStackSize] = useState("");

  // const [strategyToCreate, setStrategyToCreate] = useState({
  //   sportName: "",
  //   league: "",
  //   bet: "",
  //   obligation: "",
  //   marginality: "",
  //   stackSize: ""
  // })

  const setNull = (n: number) => {
    const setters = [setBet, setLeague];
    for (let i = 0; i < n; i++) {
      setters[i]("");
    }
  };

  return (
    <Grid
      container
      columns={16}
      sx={{
        paddingLeft: 0,
      }}
    >
      <TextField
        id={`strategyName`}
        value={strategyName}
        onChange={(e) => setStrategyName(e.target.value)}
        label="Название стратегии"
        variant="standard"
        className="strategyName__textField"
        sx={{
          m: 2,
          minWidth: "60%",
        }}
      />
      <Grid xs={16} md={8} lg={4} item={true}>
        <FormControl
          variant="standard"
          sx={{
            m: 2,
            minWidth: "90%",
          }}
        >
          <InputLabel id="strategyName-label">Вид спорта</InputLabel>
          <Select
            labelId="sportName-label"
            id="sportName"
            value={sportName}
            onChange={(e) => {
              setNull(2);
              setSportName(e.target.value);
            }}
          >
            {Object.keys(strategyStore.availableStrategyModel.leagues)
              .filter((v) => {
                return (
                  Object.keys(strategyStore.availableStrategyModel.leagues[v])
                    .length > 0
                );
              })
              .map((v) => (
                <MenuItem key={v} value={v}>
                  {v}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid xs={16} md={8} lg={4} item={true}>
        <FormControl
          variant="standard"
          sx={{
            m: 2,
            minWidth: "90%",
          }}
        >
          <InputLabel id="league-label">Лига</InputLabel>
          <Select
            disabled={!sportName}
            labelId="league-label"
            id="league"
            value={league}
            onChange={(e) => {
              setNull(1);
              setLeague(e.target.value);
            }}
            label="Лига"
          >
            {sportName
              ? Object.keys(
                  strategyStore.availableStrategyModel.leagues[sportName]
                ).map((v) => (
                  <MenuItem key={v} value={v}>
                    {v}
                  </MenuItem>
                ))
              : ""}
          </Select>
        </FormControl>
      </Grid>
      {/* <Grid xs={16} md={16} lg={16} item={true}>
        <FormControl
          variant="standard"
          sx={{
            m: 2,
            minWidth: "95%",
          }}
        >
          <InputLabel id="leagueEvent-label">Событие</InputLabel>
          <Select
            disabled={!league}
            labelId="leagueEvent-label"
            id="leagueEvent"
            value={leagueEvent}
            onChange={(e) => {
              setNull(1);
              setLeagueEvent(e.target.value);
            }}
            label="Событие"
          >
            {league
              ? Object.keys(
                  strategyStore.availableStrategyModel.bets[sportName][league]
                ).map((v) => (
                  <MenuItem key={v} value={v}>
                    {v}
                  </MenuItem>
                ))
              : ""}
          </Select>
        </FormControl>
      </Grid> */}
      <Grid xs={16} md={16} lg={16} item={true}>
        <FormControl
          variant="standard"
          sx={{
            m: 2,
            minWidth: "95%",
          }}
        >
          <InputLabel id="bet-label">Ставка</InputLabel>
          <Select
            disabled={!league}
            labelId="bet-label"
            id="bet"
            value={bet}
            onChange={(e) => {
              setBet(e.target.value);
            }}
            label="Ставка"
          >
            {league
              ? strategyStore.availableStrategyModel.betList.map((v) => (
                  <MenuItem key={v} value={v}>
                    {v}
                  </MenuItem>
                ))
              : ""}
          </Select>
        </FormControl>
      </Grid>
      <Grid xs={16} md={8} lg={4} item={true}>
        <FormControl
          variant="standard"
          sx={{
            m: 2,
            minWidth: "95%",
          }}
        >
          <InputLabel id="marginality-label">Маржинальность</InputLabel>
          <Select
            disabled={!bet}
            labelId="marginality-label"
            id="marginality"
            value={marginality}
            onChange={(e) => {
              setMarginality(e.target.value);
            }}
            label="Маржинальность"
          >
            {strategyStore.availableStrategyModel.marginalitys.map((v) => (
              <MenuItem key={v} value={v}>
                {v}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>{" "}
      <Grid xs={16} md={8} lg={4} item={true}>
        <FormControl
          variant="standard"
          sx={{
            m: 2,
            minWidth: "95%",
          }}
        >
          <InputLabel id="obligation-label">Обязательства</InputLabel>
          <Select
            disabled={!bet}
            labelId="obligation-label"
            id="obligation"
            value={obligation}
            onChange={(e) => {
              setObligation(e.target.value);
            }}
            label="Обязательства"
          >
            {strategyStore.availableStrategyModel.obligations.map((v) => (
              <MenuItem key={v} value={v}>
                {v}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>{" "}
      <Grid xs={16} md={8} lg={4} item={true}>
        <FormControl
          variant="standard"
          sx={{
            m: 2,
            minWidth: "95%",
          }}
        >
          <InputLabel id="stackSize-label">Размер стека</InputLabel>
          <Select
            disabled={!bet}
            labelId="stackSize-label"
            id="stackSize"
            value={stackSize}
            onChange={(e) => {
              setStackSize(e.target.value);
            }}
            label="Размер стека"
          >
            {strategyStore.availableStrategyModel.stackSizes.map((v) => (
              <MenuItem key={v} value={v}>
                {v}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Box
        sx={{
          m: 3,
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <LoadingButton
          disabled={false}
          onClick={async () => {
            strategyStore.parseStrategyModel();
          }}
          loading={strategyStore.loadingStore.loading}
          loadingIndicator="Обновление списка..."
          variant="outlined"
        >
          <span>Обновить список</span>
        </LoadingButton>

        <LoadingButton
          disabled={false}
          onClick={async () => {
            await strategyStore.createStrategy({
              strategyName,
              sportName,
              league,
              bet,
              marginality: Number(marginality),
              obligation: Number(obligation),
              stackSize: Number(stackSize),
            });
          }}
          loading={false}
          loadingIndicator="Создание стратегии..."
          variant="contained"
        >
          <span>Создать стратегию</span>
        </LoadingButton>
      </Box>
    </Grid>
  );
});

export default CreateStrategy;
