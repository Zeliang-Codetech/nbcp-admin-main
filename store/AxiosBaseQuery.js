import axios from "axios";
const AxiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, body: data, params }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        timeout: 10000, // Set a reasonable timeout in milliseconds
        // You can add more request-specific configuration here
      });
      return { data: result.data };
    } catch (error) {
      console.error("Request failed:", error);

      let status = null;
      let errorMessage = "Request failed";

      if (error.response) {
        // The request was made, but the server responded with a non-2xx status
        status = error.response.status;
        errorMessage = error.response.data || "Server error";
      } else if (error.request) {
        // The request was made, but no response was received (e.g., network issue)
        errorMessage = "No response received from server";
      } else {
        // Something else happened while setting up the request
        errorMessage = error.message || "Request error";
      }

      return {
        error: {
          status,
          message: errorMessage,
        },
      };
    }
  };

export default AxiosBaseQuery;

// Request interceptor example
axios.interceptors.request.use(
  (config) => {
    // Modify request config here (e.g., add authentication headers)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Response interceptor example
axios.interceptors.response.use(
  (response) => {
    // Modify response data here (e.g., handle pagination)
    return response;
  },
  (error) => {
    // Handle common error cases here (e.g., token expiration)
    return Promise.reject(error);
  }
);
