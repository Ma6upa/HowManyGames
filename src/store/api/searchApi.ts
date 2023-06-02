import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGameSingle } from "../../interfaces/IGame";

export const searchAPI = createApi({
  reducerPath: 'searchAPI',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API + '/api' }),
  endpoints: (build) => ({
    fetchAutocomplete: build.query<IGameSingle, string>({
      query: (input) => ({
        url: '/Search',
        params: {
          searchString: input
        }
      })
    })
  })
})
