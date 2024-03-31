import { login } from "@/apis/users";
import { UserProps } from "@/components/LoginForm";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const navigate = useNavigate();
    const userLogin = (data: UserProps) => {
        login(data)
            .then((res) => {
                alert("로그인 완료");
                navigate("/notes");
            })
            .catch((err) => {
                alert("로그인 실패");
            });
    };

    return { userLogin };
};