import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const personGameAPI = createApi({
  reducerPath: 'personGameAPI',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API + '/api/PersonGame' }),
  endpoints: (build) => ({
    userHaveThisPersonGame: build.mutation<string, {userId: number, gameId: number}>({
      query: ({userId, gameId}) => ({
        url: '/userHaveThisPersonGame',
        method: 'GET',
        headers: { Authorization: `bearer ${localStorage.getItem('token')}` },
        params: {
          userId,
          gameId
        }
      })
    }),
  })
})
