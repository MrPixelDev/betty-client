import AuthStore from "../store/authStore";
import UserStore from "../store/userStore";

export interface ICipher {
  cipherText: ArrayBuffer;
  iv: Uint8Array;
}

export interface IAuthSites {
  main: boolean;
  si: boolean;
  bet: boolean;
}

export interface IAuthDto {
  store: AuthStore | UserStore;
  site: keyof IAuthSites;
}
