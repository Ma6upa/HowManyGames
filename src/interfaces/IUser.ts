import { IGameSingle, IReview } from "./IGame";

export interface IUser {
  user: {
    id: number,
    email: string,
    nickname: string,
    age: number,
    gender: string,
    picturePath: string,
    registrationdDate: string,
    userRoles: IUserRole[],
  }
  favouriteGames: IGameSingle[],
  publisherStatistic: IPublisherStatistic[],
  tagStatistic: ITagStatistic[],
  developerStatistic: IDeveloperStatistic[],
  platformStatistic: IPlatformStatistic[],
  userReviews: IReview[],
}

export interface IUserRole {
  id: number,
  roleName: string,
}

export interface IPublisherStatistic {
  id: number,
  name: string,
  count: number,
}

export interface ITagStatistic {
  id: number,
  name: string,
  count: number,
}

export interface IDeveloperStatistic {
  id: number,
  name: string,
  count: number,
}

export interface IPlatformStatistic {
  id: number,
  name: string,
  color: string,
  count: number,
}
