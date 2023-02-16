import { observer } from "mobx-react-lite";
import { FC, MouseEvent, useContext, useState, useEffect } from "react";
import { Context } from "../..";
import useInput from "../../hooks/useInput";
import {
  Container,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";
import useNotistackSnackbar from "../../hooks/useNotistackSnackbar";

const RegistrationForm: FC = observer(() => {
  const { store } = useContext(Context);

  const username = useInput("", { isEmpty: true });
  const password = useInput("", { isEmpty: true });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  useNotistackSnackbar(store);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="lg" className="form registrationForm">
      <TextField
        id="username_register"
        value={username.value}
        onChange={username.onChange}
        label="Логин"
        variant="outlined"
        className="registrationForm__textField"
      />
      <FormControl variant="outlined">
        <InputLabel htmlFor="password">Пароль</InputLabel>
        <OutlinedInput
          id="password_register"
          type={showPassword ? "text" : "password"}
          value={password.value}
          onChange={password.onChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          className="registrationForm__textField"
        />
      </FormControl>
      <LoadingButton
        disabled={username.isEmpty || password.isEmpty}
        onClick={() => {
          store.register(username.value, password.value);
        }}
        loading={store.loading}
        loadingIndicator="Подождите..."
        variant="outlined"
      >
        <span>Регистрация</span>
      </LoadingButton>
    </Container>
  );
});

export default RegistrationForm;
