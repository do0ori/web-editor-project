import Note from "../../models/note.model";

const NotesRepository = {
    create(title: string, content: string, userId: number) {
        const id = MOCK_NOTES.length + 1;
        MOCK_NOTES.push({
            id,
            title,
            content,
            user_id: userId,
            created_at: (new Date()).toDateString(),
            updated_at: (new Date()).toDateString()
        });

        return {
            affectedRows: 1,
            insertId: id
        };
    },
    getAll(userId: number) {
        return MOCK_NOTES.filter((note) => note.user_id === userId) || [];
    },
    get(id: number) {
        return MOCK_NOTES.find((note) => note.id === id) || null;
    },
    update(id: number, title: string, content: string) {
        MOCK_NOTES[id - 1].title = title;
        MOCK_NOTES[id - 1].content = content;

        return {
            affectedRows: 1
        };
    },
    remove(id: number) {
        MOCK_NOTES.splice(id - 1, 1);

        return {
            affectedRows: 1
        };
    },

};

export default NotesRepository;

export const MOCK_NOTES: Note[] = [];