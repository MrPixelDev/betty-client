import server from "../http";
import * as bcrypt from "bcryptjs";
import { AxiosResponse } from "axios";
import { IUser, IUserApiDto, IUserAuthDto } from "../models/IUser";
import { ICipher } from "../models/IAuth";
import {
  IAvailableStrategy,
  IAvailableStrategyModel,
  IGetStateDto,
  IGetStateResponse,
  IStrategy,
  IStrategyDto,
} from "../models/ITerminal";

export default class ApiService {
  static async login(userApiDto: IUserApiDto): Promise<AxiosResponse<any>> {
    const res = server.post<any>(`/api/login`, userApiDto);
    return res;
  }

  static async logout(pageIndex: number): Promise<any> {
    return server.post<any>(`/api/logout`, { pageIndex });
  }

  static async checkAuth(): Promise<AxiosResponse<any>> {
    return server.get<any>("/api/refresh");
  }

  static async getState(
    stateDto: IGetStateDto
  ): Promise<AxiosResponse<IGetStateResponse>> {
    return server.post<any>("/api/getstate", stateDto);
  }

  static async parseStrategyModel(): Promise<
    AxiosResponse<IAvailableStrategyModel>
  > {
    return server.get<any>("/api/parsestrategymodel");
  }

  static async createStrategy(
    strategyDto: IStrategyDto
  ): Promise<AxiosResponse<any>> {
    return server.post<any>("/api/createstrategy", strategyDto);
  }

  static async parseAvailableStrategies(): Promise<
    AxiosResponse<IAvailableStrategy[]>
  > {
    return server.get<any>("/api/getavailablestrategies");
  }

  static async bindSelectedStrategy(
    stateId: number,
    strategy: IStrategyDto
  ): Promise<AxiosResponse<any>> {
    return server.put<any>(`/api/bind-strategy/${stateId}`, strategy);
  }

  static async setStrategyStatus(
    strategy: IStrategy,
    status: string
  ): Promise<AxiosResponse<any>> {
    return server.put<any>(`/api/set-strategy-status/${strategy.strategyId}`, {
      status,
    });
  }
}
