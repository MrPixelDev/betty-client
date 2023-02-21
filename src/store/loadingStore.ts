import { makeAutoObservable } from "mobx";

export default class LoadingStore {
  loading = false;

  // TODO: MobX MakeAutoObservable, MakeObservable obsidian
  constructor() {
    makeAutoObservable(this);
  }

  setLoading(bool: boolean) {
    this.loading = false;
  }
}
