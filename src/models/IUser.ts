import { ICipher } from "./IAuth";

export interface IUser {
  id: Number;
  username: string;
  password: string;
  banned: Boolean;
  banReason: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserDto {
  username: string;
  // cipherObject: ICipher;
  password: string;
}

export interface IUserApiDto {
  username: string;
  password: string;
  site: string;
}
