import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7285/api'
  }),
  // Tag types are used for caching and invalidation.
  tagTypes: ['Friend', 'Category'],
  endpoints: (build) => ({
    getFriends: build.query({
      query: () => '/Friends',
      providesTags: (result = []) => [
        'Friend',
        ...result.map(({ id }) => ({ type: 'Friend', id }))
      ],
      transformResponse: (response) => {
        return response.sort((a, b) => a.name.localeCompare(b.name));
      }
    }),
    addNewFriend: build.mutation({
      query: (newFriend) => ({
        url: '/Friends',
        method: 'POST',
        body: newFriend
      }),
      invalidatesTags: ['Friend'],
      onQueryStarted(arg, api) {
        console.log(arg);
      }
    }),
    getCategories: build.query({
      query: () => '/Categories',
      providesTags: (result = []) => [
        'Category',
        ...result.map(({ id }) => ({ type: 'Category', id }))
      ]
    })
  })
});

export const {
  useGetFriendsQuery,
  useAddNewFriendMutation,
  useGetCategoriesQuery
} = apiSlice;
