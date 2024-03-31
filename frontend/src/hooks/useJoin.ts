import { requestJoin } from "@/apis/users";
import { UserProps } from "@/components/LoginForm";
import { useNavigate } from "react-router-dom";

export const useJoin = () => {
    const navigate = useNavigate();
    const userJoin = (data: UserProps) => {
        requestJoin(data)
            .then((res) => {
                alert("회원가입 완료");
                navigate("/login");
            })
            .catch((err) => {
                alert("회원가입 실패");
            });
    };

    return { userJoin };
};