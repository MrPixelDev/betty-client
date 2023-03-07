export interface IUser {
  userId: number;
  username: string;
  role: string;
  banned: Boolean;
  banReason: string;
}

export type TUser = {
  userId: number;
  username: string;
  banned: Boolean;
  banReason: string;
};

export interface IUserAuthDto {
  username: string;
  password: string;
}

export interface IUserRegisterDto {
  username: string;
  password: string;
  role: string;
}

export interface IUserApiDto {
  userId: number;
  username: string;
  password: string;
  site: string;
}

export enum RolesEnum {
  ADMIN = "admin",
  OPERATOR = "operator",
  USER = "user",
}
