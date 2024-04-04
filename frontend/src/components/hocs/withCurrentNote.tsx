import { Note } from "@/apis/notes.api";
import { useNote } from "@/hooks/useNote";
import { useParams } from "react-router-dom";

export interface WithCurrentNoteProps {
    currentNote: Note;
}

const withCurrentNote = (Component: React.ComponentType<WithCurrentNoteProps>): React.FC => {
    return () => {
        const { noteId } = useParams();

        if (!noteId) return null;

        const { note } = useNote(parseInt(noteId));

        if (!note) return null;

        return (
            <Component currentNote={note} />
        );

    };
};

export default withCurrentNote;