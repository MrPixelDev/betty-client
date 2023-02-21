import { IStoresObject } from "../models/IStore";
import AuthStore from "./authStore";
import LoadingStore from "./loadingStore";
import SettingsStore from "./settingsStore";
import SnackStore from "./snackStore";
import TerminalStore from "./terminalStore";
import UserStore from "./userStore";

export function initStores(): IStoresObject {
  const loadingStore = new LoadingStore();
  const snackStore = new SnackStore();
  const authStore = new AuthStore(loadingStore, snackStore);
  const userStore = new UserStore(loadingStore, snackStore, authStore);
  const terminalStore = new TerminalStore(loadingStore, snackStore, authStore);
  const settingsStore = new SettingsStore(snackStore);

  return {
    userStore,
    authStore,
    terminalStore,
    settingsStore,
    snackStore,
    loadingStore,
  };
}
