import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import UsersService from "../services/users.service";

const logIn = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const accessToken = await UsersService.logIn(email, password);

    res.cookie("access-token", accessToken, {
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
        secure: process.env.NODE_ENV !== "development",
        maxAge: 1000 * 60 * 60 * 24 * parseInt(process.env.JWT_LIFETIME!)
    });
    res.sendStatus(StatusCodes.OK);
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

    await UsersService.signUp(email, password);

    res.sendStatus(StatusCodes.CREATED);
};

const UsersController = {
    logIn,
    logOut,
    userInfo,
    signUp
};

export default UsersController;