import server from "../http";
import { AxiosResponse } from "axios";
import { IUser, IUserDto } from "../models/IUser";

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
    const userDto: IUserDto = {
      username,
      password,
    };

    return server.post<IUser>("/users/registration", userDto);
  }
}
