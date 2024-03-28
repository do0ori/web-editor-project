import { QueryOptions, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import pool from "../utils/mysql.util";
import User from "../models/user.model";

const create = async (email: string, encryptedPassword: string): Promise<ResultSetHeader> => {
    const queryOptions: QueryOptions = {
        sql: "INSERT INTO users (email, encrypted_password) VALUES (?, ?)",
        values: [email, encryptedPassword]
    };

    const [result] = await pool.query<ResultSetHeader>(queryOptions);

    return result;
};

const get = async (email: string): Promise<User | null> => {
    const queryOptions: QueryOptions = {
        sql: `SELECT * FROM users WHERE email = ?`,
        values: [email]
    };

    const [rows] = await pool.query<RowDataPacket[]>(queryOptions);

    return rows.length ? rows[0] as User : null;
};

const UsersRepository = {
    create,
    get,
};

export default UsersRepository;