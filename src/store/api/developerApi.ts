import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IDeveloper } from "../../interfaces/IDeveloper";

export const developerAPI = createApi({
  reducerPath: 'developerAPI',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API + '/api/Developer' }),
  endpoints: (build) => ({
    fetchAllDevelopers: build.query<IDeveloper[], any>({
      query: () => ({
        url: '/developerAll',
      })
    })
  })
})
