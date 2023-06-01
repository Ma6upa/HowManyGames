import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGameSingle } from "../../interfaces/IGame";

export const GlobalStatisticAPI = createApi({
  reducerPath: 'GlobalStatisticAPI',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API + '/api/GlobalStatistic' }),
  endpoints: (build) => ({
    fetchMostRatedGame: build.query<IGameSingle, any>({
      query: (id) => ({
        url: '/mostRatedGame',
      })
    }),
    fetchMostRatedDLC: build.query<IGameSingle, number>({
      query: (id) => ({
        url: '/mostRatedDLC',
      })
    })
  })
})
