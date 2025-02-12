import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import axios from "axios";
axios.defaults.withCredentials = true;
import { QUERY_TAGS } from "./../../../utils/Status";
const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, body: data, params }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data, params });
      return { data: result.data };
    } catch (err) {
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/v1`,
  }),
  // refetchOnMountOrArgChange: 30,
  // refetchOnReconnect: true,
  // keepUnusedDataFor: 30,
  tagTypes: [
    QUERY_TAGS.APP,
    QUERY_TAGS.USER,
    QUERY_TAGS.CLIENT,
    QUERY_TAGS.CATEGORY,
    QUERY_TAGS.CITY,
  ],
  endpoints: (builder) => ({}),
});

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/admin`,
  }),
  tagTypes: [QUERY_TAGS.APP],
  endpoints: (builder) => ({}),
});
