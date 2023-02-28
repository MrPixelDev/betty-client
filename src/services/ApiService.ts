import server from "../http";
import * as bcrypt from "bcryptjs";
import { AxiosResponse } from "axios";
import { IUser, IUserApiDto, IUserAuthDto } from "../models/IUser";
import { ICipher } from "../models/IAuth";
import {
  IAvailableStrategies,
  IGetStateDto,
  IGetStateResponse,
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

  static async parseStrategies(
    stateDto: IGetStateDto
  ): Promise<AxiosResponse<IAvailableStrategies>> {
    return server.post<any>("/api/parsestrategies", stateDto);
  }
}
