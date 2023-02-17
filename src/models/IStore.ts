import AuthStore from "../store/authStore";
import SettingsStore from "../store/settingsStore";
import SnackStore from "../store/snackStore";
import TerminalStore from "../store/terminalStore";
import UserStore from "../store/userStore";

export interface IUserStore {
  store: UserStore;
}

export interface ISnackStore {
  snackStore: SnackStore;
}

export interface IStoresObject {
  snackStore: SnackStore;
  authStore: AuthStore;
  userStore: UserStore;
  terminalStore: TerminalStore;
  settingsStore: SettingsStore;
}
