import { apiSlice } from "./apiSlice";
import { QUERY_TAGS } from "../../../utils/Status";

const BASE_URL = `/help-support`;

export const helpSupportApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHelpSupport: builder.query({
      query: () => ({
        url: `${BASE_URL}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: [QUERY_TAGS.HELP_SUPPORT],
    }),
    updateHelpSupport: builder.mutation({
      query: (payload) => ({
        url: `${BASE_URL}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: [QUERY_TAGS.HELP_SUPPORT],
    }),
  }),
});

export const { useGetHelpSupportQuery, useUpdateHelpSupportMutation } = helpSupportApi;