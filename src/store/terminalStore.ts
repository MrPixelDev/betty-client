import { makeAutoObservable } from "mobx";
import { SiteEnum } from "../models/IAuth";
import {
  IApiAuthDto,
  IGetStateDto,
  IGetStateResponse,
  ISiteContext,
} from "../models/ITerminal";
import { IUser } from "../models/IUser";
import ApiService from "../services/ApiService";
import UsersService from "../services/UsersService";
import AuthStore from "./authStore";
import LoadingStore from "./loadingStore";
import SnackStore from "./snackStore";

export default class TerminalStore {
  siteContext = {} as ISiteContext;
  stateDto = {} as IGetStateDto;
  state = {} as IGetStateResponse;
  // TODO: Erase errors on render iteration
  error = "";

  // TODO: MobX MakeAutoObservable, MakeObservable obsidian
  constructor(
    private loadingStore: LoadingStore,
    private snackStore: SnackStore,
    private authStore: AuthStore
  ) {
    if (!this.state.stateId) {
      const sessionState = sessionStorage.getItem("state");
      if (sessionState) {
        const jsonState = JSON.parse(sessionState);
        this.setState(jsonState);
      }
    }

    for (let site of Object.values(SiteEnum)) {
      if (!this.siteContext[site]) {
        const sessionSiteContext = sessionStorage.getItem(site);
        if (sessionSiteContext) {
          const jsonSessionSiteContext = JSON.parse(sessionSiteContext);
          this.setSiteContext(jsonSessionSiteContext);
        }
      }
    }
    makeAutoObservable(this);
  }

  setError(error: string) {
    this.error = error;
  }

  setSiteContext(apiAuthDto: IApiAuthDto) {
    this.siteContext[apiAuthDto.name] = apiAuthDto;
    sessionStorage.setItem(
      `${apiAuthDto.name}`,
      JSON.stringify(this.siteContext[apiAuthDto.name])
    );
  }

  removeSiteContext(site: SiteEnum) {
    delete this.siteContext[site];
    sessionStorage.removeItem(`${site}`);
  }

  setStateDto(site: SiteEnum) {
    switch (site) {
      case SiteEnum.SI14:
        this.stateDto.bi = this.siteContext[site];
        break;
      case SiteEnum.FTFSOOBET:
        this.stateDto.bk = this.siteContext[site];
        break;
    }
  }

  setState(state: IGetStateResponse) {
    this.state = state;
    sessionStorage.setItem("state", JSON.stringify(this.state));
  }

  async getState() {
    this.loadingStore.setLoading(true);
    this.stateDto.userId = this.authStore.user.userId;
    const response = await ApiService.getState({ ...this.stateDto });
    console.log(response);
    this.setState(response.data);
    this.loadingStore.setLoading(false);
  }

  // TODO: 401
  // TODO: site to ENUM
  async login(username: string, password: string, site: SiteEnum) {
    this.loadingStore.setLoading(true);
    try {
      const userId = this.authStore.user.userId;
      const response = await ApiService.login({
        userId,
        username,
        password,
        site,
      });
      console.log("response", response);
      this.setSiteContext({
        name: site,
        login: username,
        password,
        pageIndex: response.data.pageContext.index,
      });
      this.setStateDto(site);
    } catch (e) {}
    this.loadingStore.setLoading(false);
  }

  // TODO: 401
  async logout(site: SiteEnum) {
    this.loadingStore.setLoading(true);
    try {
      await ApiService.logout(this.siteContext[site].pageIndex);
      this.setState({} as IGetStateResponse);
      this.removeSiteContext(site);
      this.setStateDto(site);
    } catch (e) {}
    this.loadingStore.setLoading(false);
  }
}
