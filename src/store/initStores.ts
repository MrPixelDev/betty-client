import { IStoresObject } from "../models/IStore";
import AuthStore from "./authStore";
import SomeStore from "./store";

export function initStores(): IStoresObject {
  const authStore = new AuthStore();
  const store = new SomeStore(authStore);

  return {
    store,
    authStore,
  };
}
