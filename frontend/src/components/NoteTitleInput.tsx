import styled from "styled-components";
import oc from "open-color";

interface NoteTitleInputProps {
    title: string;
    onChangeTitle: (title: string) => void;
}

const NoteTitleInput = ({ title, onChangeTitle }: NoteTitleInputProps) => {
    return (
        <NoteTitleInputStyle
            contentEditable
            placeholder="제목 없음"
            onKeyDown={(e) => { if (e.key === "Enter") e.preventDefault() }}
            onBlur={(e) => onChangeTitle(e.target.textContent || "")}
            dangerouslySetInnerHTML={{ __html: title }}
        />
    );
};

interface NoteTitleInputStyleProps {
    placeholder: string;
}

const NoteTitleInputStyle = styled.h1<NoteTitleInputStyleProps>`
    width: 100%;
    border: none;
    padding: 0;
    outline: none;
    margin: 0;

    &:empty:before {
        content: attr(placeholder);
        color: ${oc.gray[6]};
    }
`;

export default NoteTitleInput;