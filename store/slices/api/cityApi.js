import { useDispatch } from "react-redux";
import { apiSlice } from "./apiSlice";
import { QUERY_TAGS } from "../../../utils/Status";
const BASE_URL = `/master/city`;
export const cityApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCity: builder.mutation({
      query: (payload) => ({
        url: `${BASE_URL}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [QUERY_TAGS.CITY],
    }),
    getCity: builder.query({
      query: (id) => ({
        url: `${BASE_URL}/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response.data;
      },
      providesTags: [QUERY_TAGS.CITY],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {},
    }),
    updateCity: builder.mutation({
      query: (payload) => ({
        url: `${BASE_URL}/${payload._id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: [QUERY_TAGS.CITY],
    }),
    getCities: builder.query({
      query: () => ({
        url: `${BASE_URL}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: [QUERY_TAGS.CITY],
    }),
    deleteCity: builder.mutation({
      query: (id) => ({
        url: `${BASE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [QUERY_TAGS.CITY],
    }),
    addArea: builder.mutation({
      query: (payload) => ({
        url: `${BASE_URL}/area`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [QUERY_TAGS.CITY],
    }),
    updateArea: builder.mutation({
      query: (payload) => ({
        url: `${BASE_URL}/area/${payload._id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: [QUERY_TAGS.CITY],
    }),
    deleteArea: builder.mutation({
      query: (id) => ({
        url: `${BASE_URL}/area/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [QUERY_TAGS.CITY],
    }),
  }),
});

export const {
  useAddCityMutation,
  useUpdateCityMutation,
  useDeleteCityMutation,
  useGetCitiesQuery,
  useGetCityQuery,
  useAddAreaMutation,
  useUpdateAreaMutation,
  useDeleteAreaMutation,
} = cityApi;
