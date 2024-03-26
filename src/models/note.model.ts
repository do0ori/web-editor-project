import { QueryOptions, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import pool from "../utils/mysql.util";

export interface INote {
    id: number;
    title: string;
    content: string;
    user_id: number;
    created_at: string;
    updated_at: string;
}

const create = async (title: string, content: string, userId: number): Promise<ResultSetHeader> => {
    const queryOptions: QueryOptions = {
        sql: "INSERT INTO notes (title, content, user_id) VALUES (?, ?, ?)",
        values: [title, content, userId]
    };

    const [result] = await pool.query<ResultSetHeader>(queryOptions);

    return result;
};

const getAll = async (userId: number): Promise<INote[] | null> => {
    const queryOptions: QueryOptions = {
        sql: "SELECT * FROM notes WHERE user_id = ?",
        values: [userId]
    };

    const [rows] = await pool.query<RowDataPacket[]>(queryOptions);

    return rows.length ? rows as INote[] : null;
};

const get = async (id: number): Promise<INote | null> => {
    const queryOptions: QueryOptions = {
        sql: "SELECT * FROM notes WHERE id = ?",
        values: [id]
    };

    const [rows] = await pool.query<RowDataPacket[]>(queryOptions);

    return rows.length ? rows[0] as INote : null;
};

const update = async (id: number, title: string, content: string): Promise<ResultSetHeader> => {
    const queryOptions: QueryOptions = {
        sql: "UPDATE notes SET title = ?, content = ? WHERE id = ?",
        values: [title, content, id]
    };

    const [result] = await pool.query<ResultSetHeader>(queryOptions);

    return result;
};

const remove = async (id: number): Promise<ResultSetHeader> => {
    const queryOptions: QueryOptions = {
        sql: "DELETE FROM notes WHERE id = ?",
        values: [id]
    };

    const [result] = await pool.query<ResultSetHeader>(queryOptions);

    return result;
};

const Note = {
    create,
    getAll,
    get,
    update,
    remove
};

export default Note;