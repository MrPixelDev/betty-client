import server from "../http";
import * as bcrypt from "bcryptjs";
import { AxiosResponse } from "axios";
import { IUser, IUserApiDto, IUserAuthDto } from "../models/IUser";
import { ICipher } from "../models/IAuth";

export default class UsersService {
  static async getUsers(): Promise<AxiosResponse<IUser[]>> {
    return server.get<IUser[]>("/users");
  }

  static async register(
    userAuthDto: IUserAuthDto
  ): Promise<AxiosResponse<IUser>> {
    // const userAuthDto: IUserAuthDto = {
    //   username,
    //   password,
    // };

    return server.post<IUser>("/users/registration", userAuthDto);
  }

  static async login(userApiDto: IUserApiDto): Promise<AxiosResponse<any>> {
    // const hashPW = await this.hashPassword(password);
    // const userApiDto: IUserApiDto = {
    //   userId,
    //   username,
    //   password,
    //   site,
    // };
    const res = server.post<any>(`/api/login`, userApiDto);
    return res;
  }

  static async logout(pageIndex: number): Promise<any> {
    return server.post<any>(`/api/logout`, { pageIndex });
  }

  static async checkAuth(): Promise<AxiosResponse<any>> {
    return server.get<any>("/api/refresh");
  }
}
