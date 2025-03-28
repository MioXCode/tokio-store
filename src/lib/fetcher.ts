import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const fetcher = async <T = any>(
  url: string,
  options?: AxiosRequestConfig
): Promise<T> => {
  try {
    const config: AxiosRequestConfig = {
      timeout: 10000,
      ...options,
    };

    const response: AxiosResponse<T> = await axios(url, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      console.error(`API request failed: ${message}`);

      if (error.response?.status === 401) {
        console.error("Authentication required");
      } else if (error.response?.status === 404) {
        console.error("Resource not found");
      }
    } else {
      console.error("Unexpected error:", error);
    }

    throw error;
  }
};

export const typedFetcher = <T>() => {
  return (url: string, options?: AxiosRequestConfig) =>
    fetcher<T>(url, options);
};

export const createApiClient = (
  baseURL: string,
  defaultOptions?: AxiosRequestConfig
) => {
  return {
    get: <T = any>(endpoint: string, options?: AxiosRequestConfig) =>
      fetcher<T>(`${baseURL}${endpoint}`, { ...defaultOptions, ...options }),
    post: <T = any>(
      endpoint: string,
      data?: any,
      options?: AxiosRequestConfig
    ) =>
      fetcher<T>(`${baseURL}${endpoint}`, {
        ...defaultOptions,
        ...options,
        method: "POST",
        data,
      }),
    put: <T = any>(
      endpoint: string,
      data?: any,
      options?: AxiosRequestConfig
    ) =>
      fetcher<T>(`${baseURL}${endpoint}`, {
        ...defaultOptions,
        ...options,
        method: "PUT",
        data,
      }),
    delete: <T = any>(endpoint: string, options?: AxiosRequestConfig) =>
      fetcher<T>(`${baseURL}${endpoint}`, {
        ...defaultOptions,
        ...options,
        method: "DELETE",
      }),
  };
};
