import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IDeveloper } from "../../interfaces/IDeveloper";
import { ITag } from "../../interfaces/IFiltersConsts";

export const tagsAPI = createApi({
  reducerPath: 'tagsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API + '/api/Tag' }),
  endpoints: (build) => ({
    fetchAllTags: build.query<IDeveloper[], void>({
      query: () => ({
        url: '/tagAll',
      })
    }),
    fetchTag: build.query<ITag, number>({
      query: (id) => ({
        url: `/${id}`,
      })
    }),
    createTag: build.mutation<string, {name: string, description: string}>({
      query: (tagData) => ({
        url: '/createTag',
        headers: { Authorization: `bearer ${localStorage.getItem('token')}`},
        method: 'POST',
        body: tagData
      })
    }),
    updateTag: build.mutation<string, {id: number, name: string, description: string}>({
      query: (tagData) => ({
        url: '/updateTag',
        headers: { Authorization: `bearer ${localStorage.getItem('token')}`},
        method: 'PUT',
        body: tagData
      })
    }),
    deleteTag: build.mutation<string, number>({
      query: (id) => ({
        url: '/deleteTag',
        method: 'DELETE',
        headers: { Authorization: `bearer ${localStorage.getItem('token')}`},
        params: {
          tagDelete: id
        }
      })
    }),
  })
})
