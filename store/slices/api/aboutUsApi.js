import { apiSlice } from "./apiSlice";
import { QUERY_TAGS } from "../../../utils/Status";

const BASE_URL = `/about-us`;

export const aboutUsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAboutUs: builder.query({
      query: () => ({
        url: `${BASE_URL}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: [QUERY_TAGS.ABOUT_US],
    }),
    updateAboutUs: builder.mutation({
      query: (payload) => ({
        url: `${BASE_URL}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: [QUERY_TAGS.ABOUT_US],
    }),
  }),
});

export const { useGetAboutUsQuery, useUpdateAboutUsMutation } = aboutUsApi;