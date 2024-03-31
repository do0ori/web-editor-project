import { UserProps } from "@/components/LoginForm";
import { httpClient } from "@/utils/https";

export const login = async (userData: UserProps) => {
    const response = await httpClient.post("/login", userData);
    return response.data;
};

export const join = async (userData: UserProps) => {
    const response = await httpClient.post("/users", userData);
    return response.data;
};