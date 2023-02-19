import { makeAutoObservable } from "mobx";
import { SiteEnum } from "../models/IAuth";
import { IUser, TUser } from "../models/IUser";
import AuthService from "../services/AuthService";
import UsersService from "../services/UsersService";
import AuthStore from "./authStore";
import SnackStore from "./snackStore";

interface IUsersObj {
  site: SiteEnum;
  user: IUser;
}

export interface ISiteContext {
  [key: string]: number;
}

export type IAuthSites = {
  [value in SiteEnum]: boolean;
};

export default class UserStore {
  users = [] as IUser[];
  usersObj = [] as IUsersObj[];
  siteContext = {} as ISiteContext;
  // TODO: Erase errors on render iteration
  isAuth = {
    si14: false,
    ftfsoobet: false,
  } as IAuthSites;
  error = "";
  loading = false;

  // TODO: MobX MakeAutoObservable, MakeObservable obsidian
  constructor(private authStore: AuthStore, private snackStore: SnackStore) {
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

  setAuth(site: SiteEnum, bool: boolean) {
    this.isAuth[site] = bool;
  }

  setSiteContext(site: SiteEnum, pageIndex: number) {
    this.siteContext[site] = pageIndex;
  }

  getUserBySite(site: SiteEnum) {
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

  // TODO: 401
  async register(username: string, password: string) {
    this.setLoading(true);
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
    this.setLoading(false);
  }

  // TODO: 401
  // TODO: site to ENUM
  async login(username: string, password: string, site: SiteEnum) {
    this.setLoading(true);
    try {
      const userId = this.authStore.user.userId;
      console.log(site);
      const response = await UsersService.login({
        userId,
        username,
        password,
        site,
      });
      console.log("response", response);
      this.setSiteContext(site, response.data.pageContext.index);
      this.setAuth(site, true);
    } catch (e) {}
    this.setLoading(false);
  }

  // TODO: 401
  async logout(site: SiteEnum) {
    this.setLoading(true);
    try {
      await UsersService.logout(this.siteContext[site]);
      this.setAuth(site, false);
    } catch (e) {}
    this.setLoading(false);
  }

  // TODO: 401
  async checkAuth(username: string, password: string, site: SiteEnum) {
    this.setLoading(true);
    try {
    } catch (e) {}
    this.setLoading(false);
  }
}
