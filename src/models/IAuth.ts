import AuthStore from "../store/authStore";
import TerminalStore from "../store/terminalStore";
import UserStore from "../store/userStore";

export interface ICipher {
  cipherText: ArrayBuffer;
  iv: Uint8Array;
}

// // TODO: Enum with ID

export enum SiteEnum {
  MAIN = "main",
  SI14 = "si14",
  FTFSOOBET = "ftfsoobet",
  FONBET = "fonbet",
}

// TODO: Rename
export interface IAuthDto {
  store: AuthStore | TerminalStore;
  site: SiteEnum;
}
