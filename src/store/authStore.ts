import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import AuthService from "../services/AuthService";
import SnackStore from "./snackStore";
import { SiteEnum } from "../models/IAuth";
import LoadingStore from "./loadingStore";

export default class AuthStore {
  user = {} as IUser;
  isAuth = false;
  error = "";

  // TODO: MobX MakeAutoObservable, MakeObservable obsidian
  constructor(
    private loadingStore: LoadingStore,
    private snackStore: SnackStore
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
  }

  removeToken() {
    localStorage.removeItem("token");
  }

  // TODO: Loading Decorator
  // TODO: Implement some functions in userStore
  async login(username: string, password: string, site?: SiteEnum) {
    this.loadingStore.setLoading(true);
    try {
      const response = await AuthService.login({ username, password });
      this.setToken(response);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e: any) {
      console.log(e);
      console.log(e.response?.data?.message);
      // this.setError(e.response?.data?.message);
      this.snackStore.setSnackVariant("error");
      this.snackStore.setSnackMessage(e.response?.data?.message);
    }
    this.loadingStore.setLoading(false);
  }

  async logout(site?: SiteEnum) {
    this.loadingStore.setLoading(true);
    try {
      this.removeToken();
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e: any) {
      console.log(e);
      console.log(e.response?.data?.message);
      // this.setError(e.response?.data?.message);
      this.snackStore.setSnackVariant("error");
      this.snackStore.setSnackMessage(e.response?.data?.message);
    }
    this.loadingStore.setLoading(false);
  }

  async checkAuth(site?: SiteEnum) {
    this.loadingStore.setLoading(true);
    try {
      const response = await AuthService.checkAuth();
      this.setToken(response);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e: any) {
      await this.logout();
      console.log(e);
      console.log(e.response?.data?.message);
      this.snackStore.setSnackVariant("error");
      this.snackStore.setSnackMessage(e.response?.data?.message);
    }
    this.loadingStore.setLoading(false);
  }
}
