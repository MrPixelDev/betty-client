import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import UsersService from "../services/UsersService";
import AuthStore from "./authStore";
import SnackStore from "./snackStore";

export default class TerminalStore {
  users = [] as IUser[];
  // TODO: Erase errors on render iteration
  error = "";
  loading = false;

  // TODO: MobX MakeAutoObservable, MakeObservable obsidian
  constructor(private snackStore: SnackStore) {
    this.snackStore = snackStore;
    makeAutoObservable(this);
  }

  setUsers(users: IUser[]) {
    this.users = [...users];
  }

  setError(error: string) {
    this.error = error;
  }

  setLoading(bool: boolean) {
    this.loading = bool;
  }

  // async getUsers() {
  //   this.setLoading(true);
  //   try {
  //     const response = await UsersService.getUsers();
  //     this.setUsers(response.data);
  //   } catch (e: any) {
  //     if (e.response.status === 401) {
  //       this.authStore.logout();
  //     }
  //     this.snackStore.setSnackVariant("error");
  //     this.snackStore.setSnackMessage(e.response?.data?.message);
  //   }
  //   this.setLoading(false);
  // }

  // async register(username: string, password: string) {
  //   this.setLoading(true);
  //   try {
  //     const response = await UsersService.register(username, password);
  //     if (response.status === 201) {
  //       this.snackStore.setSnackVariant("success");
  //       this.snackStore.setSnackMessage("Пользователь успешно зарегистрирован");
  //     }
  //   } catch (e: any) {
  //     console.log(e);
  //     console.log(e.response?.data?.message);
  //     // this.setError(e.response?.data?.message);
  //     this.snackStore.setSnackVariant("error");
  //     this.snackStore.setSnackMessage(e.response?.data?.message);
  //   }
  //   this.setLoading(false);
  // }
}
