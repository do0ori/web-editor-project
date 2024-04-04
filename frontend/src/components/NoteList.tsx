import { useNotes } from "@/hooks/useNotes";
import styled from "styled-components";
import oc from "open-color";
import { FaRegFileLines } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const NoteList: React.FC = () => {
    const { notes } = useNotes();

    return (
        <>
            <SectionTitle>노트 목록</SectionTitle>
            <NoteItems>
                {
                    notes?.map((note) => (
                        <NoteItem
                            to={`/notes/${note.id}`}
                            className={({ isActive }) => (isActive ? "active" : "")}
                            key={note.id}
                            $isEmpty={!Boolean(note.title)}
                        >
                            <FaRegFileLines />
                            <p>{note.title || "제목 없음"}</p>
                        </NoteItem>
                    ))
                }
            </NoteItems>
        </>
    );
};

const SectionTitle = styled.h5`
    margin: 20px 0 10px 0;
    color: ${oc.gray[5]};
`;

const NoteItems = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

interface NoteItemProps {
    $isEmpty: boolean;
}

const NoteItem = styled(NavLink) <NoteItemProps>`
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${oc.gray[6]};
    text-decoration: none;
    font-weight: bold;
    border-radius: 5px;
    padding: 0 5px;

    p {
        flex: 1;
        max-width: 80%;
        color: ${({ $isEmpty }) => $isEmpty ? oc.gray[4] : oc.gray[6]};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    &.active {
        background-color: ${oc.gray[4]};
        color: black;

        p {
            color: ${({ $isEmpty }) => $isEmpty ? oc.gray[6] : "black"};
        }
    }
`;

export default NoteList;