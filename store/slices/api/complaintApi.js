import { useDispatch } from "react-redux";
import { apiSlice } from "./apiSlice";
import { QUERY_TAGS } from "../../../utils/Status";
const BASE_URL = "/complaint";
export const complaintApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addComplaint: builder.mutation({
      query: (payload) => ({
        url: `${BASE_URL}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [QUERY_TAGS.COMPLAINT],
    }),
    updateComplaint: builder.mutation({
      query: (payload) => ({
        url: `${BASE_URL}/${payload._id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: [QUERY_TAGS.COMPLAINT],
    }),
    // Add new mutation for updating complaint status
    updateComplaintStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `${BASE_URL}/${id}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: [QUERY_TAGS.COMPLAINT],
    }),
    getComplaints: builder.query({
      query: () => ({
        url: `${BASE_URL}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: [QUERY_TAGS.COMPLAINT],
    }),
    getComplaint: builder.query({
      query: (id) => ({
        url: `${BASE_URL}/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: [QUERY_TAGS.COMPLAINT],
    }),
    deleteComplaint: builder.mutation({
      query: (id) => ({
        url: `${BASE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [QUERY_TAGS.COMPLAINT],
    }),
  }),
});

export const {
  useAddComplaintMutation,
  useUpdateComplaintMutation,
  useDeleteComplaintMutation,
  useGetComplaintQuery,
  useGetComplaintsQuery,
  useUpdateComplaintStatusMutation, // Export the new mutation hook
} = complaintApi;
