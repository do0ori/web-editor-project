import { httpClient } from "@/utils/https";

export interface Note {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
}

export const fetchNotes = async () => {
    const response = await httpClient.get<Note[]>("/notes");
    return response.data;
};

export const fetchNote = async (id: number) => {
    const response = await httpClient.get<Note>(`/notes/${id}`);
    return response.data;
};

export const createNote = async (noteData: Pick<Note, "title" | "content">) => {
    const response = await httpClient.post<Pick<Note, "id">>("/notes", noteData);
    return response.data;
};

export const updateNote = async (id: number, noteData: Pick<Note, "title" | "content">) => {
    const response = await httpClient.put(`/notes/${id}`, noteData);
    return response.data;
};

export const deleteNote = async (id: number) => {
    const response = await httpClient.delete(`/notes/${id}`);
    return response.data;
};