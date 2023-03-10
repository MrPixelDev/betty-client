import { makeAutoObservable } from "mobx";
import { IUser, IUserRegisterDto, TUser } from "../models/IUser";
import UsersService from "../services/UsersService";
import AuthStore from "./authStore";
import LoadingStore from "./loadingStore";
import SnackStore from "./snackStore";

export default class UserStore {
  users = [] as IUser[];
  loadingStore = new LoadingStore();
  error = "";

  // TODO: MobX MakeAutoObservable, MakeObservable obsidian
  constructor(private snackStore: SnackStore, private authStore: AuthStore) {
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
      this.snackStore.setSnack("error", e.response?.data?.message);
    }
    this.loadingStore.setLoading(false);
  }

  // TODO: 401
  async register(userRegisterDto: IUserRegisterDto) {
    this.loadingStore.setLoading(true);
    try {
      const response = await UsersService.register(userRegisterDto);
      if (response.status === 201) {
        this.snackStore.setSnack(
          "success",
          "Пользователь успешно зарегистрирован"
        );
      }
    } catch (e: any) {
      console.log(e);
      console.log(e.response?.data?.message);
      this.snackStore.setSnack("error", e.response?.data?.message);
    }
    this.loadingStore.setLoading(false);
  }
}
