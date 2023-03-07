import { SiteEnum } from "./enums";

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

export interface IStock {
  strategyId: number;
  result: string;
  fonbetCf: number;
  bkCf: number;
  targetCf: number;
  obligationSum: number;
  bkSum: number;
  potentialBiGain: number;
  biGain: number;
  bkGain: number;
}

export interface IStrategy {
  strategyId: number;
  strategyName: string;
  status: number;
  sportName: string;
  league: string;
  leagueEvent: string;
  bet: string;
  obligation: number;
  marginality: number;
  stackSize: number;
  stackFilled: number;
  stock: IStock[];
}

export interface IGetStateResponse {
  stateId: number;
  strategyList: IStrategy[];
  biBalance: number;
  bkBalance: number;
  betSum: number;
  profit: number;
}

export interface IAvailableStrategies {
  bets: {
    [sportName: string]: {
      [league: string]: {
        [leagueEvent: string]: string[];
      };
    };
  };
  marginalitys: number[];
  obligations: number[];
  stackSizes: number[];
}
