import { QueryOptions, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import pool from "../utils/mysql.util";
import bcrypt from "bcrypt";

export interface IUser {
    id: number;
    email: string;
    encrypted_password: string;
}

const create = async (email: string, password: string): Promise<ResultSetHeader> => {
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS!))

    const queryOptions: QueryOptions = {
        sql: "INSERT INTO users (email, encrypted_password) VALUES (?, ?)",
        values: [email, hashedPassword]
    };

    const [result] = await pool.query<ResultSetHeader>(queryOptions);

    return result;
};

const get = async (email: string, password: string): Promise<Pick<IUser, "id" | "email"> | null> => {
    const queryOptions: QueryOptions = {
        sql: `SELECT * FROM users WHERE email = ?`,
        values: [email]
    };

    const [rows] = await pool.query<RowDataPacket[]>(queryOptions);

    const user = rows.length ? rows[0] as IUser : null;

    if (user && await bcrypt.compare(password, user.encrypted_password)) {
        return { id: user.id, email: user.email };
    } else {
        return null;
    }
};

const User = {
    create,
    get,
};

export default User;