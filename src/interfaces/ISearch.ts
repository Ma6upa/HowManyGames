import { IDeveloper } from "./IDeveloper";
import { IGame } from "./IGame";
import { IPublisher } from "./IPublisher";

export interface ISearch {
  games: IGame[],
  developers: IDeveloper[],
  publishers: IPublisher[],
  users: any[],
}