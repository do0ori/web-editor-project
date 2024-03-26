import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { IUser } from "../models/user.model";

declare module "express-serve-static-core" {
    interface Request {
        user?: IUser;
    }
}

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken) {
        return res.sendStatus(StatusCodes.UNAUTHORIZED);
    }

    const user = jwt.verify(accessToken, process.env.JWT_SECRET!, { ignoreExpiration: false });

    req.user = user as IUser;
    next();
};