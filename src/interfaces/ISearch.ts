import { IDeveloper } from "./IDeveloper";
import { IGame } from "./IGame";
import { IPublisher } from "./IPublisher";
import { IUserRole } from "./IUser";

export interface ISearch {
  games: IGame[],
  developers: IDeveloper[],
  publishers: IPublisher[],
  users: IUser[],
}

export interface IUser {
  id: number,
  email: string,
  nickname: string,
  age: number,
  gender: string,
  picturePath: string,
  registrationdDate: string,
  userRoles: IUserRole[],
}