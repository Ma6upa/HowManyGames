export interface IGame {
  id: number,
  name: string,
  picturePath: string,
  status: string,
  releaseDate?: string,
  description?: string,
  nsfw: boolean,
  type: string,
  rating: IRating,
  developers: IDeveloper[],
  publishers: IPublisher[],
  platforms: IPlatform[],
  genres: IGenre[],
  tags: ITag[],
}

export interface IRating {
  id: number,
  totalRating: number,
  numberOfOne: number,
  numberOfTwo: number,
  numberOfThree: number,
  numberOfFour: number,
  numberOfFive: number,
  numberOfSix: number,
  numberOfSeven: number,
  numberOfEight: number,
  numberOfNinve: number,
  numberOfTen: number,
}

export interface IDeveloper {
  id: number,
  name: string
}

export interface IPublisher {
  id: number,
  name: string
}

export interface IPlatform {
  id: number,
  name: string
}

export interface IGenre {
  id: number,
  name: string
}

export interface ITag {
  id: number,
  name: string
}
