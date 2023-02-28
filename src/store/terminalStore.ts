import { makeAutoObservable } from "mobx";
import { SiteEnum } from "../models/IAuth";
import {
  IApiAuthDto,
  IAvailableStrategies,
  IGetStateDto,
  IGetStateResponse,
  ISiteContext,
} from "../models/ITerminal";
import ApiService from "../services/ApiService";
import LoadingStore from "./loadingStore";
import SnackStore from "./snackStore";
import StrategyStore from "./strategyStore";

export default class TerminalStore {
  siteContext = {} as ISiteContext;
  stateDto = {} as IGetStateDto;
  state = {} as IGetStateResponse;
  currentStrategyId: number = -1;
  // TODO: Erase errors on render iteration
  error = "";
  loadingStore = new LoadingStore();

  // TODO: MobX MakeAutoObservable, MakeObservable obsidian
  constructor(
    private snackStore: SnackStore,
    private strategyStore: StrategyStore
  ) {
    this.getStateFromStorage();
    this.getStrategiesFromStorage();
    makeAutoObservable(this);
  }

  setCurrentStrategyId(id: number) {
    this.currentStrategyId = id;
  }

  setError(error: string) {
    this.error = error;
  }

  getStateFromStorage() {
    if (!this.state.stateId) {
      const localState = localStorage.getItem("state");
      if (localState) {
        const jsonState = JSON.parse(localState);
        this.setState(jsonState);
      }
    }
    for (let site of Object.values(SiteEnum)) {
      if (!this.siteContext[site]) {
        const localSiteContext = localStorage.getItem(site);
        if (localSiteContext) {
          const jsonlocalSiteContext = JSON.parse(localSiteContext);
          this.setSiteContext(jsonlocalSiteContext);
          this.setStateDto(site);
        }
      }
    }
  }

  getStrategiesFromStorage() {
    if (this.state.stateId) {
      const localStrategies = localStorage.getItem("availableStrategies");
      if (localStrategies) {
        this.strategyStore.setAvailableStrategies(JSON.parse(localStrategies));
      }
    }
  }

  setSiteContext(apiAuthDto: IApiAuthDto) {
    this.siteContext[apiAuthDto.name] = apiAuthDto;
    localStorage.setItem(
      `${apiAuthDto.name}`,
      JSON.stringify(this.siteContext[apiAuthDto.name])
    );
  }

  removeSiteContext(site: SiteEnum) {
    delete this.siteContext[site];
    localStorage.removeItem(`${site}`);
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
    localStorage.setItem("state", JSON.stringify(this.state));
  }

  setStateDtoUserId() {
    this.stateDto.userId = Number(localStorage.getItem("userId"));
  }

  async getState() {
    this.loadingStore.setLoading(true);
    console.log("getting state");
    try {
      this.setStateDtoUserId();
      const response = await ApiService.getState({ ...this.stateDto });
      console.log(response);
      this.setState(response.data);
      // await new Promise((res, rej) => {
      //   setTimeout(() => {
      //     this.strategyStore.parseStrategies({ ...this.stateDto });
      //   }, 10000);
      // });
    } catch (e: any) {
      if (e.response.status !== 429)
        this.snackStore.setSnack("error", e.response?.data?.message);
    }
    this.loadingStore.setLoading(false);
  }

  // TODO: 401
  // TODO: site to ENUM
  async login(username: string, password: string, site: SiteEnum) {
    this.loadingStore.setLoading(true, site);
    try {
      const userId = Number(localStorage.getItem("userId"));
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
    } catch (e: any) {
      this.snackStore.setSnack("error", e.response?.data?.message);
    }
    this.loadingStore.setLoading(false, site);
  }

  // TODO: 401
  async logout(site: SiteEnum) {
    this.loadingStore.setLoading(true, site);
    const siteContext = this.siteContext[site];
    this.removeSiteContext(site);
    this.setStateDto(site);
    this.setState({} as IGetStateResponse);
    this.strategyStore.setAvailableStrategies({} as IAvailableStrategies);
    try {
      await ApiService.logout(siteContext.pageIndex);
    } catch (e: any) {
      this.snackStore.setSnack("error", e.response?.data?.message);
    }
    this.loadingStore.setLoading(false, site);
  }
}
