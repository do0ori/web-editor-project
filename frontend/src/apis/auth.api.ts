import { User } from "@/components/LoginForm";
import { httpClient } from "@/utils/https";

export const requestLogin = async (userData: User) => {
    const response = await httpClient.post("/login", userData);
    return response.data;
};

export const requestJoin = async (userData: User) => {
    const response = await httpClient.post("/users", userData);
    return response.data;
};

export const requestLogout = async () => {
    const response = await httpClient.post("/logout");
    return response.data;
};

export interface CurrentUserResponse {
    email: string;
}

export const fetchCurrentUser = async () => {
    const response = await httpClient.get<CurrentUserResponse>("/users/me");
    return response.data;
};