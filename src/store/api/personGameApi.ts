import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPersonGame } from "../../interfaces/IGame";
import { IPlatform } from "../../interfaces/IFiltersConsts";

interface IPersonGameBody {
  personGameData: {
    id: string,
    score: number,
    comment: string,
    list: string,
    playedPlatform: IPlatform,
    favourite: boolean
  }
}

export const personGameAPI = createApi({
  reducerPath: 'personGameAPI',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API + '/api/PersonGame' }),
  endpoints: (build) => ({
    userHaveThisPersonGame: build.mutation<string, { userId: number, gameId: number }>({
      query: ({ userId, gameId }) => ({
        url: '/userHaveThisPersonGame',
        method: 'GET',
        headers: { Authorization: `bearer ${localStorage.getItem('token')}` },
        params: {
          userId,
          gameId
        }
      })
    }),
    fetchPersonGames: build.mutation<IPersonGame[], { userId: number, list: string }>({
      query: ({ userId, list }) => ({
        url: `/${userId}/persongamesbylist`,
        method: 'GET',
        headers: { Authorization: `bearer ${localStorage.getItem('token')}` },
        params: {
          list
        }
      })
    }),
    updatePersonGame: build.mutation<any, IPersonGameBody>({
      query: ( personGameData ) => ({
        url: `/updatePersonGame`,
        method: 'PUT',
        headers: { Authorization: `bearer ${localStorage.getItem('token')}` },
        body: personGameData
      })
    }),
    deletePersonGame: build.mutation<string, string>({
      query: (id) => ({
        url: '/deletePersonGame',
        method: 'DELETE',
        headers: { Authorization: `bearer ${localStorage.getItem('token')}`},
        params: {
          personGameDelete: id
        }
      })
    }),
  })
})
