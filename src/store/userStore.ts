import { makeAutoObservable } from "mobx";
import { IAuthSites } from "../models/IAuth";
import { IUser } from "../models/IUser";
import SymEncryptService from "../services/SymEncryptService";
import UsersService from "../services/UsersService";
import AuthStore from "./authStore";
import SnackStore from "./snackStore";

interface IUsersObj {
  site: keyof IAuthSites;
  user: IUser;
}

export default class UserStore {
  users = [] as IUser[];
  usersObj = [] as IUsersObj[];
  // TODO: Erase errors on render iteration
  isAuth = {
    si: false,
    bet: false,
  } as IAuthSites;
  error = "";
  loading = false;

  // TODO: MobX MakeAutoObservable, MakeObservable obsidian
  constructor(private authStore: AuthStore, private snackStore: SnackStore) {
    this.authStore = authStore;
    this.snackStore = snackStore;
    makeAutoObservable(this);
  }

  setUsers(users: IUser[]) {
    this.users = [...users];
  }

  addUser(userObj: IUsersObj[]) {
    this.usersObj = [...this.usersObj, ...userObj];
  }

  setError(error: string) {
    this.error = error;
  }

  setLoading(bool: boolean) {
    this.loading = bool;
  }

  setAuth(site: keyof IAuthSites, bool: boolean) {
    this.isAuth[site] = bool;
  }

  getUserBySite(site: keyof IAuthSites) {
    return this.usersObj.find((v) => v.site === site)?.user;
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
      this.snackStore.setSnackVariant("error");
      this.snackStore.setSnackMessage(e.response?.data?.message);
    }
    this.setLoading(false);
  }

  async register(username: string, password: string) {
    this.setLoading(true);
    try {
      const response = await UsersService.register(username, password);
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
    this.setLoading(false);
  }

  async login(username: string, password: string, site: keyof IAuthSites) {
    this.setLoading(true);
    const user = {
      id: 1,
      username,
      password,
      banned: false,
      banReason: "null",
      createdAt: "1",
      updatedAt: "1",
    };
    try {
      this.addUser([
        {
          site,
          user,
        },
      ]);
      this.setAuth(site, true);
      console.log("login", site, this.usersObj);
    } catch (e) {}
    this.setLoading(false);
  }

  async logout(site: keyof IAuthSites) {
    this.setLoading(true);
    try {
      this.usersObj = this.usersObj.filter((user) => {
        return user.site !== site;
      });
      console.log("logout", site, this.usersObj);
      this.setAuth(site, false);
    } catch (e) {}
    this.setLoading(false);
  }

  async checkAuth(username: string, password: string, site: string) {
    this.setLoading(true);
    try {
    } catch (e) {}
    this.setLoading(false);
  }
}
