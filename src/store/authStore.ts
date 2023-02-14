import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import AuthService from "../services/AuthService";

export default class AuthStore {
  user = {} as IUser;
  isAuth = false;
  error = "";
  loading = false;

  // TODO: MobX MakeAutoObservable, MakeObservable obsidian
  constructor() {
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

  setLoading(bool: boolean) {
    this.loading = bool;
  }

  setToken(response: AxiosResponse<AuthResponse, any>) {
    localStorage.setItem("token", response.data.accessToken);
  }

  removeToken() {
    localStorage.removeItem("token");
  }

  // TODO: Loading Decorator
  async login(username: string, password: string) {
    this.setLoading(true);
    try {
      const response = await AuthService.login(username, password);
      this.setToken(response);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e: any) {
      console.log(e);
      console.log(e.response?.data?.message);
      this.setError(e.response?.data?.message);
    }
    this.setLoading(false);
  }

  async logout() {
    this.setLoading(true);
    try {
      this.removeToken();
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e: any) {
      console.log(e);
      console.log(e.response?.data?.message);
      this.setError(e.response?.data?.message);
    }
    this.setLoading(false);
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await AuthService.checkAuth();
      this.setToken(response);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e: any) {
      await this.logout();
      console.log(e);
      console.log(e.response?.data?.message);
    }
    this.setLoading(false);
  }
}
