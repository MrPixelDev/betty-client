import { observer } from "mobx-react-lite";
import { FC } from "react";
import useInput from "../../hooks/useInput";
import useShowPassword from "../../hooks/useShowPassword";
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
import { SiteEnum } from "../../models/enums";
import TerminalStore from "../../store/terminalStore";
import AuthStore from "../../store/authStore";

interface IAuthFormPorps {
  store: AuthStore | TerminalStore;
  site: SiteEnum;
}

const LoginForm: FC<IAuthFormPorps> = observer((props) => {
  const store = props.store;
  const validations = Object.create({ isEmpty: true });

  switch (props.site) {
    case SiteEnum.SI14:
    case SiteEnum.FTFSOOBET:
      validations.isEmail = true;
      break;
  }

  const username = useInput("", validations);
  const password = useInput("", { isEmpty: true });
  const showPassword = useShowPassword(false);

  return (
    <Container maxWidth="lg" className="form loginForm">
      <TextField
        id={`username_${props.site}`}
        value={username.value}
        onChange={username.onChange}
        label="Логин"
        variant="outlined"
        className="loginForm__textField"
      />
      <FormControl variant="outlined">
        <InputLabel htmlFor="password">Пароль</InputLabel>
        <OutlinedInput
          id={`password_${props.site}`}
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
          className="loginForm__textField"
        />
      </FormControl>
      <LoadingButton
        disabled={username.isEmpty || !username.isEmail || password.isEmpty}
        onClick={async () => {
          await store.login(username.value, password.value, props.site);
        }}
        loading={
          props.site !== SiteEnum.MAIN
            ? store.loadingStore.loadingFrom[props.site]
            : store.loadingStore.loading
        }
        loadingIndicator="Вход..."
        variant="outlined"
      >
        <span>Войти</span>
      </LoadingButton>
    </Container>
  );
});

export default LoginForm;
