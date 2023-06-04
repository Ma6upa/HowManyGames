import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IDeveloper } from "../../interfaces/IDeveloper";
import { IGenre } from "../../interfaces/IFiltersConsts";

export const genresAPI = createApi({
  reducerPath: 'genresAPI',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API + '/api/Genre' }),
  endpoints: (build) => ({
    fetchAllGenres: build.query<IDeveloper[], void>({
      query: () => ({
        url: '/genreAll',
      })
    }),
    fetchGenre: build.query<IGenre, number>({
      query: (id) => ({
        url: `/${id}`,
      })
    }),
    createGenre: build.mutation<string, {name: string, description: string}>({
      query: (genreData) => ({
        url: '/createGenre',
        headers: { Authorization: `bearer ${localStorage.getItem('token')}`},
        method: 'POST',
        body: genreData
      })
    }),
    updateGenre: build.mutation<string, {id: number, name: string, description: string}>({
      query: (genreData) => ({
        url: '/updateGenre',
        headers: { Authorization: `bearer ${localStorage.getItem('token')}`},
        method: 'PUT',
        body: genreData
      })
    }),
    deleteGenre: build.mutation<string, number>({
      query: (id) => ({
        url: '/deleteGenre',
        method: 'DELETE',
        headers: { Authorization: `bearer ${localStorage.getItem('token')}`},
        params: {
          genreDelete: id
        }
      })
    }),
  })
})
