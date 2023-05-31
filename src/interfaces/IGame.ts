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

export interface IGameSingle {
  id: number,
  name: string,
  picturePath: string,
  status: string,
  releaseDate?: string,
  description?: string,
  nsfw: boolean,
  type: string,
  rating: IRating,
  developers: IDeveloperSingle[],
  publishers: IPublisherSingle[],
  platforms: IPlatform[],
  genres: IGenre[],
  tags: ITag[],
  ageRating: IAgeRating,
  averagePlayTime: string,
  dlcs: IDLCArray[],
  systemRequirements: IRequirements[]
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

export interface IAgeRating {
  id: number,
  name: string,
  description: string | null
}

export interface IDeveloperSingle {
  id: number,
  name: string,
  description: string | null,
  picturePath: string | null,
  miniPicturePath: string | null,
}

export interface IPublisherSingle {
  id: number,
  name: string,
  description: string | null,
  picturePath: string | null,
  miniPicturePath: string | null,
}

export interface IDLC {
  id: number,
  name: string,
  picturePath: string
}

export interface IDLCArray {
  id: number,
  dlcGame: IDLC
}

export interface IRequirements {
  id: number,
  additional: string | null,
  directX: string | null,
  ethernet: null,
  hardDriveSpace: string | null,
  oc: string | null,
  processor: string | null,
  ram: string | null,
  type: string | null,
  videoCard: string | null,
}
