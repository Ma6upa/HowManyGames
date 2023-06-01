import { IDeveloper } from "./IDeveloper"
import { IAgeRating } from "./IGame"
import { IPublisher } from "./IPublisher"

export interface IFilters {
  sortBy: string[],
  status: string[],
  type: string[],
  rating: string,
  releaseYear: string,
  playTime: string,
  genres: IGenre[],
  tags: ITag[],
  platforms: IPlatform[],
  developers: IDeveloper[],
  publisbhers: IPublisher[],
  ageRatings: IAgeRating[],
  nsfw: string,
}

export interface IConsts {
  list: string[],
  type: string[],
  genders: string[],
  roles: string[],
  status: string[]
}

export interface IGenre {
  id: number,
  name: string,
  description: string
}

export interface ITag {
  id: number,
  name: string,
  description: string
}

export interface IPlatform {
  id: number,
  name: string,
  description: string
}
