import { observer } from "mobx-react-lite";
import {
  FC,
  SyntheticEvent,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Box,
  Stack,
  Container,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Select,
  MenuItem,
} from "@mui/material";
import BlockHeader from "../../BlockElements/HeaderBlock";
import ControlButtons from "./ControlButtons";
import TerminalInfo from "./TerminalInfo";
import { Context } from "../../..";
import { autorun, reaction } from "mobx";
import TerminalStore from "../../../store/terminalStore";
import { once } from "mobx/dist/utils/utils";
import { IStrategy } from "../../../models/ITerminal";

const ControlPanel: FC = observer((...props) => {
  const { terminalStore } = useContext(Context);
  const [strategyIndex, setStrategyIndex] = useState<number | null>(null);
  // const [strategyId, setStrategyId] = useState(-1);
  const strategy = useRef<IStrategy | null>(null);

  const autorunFunction = useMemo(() => {
    return autorun(() => {
      if (terminalStore.readyForStateReq) {
        terminalStore.getState();
      }
    });
  }, []);

  const handleStrategyChange = (event: SelectChangeEvent) => {
    setStrategyIndex(+event.target.value);
    // for (let v of terminalStore.state.strategyList) {
    //   if (v.strategyId === strategyId) {
    //     console.log("yes");
    //     setStrategyIndex(terminalStore.state.strategyList.indexOf(v));
    //   }
    // }
    // console.log(+event.target.value);
    // console.log(strategyIndex);
    // console.log(
    //   strategyIndex && terminalStore.state.strategyList[strategyIndex].league
    // );
    terminalStore.setCurrentStrategyId(
      terminalStore.state.strategyList[+event.target.value].strategyId
    );
    terminalStore.setCurrentStrategyIndex(+event.target.value);
    strategy.current = terminalStore.state.strategyList[+event.target.value];
  };

  // const getState = reaction(
  //   () => terminalStore.readyForStateReq,
  //   (readyForStateReq) => {
  //     if (readyForStateReq) {
  //       terminalStore.getState();
  //     }
  //   }
  // );

  // useEffect(() => {
  //   return () => {
  //     autorun(
  //       () => {
  //         if (terminalStore.stateDto.bi && terminalStore.stateDto.bk) {
  //           terminalStore.getState();
  //         }
  //       },
  //       { delay: 3000 }
  //     );
  //   };
  // }, [terminalStore.stateDto, terminalStore.state.stateId]);

  useEffect(() => {
    return () => {
      autorunFunction();
    };
  }, [autorunFunction]);

  return (
    <Stack spacing={2}>
      <BlockHeader title="Панель управления" />
      <ControlButtons />
      <BlockHeader title="Состояние терминала"></BlockHeader>
      {!terminalStore.state.stateId ? (
        <Box className="terminalInfo">
          <span>Залогиньтесь</span>
        </Box>
      ) : (
        <>
          <Box>
            <span>Выберите стратегию: </span>
            <br />
            <FormControl sx={{ m: 1, minWidth: 160 }}>
              <InputLabel id="strategyName-label">Стратегия</InputLabel>
              <Select
                disabled={
                  !terminalStore.state.strategyList ||
                  !terminalStore.state.strategyList.length
                }
                labelId="strategyName-label"
                id="stragetyName"
                value={`${
                  !strategy.current
                    ? ""
                    : terminalStore.state.strategyList.indexOf(strategy.current)
                }`}
                onChange={handleStrategyChange}
                autoWidth
                label="Стратегия"
              >
                {terminalStore.state.strategyList &&
                  terminalStore.state.strategyList.map((v, i) => (
                    <MenuItem key={`${v.strategyId}`} value={`${i}`}>
                      {v.strategyName}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
          {strategy.current && (
            <Container
              sx={{
                padding: "1rem 0.5rem",
                backgroundColor: "#D0EDFF",
                minHeight: "200px",
              }}
            >
              <Box className="terminalInfo">
                <span>
                  Статус:
                  {strategy.current.status}
                </span>
                <br />
                <span>
                  Спорт:
                  {strategy.current.sportName}
                </span>
                <br />
                <span>Лига: {strategy.current.league}</span>
                <br />
                <span>
                  Обязательства:
                  {strategy.current.obligation}
                </span>
                <br />
                <span>
                  Маржинальность:
                  {strategy.current.marginality}
                </span>
                <br />
                <span>
                  Количество в стеке:
                  {strategy.current.stackSize}
                </span>
                <br />
                <span>
                  Заполнено в стеке:
                  {strategy.current.stackFilled}
                </span>
                <br />
              </Box>
            </Container>
          )}
          <br />
          -------------------------------------
          <TerminalInfo />
        </>
      )}
    </Stack>
  );
});

export default ControlPanel;
