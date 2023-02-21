// import { ICipher } from "./IAuth";

import { StringLiteral } from "typescript";
import { SiteEnum } from "./IAuth";
import { IUserApiDto } from "./IUser";

export interface ITerminalState {}

export interface IApiAuthDto {
  name: SiteEnum;
  login: string;
  password: string;
  pageIndex: number;
}

export interface IGetStateDto {
  userId: number;
  bi: IApiAuthDto;
  bk: IApiAuthDto;
}

export interface ISiteContext {
  [key: string]: IApiAuthDto;
}

export interface IGetStateResponse {
  stateId: number;
  status: number;
  biBalance: number;
  bkBalance: number;
  betSum: number;
  stackSize: number;
  stackFilled: number;
  profit: number;
}
