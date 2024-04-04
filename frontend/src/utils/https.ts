import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = "http://localhost:3031/api";
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        timeout: DEFAULT_TIMEOUT,
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
        ...config
    });

    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response.status >= 500) {
                window.location.href = "/error";
                return;
            }

            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export const httpClient = createClient();