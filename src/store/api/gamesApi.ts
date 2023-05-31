import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IGame, IGameSingle, IReview } from '../../interfaces/IGame'

interface IFilters {
  pageNumber: number,
  pageSize: number,
  minYearOfRelease: number,
  maxYearOfRelease: number,
  minPlayTime: number,
  maxPlayTime: number,
  minRating: number,
  maxRating: number,
  status: string[],
  type: string[],
  genre: string[],
  tag: string[],
  platform: string[],
  developer: string[],
  publisher: string[],
  ageRating: string,
  nsfw: boolean,
  rating: boolean,
}

export const gamesAPI = createApi({
  reducerPath: 'gamesAPI',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API + '/api/Game' }),
  endpoints: (build) => ({
    getAllGames: build.mutation<IGame[], IFilters>({
      query: (filters) => ({
        url: '/games',
        method: 'POST',
        body: {
          PageNumber: filters.pageNumber,
          PageSize: filters.pageSize,
          MinYearOfRelease: filters.minYearOfRelease,
          MaxYearOfRelease: filters.maxYearOfRelease,
          MinPlayTime: filters.minPlayTime,
          MaxPlayTime: filters.maxPlayTime,
          MinRating: filters.minRating,
          MaxRating: filters.maxRating,
          Status: filters.status,
          Type: filters.type,
          Genre: filters.genre,
          Tag: filters.tag,
          Platform: filters.platform,
          Developer: filters.developer,
          Publisher: filters.publisher,
          AgeRating: filters.ageRating,
          NSFW: filters.nsfw,
          Rating: filters.rating,
        }
      })
    }),
    getGame: build.query<IGameSingle, number>({
      query: (id) => ({
        url: `/${id}`,
      })
    }),
    getGameReviews: build.query<IReview[], number>({
      query: (id) => ({
        url: `/${id}/review`,
      })
    })
  })
})