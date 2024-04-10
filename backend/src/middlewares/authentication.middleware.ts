import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "../errors/userFacing.error";
import UsersService, { JWTUserPayload } from "../services/users.service";

declare module "express-serve-static-core" {
    interface Request {
        user?: JWTUserPayload;
    }
}

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken) throw new AuthenticationError();

    const user = jwt.verify(accessToken, process.env.JWT_SECRET!, { ignoreExpiration: false }) as JWTUserPayload;

    if (!(await UsersService.isUserExist(user.email))) throw new AuthenticationError();

    req.user = user;
    next();
};