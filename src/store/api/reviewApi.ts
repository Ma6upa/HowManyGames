import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IReview } from "../../interfaces/IReview";

export const reviewAPI = createApi({
  reducerPath: 'reviewAPI',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API + '/api/Review' }),
  endpoints: (build) => ({
    createReview: build.mutation<string, IReview>({
      query: (reviewData) => ({
        url: '/createReview',
        method: 'POST',
        headers: { Authorization: `bearer ${localStorage.getItem('token')}` },
        body: reviewData 
      })
    }),
  })
})
