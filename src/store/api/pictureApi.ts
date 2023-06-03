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
    }),
    uploadDeveloperPicture: build.mutation<string, PictureId>({
      query: (developerData) => ({
        url: '/uploadDeveloperPicture',
        method: 'PUT',
        headers: { Authorization: `bearer ${localStorage.getItem('token')}`},
        params: {
          userId: developerData.id
        },
        body: developerData.data
      })
    }),
    uploadDeveloperMiniPicture: build.mutation<string, PictureId>({
      query: (developerData) => ({
        url: '/uploadDeveloperMiniPicture',
        method: 'PUT',
        headers: { Authorization: `bearer ${localStorage.getItem('token')}`},
        params: {
          userId: developerData.id
        },
        body: developerData.data
      })
    }),
    uploadPublisherPicture: build.mutation<string, PictureId>({
      query: (publisherData) => ({
        url: '/uploadPublisherPicture',
        method: 'PUT',
        headers: { Authorization: `bearer ${localStorage.getItem('token')}`},
        params: {
          userId: publisherData.id
        },
        body: publisherData.data
      })
    }),
    uploadPublisherMiniPicture: build.mutation<string, PictureId>({
      query: (publisherData) => ({
        url: '/uploadPublisherMiniPicture',
        method: 'PUT',
        headers: { Authorization: `bearer ${localStorage.getItem('token')}`},
        params: {
          userId: publisherData.id
        },
        body: publisherData.data
      })
    }),
  })
})
