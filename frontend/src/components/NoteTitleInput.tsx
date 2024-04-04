import styled from "styled-components";
import oc from "open-color";

interface NoteTitleInputProps {
    title: string;
    onChangeTitle: (title: string) => void;
}

const NoteTitleInput = ({ title, onChangeTitle }: NoteTitleInputProps) => {
    return (
        <NoteTitleInputStyle>
            <input type="text" placeholder="제목 없음" value={title} onChange={(e) => onChangeTitle(e.target.value)} />
        </NoteTitleInputStyle>
    );
};

const NoteTitleInputStyle = styled.div`
    flex: 1;

    input {
        width: 100%;
        border: none;
        padding: 0;
        outline: none;
        font-size: 2rem;
        font-weight: bold;

        &::placeholder {
            color: ${oc.gray[6]};
        }
    }
`;

export default NoteTitleInput;