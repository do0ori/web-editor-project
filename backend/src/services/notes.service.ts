import { NoteNotFoundError, CreateNoteFail, UpdateNoteFail, DeleteNoteFail } from "../errors/userFacing.error";
import Note from "../models/note.model";
import NotesRepository from "../repositories/notes.repository";

const getNotes = async (userId: number): Promise<Note[]> => {
    const notes = await NotesRepository.getAll(userId);

    return notes;
};

const getNote = async (noteId: number): Promise<Note> => {
    const note = await NotesRepository.get(noteId);

    if (note) return note;

    throw new NoteNotFoundError();
};

const createNote = async (title: string, content: string, userId: number) => {
    const result = await NotesRepository.create(title, content, userId);

    if (result.affectedRows === 1) return result.insertId;

    throw new CreateNoteFail();
};

const updateNote = async (noteId: number, title: string, content: string) => {
    const result = await NotesRepository.update(noteId, title, content);

    if (result.affectedRows !== 1) throw new UpdateNoteFail();
};

const deleteNote = async (noteId: number) => {
    const result = await NotesRepository.remove(noteId);

    if (result.affectedRows !== 1) throw new DeleteNoteFail();
};

const NotesService = {
    getNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote
};

export default NotesService;