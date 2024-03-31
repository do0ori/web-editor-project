import { useLogin } from "@/hooks/useLogin";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import oc from "open-color";

export interface UserProps {
    email: string;
    password: string;
}

export const LoginForm: React.FC = () => {
    const { userLogin } = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<UserProps>();

    const onSubmit = (data: UserProps) => {
        userLogin(data);
    };

    return (
        <>
            <Title>로그인</Title>
            <FormStyle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset>
                        <label htmlFor="email">이메일</label>
                        <input id="email" type="email" inputMode="email" {...register("email", { required: true })} />
                        {errors.email && <p className="error-text">이메일을 입력해주세요.</p>}
                    </fieldset>
                    <fieldset>
                        <label htmlFor="password">비밀번호</label>
                        <input id="password" type="password" inputMode="text" {...register("password", { required: true })} />
                        {errors.password && <p className="error-text">비밀번호를 입력해주세요.</p>}
                    </fieldset>
                    <fieldset>
                        <button type="submit">로그인</button>
                    </fieldset>
                    <div className="info">
                        <span>계정이 없으신가요? </span><Link to="/join">가입하기</Link>
                    </div>
                </form>
            </FormStyle>
        </>
    );
};

export const Title = styled.h1`
    margin: 20vh 0 50px 0;
    font-size: 2.5rem;
    text-align: center;
`;

export const FormStyle = styled.div`
    max-width: 25rem;
    margin: 0 auto;

    fieldset {
        margin: 0 10px;
        border: 0;
        padding: 0 0 10px 0;
        .error-text {
            color: red;
            margin: 0;
            font-size: 0.8rem;
        }
    }

    input {
        width: 100%;
        border-radius: 5px;
        border: 1px solid ${oc.gray[5]};
    }
    
    button {
        margin: 10px 0 0 0;
        width: 100%;
        border-radius: 5px;
        color: ${oc.blue[6]};
        background-color: ${oc.blue[1]};
        border: 1px solid ${oc.blue[3]};
        cursor: pointer;
    }

    .info {
        text-align: center;
        padding: 16px 0 0 0;

        a {
            color: ${oc.blue[6]};
        }
    }
`;