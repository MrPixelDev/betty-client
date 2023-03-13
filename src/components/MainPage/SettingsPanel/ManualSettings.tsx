import { observer } from "mobx-react-lite";
import { FC, useContext, useState } from "react";
import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Button,
  Card,
  Container,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Carousel from "react-material-ui-carousel";
import { Context } from "../../..";
import { IAvailableStrategy } from "../../../models/ITerminal";
import { CarouselBlock } from "../../BlockElements/CarouselBlock";
import StrategyStore from "../../../store/strategyStore";

const ManualSettings: FC = observer((...props) => {
  const { terminalStore, strategyStore } = useContext(Context);

  const [strategy, setStrategy] = useState([]);

  // const setNull = (n: number) => {
  //   const setters = [setBet, setLeagueEvent, setLeague];
  //   for (let i = 0; i < n; i++) {
  //     setters[i]("");
  //   }
  // };

  const handleChangeMultiple = (
    event: React.ChangeEvent<HTMLSelectElement>,
    callback: Function
  ) => {
    const { options } = event.target;
    const value: string[] = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    callback(value);
  };

  interface IItemProps {
    key: number;
    item: IAvailableStrategy;
  }

  const Item: FC<IItemProps> = (props) => {
    return (
      <Paper>
        <h2>{props.item.league}</h2>
        <p>{props.item.bet}</p>

        <Button className="CheckButton">Check it out!</Button>
      </Paper>
    );
  };

  const sliderItems: number =
    strategyStore.availableStrategies.length > 3
      ? 3
      : strategyStore.availableStrategies.length;
  const items: Array<any> = [];

  for (
    let i = 0;
    i < strategyStore.availableStrategies.length;
    i += sliderItems
  ) {
    if (i % sliderItems === 0) {
      items.push(
        strategyStore.availableStrategies.map((item, i) => {
          return <Item key={i} item={item} />;
        })
      );
    }
  }

  return (
    <>
      {/* <Select multiple value={strategy} onChange={(e) => {}} label="Стратегии">
        {strategyStore.availableStrategies.map((item, i) => {
          return <Item key={i} item={item} />;
        })}
      </Select> */}
      <CarouselBlock />

      <Grid
        container
        columns={16}
        sx={{
          paddingLeft: 0,
        }}
      >
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
              strategyStore.getAvailableStrategies();
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
              terminalStore.bindSelectedStrategy();
            }}
            loading={false}
            loadingIndicator="Создание стратегии..."
            variant="contained"
          >
            <span>Получить стратегию</span>
          </LoadingButton>
        </Box>
      </Grid>
    </>
  );
});

export default ManualSettings;
