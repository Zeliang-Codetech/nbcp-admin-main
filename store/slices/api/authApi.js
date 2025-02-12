import { useDispatch } from "react-redux";
import { authApiSlice } from "./apiSlice";
import { QUERY_TAGS } from "../../../utils/Status";
const BASE_URL = "";
export const authApi = authApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload) => ({
        url: `${BASE_URL}/login`,
        method: "POST",
        body: payload,
        withCredentials: true,
      }),
      invalidatesTags: [QUERY_TAGS.APP],
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${BASE_URL}/logout`,
        method: "POST",
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: `${BASE_URL}`,
        method: "GET",
      }),
      providesTags: [QUERY_TAGS.APP],
    }),
    sentOtp: builder.mutation({
      query: (payload) => ({
        url: `${BASE_URL}/otp/send`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [QUERY_TAGS.APP],
    }),
    verifyOtp: builder.mutation({
      query: (payload) => ({
        url: `/otp/verify`,
        method: "POST",
        body: payload,
      }),
      // invalidatesTags: [QUERY_TAGS.APP],
    }),
    updateProfile: builder.mutation({
      query: (payload) => ({
        url: `${BASE_URL}/profile`,
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: payload,
      }),
      invalidatesTags: [QUERY_TAGS.APP],
    }),
    updateFcmToken: builder.mutation({
      query: () => ({
        url: `${BASE_URL}/fcm`,
        method: "PUT",
        body: payload,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetUserQuery,
  useSentOtpMutation,
  useVerifyOtpMutation,
  useUpdateFcmTokenMutation,
} = authApi;
