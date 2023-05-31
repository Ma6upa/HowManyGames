import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ILoginData, IRegistrationData } from '../../interfaces/ILoginReg'

export const authRegAPI = createApi({
  reducerPath: 'authRegAPI',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API }),
  endpoints: (build) => ({
    login: build.mutation<string, ILoginData>({
      query: (userData) => ({
        url: '/login',
        method: 'POST',
        body: {
          nickname: userData.nickname,
          password: userData.password
        }
      })
    }),
    registration: build.mutation<string, IRegistrationData>({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: {
          email: userData.email,
          nickname: userData.nickname,
          password: userData.password,
          age: userData.age,
          gender: userData.gender
        }
      })
    })
  })
})