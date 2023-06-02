import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISearch } from "../../interfaces/ISearch";

export const searchAPI = createApi({
  reducerPath: 'searchAPI',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API + '/api' }),
  endpoints: (build) => ({
    fetchAutocomplete: build.mutation<ISearch, string>({
      query: (input) => ({
        url: '/Search',
        method: 'GET',
        params: {
          searchString: input
        }
      })
    })
  })
})
