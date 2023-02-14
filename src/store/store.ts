import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";
import UsersService from "../services/UsersService";
import AuthStore from "./authStore";

export default class SomeStore {
  users = [] as IUser[];
  // TODO: Erase errors on render iteration
  error = "";
  loading = false;

  // TODO: MobX MakeAutoObservable, MakeObservable obsidian
  constructor(private authStore: AuthStore) {
    this.authStore = authStore;
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

  async getUsers() {
    this.setLoading(true);
    try {
      const response = await UsersService.getUsers();
      this.setUsers(response.data);
    } catch (e: any) {
      if (e.response.status === 401) {
        this.authStore.logout();
      }
    }
    this.setLoading(false);
  }

  async register(username: string, password: string) {
    this.setLoading(true);
    try {
      const response = await AuthService.register(username, password);
      if (response.status === 201) {
        window.alert(
          `Пользователь ${response.data.username} успешно зарегистрирован`
        );
      }
    } catch (e: any) {
      console.log(e);
      console.log(e.response?.data?.message);
      this.setError(e.response?.data?.message);
    }
    this.setLoading(false);
  }
}
