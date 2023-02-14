import AuthStore from "../store/authStore";
import SomeStore from "../store/store";
import Store from "../store/store";

export interface ISomeStore {
  store: SomeStore;
}

export interface IAuthStore {
  authStore: Store;
}

export interface IStoresObject {
  store: SomeStore;
  authStore: AuthStore;
}
