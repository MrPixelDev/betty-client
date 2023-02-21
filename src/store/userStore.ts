import { makeAutoObservable } from "mobx";
import { SiteEnum } from "../models/IAuth";
import { IUser, TUser } from "../models/IUser";
import AuthService from "../services/AuthService";
import UsersService from "../services/UsersService";
import AuthStore from "./authStore";
import LoadingStore from "./loadingStore";
import SnackStore from "./snackStore";

export default class UserStore {
  users = [] as IUser[];

  error = "";

  // TODO: MobX MakeAutoObservable, MakeObservable obsidian
  constructor(
    private loadingStore: LoadingStore,
    private snackStore: SnackStore,
    private authStore: AuthStore
  ) {
    makeAutoObservable(this);
  }

  setUsers(users: IUser[]) {
    this.users = [...users];
  }

  setError(error: string) {
    this.error = error;
  }

  async getUsers() {
    this.loadingStore.setLoading(true);
    try {
      const response = await UsersService.getUsers();
      this.setUsers(response.data);
    } catch (e: any) {
      if (e.response.status === 401) {
        this.authStore.logout();
      }
      this.snackStore.setSnackVariant("error");
      this.snackStore.setSnackMessage(e.response?.data?.message);
    }
    this.loadingStore.setLoading(false);
  }

  // TODO: 401
  async register(username: string, password: string) {
    this.loadingStore.setLoading(true);
    try {
      const response = await UsersService.register({ username, password });
      if (response.status === 201) {
        this.snackStore.setSnackVariant("success");
        this.snackStore.setSnackMessage("Пользователь успешно зарегистрирован");
      }
    } catch (e: any) {
      console.log(e);
      console.log(e.response?.data?.message);
      // this.setError(e.response?.data?.message);
      this.snackStore.setSnackVariant("error");
      this.snackStore.setSnackMessage(e.response?.data?.message);
    }
    this.loadingStore.setLoading(false);
  }
}
