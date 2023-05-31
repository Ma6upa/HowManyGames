import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPublisher } from "../../interfaces/IPublisher";

export const publisherAPI = createApi({
  reducerPath: 'publisherAPI',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API + '/api/Publisher' }),
  endpoints: (build) => ({
    fetchAllPublishers: build.query<IPublisher[], any>({
      query: () => ({
        url: '/publisherAll',
      })
    })
  })
})
