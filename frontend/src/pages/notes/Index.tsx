import withAuthenticatedUser, { WithAuthenticatedUserProps } from "@/components/hocs/withAuthenticatedUser";
import NotesIndexTemplate from "./Index.template";

const NoteIndexPage: React.FC<WithAuthenticatedUserProps> = ({ currentUser }) => {
    return <NotesIndexTemplate currentUserEmail={currentUser.email} />;
};

export default withAuthenticatedUser(NoteIndexPage);