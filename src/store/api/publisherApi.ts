import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPublisher } from "../../interfaces/IPublisher";
import { IGame } from "../../interfaces/IGame";

interface IFilters {
  id: number,
  pageNumber: number,
  pageSize: number,
  minYearOfRelease: number,
  maxYearOfRelease: number,
  minPlayTime: number,
  maxPlayTime: number,
  minRating: number,
  maxRating: number,
  status: string[],
  type: string[],
  genre: string[],
  tag: string[],
  platform: string[],
  developer: string[],
  publisher: string[],
  ageRating: string,
  nsfw: boolean,
  rating: boolean,
}

export const publisherAPI = createApi({
  reducerPath: 'publisherAPI',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API + '/api/Publisher' }),
  endpoints: (build) => ({
    fetchAllPublishers: build.query<IPublisher[], any>({
      query: () => ({
        url: '/publisherAll',
      })
    }),
    fetchPublisher: build.query<IPublisher, number>({
      query: (id) => ({
        url: `/${id}`,
      })
    }),
    fetchPublisherGames: build.mutation<IGame[], IFilters>({
      query: (filters) => ({
        url: `/${filters.id}/games`,
        method: 'POST',
        body: {
          PageNumber: filters.pageNumber,
          PageSize: filters.pageSize,
          MinYearOfRelease: filters.minYearOfRelease,
          MaxYearOfRelease: filters.maxYearOfRelease,
          MinPlayTime: filters.minPlayTime,
          MaxPlayTime: filters.maxPlayTime,
          MinRating: filters.minRating,
          MaxRating: filters.maxRating,
          Status: filters.status,
          Type: filters.type,
          Genre: filters.genre,
          Tag: filters.tag,
          Platform: filters.platform,
          Developer: filters.developer,
          Publisher: filters.publisher,
          AgeRating: filters.ageRating,
          NSFW: filters.nsfw,
          Rating: filters.rating,
        }
      }),
    }),
    createPublisher: build.mutation<string, {name: string, description: string}>({
      query: (publisherData) => ({
        url: '/createPublisher',
        headers: { Authorization: `bearer ${localStorage.getItem('token')}`},
        method: 'POST',
        body: publisherData
      })
    }),
    updatePublisher: build.mutation<string, {id: number, name: string, description: string}>({
      query: (publisherData) => ({
        url: '/updatePublisher',
        headers: { Authorization: `bearer ${localStorage.getItem('token')}`},
        method: 'PUT',
        body: publisherData
      })
    }),
    deletePublisher: build.query<string, number>({
      query: (id) => ({
        url: '/deletePublisher',
        headers: { Authorization: `bearer ${localStorage.getItem('token')}`},
        params: {
          publisherDelete: id
        }
      })
    }),
  })
})
