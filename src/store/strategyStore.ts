import { makeAutoObservable, toJS } from "mobx";
import { IAvailableStrategies, IGetStateDto } from "../models/ITerminal";
import ApiService from "../services/ApiService";
import LoadingStore from "./loadingStore";
import SnackStore from "./snackStore";
import TerminalStore from "./terminalStore";

export default class StrategyStore {
  loadingStore = new LoadingStore();
  error = "";
  availableStrategies = {} as IAvailableStrategies;
  stateDto = {} as IGetStateDto;

  constructor(private snackStore: SnackStore) {
    makeAutoObservable(this);
  }

  setAvailableStrategies(strategies: IAvailableStrategies) {
    this.availableStrategies = strategies;
    localStorage.setItem(
      "availableStrategies",
      JSON.stringify(this.availableStrategies)
    );
  }

  setStateDto(stateDto: IGetStateDto) {
    this.stateDto = stateDto;
  }

  async parseStrategies(stateDto: IGetStateDto) {
    this.loadingStore.setLoading(true);
    this.setStateDto(stateDto);
    try {
      const response = await ApiService.parseStrategies(stateDto);
      this.setAvailableStrategies(response.data);
    } catch (e: any) {
      this.snackStore.setSnack("error", e.response?.data?.message);
    }
    this.loadingStore.setLoading(false);
  }
}
