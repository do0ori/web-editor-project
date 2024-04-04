import styled from "styled-components";
import { BiSolidError } from "react-icons/bi";
import oc from "open-color";
import { Title } from "@/components/LoginForm";

const ErrorPage: React.FC = () => {
    return (
        <ErrorStyle>
            <BiSolidError />
            <Title>오류가 발생했습니다.</Title>
            <p>잠시 후 다시 시도해주세요.</p>
            <RefreshBtn onClick={() => window.location.reload()}>새로고침</RefreshBtn>
        </ErrorStyle>
    );
};

const ErrorStyle = styled.div`
    margin: 20vh 0;
    text-align: center;

    svg {
        color: orange;
        font-size: 100px;
    }

    button {
        margin: 20px 0;
    }
`;

const RefreshBtn = styled.button`
    padding: 5px 10px;
    border-radius: 5px;
    border: 1px solid ${oc.gray[5]};
    cursor: pointer;
`;

export default ErrorPage;