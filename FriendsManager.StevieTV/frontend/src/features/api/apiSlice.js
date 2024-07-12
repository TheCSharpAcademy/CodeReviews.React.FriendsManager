import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "https://localhost:7285/api" 
  }),
  // Tag types are used for caching and invalidation.
  tagTypes: ['Friend'],
  endpoints: (build) => ({
    getFriends: build.query({
      query: () => '/Friends',
      providesTags: (result = []) => [
        'Friend',
        ...result.map(({ id }) => ({ type: 'Friend', id }))
      ]
    }),
  }),
})

export const { 
  useGetFriendsQuery
} = apiSlice
