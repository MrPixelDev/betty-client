import server from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import * as bcrypt from "bcryptjs";
import { IUserDto } from "../models/IUser";
import { ICipher } from "../models/IAuth";

export default class AuthService {
  static async login(
    username: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    // const hashPW = await this.hashPassword(password);
    // const hashedPassword = await bcrypt.hash(password, 5);
    // console.log("login", hashedPassword);
    const userDto: IUserDto = {
      username,
      password,
    };
    const res = server.post<AuthResponse>("/auth/login", userDto);
    return res;
  }

  static async logout(): Promise<void> {
    return server.post("/auth/logout");
  }

  static async checkAuth(): Promise<AxiosResponse<AuthResponse>> {
    return server.get<AuthResponse>("/auth/refresh");
  }
}
