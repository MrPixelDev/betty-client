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

interface IBlockHeaderProps {
  title: string;
}

const BlockHeader: FC<IBlockHeaderProps> = observer(
  (props: IBlockHeaderProps) => {
    return (
      <Container
        sx={{ textAlign: "center", mb: "2rem" }}
        className="block__header"
      >
        {props.title}
      </Container>
    );
  }
);

export default BlockHeader;
