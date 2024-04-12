import { API_BASE_URL } from "@/settings";
import axios, { AxiosRequestConfig } from "axios";

export const createClient = (config?: AxiosRequestConfig) => {
    const axiosInstance = axios.create({
        baseURL: API_BASE_URL,
        timeout: parseInt(process.env.REACT_APP_DEFAULT_TIMEOUT!),
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