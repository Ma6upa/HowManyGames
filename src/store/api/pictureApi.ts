import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface PictureId {
  id: number | null,
  data: FormData | null
}

export const pictureAPI = createApi({
  reducerPath: 'pictureAPI',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API + '/api/Picture' }),
  endpoints: (build) => ({
    uploadUserPic: build.mutation<string, PictureId>({
      query: (userData) => ({
        url: '/uploadUserPicture',
        method: 'PUT',
        headers: { Authorization: `bearer ${localStorage.getItem('token')}`},
        params: {
          userId: userData.id
        },
        body: userData.data
      })
    })
  })
})
