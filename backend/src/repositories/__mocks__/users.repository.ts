import User from "../../models/user.model";

export class SQLError extends Error {
    code?: string;
}

const UsersRepository = {
    create(email: string, encryptedPassword: string) {
        if (MOCK_USERS.find((user) => user.email === email)) {
            const error = new SQLError();
            error.code = "ER_DUP_ENTRY";
            throw error;
        }

        const id = MOCK_USERS.length + 1;
        MOCK_USERS.push({ id, email, encrypted_password: encryptedPassword });

        return {
            affectedRows: 1,
            insertId: id
        };
    },
    get(email: string) {
        return MOCK_USERS.find((user) => user.email === email) || null;
    }
};

export default UsersRepository;

export const MOCK_USERS: User[] = [];