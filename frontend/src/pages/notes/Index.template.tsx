import NoteList from "@/components/NoteList";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaRegSquarePlus, FaUser } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import oc from "open-color";
import { useLogout } from "@/hooks/useAuth";
import { useCreateNote } from "@/hooks/useNote";

interface NotesIndexTemplateProps {
    currentUserEmail: string;
}

const NotesIndexTemplate = ({ currentUserEmail }: NotesIndexTemplateProps) => {
    const { logout } = useLogout();
    const { create } = useCreateNote();

    const navigate = useNavigate();

    const onCreate = async () => {
        const { id } = await create({ title: "", content: "" });
        navigate(`/notes/${id}`);
    };

    return (
        <IndexTemplateStyle>
            <div className="side-bar">
                <div className="user">
                    <FaUser />
                    <p>{currentUserEmail}</p>
                </div>
                <SideBarButton onClick={() => logout()}>
                    <FiLogOut />
                    <p>로그아웃</p>
                </SideBarButton>
                <SideBarButton onClick={onCreate}>
                    <FaRegSquarePlus />
                    <p>노트 생성</p>
                </SideBarButton>
                <NoteList />
            </div>
            <div className="editor">
                <Outlet />
            </div>
        </IndexTemplateStyle>
    );
};

const IndexTemplateStyle = styled.div`
    display: flex;
    height: 100vh;

    p {
        margin: 0;
    }

    a:link {
        text-decoration: none;
        color: none;
    }

    a:visited, a:active {
        color: inherit;
    }

    .side-bar {
        display: flex;
        flex-direction: column;
        width: 300px;
        background-color: ${oc.gray[0]};
        padding: 5px;

        .user {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 5px;
            font-weight: bold;
            margin: 15px 0;
        }
    }

    .editor {
        flex: 1;
        padding: 20px;
        width: 100%;
    }
`;

const SideBarButton = styled.button`
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: bold;
    color: ${oc.gray[6]};
    border: none;
    padding: 0 5px;
    cursor: pointer;
`;

export default NotesIndexTemplate;