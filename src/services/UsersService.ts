import server from "../http";
import * as bcrypt from "bcryptjs";
import { AxiosResponse } from "axios";
import { IUser, IUserApiDto, IUserDto } from "../models/IUser";
import { ICipher } from "../models/IAuth";

export default class UsersService {
  static async getUsers(): Promise<AxiosResponse<IUser[]>> {
    return server.get<IUser[]>("/users");
  }

  static async register(
    username: string,
    password: string
  ): Promise<AxiosResponse<IUser>> {
    // TODO: Hashing PW
    // const hashPW = await this.hashPassword(password);
    // const hashedPassword = await bcrypt.hash(password, 5);
    // console.log("reg", hashedPassword);
    const userDto: IUserDto = {
      username,
      password,
    };

    return server.post<IUser>("/users/registration", userDto);
  }

  static async login(
    username: string,
    password: string,
    site: string
  ): Promise<AxiosResponse<any>> {
    // const hashPW = await this.hashPassword(password);
    const userDto: IUserApiDto = {
      username,
      password,
      site,
    };
    const res = server.post<any>("/api/login", userDto);
    return res;
  }

  static async logout(): Promise<void> {
    return server.post("/api/logout");
  }

  static async checkAuth(): Promise<AxiosResponse<any>> {
    return server.get<any>("/api/refresh");
  }
}
