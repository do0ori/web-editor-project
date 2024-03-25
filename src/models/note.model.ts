import { QueryOptions, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import pool from "../utils/mysql.util";

interface Note {
    id: number;
    title: string;
    content: string;
    user_id: number;
    created_at: string;
    updated_at: string;
}

const createNote = async (title: string, content: string, userId: number): Promise<ResultSetHeader> => {
    const queryOptions: QueryOptions = {
        sql: "INSERT INTO notes (title, content, user_id) VALUES (?, ?, ?)",
        values: [title, content, userId]
    };

    const [result] = await pool.query<ResultSetHeader>(queryOptions);

    return result;
};

const getNotes = async (userId: number): Promise<Note[] | null> => {
    const queryOptions: QueryOptions = {
        sql: "SELECT * FROM notes WHERE user_id = ?",
        values: [userId]
    };

    const [rows] = await pool.query<RowDataPacket[]>(queryOptions);

    return rows.length ? rows as Note[] : null;
};

const getNote = async (id: number, userId: number): Promise<Note | null> => {
    const queryOptions: QueryOptions = {
        sql: "SELECT * FROM notes WHERE id = ? AND user_id = ?",
        values: [id, userId]
    };

    const [rows] = await pool.query<RowDataPacket[]>(queryOptions);

    return rows.length ? rows[0] as Note : null;
};

const updateNote = async (id: number, title: string, content: string): Promise<ResultSetHeader> => {
    const queryOptions: QueryOptions = {
        sql: "UPDATE notes SET title = ?, content = ? WHERE id = ?",
        values: [title, content, id]
    };

    const [result] = await pool.query<ResultSetHeader>(queryOptions);

    return result;
};

const deleteNote = async (id: number): Promise<ResultSetHeader> => {
    const queryOptions: QueryOptions = {
        sql: "DELETE FROM notes WHERE id = ?",
        values: [id]
    };

    const [result] = await pool.query<ResultSetHeader>(queryOptions);

    return result;
};

const noteModel = {
    createNote,
    getNotes,
    getNote,
    updateNote,
    deleteNote
};

export default noteModel;