import { fetchCurrentUser, requestJoin, requestLogin, requestLogout } from "@/apis/auth.api";
import { User } from "@/components/LoginForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import to from "await-to-js";
import { isAxiosError } from "axios";
import { StatusCodes } from "http-status-codes";
import { useNavigate } from "react-router-dom";

export const useCurrentUser = () => {
    const { data } = useQuery({
        queryKey: ["currentUser"],
        queryFn: async () => {
            const [error, data] = await to(fetchCurrentUser());

            if (isAxiosError(error) && error.response?.status === StatusCodes.UNAUTHORIZED) {
                return null;
            }

            if (error) {
                throw error;
            }

            return data;
        }
    });

    return { currentUser: data };
};

export const useJoin = () => {
    const navigate = useNavigate();

    const { mutateAsync } = useMutation({
        mutationFn: async (userData: User) => {
            const [error] = await to(requestJoin(userData));

            if (isAxiosError(error) && error.response?.status === StatusCodes.CONFLICT) {
                alert("이미 가입된 이메일입니다.");
                return null;
            }

            if (error) {
                throw error;
            }

            alert("회원가입이 완료되었습니다.");
            navigate("/login");
        }
    });

    return { join: mutateAsync };
};

export const useLogin = () => {
    const queryClient = useQueryClient();

    const { mutateAsync } = useMutation({
        mutationFn: async (userData: User) => {
            const [error] = await to(requestLogin(userData));

            if (isAxiosError(error) && error.response?.status === StatusCodes.UNAUTHORIZED) {
                alert("로그인에 실패했습니다.");
                return null;
            }

            if (error) {
                throw error;
            }

            await queryClient.invalidateQueries({ queryKey: ["currentUser"] })
        }
    });

    return { login: mutateAsync };
};

export const useLogout = () => {
    const queryClient = useQueryClient();

    const { mutateAsync } = useMutation({
        mutationFn: requestLogout,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["currentUser"] })
    });

    return { logout: mutateAsync };
};