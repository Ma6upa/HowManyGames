import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGameSingle } from "../../interfaces/IGame";
import { IConsts, IFilters } from "../../interfaces/IFiltersConsts";

export const FiltersAndConstsAPI = createApi({
  reducerPath: 'FiltersAndConstsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API + '/api/FilterAndConsts' }),
  endpoints: (build) => ({
    fetchFilters: build.query<IFilters, any>({
      query: (id) => ({
        url: '/filter',
      })
    }),
    fetchConsts: build.query<IConsts, any>({
      query: (id) => ({
        url: '/consts',
      })
    }),
  })
})
