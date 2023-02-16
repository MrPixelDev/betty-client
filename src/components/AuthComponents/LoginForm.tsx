import { observer } from "mobx-react-lite";
import { MouseEvent, useContext, useState } from "react";
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
import useNotistackSnackbar from "../../hooks/useNotistackSnackbar";

const LoginForm = observer(() => {
  const { authStore } = useContext(Context);

  const username = useInput("", { isEmpty: true });
  const password = useInput("", { isEmpty: true });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  useNotistackSnackbar(authStore);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="lg" className="form loginForm">
      <TextField
        id="username"
        value={username.value}
        onChange={username.onChange}
        label="Логин"
        variant="outlined"
        className="loginForm__textField"
      />
      <FormControl variant="outlined">
        <InputLabel htmlFor="password">Пароль</InputLabel>
        <OutlinedInput
          id="password"
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
          className="loginForm__textField"
        />
      </FormControl>
      <LoadingButton
        disabled={username.isEmpty || password.isEmpty}
        onClick={async () => {
          await authStore.login(username.value, password.value);
        }}
        loading={authStore.loading}
        loadingIndicator="Вход..."
        variant="outlined"
      >
        <span>Войти</span>
      </LoadingButton>
    </Container>
  );
});

export default LoginForm;
