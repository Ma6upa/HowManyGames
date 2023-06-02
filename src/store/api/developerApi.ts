import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IDeveloper } from "../../interfaces/IDeveloper";
import { IGame } from "../../interfaces/IGame";
import { BaseQueryMeta } from "@reduxjs/toolkit/dist/query/baseQueryTypes";

interface IFilters {
  id: number,
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

export const developerAPI = createApi({
  reducerPath: 'developerAPI',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API + '/api/Developer' }),
  endpoints: (build) => ({
    fetchAllDevelopers: build.query<IDeveloper[], any>({
      query: () => ({
        url: '/developerAll',
      })
    }),
    fetchDeveloper: build.query<IDeveloper, number>({
      query: (id) => ({
        url: `/${id}`,
      })
    }),
    fetchDeveloperGames: build.mutation<IGame[], IFilters>({
      query: (filters) => ({
        url: `/${filters.id}/games`,
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
      }),
    }),
  })
})
