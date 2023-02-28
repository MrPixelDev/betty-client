import { observer } from "mobx-react-lite";
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
  Select,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import BlockHeader from "../../BlockElements/BlockHeader";
import { Context } from "../../..";
import { autorun, toJS } from "mobx";
import { IAvailableStrategies } from "../../../models/ITerminal";

const ManualSettings: FC = observer((...props) => {
  const { strategyStore } = useContext(Context);

  const [sportName, setSportName] = useState("");
  const [league, setLeague] = useState("");
  const [leagueEvent, setLeagueEvent] = useState("");
  const [bet, setBet] = useState("");
  const [obligation, setObligation] = useState("");
  const [marginality, setMarginality] = useState("");
  const [stackSize, setStackSize] = useState("");

  return (
    <Grid
      container
      columns={16}
      sx={{
        paddingLeft: 0,
      }}
    >
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
              setSportName(e.target.value);
            }}
          >
            {Object.keys(strategyStore.availableStrategies.bets)
              .filter((v) => {
                return (
                  Object.keys(strategyStore.availableStrategies.bets[v])
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
              setLeague(e.target.value);
            }}
            label="Лига"
          >
            {sportName
              ? Object.keys(
                  strategyStore.availableStrategies.bets[sportName]
                ).map((v) => (
                  <MenuItem key={v} value={v}>
                    {v}
                  </MenuItem>
                ))
              : ""}
          </Select>
        </FormControl>
      </Grid>
      <Grid xs={16} md={16} lg={16} item={true}>
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
              setLeagueEvent(e.target.value);
            }}
            label="Событие"
          >
            {league
              ? Object.keys(
                  strategyStore.availableStrategies.bets[sportName][league]
                ).map((v) => (
                  <MenuItem key={v} value={v}>
                    {v}
                  </MenuItem>
                ))
              : ""}
          </Select>
        </FormControl>
      </Grid>
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
            disabled={!leagueEvent}
            labelId="bet-label"
            id="bet"
            value={bet}
            onChange={(e) => {
              setBet(e.target.value);
            }}
            label="Ставка"
          >
            {leagueEvent
              ? strategyStore.availableStrategies.bets[sportName][league][
                  leagueEvent
                ].map((v) => (
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
            {strategyStore.availableStrategies.marginalitys.map((v) => (
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
            {strategyStore.availableStrategies.obligations.map((v) => (
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
            {strategyStore.availableStrategies.stackSizes.map((v) => (
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
            strategyStore.parseStrategies(strategyStore.stateDto);
          }}
          loading={strategyStore.loadingStore.loading}
          loadingIndicator="Обновление списка..."
          variant="outlined"
        >
          <span>Обновить список</span>
        </LoadingButton>

        <LoadingButton
          disabled={false}
          onClick={async () => {}}
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

export default ManualSettings;
