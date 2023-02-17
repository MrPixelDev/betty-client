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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import BlockHeader from "../../BlockElements/BlockHeader";

const ManualSettings: FC = observer((...props) => {
  return (
    <Grid container spacing={2} columns={16}>
      <Grid xs={16} md={8} lg={4} item={true}>
        Вид спорта
      </Grid>
      <Grid xs={16} md={8} lg={4} item={true}>
        Лига
      </Grid>
      <Grid xs={16} md={8} lg={4} item={true}>
        Исход
      </Grid>
      <Grid xs={16} md={8} lg={4} item={true}>
        Коэффициент
      </Grid>
      <Grid xs={16} md={8} lg={4} item={true}>
        Размер стека
      </Grid>
      <Grid xs={16} md={8} lg={4} item={true}>
        Вилка
      </Grid>
      <Grid xs={16} md={8} lg={4} item={true}>
        Перекрытие
      </Grid>
      <Grid xs={16} md={8} lg={4} item={true}>
        Сумма ставки
      </Grid>
    </Grid>
  );
});

export default ManualSettings;
