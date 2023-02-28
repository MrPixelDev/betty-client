import { io, Socket } from "socket.io-client";
import { IStoresObject } from "../models/IStore";
import AuthStore from "./authStore";
import LoadingStore from "./loadingStore";
import SettingsStore from "./settingsStore";
import SnackStore from "./snackStore";
import StrategyStore from "./strategyStore";
import TerminalStore from "./terminalStore";
import UserStore from "./userStore";

export function initStores(): IStoresObject {
  // const socket = io(
  // `${process.env.REACT_APP_SOCKET_URL}:${process.env.REACT_APP_SOCKET_PORT}`
  // );
  const loadingStore = new LoadingStore();
  const snackStore = new SnackStore();
  const strategyStore = new StrategyStore(snackStore);
  const terminalStore = new TerminalStore(snackStore, strategyStore);
  const authStore = new AuthStore(snackStore, terminalStore);
  const userStore = new UserStore(snackStore, authStore);
  const settingsStore = new SettingsStore(snackStore);

  return {
    // socket,
    userStore,
    authStore,
    terminalStore,
    strategyStore,
    settingsStore,
    snackStore,
    loadingStore,
  };
}
