import AuthStore from "../store/authStore";
import TerminalStore from "../store/terminalStore";
import { SiteEnum } from "./enums";

export interface ICipher {
  cipherText: ArrayBuffer;
  iv: Uint8Array;
}
