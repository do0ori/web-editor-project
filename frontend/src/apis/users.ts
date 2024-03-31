import { UserProps } from "@/components/LoginForm";
import { httpClient } from "@/utils/https";

export const requestLogin = async (userData: UserProps) => {
    const response = await httpClient.post("/login", userData);
    return response.data;
};

export const requestJoin = async (userData: UserProps) => {
    const response = await httpClient.post("/users", userData);
    return response.data;
};

export const requestLogout = async () => {
    const response = await httpClient.post("/logout");
    return response.data;
};

export const fetchCurrentUser = async () => {
    const response = await httpClient.get("/users/me");
    return response.data;
};