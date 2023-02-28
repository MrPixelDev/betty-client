import { makeAutoObservable } from "mobx";
import { SiteEnum } from "../models/IAuth";

export default class LoadingStore {
  loading = false;
  loadingFrom = {} as {
    [key: string]: boolean;
  };

  // TODO: MobX MakeAutoObservable, MakeObservable obsidian
  constructor() {
    makeAutoObservable(this);
  }

  setLoading(bool: boolean, site?: string) {
    this.loading = bool;
    if (site) {
      this.loadingFrom[site] = bool;
    }
  }
}
