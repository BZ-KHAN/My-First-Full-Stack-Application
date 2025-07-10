import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "PostApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (build) => ({
    addPost: build.mutation({
      query: (newPost) => ({
        url: "posts",
        method: "POST",
        body: newPost,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    updatePost: build.mutation({
      query: ({ id, ...updatedPost }) => ({
        url: `posts/${id}`,
        method: "PUT",
        body: updatedPost,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    deletePost: build.mutation({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useAddPostMutation, useUpdatePostMutation, useDeletePostMutation } = postApi;
