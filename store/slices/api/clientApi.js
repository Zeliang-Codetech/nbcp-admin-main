import { useDispatch } from "react-redux";
import { apiSlice } from "./apiSlice";
import { QUERY_TAGS } from "../../../utils/Status";
const BASE_URL = `/client`;
export const clientApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addClient: builder.mutation({
      query: (payload) => ({
        url: `${BASE_URL}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [QUERY_TAGS.CLIENT],
    }),
    getClient: builder.query({
      query: (id) => ({
        url: `${BASE_URL}/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response.data;
      },
      providesTags: [QUERY_TAGS.CLIENT],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {},
    }),
    updateClient: builder.mutation({
      query: (payload) => ({
        url: `${BASE_URL}/${payload._id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: [QUERY_TAGS.CLIENT],
    }),
    getClients: builder.query({
      query: () => ({
        url: `${BASE_URL}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: [QUERY_TAGS.CLIENT],
    }),
    deleteClient: builder.mutation({
      query: (id) => ({
        url: `${BASE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [QUERY_TAGS.CLIENT],
    }),
  }),
});

export const {
  useAddClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
  useGetClientsQuery,
  useGetClientQuery,
} = clientApi;
