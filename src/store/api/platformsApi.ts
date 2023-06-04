import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IDeveloper } from "../../interfaces/IDeveloper";
import { IPlatform } from "../../interfaces/IFiltersConsts";

export const platformsAPI = createApi({
  reducerPath: 'platformsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API + '/api/Platform' }),
  endpoints: (build) => ({
    fetchAllPlatforms: build.query<IDeveloper[], void>({
      query: () => ({
        url: '/platfrormAll',
      })
    }),
    fetchPlatform: build.query<IPlatform, number>({
      query: (id) => ({
        url: `/${id}`,
      })
    }),
    createPlatform: build.mutation<string, {name: string, description: string}>({
      query: (platformData) => ({
        url: '/createPlatform',
        headers: { Authorization: `bearer ${localStorage.getItem('token')}`},
        method: 'POST',
        body: platformData
      })
    }),
    updatePlatform: build.mutation<string, {id: number, name: string, description: string}>({
      query: (platformData) => ({
        url: '/updatePlatform',
        headers: { Authorization: `bearer ${localStorage.getItem('token')}`},
        method: 'PUT',
        body: platformData
      })
    }),
    deletePlatform: build.mutation<string, number>({
      query: (id) => ({
        url: '/deletePlatform',
        method: 'DELETE',
        headers: { Authorization: `bearer ${localStorage.getItem('token')}`},
        params: {
          platfromDelete: id
        }
      })
    }),
  })
})
