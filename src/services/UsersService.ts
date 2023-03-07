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
    return server.post<IUser>("/users/registration", userAuthDto);
  }
}
