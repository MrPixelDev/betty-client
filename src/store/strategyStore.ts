import { makeAutoObservable } from "mobx";
import {
  IAvailableStrategy,
  IAvailableStrategyModel,
  IGetStateDto,
  IStrategyDto,
} from "../models/ITerminal";
import ApiService from "../services/ApiService";
import LoadingStore from "./loadingStore";
import SnackStore from "./snackStore";

export default class StrategyStore {
  loadingStore = new LoadingStore();
  error = "";
  availableStrategyModel = {} as IAvailableStrategyModel;
  availableStrategies = [] as IAvailableStrategy[];
  selectedStrategy = {} as IStrategyDto;

  constructor(private snackStore: SnackStore) {
    this.getAvailableStrategyModel();
    this.getAvailableStrategies();
    makeAutoObservable(this);
  }

  setAvailableStrategyModel(strategies: IAvailableStrategyModel) {
    this.availableStrategyModel = strategies;
    localStorage.setItem(
      "availableStrategyModel",
      JSON.stringify(this.availableStrategyModel)
    );
  }

  getAvailableStrategyModel() {
    const availableStrategyModel = localStorage.getItem(
      "availableStrategyModel"
    );
    if (availableStrategyModel) {
      this.availableStrategyModel = JSON.parse(availableStrategyModel);
    }
  }

  setAvailableStrategies(strategyList: IAvailableStrategy[]) {
    this.availableStrategies = strategyList;
    localStorage.setItem(
      "availableStrategies",
      JSON.stringify(this.availableStrategies)
    );
  }

  getAvailableStrategies() {
    const availableStrategies = localStorage.getItem("availableStrategies");
    if (availableStrategies) {
      this.availableStrategies = JSON.parse(availableStrategies);
    }
  }

  setSelectedStrategy(strategy: IStrategyDto) {
    this.selectedStrategy = {
      strategyName: strategy.strategyName,
      sportName: strategy.sportName,
      league: strategy.league,
      bet: strategy.bet,
      marginality: strategy.marginality,
      obligation: strategy.obligation,
      stackSize: strategy.stackSize,
    };
  }

  async parseStrategyModel() {
    this.loadingStore.setLoading(true);
    try {
      const response = await ApiService.parseStrategyModel();
      this.setAvailableStrategyModel(response.data);
    } catch (e: any) {
      this.snackStore.setSnack("error", e.response?.data?.message);
    }
    this.loadingStore.setLoading(false);
  }

  async createStrategy(strategyDto: IStrategyDto) {
    this.loadingStore.setLoading(true);
    try {
      const response = await ApiService.createStrategy(strategyDto);
      this.snackStore.setSnack("success", "Стратегия успешно создана");
    } catch (e: any) {
      this.snackStore.setSnack("error", e.response?.data?.message);
    }
    this.loadingStore.setLoading(false);
  }

  async parseAvailableStrategies() {
    this.loadingStore.setLoading(true);
    try {
      const response = await ApiService.parseAvailableStrategies();
      this.setAvailableStrategies(response.data);
    } catch (e: any) {
      this.snackStore.setSnack("error", e.response?.data?.message);
    }
    this.loadingStore.setLoading(false);
  }
}
