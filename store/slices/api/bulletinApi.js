import { apiSlice } from "./apiSlice";
import { QUERY_TAGS } from "../../../utils/Status";

const BASE_URL = `/bulletin`;

export const bulletinApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBulletins: builder.query({
      query: () => ({
        url: `${BASE_URL}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: [QUERY_TAGS.BULLETIN],
    }),
    getBulletin: builder.query({
      query: (id) => ({
        url: `${BASE_URL}/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: [QUERY_TAGS.BULLETIN],
    }),
    addBulletin: builder.mutation({
      query: (payload) => ({
        url: `${BASE_URL}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [QUERY_TAGS.BULLETIN],
    }),
    updateBulletin: builder.mutation({
      query: (payload) => ({
        url: `${BASE_URL}/${payload._id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: [QUERY_TAGS.BULLETIN],
    }),
    deleteBulletin: builder.mutation({
      query: (id) => ({
        url: `${BASE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [QUERY_TAGS.BULLETIN],
    }),
  }),
});

export const {
  useGetBulletinsQuery,
  useGetBulletinQuery,
  useAddBulletinMutation,
  useUpdateBulletinMutation,
  useDeleteBulletinMutation,
} = bulletinApi;