import { useJoin } from "@/hooks/useJoin";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FormStyle, Title, UserProps } from "./LoginForm";

interface JoinProps extends UserProps {
    confirmPassword: string;
}

export const JoinForm: React.FC = () => {
    const { userJoin } = useJoin();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<JoinProps>();

    const onSubmit = ({ email, password }: JoinProps) => {
        userJoin({ email, password });
    };

    return (
        <>
            <Title>회원가입</Title>
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
                        <label htmlFor="confirm-password">비밀번호 확인</label>
                        <input id="confirm-password" type="password" inputMode="text"
                            {...register("confirmPassword", { required: true, validate: (value, formValues) => value === formValues.password })}
                        />
                        {errors.confirmPassword && <p className="error-text">비밀번호가 일치하지 않습니다.</p>}
                    </fieldset>
                    <fieldset>
                        <button type="submit">회원가입</button>
                    </fieldset>
                    <div className="info">
                        <span>계정이 이미 있으신가요? </span><Link to="/login">로그인하기</Link>
                    </div>
                </form>
            </FormStyle>
        </>
    );
};