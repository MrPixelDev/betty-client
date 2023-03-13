import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import AuthService from "../services/AuthService";
import SnackStore from "./snackStore";
import LoadingStore from "./loadingStore";
import { SiteEnum } from "../models/enums";
import TerminalStore from "./terminalStore";

export default class AuthStore {
  user = {} as IUser;
  isAuth = false;
  error = "";
  loadingStore = new LoadingStore();

  // TODO: MobX MakeAutoObservable, MakeObservable obsidian
  constructor(
    private snackStore: SnackStore,
    private terminalStore: TerminalStore
  ) {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setError(error: string) {
    this.error = error;
  }

  setToken(response: AxiosResponse<AuthResponse, any>) {
    localStorage.setItem("token", response.data.accessToken);
    localStorage.setItem("userId", this.user.userId.toString());
  }

  removeToken() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  }

  // TODO: Loading Decorator
  // TODO: Implement some functions in userStore
  async login(username: string, password: string, site?: SiteEnum) {
    this.loadingStore.setLoading(true);
    try {
      const response = await AuthService.login({ username, password });
      this.setUser(response.data.user);
      this.setToken(response);
      this.setAuth(true);
    } catch (e: any) {
      console.log(e);
      console.log(e.response?.data?.message);
      this.snackStore.setSnack("error", e.response?.data?.message);
    }
    this.loadingStore.setLoading(false);
  }

  async logout(site?: SiteEnum) {
    this.loadingStore.setLoading(true);
    try {
      await this.terminalStore.clearAll();
      this.removeToken();
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e: any) {
      console.log(e);
      console.log(e.response?.data?.message);
      this.snackStore.setSnack("error", e.response?.data?.message);
    }
    this.loadingStore.setLoading(false);
  }

  async checkAuth(site?: SiteEnum) {
    this.loadingStore.setLoading(true);
    try {
      const response = await AuthService.checkAuth();
      this.setUser(response.data.user);
      this.setToken(response);
      this.setAuth(true);
    } catch (e: any) {
      await this.logout();
      console.log(e);
      console.log(e.response?.data?.message);
      this.snackStore.setSnack("error", e.response?.data?.message);
    }
    this.loadingStore.setLoading(false);
  }
}
