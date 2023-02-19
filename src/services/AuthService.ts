import server from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { IUserAuthDto } from "../models/IUser";

export default class AuthService {
  static async login(
    userAuthDto: IUserAuthDto
  ): Promise<AxiosResponse<AuthResponse>> {
    // const hashPW = await this.hashPassword(password);
    // const hashedPassword = await bcrypt.hash(password, 5);
    // console.log("login", hashedPassword);
    // const userAuthDto: IUserAuthDto = {
    //   username,
    //   password,
    // };
    const res = server.post<AuthResponse>("/auth/login", userAuthDto);
    return res;
  }

  static async logout(): Promise<void> {
    return server.post("/auth/logout");
  }

  static async checkAuth(): Promise<AxiosResponse<AuthResponse>> {
    return server.get<AuthResponse>("/auth/refresh");
  }
}
