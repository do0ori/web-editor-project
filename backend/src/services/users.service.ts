import { LogInFail, SignUpFail } from "../errors/userFacing.error";
import User from "../models/user.model";
import UsersRepository from "../repositories/users.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface JWTUserPayload extends Omit<User, "encrypted_password"> { }

const logIn = async (email: string, password: string): Promise<string> => {
    const user = await UsersRepository.get(email);

    if (user && await bcrypt.compare(password, user.encrypted_password)) {
        const payload: JWTUserPayload = { id: user.id, email: user.email };
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_LIFETIME })

        return accessToken;
    }

    throw new LogInFail();
};

const signUp = async (email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS!));

    const result = await UsersRepository.create(email, hashedPassword);

    if (result.affectedRows !== 1) throw new SignUpFail();
};

const isUserExist = async (email: string): Promise<boolean> => {
    const user = await UsersRepository.get(email);

    return Boolean(user);
};

const UsersService = {
    logIn,
    signUp,
    isUserExist
};

export default UsersService;