import { QueryOptions, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import pool from "../utils/mysql.util";
import bcrypt from "bcrypt";

interface User {
    id: number;
    email: string;
    encrypted_password: string;
}

const createUser = async (email: string, password: string): Promise<ResultSetHeader> => {
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS!))

    const queryOptions: QueryOptions = {
        sql: "INSERT INTO users (email, encrypted_password) VALUES (?, ?)",
        values: [email, hashedPassword]
    };

    const [result] = await pool.query<ResultSetHeader>(queryOptions);

    return result;
};

const getLoginUser = async (email: string, password: string): Promise<Pick<User, "id" | "email"> | null> => {
    const user = await getUserByEmail(email);

    if (user && await bcrypt.compare(password, user.encrypted_password)) {
        return { id: user.id, email: user.email };
    } else {
        return null;
    }
};

const getUserInfo = async (id: number): Promise<Pick<User, "id" | "email"> | null> => {
    const user = await getUserById(id);

    return user ? { id: user.id, email: user.email } : null;
};

const getUserByEmail = async (email: string): Promise<User | null> => {
    return _getUserByField('email', email);
};

const getUserById = async (id: number): Promise<User | null> => {
    return _getUserByField('id', id);
};

const _getUserByField = async (field: 'id' | 'email', value: string | number): Promise<User | null> => {
    const queryOptions: QueryOptions = {
        sql: `SELECT * FROM users WHERE ${field} = ?`,
        values: [value]
    };

    const [rows] = await pool.query<RowDataPacket[]>(queryOptions);

    return rows.length ? rows[0] as User : null;
};

const userModel = {
    createUser,
    getLoginUser,
    getUserInfo,
};

export default userModel;