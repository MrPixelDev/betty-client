import server from "../http";
import { AxiosResponse } from "axios";
import { IUser } from "../models/IUser";

export default class UsersService {
  static async getUsers(): Promise<AxiosResponse<IUser[]>> {
    return server.get<IUser[]>("/users");
  }
}
