import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../models/user.model";
import { AuthenticationError } from "../errors/userFacing.error";

declare module "express-serve-static-core" {
    interface Request {
        user?: Omit<IUser, "encrypted_password">;
    }
}

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken) {
        throw new AuthenticationError();
    }

    const user = jwt.verify(accessToken, process.env.JWT_SECRET!, { ignoreExpiration: false });

    req.user = user as Omit<IUser, "encrypted_password">;
    next();
};