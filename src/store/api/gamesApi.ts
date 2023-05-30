import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IGame } from '../../interfaces/IGame'

interface IFilters {
  PageSize: number,
  PageNumber: number,
  MinYearOfRelease: number | null,
  MinPlayTime: number | null,
  MaxPlayTime: number | null,
  MinRating: number | null,
  MaxRating: number | null,
  Status: string[] | null,
  Type: string[] | null,
  Genre: string[] | null,
  Tag: string[] | null,
  Platform: string[] | null,
  Developer: string[] | null,
  Publisher: string[] | null,
  AgeRating: string | null,
  NSFW: boolean,
  Rating: boolean,
}

export const gamesAPI = createApi({
  reducerPath: 'gamesAPI',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API + '/api/Game' }),
  endpoints: (build) => ({
    fetchAllGames: build.query<IGame[], IFilters>({
      query: (filters: IFilters) => ({
        url: '/games',
        params: {
          PageNumber: filters.PageNumber,
          PageSize: filters.PageSize,
          MinYearOfRelease: filters.MinYearOfRelease,
          MinPlayTime: filters.MinPlayTime,
          MaxPlayTime: filters.MaxPlayTime,
          MinRating: filters.MinRating,
          MaxRating: filters.MaxRating,
          Status: filters.Status,
          Type: filters.Type,
          Genre: filters.Genre,
          Tag: filters.Tag,
          Platform: filters.Platform,
          Developer: filters.Developer,
          Publisher: filters.Publisher,
          AgeRating: filters.AgeRating,
          NSFW: filters.NSFW,
          Rating: filters.Rating,
        }
      })
    })
  })
})