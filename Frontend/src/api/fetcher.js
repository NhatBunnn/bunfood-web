import { API_URL } from "@config/apiConfig";
import axiosClient from "./axiosClient";

export const useFetcher = () => {
  // const { getToken } = useToken();

  const fetcher = async ({ url, method = "get", params, data, signal }) => {
    try {
      // const token = await getToken();
      const token = 123;
      const response = await axiosClient({
        url,
        method,
        params,
        data,
        signal,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  };

  return { fetcher };
};
