import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import UsersService from "../services/UsersService";
import AuthStore from "./authStore";
import LoadingStore from "./loadingStore";
import SnackStore from "./snackStore";

export default class SettingsStore {
  users = [] as IUser[];
  // TODO: Erase errors on render iteration
  error = "";
  loadingStore = new LoadingStore();

  // TODO: MobX MakeAutoObservable, MakeObservable obsidian
  constructor(private snackStore: SnackStore) {
    makeAutoObservable(this);
  }

  setUsers(users: IUser[]) {
    this.users = [...users];
  }

  setError(error: string) {
    this.error = error;
  }
}
