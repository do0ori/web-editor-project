import NoteContentEditor from "@/components/NoteContentEditor";
import NoteTitleInput from "@/components/NoteTitleInput";
import withCurrentNote, { WithCurrentNoteProps } from "@/components/hocs/withCurrentNote";
import styled from "styled-components";
import oc from "open-color";
import { FaRegFloppyDisk, FaRegTrashCan } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useDeleteNote, useUpdateNote } from "@/hooks/useNote";
import { useNavigate } from "react-router-dom";

const NoteDetailPage: React.FC<WithCurrentNoteProps> = ({ currentNote }) => {
    const id = currentNote.id;
    const [title, setTitle] = useState(currentNote.title);
    const [content, setContent] = useState(currentNote.content);

    const { update } = useUpdateNote();
    const { remove } = useDeleteNote();

    const navigate = useNavigate();

    const onSave = async () => {
        await update({ id, title, content });
        alert("저장되었습니다.");
    };

    const onDelete = async () => {
        await remove(id);
        navigate("/notes");
    };

    useEffect(() => {
        setTitle(currentNote.title);
        setContent(currentNote.content);
    }, [currentNote]);

    return (
        <DetailStyle>
            <Header>
                <div className="title">
                    <NoteTitleInput title={title} onChangeTitle={setTitle} />
                </div>
                <div className="detail-buttons">
                    <DetailButton onClick={onSave}>
                        <FaRegFloppyDisk />
                        <p>저장</p>
                    </DetailButton>
                    <DetailButton onClick={onDelete}>
                        <FaRegTrashCan />
                        <p>삭제</p>
                    </DetailButton>
                </div>
            </Header>
            <NoteContentEditor content={content} onChangeContent={setContent} />
        </DetailStyle>
    );
};

const DetailStyle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 100%;
`;

const Header = styled.header`
    display: flex;
    gap: 30px;

    .title {
        flex: 1;
    }

    .detail-buttons {
        flex-shrink: 0;
        display: flex;
        gap: 10px;
    }
`;

const DetailButton = styled.button`
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: bold;
    color: ${oc.gray[7]};
    border: 1px solid ${oc.gray[3]};
    border-radius: 5px;
    padding: 5px 10px;
    width: fit-content;
    height: fit-content;
    cursor: pointer;
`;

export default withCurrentNote(NoteDetailPage);