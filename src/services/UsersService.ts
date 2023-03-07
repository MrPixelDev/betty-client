import server from "../http";
import { AxiosResponse } from "axios";
import { IUser, IUserRegisterDto } from "../models/IUser";
import { ICipher } from "../models/IAuth";

export default class UsersService {
  static async getUsers(): Promise<AxiosResponse<IUser[]>> {
    return server.get<IUser[]>("/users");
  }

  static async register(
    userRegisterDto: IUserRegisterDto
  ): Promise<AxiosResponse<IUser>> {
    return server.post<IUser>("/users/registration", userRegisterDto);
  }
}
