import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../../interfaces/IUser";

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API + '/api/User' }),
  endpoints: (build) => ({
    fetchUser: build.mutation<IUser, number>({
      query: (id) => ({
        url: `/${id}`,
      })
    })
  })
})
