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
    addFriend: build.mutation({
      query: (newFriend) => ({
        url: '/Friends',
        method: 'POST',
        body: newFriend
      }),
      invalidatesTags: ['Friend']
    }),
    editFriend: build.mutation({
      query: (friend) => ({
        url: `/Friends/${friend.id}`,
        method: 'PUT',
        body: friend
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Friend', id: arg.id }]
    }),
    getCategories: build.query({
      query: () => '/Categories',
      providesTags: (result = []) => [
        'Category',
        ...result.map(({ id }) => ({ type: 'Category', id }))
      ]
    }),
    addCategory: build.mutation({
      query: (newCategory) => ({
        url: '/Categories',
        method: 'POST',
        body: newCategory
      }),
      invalidatesTags: ['Category']
    })
  })
});

export const {
  useGetFriendsQuery,
  useAddFriendMutation,
  useEditFriendMutation,
  useGetCategoriesQuery,
  useAddCategoryMutation
} = apiSlice;
