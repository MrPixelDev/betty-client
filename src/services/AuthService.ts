import server from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
// import * as bcrypt from "bcryptjs";
import { IUser, IUserDto } from "../models/IUser";

export default class AuthService {
  // static async hashPassword(password: string): Promise<string> {
  //   return await bcrypt.hash(password, 5);
  // }

  static async login(
    username: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    // const hashPW = await this.hashPassword(password);
    const userDto: IUserDto = {
      username,
      password,
    };
    const res = server.post<AuthResponse>("/auth/login", userDto);
    return res;
  }

  static async register(
    username: string,
    password: string
  ): Promise<AxiosResponse<IUser>> {
    // console.log(SERVER_URL);
    // const hashPW = await this.hashPassword(password);
    const userDto: IUserDto = {
      username,
      password,
    };

    return server.post("/auth/registration", userDto);
  }

  static async logout(): Promise<void> {
    return server.post("/auth/logout");
  }

  static async checkAuth(): Promise<AxiosResponse<AuthResponse>> {
    return server.get<AuthResponse>("/auth/refresh");
  }
}
