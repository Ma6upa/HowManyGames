import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../../interfaces/IUser";

interface IUserUpdate {
  id: number,
  email: string,
  password: string,
  nickname: string,
  age: number,
  gender: string,
}

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API + '/api/User' }),
  endpoints: (build) => ({
    fetchUser: build.mutation<IUser, number>({
      query: (id) => ({
        url: `/${id}`,
      })
    }),
    updateUser: build.mutation<string, IUserUpdate>({
      query: (userData) => ({
        url: '/updateUser',
        method: 'PUT',
        headers: { Authorization: `bearer ${localStorage.getItem('token')}` },
        body: {
          id: userData.id,
          email: userData.email,
          password: userData.password,
          nickname: userData.nickname,
          age: userData.age,
          gender: userData.gender,
        }
      })
    }),
    deleteUser: build.mutation<string, number>({
      query: (id) => ({
        url: '/deleteUser',
        method: 'DELETE',
        headers: { Authorization: `bearer ${localStorage.getItem('token')}` },
        body: {
          userDelete: id
        }
      })
    })
  })
})
