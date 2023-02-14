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
  password: string;
}
