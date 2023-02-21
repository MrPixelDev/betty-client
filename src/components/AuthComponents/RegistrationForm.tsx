import { observer } from "mobx-react-lite";
import { FC, useContext } from "react";
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
import useShowPassword from "../../hooks/useShowPassword";

const RegistrationForm: FC = observer(() => {
  const { userStore, loadingStore } = useContext(Context);

  const username = useInput("", { isEmpty: true });
  const password = useInput("", { isEmpty: true });
  const showPassword = useShowPassword(false);

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
          type={showPassword.state ? "text" : "password"}
          value={password.value}
          onChange={password.onChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={showPassword.handleClickShowPassword}
                onMouseDown={showPassword.handleMouseDownPassword}
                edge="end"
              >
                {showPassword.state ? <VisibilityOff /> : <Visibility />}
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
          userStore.register(username.value, password.value);
        }}
        loading={loadingStore.loading}
        loadingIndicator="Подождите..."
        variant="outlined"
      >
        <span>Регистрация</span>
      </LoadingButton>
    </Container>
  );
});

export default RegistrationForm;
