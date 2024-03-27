import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { StatusCodes } from "http-status-codes";
import { LoginFail } from "../errors/userFacing.error";

const logIn = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await User.get(email, password);

    if (user) {
        const accessToken = jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_LIFETIME })

        res.cookie("access-token", accessToken, {
            sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
            secure: process.env.NODE_ENV !== "development",
            maxAge: 1000 * 60 * 60 * 24 * parseInt(process.env.JWT_LIFETIME!)
        });
        res.sendStatus(StatusCodes.OK);
    } else {
        throw new LoginFail();
    }
};

const logOut = async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("access-token");
    res.sendStatus(StatusCodes.OK);
};

const userInfo = async (req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCodes.OK).json({ email: req.user!.email });
};

const signUp = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    await User.create(email, password);

    res.sendStatus(StatusCodes.CREATED);
};

const usersController = {
    logIn,
    logOut,
    userInfo,
    signUp
};

export default usersController;