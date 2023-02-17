import { IStoresObject } from "../models/IStore";
import AuthStore from "./authStore";
import SettingsStore from "./settingsStore";
import SnackStore from "./snackStore";
import TerminalStore from "./terminalStore";
import UserStore from "./userStore";

export function initStores(): IStoresObject {
  const snackStore = new SnackStore();
  const authStore = new AuthStore(snackStore);
  const sideAuthStore = new AuthStore(snackStore);
  const userStore = new UserStore(authStore, snackStore);
  const terminalStore = new TerminalStore(snackStore);
  const settingsStore = new SettingsStore(snackStore);

  return {
    userStore,
    authStore,
    terminalStore,
    settingsStore,
    snackStore,
  };
}
